export default {
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
}