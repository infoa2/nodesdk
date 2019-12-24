"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Jwt {
    static encode(payload, secretKey, options) {
        return new Promise((resolve, reject) => {
            try {
                const data = jsonwebtoken_1.default.sign(payload, secretKey, Object.assign({ expiresIn: '7d' }, options));
                resolve(data);
            }
            catch (err) {
                reject(err);
            }
        });
    }
    static decode(token, secretKey, options) {
        return new Promise((resolve, reject) => {
            try {
                resolve(jsonwebtoken_1.default.verify(token, secretKey, options));
            }
            catch (err) {
                reject(err);
            }
        });
    }
}
exports.default = Jwt;
