<template>
  <div>
    <h2>Store状态管理页面</h2>
    <h3>{{ count }}</h3>
    <h3>{{ $store.getters.powerCounter }}</h3>
    <button @click="addition">+</button>
    <button @click="subtraction" style="margin-left: 10px">-</button>
    <button @click="addCount(5)" style="margin-left: 10px">+5</button>
    <button @click="addCount(10)" style="margin-left: 10px">+10</button>
    <button @click="addStudent()" style="margin-left: 10px">加一个学生</button>
    <p>修改学生信息</p>
    <p>{{ $store.state.info }}</p>
    <button @click="upDateInfo()" style="margin-left: 10px">
      同步修改学生信息
    </button>
    <button @click="acynUpdateInfo()" style="margin-left: 10px">
      异步修改学生信息
    </button>
    <!-- 用计算属性是一个不错的选择，但不是最优，若其他页面也有此需求，便要复制一次，且改了筛选条件也需要每个页面都修改一次 -->
    <p>获取大于15岁的学生（计算属性的方法）</p>
    <p v-for="stu in more20Stu" :key="stu.id">{{ stu.name }}</p>

    <p>获取大于15岁的学生（store的getter方法）</p>
    <p>{{ $store.getters.ageMore20Length }}位</p>
    <p v-for="(stu, index) in $store.getters.ageMore20" :key="index">
      {{ stu.name }}
    </p>

    <!-- 年龄大于 age 的学生 -->
    <p>获取大于age岁的学生（store的getter方法）</p>
    <p
      v-for="(stu, indexA) in $store.getters.ageMoreAge(18)"
      :key="indexA + 1000"
    >
      {{ stu.name }}
    </p>

    <h2>mouduleA 里的内容</h2>
    <p>{{$store.state.a.name}}</p>
    <p>{{$store.getters.fullname}}</p>
    <button @click="updateName">修改名字</button>
    <button @click="asynUpdateName">异步修改名字</button>
  </div>
</template>
<script>
import { INCREMENT, UPDATEINFO } from "../store/mutation-types";
export default {
  data() {
    return {
      // count: 0
    };
  },
  computed: {
    count() {
      return this.$store.state.counter;
    },
    more20Stu() {
      // return this.$store.state.student.filter(stu => {
      //     return stu.age > 15;
      // })
      return this.$store.state.student.filter((stu) => stu.age > 15); //更优写法
    },
  },
  methods: {
    addition() {
      this.$store.commit(INCREMENT); //调用store中的方法
    },
    subtraction() {
      this.$store.commit("decrement"); //调用store中的方法
    },
    addCount(num) {
      //1、普通提交风格
      // this.$store.commit("incrementCount", num);//调用store中的方法 并传入参数（payload）载荷

      //2、特殊提交风格 传过去的是包含了type 和 num 的对象（payload）载荷
      this.$store.commit({
        type: "incrementCount",
        num,
      });
    },
    addStudent() {
      const num =
        Number(
          this.$store.state.student[this.$store.state.student.length - 1].id
        ) + 1;
      const stu = { id: num, name: "wang", age: 19 };
      this.$store.commit("addStudent", stu); //若调用store中的方法 并传入多个参数， 把参数放在一个对象中传入
    },
    upDateInfo() {
      this.$store.commit(UPDATEINFO);
    },
    acynUpdateInfo() {
      // this.$store.dispatch("aUpdateInfo", "传参")

      //方法一
      // this.$store.dispatch("aUpdateInfo", () => {
      //     console.log("已修改成功")
      // })

      //方法二
      // this.$store.dispatch("aUpdateInfo", {
      //    message: '我是参数',
      //    success: () => {
      //        console.log("已修改成功")
      //    }
      // })

      //方法三
      this.$store
      .dispatch("aUpdateInfo", "参数") //前两行相当于调用了一个 aUpdateInfo ,此方法返回了一个Promise函数
      .then((res) => {
        console.log(res);
      });
    },

    updateName() {
        this.$store.commit('updateName', "张三")
    },
    asynUpdateName() {
        this.$store.dispatch('aUpdateName', "王五")
    }
  },
};
</script>