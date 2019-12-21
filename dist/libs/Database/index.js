"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConnectSequelize_1 = __importDefault(require("./ConnectSequelize"));
class Database {
    sequelize(options) {
        return new ConnectSequelize_1.default(options).connection;
    }
    mongoose() { }
}
exports.default = Database;
