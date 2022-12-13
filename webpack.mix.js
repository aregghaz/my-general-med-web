require('./resources/frontend/plugins/laravel-mix-react-css-modules')
const mix = require('laravel-mix')


mix.webpackConfig({
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /(\.(gif|webp)$)/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: path => {
                                if (!/node_modules|bower_components/.test(path)) {
                                    return Config.fileLoaderDirs.images + '/[name].[ext]?[hash]'
                                }
                                return (
                                    Config.fileLoaderDirs.images +
                                    '/vendor/' +
                                    path
                                        .replace(/\\/g, '/')
                                        .replace(
                                            /((.*(node_modules|bower_components))|images|image|img|assets|videos)\//g,
                                            ''
                                        ) +
                                    '?[hash]'
                                )
                            },
                            publicPath: Config.resourceRoot
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: Config.imgLoaderOptions
                    }
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.scss']
    }
})

mix.react('resources/frontend/index.js', 'public/js')
    .reactCSSModules()
    .copy('resources/frontend/plugins/swiper/swiper.css', 'public/css/swiper.css')
    .copy('resources/frontend/plugins/image-gallery/image-gallery.css', 'public/css/image-gallery.css')
    .copy('resources/frontend/fontello-25b26084/css/fontello.css', 'public/css')
    .copy('resources/frontend/fontello-25b26084/font', 'public/font')
    .copy('resources/frontend/plugins/cookie-banner/js/script.js', 'public/js/cookie-banner.js')
