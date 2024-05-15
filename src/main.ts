import { createApp } from "vue";
import App from "./App.vue";
import router from './router/index.ts';
import '@/styles/index.scss'
import 'sass'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import pinia from '@/store/index.ts'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "./permission.ts"
import category from './components/Category/index.vue'
//暗黑模式样式
import 'element-plus/theme-chalk/dark/css-vars.css'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.component('category', category);
app.use(ElementPlus);
app.use(router);
app.use(pinia)
app.mount("#app");
