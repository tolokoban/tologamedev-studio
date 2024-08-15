import type { Configuration } from "webpack"

import { rules } from "./webpack.rules"
import { plugins } from "./webpack.plugins"

rules.push(
    {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
    },
    {
        test: /\.(png|jpe?g|gif|webp|svg)$/i,
        // More information here https://webpack.js.org/guides/asset-modules/
        type: "asset",
        generator: {
            filename: "img/[name].[hash][ext][query]",
        },
    },
    {
        test: /\.(bin|glb)$/i,
        // More information here https://webpack.js.org/guides/asset-modules/
        type: "asset",
        generator: {
            filename: "bin/[name].[hash][ext][query]",
        },
    },
    {
        test: /\.(eot|ttf|woff|woff2)$/i,
        // More information here https://webpack.js.org/guides/asset-modules/
        type: "asset/resource",
        generator: {
            filename: "fnt/[name].[hash][ext][query]",
        },
    },
    {
        test: /\.(vert|frag|obj)$/i,
        // More information here https://webpack.js.org/guides/asset-modules/
        type: "asset/source",
    }
)

export const rendererConfig: Configuration = {
    module: {
        rules,
    },
    plugins,
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
    },
}
