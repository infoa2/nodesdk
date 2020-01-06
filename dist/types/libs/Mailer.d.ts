import { Transporter, SendMailOptions } from 'nodemailer';
import MailNamespace from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { IViewNunjucksOptions } from './View';
export declare type TypeMailerContext = {
    [key: string]: any;
};
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
    transporter: Transporter;
    protected options: ISendMailOptions;
    constructor(config: IMailerConfig);
    compileNunjucks(path: string, options: IViewNunjucksOptions): void;
    compileTwig(_: string, __: object): void;
    from(from: string | MailNamespace.Address): this;
    to(to: string | MailNamespace.Address | MailNamespace.Address[]): this;
    cc(cc: string | MailNamespace.Address | MailNamespace.Address[]): this;
    bcc(bcc: string | MailNamespace.Address | MailNamespace.Address[]): this;
    replyTo(replyTo: string | MailNamespace.Address): this;
    text(text: string): this;
    template(name: string, context: TypeMailerContext): this;
    html(html: string): this;
    headers(headers: MailNamespace.Headers): this;
    attachments(attachments: MailNamespace.Attachment[]): this;
    subject(subject: string): this;
    send(options?: ISendMailOptions): Promise<any>;
}
