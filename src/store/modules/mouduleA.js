export default {
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