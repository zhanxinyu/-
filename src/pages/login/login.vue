<template>
  <div class="login">
    <div class="box">
      <h2>登录</h2>
      <input
        type="text"
        class="inp1"
        placeholder="请输入用户名"
        v-model="form.username"
      />
      <input
        type="text"
        class="inp2"
        placeholder="请输入密码"
        v-model="form.password"
      />
      <input type="button" value="登录" class="inp3" @click="login" />
    </div>
  </div>
</template>
<script>
import { reqLogin } from "../../util/request";
import { mapActions } from "vuex";
import { alertSuccess, alertWarning } from "../../util/alert";
export default {
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["changeUserInfoAction"]),
    login() {
      reqLogin(this.form).then((res) => {
        if (res.data.code == 200) {
          //1.存用户信息 res.data.list
          //本地存储存进去的内容都会变成string,所以在存之前需要JSON.stringify() ,取出来JSON.parse()
          //本地存储 优点：刷新以后数据还在 缺点：取值不好用
          //vuex   优点：取值好取 缺点：刷新，数据就没了

          this.changeUserInfoAction(res.data.list);
          // 2.跳转页面
          this.$router.push("/index");
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #563443, #303d60);
}
.login .box {
  width: 500px;
  height: 300px;
  background: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -150px;
  margin-left: -250px;
  border-radius: 15px;
  text-align: center;
  padding-top: 35px;
  box-sizing: border-box;
}
.login .box input {
  width: 318px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
}
.inp1 {
  margin-top: 6px;
}
.inp2 {
  margin-top: 22px;
  margin-bottom: 22px;
}
.inp3 {
  background: #409eff;
  color: #ffffff;
  border: none;
}
input::placeholder {
  color: #c0c4cc;
}
.inp1:focus {
  border-style: solid;
  border-color: #03a9f4;
  box-shadow: 0 0 15px #03a9f4;
}
.inp2:focus {
  border-style: solid;
  border-color: yellow;
  box-shadow: 0 0 15px yellow;
}
</style>