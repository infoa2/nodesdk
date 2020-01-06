/* eslint-disable no-unused-vars */
import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';
import MailNamespace from 'nodemailer/lib/mailer';
import MailMessage from 'nodemailer/lib/mailer/mail-message';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import View, { IViewNunjucksOptions } from './View';

export type TypeMailerContext = { [key: string]: any };

export interface IMailerNunjucksOptions {
  path: string;
  options: IViewNunjucksOptions;
}

export interface ISendMailOptions extends SendMailOptions {
  context?: TypeMailerContext;
  template?: string;
}

export interface IMailerConfig extends SMTPTransport.Options {
  options?: SendMailOptions;
  nunjucks?: IMailerNunjucksOptions;
  twig?: {
    path: string;
    options: {};
  };
}

export default class Mailer {
  public transporter: Transporter;
  protected options: ISendMailOptions;

  constructor(config: IMailerConfig) {
    const { options } = config;

    this.options = options || {};
    this.transporter = nodemailer.createTransport(config);

    if (typeof config.nunjucks !== 'undefined') {
      this.compileNunjucks(config.nunjucks.path, config.nunjucks.options);
    }

    if (typeof config.twig !== 'undefined') {
      this.compileTwig(config.twig.path, config.twig.options);
    }
  }

  public compileNunjucks(path: string, options: IViewNunjucksOptions): void {
    this.transporter.use('compile', (mail: MailMessage, callback: Function) => {
      if (mail.data.html) {
        return callback();
      }

      try {
        const nunjucks = View.nunjucks(path, options);
        const { template, context } = <any>mail.data;
        const newTemplate = `${template.replace(/.njk$/gi, '')}.njk`;

        mail.data.html = nunjucks.render(newTemplate, context);

        callback();
      } catch (err) {
        callback(err);
      }

      return mail;
    });
  }

  public compileTwig(_: string, __: object): void {
    throw new Error('Twig not implemented.');
  }

  from(from: string | MailNamespace.Address) {
    this.options.from = from;

    return this;
  }

  to(to: string | MailNamespace.Address | MailNamespace.Address[]) {
    this.options.to = to;

    return this;
  }

  cc(cc: string | MailNamespace.Address | MailNamespace.Address[]) {
    this.options.cc = cc;

    return this;
  }

  bcc(bcc: string | MailNamespace.Address | MailNamespace.Address[]) {
    this.options.bcc = bcc;

    return this;
  }

  replyTo(replyTo: string | MailNamespace.Address) {
    this.options.replyTo = replyTo;

    return this;
  }

  text(text: string) {
    this.options.text = String(text);

    return this;
  }

  template(name: string, context: TypeMailerContext) {
    this.options.template = name;
    this.options.context = context || {};

    return this;
  }

  html(html: string) {
    this.options.html = html;

    return this;
  }

  headers(headers: MailNamespace.Headers) {
    this.options.headers = headers;

    return this;
  }

  attachments(attachments: MailNamespace.Attachment[]) {
    this.options.attachments = attachments;

    return this;
  }

  subject(subject: string) {
    this.options.subject = String(subject);

    return this;
  }

  send(options?: ISendMailOptions): Promise<any> {
    return this.transporter.sendMail({
      ...this.options,
      ...options,
    });
  }
}
