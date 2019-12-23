import { Sequelize } from 'sequelize';
import { IOptions } from './Sequelize';
export default class Database {
    static sequelize(options: IOptions): Sequelize;
    static mongoose(): void;
}
