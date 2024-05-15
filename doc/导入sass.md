<!-- 安装 -->

pnpm install sass
在src文件夹下创建styles文件管理样式
创建reset.scss 去找reset.scss文件
并创建index.scss引入reset.scss
创建variable.scss 放置全局样式参数
去vite里边配置如下参数
css: {
/_ CSS 预处理器 _/
preprocessorOptions: {
scss: {
additionalData: '@import url("src/assets/styles/variable.scss");',
}
}
},
