/// <reference types="node" />
import { RequestOptions } from 'https';
export default class HttpRequest {
    static send(options: RequestOptions): Promise<Buffer>;
}
