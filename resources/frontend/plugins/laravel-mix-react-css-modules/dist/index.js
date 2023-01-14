const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

function _interopDefault(ex) {
    return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var path = _interopDefault(require('path'));
var mix = _interopDefault(require('laravel-mix'));

var ReactCSSModules = function ReactCSSModules() {
    this.scopedName = this.defaultScopedName();
};
ReactCSSModules.prototype.name = function name() {
    return 'reactCSSModules';
};
ReactCSSModules.prototype.defaultScopedName = function defaultScopedName() {
    return '[name]__[local]___[hash:base64:5]';
};
ReactCSSModules.prototype.dependencies = function dependencies() {
    return ['babel-plugin-react-css-modules', 'postcss-scss', 'postcss-nested'];
};
ReactCSSModules.prototype.register = function register(scopedName) {
    if (scopedName) {
        this.scopedName = scopedName;
    }
};
ReactCSSModules.prototype.webpackConfig = function webpackConfig(config) {
    var this$1 = this;

    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: '/css/main.css',
            chunkFilename: '/css/main.chunk.css',
        }),
    );

    config.module.rules = config.module.rules.map(function (rule) {
        if (!rule.loaders) {
            return rule;
        }
        rule.loaders = rule.loaders.map(function (loader) {
            if (loader.loader === 'style-loader' || loader === 'style-loader') {
                loader = {
                    loader: MiniCssExtractPlugin.loader,
                    options: { publicPath: 'public' },
                };
                return loader;
            }
            if (loader.loader === 'css-loader' || loader === 'css-loader') {
                let options = {
                    modules: {
                        getLocalIdent: getCSSModuleLocalIdent,
                    },
                };
                loader =
                    typeof loader === 'string'
                        ? {
                              loader: loader,
                          }
                        : loader;
                loader.options = loader.options
                    ? Object.assign({}, loader.options, options)
                    : options;
            }
            return loader;
        });
        return rule;
    });
    return config;
};
ReactCSSModules.prototype.babelConfig = function babelConfig() {
    return {
        plugins: [
            [
                'react-css-modules',
                {
                    filetypes: {
                        '.scss': {
                            syntax: 'postcss-scss',
                            plugins: ['postcss-nested'],
                        },
                    },
                    exclude: 'node_modules',
                    handleMissingStyleName: 'warn',
                    generateScopedName: this.scopedName,
                    context: path.resolve(__dirname + '/../../laravel-mix/src/builder'),
                },
            ],
        ],
    };
};

mix.extend('reactCSSModules', new ReactCSSModules());
