export interface IPasswordResponse {
    create: (value: string) => Promise<string>;
    verify: (value: string, hashed: string) => Promise<boolean>;
}
export default class Password {
    get bcrypt(): IPasswordResponse;
    get argon2(): IPasswordResponse;
}
