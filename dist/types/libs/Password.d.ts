export default class Password {
    static create(value: string): Promise<string>;
    static verify(value: string, hashed: string): Promise<boolean>;
}
