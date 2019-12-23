import { ConfigureOptions, Environment } from 'nunjucks';
export declare type TypeViewFilters = {
    [key: string]: (...args: any[]) => any;
};
export interface IViewOptions extends ConfigureOptions {
    filters?: TypeViewFilters;
}
export default class View {
    static twig(): void;
    static nunjucks(path: string, options: IViewOptions): Environment;
}
