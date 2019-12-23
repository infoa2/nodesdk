// eslint-disable-next-line no-unused-vars
import nunjucks, { ConfigureOptions, Environment } from 'nunjucks';

export type TypeViewFilters = { [key: string]: (...args: any[]) => any };

export interface IViewOptions extends ConfigureOptions {
  filters?: TypeViewFilters;
}

export default class View {
  public static twig() {
    throw new Error('Soon twig will be supported.');
  }

  public static nunjucks(path: string, options: IViewOptions): Environment {
    const env = nunjucks.configure(path, options);
    const { express, filters } = options;

    if (express !== undefined) {
      (<any>express).set('view engine', 'njk');
    }

    if (typeof filters === 'object') {
      Object.keys(filters).forEach((key: string) => {
        env.addFilter(key, filters[key]);
      });
    }

    return env;
  }
}
