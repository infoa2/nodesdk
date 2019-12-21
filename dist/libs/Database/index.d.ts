import { Sequelize } from 'sequelize';
import { IOptions } from './ConnectSequelize';
export default class Database {
    sequelize(options: IOptions): Sequelize;
    mongoose(): void;
}
