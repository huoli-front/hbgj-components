const babel = require("rollup-plugin-babel");
const replace = require("rollup-plugin-replace");
const commonjs = require("rollup-plugin-commonjs");
const nodeResolve = require("rollup-plugin-node-resolve");
const { sizeSnapshot } = require("rollup-plugin-size-snapshot");
const { uglify } = require("rollup-plugin-uglify");

const ModuleName = "QuickApi";
const pkg = require("./package.json");

console.log(pkg.version);
//
// const createLintingRule = () => ({
//     throwOnError: true,
//     throwOnWarning: true,
//     include: "modules",
// })

function isBareModuleId(id) {
    return !id.startsWith(".") && !id.startsWith("/");
}

const outpubOptions = {
    banner: `/*!
 * 
 *         version: ${pkg.version}
 *         license: ${pkg.license}
 *         author: ${pkg.author}
 *         home: http://www.yujindong.com/hbgj
 *       
 */`
}
const cjs = [
    {
        input: "modules/index.js",
        output: {
            file: `cjs/${pkg.moduleName}.js`,
            format: "cjs",
            ...outpubOptions
        },
        external: isBareModuleId,
        plugins: [
            babel({ exclude: /node_modules/ }),
            replace({
                "process.env.NODE_ENV": JSON.stringify("development"),
                "process.env.BUILD_FORMAT": JSON.stringify("cjs")
            })
        ],
    },
    {
        input: "modules/index.js",
        output: {
            file: `cjs/${pkg.moduleName}.min.js`,
            format: "cjs",
            ...outpubOptions
        },
        external: isBareModuleId,
        plugins: [
            babel({ exclude: /node_modules/ }),
            replace({
                "process.env.NODE_ENV": JSON.stringify("production"),
                "process.env.BUILD_FORMAT": JSON.stringify("cjs")
            }),
            uglify()
        ],

    }
];

const esm = [
    {
        input: "modules/index.js",
        output: {
            file: `esm/${pkg.moduleName}.js`,
            format: "esm",
            ...outpubOptions
        },
        external: isBareModuleId,
        plugins: [
            babel({
                exclude: /node_modules/,
                runtimeHelpers: true,
                plugins: [["@babel/transform-runtime", { useESModules: true }]]
            }),
            replace({ "process.env.BUILD_FORMAT": JSON.stringify("esm") }),
            sizeSnapshot()
        ],
    }
];

// 将npm package name 转换成模块名
const globals = {
    'jsonrpc-lite': 'jsonrpc'
}
const umd = [
    {
        input: "modules/index.js",
        output: {
            file: `umd/${pkg.moduleName}.js`,
            format: "umd",
            name: ModuleName,
            globals,
            ...outpubOptions,
        },
        external: Object.keys(globals),  // external 声明是外部饮用，不会打包到模块中
        plugins: [
            babel({
                exclude: /node_modules/,
                runtimeHelpers: true,
                plugins: [["@babel/transform-runtime", { useESModules: true }]]
            }),
            nodeResolve(),
            commonjs({
                include: /node_modules/,
            }),
            replace({
                "process.env.NODE_ENV": JSON.stringify("development"),
                "process.env.BUILD_FORMAT": JSON.stringify("umd")
            }),
            sizeSnapshot()
        ],
    },
    {
        input: "modules/index.js",
        output: {
            file: `umd/${pkg.moduleName}.min.js`,
            format: "umd",
            name: ModuleName,
            globals,
            ...outpubOptions,
        },
        external: Object.keys(globals), // external 声明是外部饮用，不会打包到模块中
        plugins: [
            babel({
                exclude: /node_modules/,
                runtimeHelpers: true,
                plugins: [["@babel/transform-runtime", { useESModules: true }]]
            }),
            nodeResolve(),
            commonjs({
                include: /node_modules/
            }),
            replace({
                "process.env.NODE_ENV": JSON.stringify("production"),
                "process.env.BUILD_FORMAT": JSON.stringify("umd")
            }),
            sizeSnapshot(),
            uglify()
        ],
    }
];

let config;
switch (process.env.BUILD_ENV) {
    case "cjs":
        config = cjs;
        break;
    case "esm":
        config = esm;
        break;
    case "umd":
        config = umd;
        break;
    default:
        config = cjs.concat(esm).concat(umd);
}

module.exports = config;
