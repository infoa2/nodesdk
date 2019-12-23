import { Sequelize, Options, Model, ModelCtor } from 'sequelize';
export interface IOptions extends Options {
    models?: ModelCtor<Model>[];
}
export default class ConnectSequelize {
    options: IOptions;
    connection: Sequelize;
    constructor(options: IOptions);
    private loadModels;
}
