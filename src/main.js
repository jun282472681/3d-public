import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

// import "@/styles/element-variables.scss";

// 样式
import '@/styles/index.scss';
// 字体
import '@/styles/font.css';
// 公共css
import '@/styles/common.scss';

import { ThreeDesign } from '@/utils/three/threeApi';

Vue.use(ElementUI);
Vue.config.productionTip = false;
window.ThreeDesign = new ThreeDesign();

const self = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

window.ThreeDesign.setText(self)