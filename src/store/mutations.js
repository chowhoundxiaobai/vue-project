import * as mutation from './mutation-types'
import {UPDATEINFO} from './mutation-types'
export default {
    //Vuex的store状态的更新唯一方式：提交Mutation
    //方法 应该在这里定义方法来修改上面state 定义的状态、变量 

    // * 一般在大项目中会将Mutation中的方法定义成常量，通过引用的方式方便管理且不易出错
    [mutation.INCREMENT](state) {
        state.counter++
    },
    decrement(state) {
        state.counter--
    },
    incrementCount(state, payload) {
    //   state.counter += payload //1、普通提交风格

        //2、特殊提交风格
        // console.log(payload) //此时它是包含了type 和 num 的对象 ，不再是传过来的num
        state.counter += payload["num"];
    },
    addStudent(state, stu) {
      state.student.push(stu)
    },
    [UPDATEINFO](state) {
        Vue.set(state.info[0], "addr", "北京") //这是同步操作

        //以下是异步操作 ，当执行异步操作时，页面已经响应式式的发生了一些改变，但你在调试工具里观察你修改的数据，他还是原来的数据
        //所以vue 官方文档建议我们不要在 mutations 里进行异步操作 原因： devtool不能很好的跟踪数据发生什么变化

        //以下代码仅作错误示范
        // setTimeout(() => {
        //     //异步操作
        //     state.info[0].name = "kobe"
        // }, 1000)
    },
    acynUpdateInfo(state) {
        Vue.set(state.info[0], "addr", "上海")
    }
}