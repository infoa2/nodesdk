"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
class HttpRequest {
    static send(options) {
        return new Promise((resolve, reject) => {
            const request = https_1.default.request(options, function request(res) {
                const chunks = [];
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
exports.default = HttpRequest;
