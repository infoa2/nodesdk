import stubTransport from 'nodemailer-stub-transport';
import { resolve } from 'path';
import { Mailer } from '../src';

const mailer = new Mailer(stubTransport());
mailer.compileNunjucks(resolve(__dirname, 'tmp'), {});

describe('Mailer', () => {
  it('Tests email with nunjucks template.', async () => {
    const info = await mailer
      .subject('Test mail')
      .to([
        { name: 'User', address: 'user@mail.com' },
        { name: 'User 2', address: 'user2@mail.com' },
      ])
      .from({ name: 'From', address: 'from@mail.com' })
      .replyTo({ name: 'Reply', address: 'reply@mail.com' })
      .template('email', { name: 'UserReply' })
      .send();

    const content = info.response.toString();

    expect(info.messageId).toBeDefined();
    expect(info.envelope).toHaveProperty('to');
    expect(info.envelope.to).toHaveLength(2);
    expect(content).toMatch(new RegExp('<h1>Hello World'));
    expect(content).toMatch(new RegExp('<p>UserReply'));
  });

  it('Tests override html in template.', async () => {
    const info = await mailer
      .subject('Test mail')
      .to({ name: 'User', address: 'user@mail.com' })
      .from({ name: 'From', address: 'from@mail.com' })
      .replyTo({ name: 'Reply', address: 'reply@mail.com' })
      .template('email', { name: 'UserReply' })
      .html('<p>override<p>')
      .send();

    const content = info.response.toString();

    expect(content).not.toMatch(new RegExp('<h1>Hello World'));
    expect(content).toMatch(new RegExp('<p>override'));
  });
});
