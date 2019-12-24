"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const argon2_1 = __importDefault(require("argon2"));
class Password {
    get bcrypt() {
        return {
            create(value) {
                return bcryptjs_1.default.hash(value, 12);
            },
            verify(value, hashed) {
                return bcryptjs_1.default.compare(value, hashed);
            },
        };
    }
    get argon2() {
        return {
            create(value) {
                return argon2_1.default.hash(value);
            },
            verify(value, hashed) {
                return argon2_1.default.verify(hashed, value);
            },
        };
    }
}
exports.default = Password;
