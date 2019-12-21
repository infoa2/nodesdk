// eslint-disable-next-line no-unused-vars
import { Sequelize, Options, Model, ModelCtor } from 'sequelize';

export interface IOptions extends Options {
  models?: ModelCtor<Model>[];
}

export default class ConnectSequelize {
  public options: IOptions;
  public connection: Sequelize;

  constructor(options: IOptions) {
    this.options = {
      dialect: 'mysql',
      timezone: '+3:00',
      define: {
        engine: 'InnoDB',
        collate: 'utf8_general_ci',
        underscored: true,
        charset: 'utf8',
        freezeTableName: true,
      },
      pool: {
        min: 0,
        max: 10,
      },
      ...options,
    };

    if (['sqlite', 'mssql'].includes(<string>this.options.dialect)) {
      delete this.options.timezone;
    }

    this.connection = new Sequelize(this.options);

    if (typeof this.options.models !== 'undefined') {
      this.loadModels(this.options.models);
    }
  }

  private loadModels(models: ModelCtor<Model>[]): void {
    models.forEach((model: ModelCtor<Model>) => {
      if ('configure' in model) {
        (model as any).configure(this.connection);
      }

      if ('associate' in model) {
        (model as any).associate(this.connection.models);
      }
    });
  }
}
