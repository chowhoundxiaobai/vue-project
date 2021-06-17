<template>
    <div>
        axios网络请求
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    }
}
//1、 安装axios -->  npm install axios --save 
//2、 引用 import
//应用
/* 
    axios(config)
    axios.request(config)
    axios.get(url[,config])
    axios.delete(url[,config])
    axios.head(url[,config])
    axios.post(url[,data[,config]])
    axios.put(url[,data[,config]])
    axios.patch(url[,data[,config]])
*/
import axios from 'axios'
// httpbin.org/ (一可以测试请求的网站)   
//http://123.207.32.32:8000/home/multidata（老师的接口地址）
//http://123.207.32.32:8000/home/data?type=pop&page=1（老师的接口地址） type: pop / sell
//http://123.207.32.32:8000/home/multidata?callback=json123  //JSONP的方式发送请求 如果跨域，可使用JSONP的方式


//1、axios(config) 默认情况下是get 请求  若想变换请求
axios ({
  url: 'http://123.207.32.32:8000/home/multidata',
  method: "get" //变换请求
  // method: "post" //变换请求
}).then(res => {
//   console.log(res, "11111"); //这样子请求的数据打印出来，除了有服务端返回的数据（在data里），还会有axios框架自己附加的一些数据
})
//路由上面带参数
axios({
  // url: "http://123.207.32.32:8000/home/data?type=pop&page=1"
  url: "http://123.207.32.32:8000/home/data",
  params: {//专门针对get 请求的参数拼接
    type: 'pop',
    page: 1,
  }
}).then(res => {
//   console.log(res, "22222")
})

//1、也可以这样写
// axios.get({
//   url: ''
// }) 

//2、axios发送 并发 请求
axios.all([axios({
    url: 'http://123.207.32.32:8000/home/multidata',
}), axios({
    url: "http://123.207.32.32:8000/home/data",
    params: {//专门针对get 请求的参数拼接
        type: 'pop',
        page: 1,
    }
})])
// .then(results => {
//     console.log(results, "results");
// })
.then(axios.spread((res1, res2) => {
    // console.log(res1, "results1");
    // console.log(res2, "results2");
}))


//3、使用全局的axios和对应的配置在进行网络请求
axios.defaults.baseURL = 'http://123.207.32.32:8000'
axios.defaults.timeout = 5000

// axios({
//     baseURL: "http://123.207.32.32:8000",
//     timeout: 5,//超时时间
//     url: "/home/data"
// })
axios({
    url: "/home/data"
}).then(res => {
    // console.log(res, "全局配置")
})


/*
    post 请求，是要把请求参数放在请求体里的 即 request body 里
    data: {key: ""}

    get 请求 在params里，接在url后 
    params: {id: 12}
*/


//4、创建对应的axios实例 每个服务器都有对应的配置
const instance1 = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
})

instance1({
    url: '/home/multidata'
}).then(res => {
    // console.log(res);
})

instance1({
    url: '/home/data',
    params: {
        type: 'pop',
        page: 1
    }
}).then(res => {
    // console.log(res);
})

//5、封装request模块
import {request} from '../network/request'

//写法四
request({
    url: '/home/multidata'
}).then(res => {
    console.log(res);
}).catch(err => {
    // console.log(err)
})


//写法三
// request({
//     url: '/home/multidata'
// }).then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err)
// })


//写法二
// request({
//     baseConfig: {
//         url: '/home/multidata'
//     },
//     success: function(res) {
//         console.log(res);
//     },
//     failure: function(err){
//         console.log(err);
//     }
// })


//写法一
// request({
//     url: '/home/multidata'
// }, res => {
//     console.log(res);
// }, err => {
//     console.log(err)
// })




</script>