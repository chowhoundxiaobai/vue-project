export default {
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
}