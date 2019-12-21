import {
  validateCpf,
  validateCnpj,
  uuid,
  createRandomBytes,
  formatMoneyBrl,
  normalizeMoney,
  onlyNumber,
} from '../src';

describe('Helpers', () => {
  it('check not valid cpf.', () => {
    expect(validateCpf('619.750.821-98')).toBe(false);
  });

  it('check valid cpf.', () => {
    expect(validateCpf('619.750.020-59')).toBe(true);
  });

  it('check not valid cnpj.', () => {
    expect(validateCnpj('09.121.022/0001-23')).toBe(false);
  });

  it('check valid cnpj.', () => {
    expect(validateCnpj('09.121.022/0001-84')).toBe(true);
  });

  it('check size uuid', () => {
    expect(uuid()).toHaveLength(36);
  });

  it('Create random string in size 24.', async () => {
    const randomBytes = await createRandomBytes(24);
    expect(randomBytes).toHaveLength(24);
  });

  it('Formats value in reais.', async () => {
    expect(formatMoneyBrl(1250)).toMatch(/^R\$\s1,250\.00$/);
  });

  it('normalize price value.', () => {
    expect(normalizeMoney('R$ 1,250.51')).toBe(1250.51);
  });

  it('Remove all non-numeric characters.', () => {
    expect(onlyNumber('Meu cpf é: 09.121.022/0001-84')).toBe('09121022000184');
  });
});
