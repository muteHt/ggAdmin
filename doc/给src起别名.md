<!-- 第一步在vite中导入 -->

import path from 'path'
然后配置参数
export default ({ command }: ConfigEnv): UserConfigExport => {
return {
//配置src别名
resolve: {
alias: {
"@": path.resolve("./src")
}
},
plugins: [
vue(),
// 配置自动导入elmentPlus的插件
AutoImport({
resolvers: [ElementPlusResolver()],
}),
Components({
resolvers: [ElementPlusResolver()],
}),
//配置mock插件
viteMockServe({
// default
mockPath: 'mock',
localEnabled: command === 'serve',
}),
],
}
}

第二步在tyconfig文件中配置
"baseUrl": "./",
"paths":{
"@/_":["src/_"]
},

{
"compilerOptions": {
"baseUrl": "./",
"paths":{
"@/_":["src/_"]
},
"composite": true,
"skipLibCheck": true,
"module": "ESNext",
"moduleResolution": "bundler",
"allowSyntheticDefaultImports": true,
"strict": true,

},
"include": ["vite.config.ts"]
}
