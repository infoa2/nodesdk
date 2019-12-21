/* eslint-disable no-unused-vars */
import { Sequelize } from 'sequelize';
import ConnectSequelize, { IOptions } from './ConnectSequelize';

export default class Database {
  sequelize(options: IOptions): Sequelize {
    return new ConnectSequelize(options).connection;
  }

  mongoose(): void {}
}
