"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    static mongoose() {
        throw new Error('Soon mongoose will be supported.');
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
//# sourceMappingURL=Database.js.map