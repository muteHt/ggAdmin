<!-- 安装pinia数据仓库 -->

pnpm add pinia

<!-- 使用pinia仓库 -->
<!-- 在src文件夹下创建store文件并在该文件下创建index.ts
和modules文件夹
在index.ts中导入 pinia -->

import { createPinia } from "pinia"
let pinia = createPinia();
export default pinia;

<!-- 在main.ts中导入pinia -->

app.use(pinia)
