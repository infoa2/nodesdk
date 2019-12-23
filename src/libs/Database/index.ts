/* eslint-disable no-unused-vars */
import { Sequelize } from 'sequelize';
import ConnectSequelize, { IOptions } from './Sequelize';

export default class Database {
  public static sequelize(options: IOptions): Sequelize {
    return new ConnectSequelize(options).connection;
  }

  public static mongoose(): void {
    throw new Error('Soon mongoose will be supported.');
  }
}
