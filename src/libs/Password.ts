import bcrypt from 'bcryptjs';
import argon2 from 'argon2';

export interface IPasswordResponse {
  create: (value: string) => Promise<string>;
  verify: (value: string, hashed: string) => Promise<boolean>;
}

export default class Password {
  public get bcrypt(): IPasswordResponse {
    return {
      create(value: string): Promise<string> {
        return bcrypt.hash(value, 12);
      },
      verify(value: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(value, hashed);
      },
    };
  }

  public get argon2(): IPasswordResponse {
    return {
      create(value: string): Promise<string> {
        return argon2.hash(value);
      },
      verify(value: string, hashed: string): Promise<boolean> {
        return argon2.verify(hashed, value);
      },
    };
  }
}
