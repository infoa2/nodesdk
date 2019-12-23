"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize_1 = __importDefault(require("./Sequelize"));
class Database {
    static sequelize(options) {
        return new Sequelize_1.default(options).connection;
    }
    static mongoose() {
        throw new Error('Soon mongoose will be supported.');
    }
}
exports.default = Database;
