 import axios from 'axios'
 
/* 
    关于Promise
    当你使用方法返回值是一个promise时，你调用他的时候就可以直接在后面.then

*/


 //导出多个这样写

 //写法四
 export function request(config) {
        // 1、创建axios的实例
        const instance = axios.create({
            baseURL: 'http://123.207.32.32:8000',
            timeout: 5000
        })

        // 2、axios 的拦截器
        //请求拦截
        instance.interceptors.request.use(config =>{
            //请求成功来到这里
            // console.log(config);
            // 2.1请求拦截的作用
            // 1、比如config中的一些信息不符合服务器的要求（请求头等）

            //2、比如每次发送网络请求时，都希望在界面中显示一个请求的图标（请求中的等待动图）
            
            //3、某些网络请求（比如登录（token）），必须携带一些特殊的信息 

            return config; //上拦截后，如果没有return ,调用请求时没有结果的
        }, err => {
            //请求失败来到这里
            console.log(err);
        });

        //2.2响应拦截
        instance.interceptors.response.use(res => {
            // console.log(res);

            /* 
                上拦截后，如果没有return ,调用请求时打印的结果是undefinded,需要返回，
                而且我们只需要data，可在这过滤，只返回data
            */
            return res.data; 
        }, err =>{
            console.log(err)
        });

        //3、发生真正的网络请求
        return instance(config) //它返回的就是一个promise
 }



//写法三
//  export function request(config) {
//     return new Promise((resolve, reject) => {
//         // 1、创建axios的实例
//         const instance = axios.create({
//             baseURL: 'http://123.207.32.32:8000',
//             timeout: 5000
//         })

//         //发生真正的网络请求
//         instance(config).then(res => {
//             //回调函数
//             resolve(res)
//         }).catch(err => {
//             //回调函数
//            reject(err)
//         })
//     })
//  }



//写法二
//  export function request(config) {
//     //1、创建axios的实例
//     const instance = axios.create({
//         baseURL: 'http://123.207.32.32:8000',
//         timeout: 5000
//     })

//     //发生真正的网络请求
//     instance(config.baseConfig).then(res => {
//         //回调函数
//         config.success(res);
//     }).catch(err => {
//         //回调函数
//         config.failure(err);
//     })
//  }


 //写法一
//  export function request(config, successs, failure) {
//     //1、创建axios的实例
//     const instance = axios.create({
//         baseURL: 'http://123.207.32.32:8000',
//         timeout: 5000
//     })

//     //发生真正的网络请求
//     instance(config).then(res => {
//         //回调函数
//         successs(res);
//     }).catch(err => {
//         //回调函数
//         failure(err);
//     })
//  }


//  导出一个 这样写  且不能与导出多个一起共存
// export default ...