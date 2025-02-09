// 引入路由构建函数
import { createRouter, createWebHashHistory } from "vue-router";
import { constantRoutes } from "./routers"

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes: constantRoutes,// `routes: routes` 的缩写
  //滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
});

// 导出
export default router;


