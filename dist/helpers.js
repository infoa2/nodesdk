"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const fs_1 = require("fs");
const crypto_1 = __importDefault(require("crypto"));
const querystring_1 = require("querystring");
function existsOrError(value, message) {
    if (!value)
        throw new Error(message);
    if (Array.isArray(value) && value.length === 0)
        throw new Error(message);
    if (typeof value === 'string' && !value.trim())
        throw new Error(message);
}
exports.existsOrError = existsOrError;
function notExistsOrError(value, message) {
    try {
        existsOrError(value, message);
    }
    catch (err) {
        return;
    }
    throw new Error(message);
}
exports.notExistsOrError = notExistsOrError;
function equalsOrError(a, b, message) {
    if (a !== b)
        throw new Error(message);
}
exports.equalsOrError = equalsOrError;
function uuid(a) {
    return a
        ?
            (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
        : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
}
exports.uuid = uuid;
function createTmpFile(data, extension) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!data || !extension) {
            throw new Error('createTmpFile: arguments invalids.');
        }
        extension = extension.replace('.', '');
        const filePath = `${os_1.default.tmpdir()}/${uuid()}-${Date.now()}.${extension}`;
        yield fs_1.promises.writeFile(`${filePath}`, data);
        return filePath;
    });
}
exports.createTmpFile = createTmpFile;
function createHash(value, key, algorithm = 'sha256', encoding = 'hex') {
    return crypto_1.default
        .createHmac(algorithm, key)
        .update(value)
        .digest(encoding);
}
exports.createHash = createHash;
function createHashMd5(value) {
    return crypto_1.default
        .createHash('md5')
        .update(value)
        .digest('hex');
}
exports.createHashMd5 = createHashMd5;
function createRandomBytes(length) {
    return new Promise((resolve, reject) => {
        crypto_1.default.randomBytes((length || 16) / 2, (err, hash) => {
            if (err)
                return reject(err);
            return resolve(hash.toString('hex'));
        });
    });
}
exports.createRandomBytes = createRandomBytes;
function createRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
exports.createRandomInt = createRandomInt;
function createRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.createRandomIntInclusive = createRandomIntInclusive;
function isValidaDate(date) {
    return date instanceof Date && !Number.isNaN(date.getTime());
}
exports.isValidaDate = isValidaDate;
function createDateInstance(date, check = true) {
    date = date || Date.now();
    if (date instanceof Date) {
        date = date.getTime();
    }
    else if (Number.isNaN(Number(date)) && date.trim()) {
        const dateSplit = date.toString().split(' ');
        const dateTime = typeof dateSplit[1] !== 'undefined' ? dateSplit[1] : '';
        if (dateSplit[0].match(/^\d{2}\/\d{2}\/\d{4}$/gi)) {
            const dateReverse = dateSplit[0]
                .split('/')
                .reverse()
                .join('/');
            date = `${dateReverse} ${dateTime}`;
        }
        else if (dateSplit[0].match(/^\d{4}\/\d{2}\/\d{2}$/gi)) {
            date = `${dateSplit[0]} ${dateTime}`;
        }
    }
    else if (!Number.isNaN(Number(date))) {
        date = Number(date);
    }
    const newDate = new Date(date);
    if (check && !isValidaDate(newDate)) {
        throw new Error(`Invalid date ${date}`);
    }
    return newDate;
}
exports.createDateInstance = createDateInstance;
function convertToTitleCase(string) {
    if (!string) {
        return '';
    }
    string = string.toString();
    return string.replace(/\w\S*/g, function replace(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
exports.convertToTitleCase = convertToTitleCase;
function convertToCamelCaseString(value) {
    return String(value)
        .toLowerCase()
        .replace(/^([A-Z])|[\s-_](\w)/g, (_, p1, p2) => {
        if (p2)
            return p2.toUpperCase();
        return p1.toLowerCase();
    });
}
exports.convertToCamelCaseString = convertToCamelCaseString;
function convertToCamelCaseObject(obj) {
    if (typeof obj !== 'object') {
        return false;
    }
    const newObj = {};
    Object.keys(obj).map(key => {
        newObj[convertToCamelCaseString(key)] = obj[key];
        return newObj;
    });
    return newObj;
}
exports.convertToCamelCaseObject = convertToCamelCaseObject;
function validateCpf(cpf) {
    cpf = String(cpf).replace(/\.|-|\s/gi, '');
    if (cpf.length !== 11) {
        return false;
    }
    for (let i = 0; i <= 9; i++) {
        if (cpf === String(i).repeat(11)) {
            return false;
        }
    }
    const calculate = (mod) => {
        let sum = 0;
        for (let i = 0; i <= mod - 2; i++) {
            sum += Number(cpf.charAt(i)) * (mod - i);
        }
        return String(sum % 11 < 2 ? 0 : 11 - (sum % 11));
    };
    if (calculate(10) !== cpf.charAt(9) || calculate(11) !== cpf.charAt(10)) {
        return false;
    }
    return true;
}
exports.validateCpf = validateCpf;
function validateCnpj(cnpj) {
    cnpj = String(cnpj).replace(/\.|-|\/|\s/gi, '');
    if (cnpj.length !== 14) {
        return false;
    }
    for (let i = 0; i <= 14; i++) {
        if (cnpj === String(i).repeat(14)) {
            return false;
        }
    }
    const calculate = (length) => {
        let sum = 0;
        let position = length - 7;
        for (let i = length; i >= 1; i--) {
            sum += Number(cnpj.charAt(length - i)) * position--;
            if (position < 2) {
                position = 9;
            }
        }
        return String(sum % 11 < 2 ? 0 : 11 - (sum % 11));
    };
    if (calculate(12) !== cnpj.charAt(12) || calculate(13) !== cnpj.charAt(13)) {
        return false;
    }
    return true;
}
exports.validateCnpj = validateCnpj;
function onlyNumber(value) {
    return String(value).replace(/[^\d]/gi, '');
}
exports.onlyNumber = onlyNumber;
function removeAccents(value) {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f|\u00b4|\u0060|\u005e|\u007e]/g, '');
}
exports.removeAccents = removeAccents;
function normalizeMoney(value) {
    return Number(value.replace(/[^0-9-]/g, '')) / 100;
}
exports.normalizeMoney = normalizeMoney;
function formatMoneyBrl(value) {
    const formatter = global.Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return formatter.format(value);
}
exports.formatMoneyBrl = formatMoneyBrl;
function getImageGravatar(email, params) {
    const md5 = createHashMd5(email);
    const query = params ? `?${querystring_1.stringify(params)}` : '';
    return `https://www.gravatar.com/avatar/${md5}${query}`;
}
exports.getImageGravatar = getImageGravatar;
//# sourceMappingURL=helpers.js.map