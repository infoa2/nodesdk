/* eslint-disable no-unused-vars */
import mongoose, { Mongoose } from 'mongoose';
import { Sequelize, Options, Model, ModelCtor } from 'sequelize';

export interface IDatabaseSequelizeOptions extends Options {
  models?: ModelCtor<Model>[];
}

export default class Database {
  public static sequelize(options: IDatabaseSequelizeOptions): Sequelize {
    const opts = this.getSequelizeOptions(options);
    const sequelize = new Sequelize(opts);

    if (typeof opts.models !== 'undefined') {
      this.loadSequelizeModels(sequelize, opts.models);
    }

    return sequelize;
  }

  public static mongoose(url: string): Promise<Mongoose> {
    return mongoose.connect(url, {
      useNewUrlParser: true,
      useFindAndModify: true,
    });
  }

  private static getSequelizeOptions(
    options: IDatabaseSequelizeOptions
  ): IDatabaseSequelizeOptions {
    const opts: IDatabaseSequelizeOptions = {
      dialect: 'mysql',
      timezone: '+3:00',
      define: {
        engine: 'InnoDB',
        collate: 'utf8_general_ci',
        underscored: true,
        charset: 'utf8',
        freezeTableName: true,
      },
      pool: { min: 0, max: 10 },
      ...options,
    };

    if (['sqlite', 'mssql'].includes(<string>opts.dialect)) {
      delete opts.timezone;
    }

    return opts;
  }

  private static loadSequelizeModels(
    sequelize: Sequelize,
    models: ModelCtor<Model>[]
  ): void {
    models.forEach((model: ModelCtor<Model>) => {
      if ('configure' in model) {
        (model as any).configure(sequelize);
      }

      if ('associate' in model) {
        (model as any).associate(sequelize.models);
      }
    });
  }
}
