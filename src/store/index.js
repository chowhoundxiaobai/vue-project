import Vue from 'vue'
import Vuex from 'vuex'
import * as mutation from './mutation-types'
import {UPDATEINFO} from './mutation-types'

Vue.use(Vuex)

const moudleA = {
    state: {
        name: "赵四"
    },
    mutations: {
        updateName(state, payload) {
            state.name = payload
        }
    },
    actions: {
        //context 上下文,这里指 moudleA
        aUpdateName(context, payload) {
            setTimeout(() => {
                context.commit('updateName', payload)
            }, 1000)
        }
    },
    getters: {
        // rootState 获取根模块下的state
        fullname(state, getters, rootState) {
            return state.name + rootState.counter
        }
    },
}

const store =  new Vuex.Store({

    //  在state 的属性都会被加入到响应式系统中，当响应式系统会监听属性的变化，
    // 当属性发生变化时，会通知所有界面中用到该属性的地方，让界面发生刷新
    // 状态在定义是没有定义某一对象属性，而是在后期再在对象中加入属性，是不会有响应式的变化的
    //添加、修改 可以用vue中的set() 方法 Vue.set(state.student, "sex", "女") 对象写法 | Vue.set(state.student, 0, "女") 数组写法
    //删除 Vue.delete(state.student, "age")


    state: { //状态、变量 这里的状态应在下面mutations 里定义方法修改，不要在其他页面修改这里定义的变量
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
    },
    mutations: {
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
    },
    actions: {
        //异步时的方法写在这里 context 上下文
        // aUpdateInfo(context, payload) { //context 相当于 store 对象
        //     setTimeout(() => {
        //         // console.log(payload)
        //         context.commit('acynUpdateInfo')
        //         // payload() ; 方法一

        //         //方法二
        //         console.log(payload.message)
        //         payload.success()
        //     }, 1000)
        //     // 当此数据被修改成功后，返回一个信息通知已修改成功

        // }

        //方法三
        aUpdateInfo(context, payload) {
            return new Promise ((resolve, reject) => {
                setTimeout(() => {
                    context.commit('acynUpdateInfo')
                    resolve("成功的回调")
                    console.log(payload)
                })
            })
        }
    },
    getters: {
        powerCounter(state) { //默认传入了state参数
            return state.counter * state.counter
        },
        ageMore20(state) {
            // return state.student.filter(stu => {
            //     return stu.age > 15
            // })
            return state.student.filter(stu => stu.age > 15)//优写法
        },
        ageMore20Length(state, getters) {
            // return state.student.filter(stu => {
            //     return stu.age > 15
            // })
            return getters.ageMore20.length///优写法
        },
        ageMoreAge(state) {
            //getters 默认是不能传递参数的
            //应用getters的函数如果想传参进来，那么在返回结果的时候就返回一个函数，这样调用ageMoreAge时，返回的是一个方法，
            //其实就相当于调用返回的方法，既然是调用方法就可以传参了
            return ( age )=> {
                return age? state.student.filter(stu => stu.age > age): state.student.filter(stu => stu.age > 15)
            }
        }
    },

    modules: {
        //分模块
        a: moudleA,
        b: {
            state: {},
            mutations: {},
            actions: {},
            getters: {},
        },
    }

})

export default store