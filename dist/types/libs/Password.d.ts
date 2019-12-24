export interface IPasswordResponse {
    create: (value: string) => Promise<string>;
    verify: (value: string, hashed: string) => Promise<boolean>;
}
declare class Password {
    get bcrypt(): IPasswordResponse;
    get argon2(): IPasswordResponse;
}
declare const _default: Password;
export default _default;
