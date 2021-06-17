import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import moudleA from './modules/mouduleA'

Vue.use(Vuex)

const state = { //状态、变量 这里的状态应在下面mutations 里定义方法修改，不要在其他页面修改这里定义的变量

        storeMsg:"store的数据",
        counter: 0,
        student: [
            {id: 110, name: "hong", age: 15},
            {id: 111, name: "ming", age: 16},
            {id: 112, name: "liue", age: 19},
            {id: 113, name: "fang", age: 10},
            {id: 114, name: "tian", age: 22},
        ],
        info: [
            {age: 18, name: "wyh"},
            {age: 19, name: "curry"},
        ]
    }
const store =  new Vuex.Store({
    //  在state 的属性都会被加入到响应式系统中，当响应式系统会监听属性的变化，
    // 当属性发生变化时，会通知所有界面中用到该属性的地方，让界面发生刷新
    // 状态在定义是没有定义某一对象属性，而是在后期再在对象中加入属性，是不会有响应式的变化的
    //添加、修改 可以用vue中的set() 方法 Vue.set(state.student, "sex", "女") 对象写法 | Vue.set(state.student, 0, "女") 数组写法
    //删除 Vue.delete(state.student, "age")
    state,
    mutations,
    actions,
    getters,

    modules: {
        //分模块
        a: moudleA,
    }

})

export default store