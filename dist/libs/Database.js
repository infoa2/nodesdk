"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const sequelize_1 = require("sequelize");
class Database {
    static sequelize(options) {
        const opts = this.getSequelizeOptions(options);
        const sequelize = new sequelize_1.Sequelize(opts);
        if (typeof opts.models !== 'undefined') {
            this.loadSequelizeModels(sequelize, opts.models);
        }
        return sequelize;
    }
    static mongoose(url) {
        return mongoose_1.default.connect(url, {
            useNewUrlParser: true,
            useFindAndModify: true,
        });
    }
    static getSequelizeOptions(options) {
        const opts = Object.assign({ dialect: 'mysql', timezone: '+3:00', define: {
                engine: 'InnoDB',
                collate: 'utf8_general_ci',
                underscored: true,
                charset: 'utf8',
                freezeTableName: true,
            }, pool: { min: 0, max: 10 } }, options);
        if (['sqlite', 'mssql'].includes(opts.dialect)) {
            delete opts.timezone;
        }
        return opts;
    }
    static loadSequelizeModels(sequelize, models) {
        models.forEach((model) => {
            if ('configure' in model) {
                model.configure(sequelize);
            }
            if ('associate' in model) {
                model.associate(sequelize.models);
            }
        });
    }
}
exports.default = Database;
