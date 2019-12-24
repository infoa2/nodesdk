"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nunjucks_1 = __importDefault(require("nunjucks"));
class View {
    static twig() {
        throw new Error('Soon twig will be supported.');
    }
    static nunjucks(path, options) {
        const env = nunjucks_1.default.configure(path, options);
        const { express, filters } = options;
        if (express !== undefined) {
            express.set('view engine', 'njk');
        }
        if (typeof filters === 'object') {
            Object.keys(filters).forEach((key) => {
                env.addFilter(key, filters[key]);
            });
        }
        return env;
    }
}
exports.default = View;
//# sourceMappingURL=View.js.map