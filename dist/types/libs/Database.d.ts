import { Mongoose } from 'mongoose';
import { Sequelize, Options, Model, ModelCtor } from 'sequelize';
export interface IDatabaseSequelizeOptions extends Options {
    models?: ModelCtor<Model>[];
}
export default class Database {
    static sequelize(options: IDatabaseSequelizeOptions): Sequelize;
    static mongoose(url: string): Promise<Mongoose>;
    private static getSequelizeOptions;
    private static loadSequelizeModels;
}
