import { Password } from '../src';

describe('Password', () => {
  it('Create password hashed.', async () => {
    const hashedBcrypt = await Password.bcrypt.create('bcrypt@');
    const hashedArgon2 = await Password.argon2.create('argon2@');

    expect(hashedBcrypt).toBeDefined();
    expect(hashedArgon2).toBeDefined();
  });

  it('Verify password hashed true.', async () => {
    const hashedBcrypt = await Password.bcrypt.create('bcrypt@');
    const verifyBcrypt = await Password.bcrypt.verify('bcrypt@', hashedBcrypt);
    const hashedArgon2 = await Password.argon2.create('argon2@');
    const verifyArgon2 = await Password.argon2.verify('argon2@', hashedArgon2);

    expect(verifyBcrypt).toBe(true);
    expect(verifyArgon2).toBe(true);
  });

  it('Verify password hashed false.', async () => {
    const hashedBcrypt = await Password.bcrypt.create('bcrypt@');
    const verifyBcrypt = await Password.bcrypt.verify('@bcrypt@', hashedBcrypt);
    const hashedArgon2 = await Password.argon2.create('argon2@');
    const verifyArgon2 = await Password.argon2.verify('@argon2@', hashedArgon2);

    expect(verifyBcrypt).toBe(false);
    expect(verifyArgon2).toBe(false);
  });
});
