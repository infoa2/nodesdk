"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class ConnectSequelize {
    constructor(options) {
        this.options = Object.assign({ dialect: 'mysql', timezone: '+3:00', define: {
                engine: 'InnoDB',
                collate: 'utf8_general_ci',
                underscored: true,
                charset: 'utf8',
                freezeTableName: true,
            }, pool: {
                min: 0,
                max: 10,
            } }, options);
        if (['sqlite', 'mssql'].includes(this.options.dialect)) {
            delete this.options.timezone;
        }
        this.connection = new sequelize_1.Sequelize(this.options);
        if (typeof this.options.models !== 'undefined') {
            this.loadModels(this.options.models);
        }
    }
    loadModels(models) {
        models.forEach((model) => {
            if ('configure' in model) {
                model.configure(this.connection);
            }
            if ('associate' in model) {
                model.associate(this.connection.models);
            }
        });
    }
}
exports.default = ConnectSequelize;
