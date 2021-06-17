import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'

// Vue.config.productionTip = false

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   store,
//   render: h => h(App)
// })

let instance = null
function render(props) {
  instance = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  }); //这里是挂载到自己的html中 基座会拿到这个挂载后的HTML 将其插入进去
}


if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
//子应用独立运行
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}
//导出子应用的三个步骤 子应用的协议就好了
export async function bootstrap(props) {};

export async function mount(props) {
  console.log(props, "父传子");
  render(props)
};
export async function unmount(props) {
  instance.$destroy();
}
  



