import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  base: "/qiankunVue",
  mode: 'history',//history 模式   默认是hash 模式，有#
  routes: [
    {
      path: '/',
      redirect: "store"
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/store',
      name: 'Store',
      component: () => import('../views/Store.vue')//路由懒加载
    },
    {
      path: '/other',
      name: 'other',
      component: () => import('../views/other.vue')//路由懒加载
    },
    {
      path: '/axios',
      name: 'axios',
      component: () => import('../views/axios.vue')//路由懒加载
    }
  ]
})
