import jwt from 'jsonwebtoken';

export default class Jwt {
  public static encode(
    payload: any,
    secretKey: jwt.Secret,
    options?: jwt.SignOptions
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const data = jwt.sign(payload, secretKey, {
          expiresIn: '7d',
          ...options,
        });

        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  public static decode(
    token: string,
    secretKey: jwt.Secret,
    options?: jwt.VerifyOptions
  ): Promise<string | object> {
    return new Promise((resolve, reject) => {
      try {
        resolve(jwt.verify(token, secretKey, options));
      } catch (err) {
        reject(err);
      }
    });
  }
}
