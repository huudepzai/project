'use strict';
const path = require( 'path' );
const { styles } = require( '@ckeditor/ckeditor5-dev-utils' );
module.exports = {
    entry: './app.js',
    output: {
        path: path.resolve( __dirname, 'public' ),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: [ 'raw-loader' ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            singleton: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: styles.getPostCssConfig( {
                            themeImporter: {
                                themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
                            },
                            minify: true
                        } )
                    },
                ]
            }
        ]
    },
    devtool: 'source-map',
    performance: { hints: false }
};