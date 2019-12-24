"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const View_1 = __importDefault(require("./View"));
class Mailer {
    constructor(config) {
        const { options } = config;
        this.options = options || {};
        this.transporter = nodemailer_1.default.createTransport(config);
        if (typeof config.nunjucks !== 'undefined') {
            this.compileNunjucks(config.nunjucks.path, config.nunjucks.options);
        }
    }
    compileNunjucks(path, options) {
        this.transporter.use('compile', (mail, callback) => {
            if (mail.data.html) {
                return callback();
            }
            try {
                const nunjucks = View_1.default.nunjucks(path, options);
                const { template, context } = mail.data;
                const newTemplate = `${template.replace(/.njk$/gi, '')}.njk`;
                mail.data.html = nunjucks.render(newTemplate, context);
                callback();
            }
            catch (err) {
                callback(err);
            }
            return mail;
        });
    }
    from(from) {
        this.options.from = from;
        return this;
    }
    to(to) {
        this.options.to = to;
        return this;
    }
    cc(cc) {
        this.options.cc = cc;
        return this;
    }
    bcc(bcc) {
        this.options.bcc = bcc;
        return this;
    }
    replyTo(replyTo) {
        this.options.replyTo = replyTo;
        return this;
    }
    text(text) {
        this.options.text = String(text);
        return this;
    }
    template(name, context) {
        this.options.template = name;
        this.options.context = context || {};
        return this;
    }
    html(html) {
        this.options.html = html;
        return this;
    }
    headers(headers) {
        this.options.headers = headers;
        return this;
    }
    attachments(attachments) {
        this.options.attachments = attachments;
        return this;
    }
    subject(subject) {
        this.options.subject = String(subject);
        return this;
    }
    send(options) {
        return this.transporter.sendMail(Object.assign(Object.assign({}, this.options), options));
    }
}
exports.default = Mailer;
//# sourceMappingURL=Mailer.js.map