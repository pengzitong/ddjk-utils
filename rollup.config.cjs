const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const typescript = require('rollup-plugin-typescript')
const clear = require('rollup-plugin-clear');
const dts = require('rollup-plugin-dts').default;

const path = require('path');
const fs = require('fs');
const { join } = path;
const resolvePath = (dir) => path.join(__dirname, dir);
const outputDir = 'dist';

function getComponentEntries(path) {
    let files = fs.readdirSync(resolvePath(path));
    files = files.filter((name) => name !== '.DS_Store');
    const componentEntries = files.reduce((ret, item) => {
        const itemPath = join(path, item);
        return [...ret, itemPath];
    }, []);
    console.log(componentEntries)
    return componentEntries;
}

const entries = getComponentEntries('src/modules')

const esBuild = [...entries, 'src/index.ts'].map(inputPath => ({
    input: inputPath, // 打包入口
    output: [
        // { // 打包出口
        //     file: 'dist/index.js', // 最终打包出来的文件路径和文件名，这里是在package.json的browser: 'dist/index.js'字段中配置的
        //     format: 'umd', // umd是兼容amd/cjs/iife的通用打包格式，适合浏览器
        // },
        { file: `${outputDir}/${path.basename(inputPath, '.ts')}.js`, format: 'es', sourcemap: true },
    ],
    plugins: [ // 打包插件
        resolve(), // 查找和打包node_modules中的第三方模块
        commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
        typescript(), // 解析TypeScript
        clear({
            targets: [outputDir]
        })
    ],
    external: ['js-md5']
}))


const dtsBuild = [...entries, 'src/index.ts'].map(inputPath => ({
    input: inputPath, // 打包入口
    output: [
        { file: `${outputDir}/types/${path.basename(inputPath, '.ts')}.d.ts`, format: 'es' },
    ],
    plugins: [ // 打包插件
        dts()
    ]
}))


module.exports = [...esBuild, ...dtsBuild]
