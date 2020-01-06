/* eslint-disable no-unused-vars */
import { IncomingMessage } from 'http';
import https, { RequestOptions } from 'https';

export default class HttpRequest {
  static send(options: RequestOptions): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const request = https.request(options, function request(
        res: IncomingMessage
      ) {
        const chunks: any[] = [];

        res.on('data', chunk => {
          chunks.push(chunk);
        });

        res.on('end', () => {
          const chunked = Buffer.concat(chunks);
          resolve(chunked);
        });

        res.on('error', err => {
          reject(err);
        });
      });

      request.end();
    });
  }
}
