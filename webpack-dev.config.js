const path=require("path");
const HtmlWebpackPlugin=require("html-webpack-plugin");
const {CleanWebpackPlugin}=require("clean-webpack-plugin");
const VueLoaderPlugin=require("vue-loader/lib/plugin");
const HOST_PATH=process.cwd();
const DIST_PATH=path.join(process.cwd(),"dist");

const WORKSPACE_PATH=path.join(__dirname,"dev");

NODE_ENV="development";

const webpackConfigBase={
    mode:"development",
    entry:path.join(WORKSPACE_PATH,"main.ts"),
    performance:{
        hints:false
    },
    output:{
        filename:"[name].js",
        publicPath:"/"
    },
    devtool:false,
    module:{
        rules:[
            {
                test:/\.vue$/,
                use:[
                    {loader:"vue-loader"}
                ]
            },
            {
                test:/\.ts$/,
                exclude:/node_modules/,
                use:[
                    {
                        loader:"babel-loader",
                    },
                    {loader:"ts-loader",
                        options:{
                            transpileOnly:true,
                            appendTsSuffixTo:['\\.vue$'],
                            happyPackMode:false
                        }
                    }
                ]

            },
            {
                test:/\.css$/,use:["style-loader","css-loader"]
            },
            {
                test:/\.scss$/,use:[
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test:/\.(woff|woff|eot|ttf|otf)/,
                use:[
                    {loader:"file-loader",options:{name:"fonts/[name].[hash].[ext]",publishPath:DIST_PATH}}
                ]
            },
            {
                test:/\.css$/,
                oneOf:[
                    {resourceQuery: /\?vue/,use:[
                            {loader:"vue-style-loader",options:{
                                    sourceMap:false,
                                    shadowMode:false,
                                }},{
                                loader:"css-loader",options:{
                                    sourceMap:false,
                                    importLoaders:2
                                }},
                            {
                                loader:"postcss-loader"
                            }
                        ]},
                    {use:["vue-style-loader","css-loader","postcss-loader"]
                    }
                ]
            }
        ],
    },
    resolve:{
        extensions:[".ts",".tsx",".js"]
    },
    optimization:{
        usedExports:true,
        // minimize:false
    },
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template:path.join(process.cwd(),"dev/index.html"),
            title:"element plus"
        })
    ]
};


module.exports=[
    webpackConfigBase
];