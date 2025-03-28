import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import { InjectManifest } from 'workbox-webpack-plugin';
import  Dotenv from 'dotenv-webpack';
import { BuildOptions } from '../types/config';

// const Dotenv = require('dotenv-webpack');

export const buildPlugins = ({
    paths, isDev, apiUrl, project,
}: BuildOptions): webpack.WebpackPluginInstance[] =>{
    const isProd = !isDev;
    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project),
        }),
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true,
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
            },
        }),
        new Dotenv({
            // path: '../../../.env'
        }),


    ];

    if (isDev) {
        plugins.push(new ReactRefreshWebpackPlugin());
        plugins.push(new webpack.HotModuleReplacementPlugin());
        plugins.push(new BundleAnalyzerPlugin({
            openAnalyzer: false,
        }));
        //  delete this  from dev
        // plugins.push(new CopyPlugin({
        //     patterns: [
        //
        //         { from: `${paths.src}/favicon.ico`, to: paths.build },
        //         { from: `${paths.src}/manifest.json`, to: paths.build  },
        //         { from: `${paths.src}/logo192.png`, to: paths.build  },
        //         { from: `${paths.src}/logo512.png`, to: paths.build  },
        //     ],
        // }));
        // new InjectManifest( {
        //     swSrc: './config/serviceWorker/config-sw.js',
        //     swDest: 'sw.js',
        // } )
    }
    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }));
        plugins.push(new CopyPlugin({
            patterns: [
                { from: paths.locales, to: paths.buildLocales },
                { from: `${paths.src}/favicon.ico`, to: paths.build },
                { from: `${paths.src}/manifest.json`, to: paths.build  },
                { from: `${paths.src}/logo192.png`, to: paths.build  },
                { from: `${paths.src}/logo512.png`, to: paths.build  },
            ],
        }));
        plugins.push(new InjectManifest( {
            swSrc: './config/serviceWorker/config-sw.js',
            swDest: `${paths.build}/sw.js`,
        } ))
    }

    return plugins;
}
