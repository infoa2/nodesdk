"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Yup = __importStar(require("yup"));
const helpers_1 = require("../helpers");
Yup.string.prototype.cpf = function cpf(message) {
    message = message || '${path} must be valid cpf.';
    return this.test({
        name: 'cpf',
        message,
        exclusive: true,
        test: helpers_1.validateCpf,
    });
};
Yup.string.prototype.cnpj = function cnpj(message) {
    message = message || '${path} must be valid cnpj.';
    return this.test({
        name: 'cnpj',
        message,
        exclusive: true,
        test: helpers_1.validateCnpj,
    });
};
Yup.string.prototype.phone = function phone(message) {
    message = message || '${path} must be a valid phone number dd + number';
    return this.transform((value) => this.isType(value) ? helpers_1.onlyNumber(value) : value).test({
        name: 'phone',
        message,
        exclusive: true,
        test(value) {
            return String(value).length > 10 && String(value).length < 13;
        },
    });
};
exports.default = Yup;
//# sourceMappingURL=Yup.js.map