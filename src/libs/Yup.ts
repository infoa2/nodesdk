/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';
import { validateCpf, validateCnpj, onlyNumber } from '../helpers';

Yup.string.prototype.cpf = function cpf(message?: string) {
  message = message || '${path} must be valid cpf.';

  return this.test({
    name: 'cpf',
    message,
    exclusive: true,
    test: validateCpf,
  });
};

Yup.string.prototype.cnpj = function cnpj(message?: string) {
  message = message || '${path} must be valid cnpj.';

  return this.test({
    name: 'cnpj',
    message,
    exclusive: true,
    test: validateCnpj,
  });
};

Yup.string.prototype.phone = function phone(message?: string) {
  message = message || '${path} must be a valid phone number dd + number';

  return this.transform((value: string | number) =>
    this.isType(value) ? onlyNumber(value) : value
  ).test({
    name: 'phone',
    message,
    exclusive: true,
    test(value: string) {
      return String(value).length > 10 && String(value).length < 13;
    },
  });
};

export default Yup;
