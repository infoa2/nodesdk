import jwt from 'jsonwebtoken';
export default class Jwt {
    static encode(payload: any, secretKey: jwt.Secret, options?: jwt.SignOptions): Promise<string>;
    static decode(token: string, secretKey: jwt.Secret, options?: jwt.VerifyOptions): Promise<string | object>;
}
