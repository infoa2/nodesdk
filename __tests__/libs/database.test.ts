/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */
import {
  Model,
  DataTypes,
  Sequelize,
  BelongsToGetAssociationMixin,
  ModelCtor,
} from 'sequelize';
import { resolve } from 'path';
import { unlinkSync } from 'fs';
import Database from '../../src/libs/Database';

class UserModel extends Model {
  public id!: String;
  public name!: String;
  public email!: String;
  public readonly createdAt!: Date;
  public readonly updateAt!: Date;

  static configure(conn: Sequelize) {
    this.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
      },
      { sequelize: conn, tableName: 'users' }
    );

    return this;
  }
}

class AddressModel extends Model {
  public zipcode: String;
  public readonly createdAt!: Date;
  public readonly updateAt!: Date;

  // Get user association
  public getUser!: BelongsToGetAssociationMixin<UserModel>;

  static configure(conn: Sequelize) {
    this.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        zipcode: DataTypes.STRING,
      },
      { sequelize: conn, tableName: 'address' }
    );

    return this;
  }

  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.UserModel, {
      targetKey: 'id',
      foreignKey: 'user_id',
      as: 'user',
      constraints: false,
    });
  }
}

const database = new Database();
const sequelize = database.sequelize({
  dialect: 'sqlite',
  storage: resolve(__dirname, 'database.sqlite'),
  models: [UserModel, AddressModel],
});

beforeAll(async () => {
  await UserModel.sync({ force: true });
  await AddressModel.sync({ force: true });
  const user = await UserModel.create({ name: 'Test', email: 'test@mail.com' });
  await AddressModel.create({ user_id: user.id, zipcode: '87509-630' });
});

describe('Database', () => {
  it('Test connection sequelize.', async () => {
    await sequelize.authenticate();
    expect(true).toBe(true);
  });

  it('Test model and find user.', async () => {
    const user = await UserModel.findOne({ limit: 1 });
    expect(user).toBeInstanceOf(UserModel);
    expect(user.email).toBe('test@mail.com');
  });

  it('Get user from address.', async () => {
    const address = await AddressModel.findOne({ limit: 1 });
    expect(address).toBeInstanceOf(AddressModel);
    expect((await address.getUser()).name).toBe('Test');
  });
});

afterAll(() => {
  unlinkSync(resolve(__dirname, 'database.sqlite'));
  sequelize.close();
});
