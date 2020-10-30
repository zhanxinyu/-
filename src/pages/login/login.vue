<template>
<div class="login">
    <div class="box">
        <h2>登录</h2>
        <input type="text" class="inp1" placeholder="请输入用户名">
        <input type="text" class="inp2" placeholder="请输入密码">
        <input type="button" value="登录" class="inp3" @click="Sign">
    </div>
</div>
</template>
<script>
export default {
components:{
 },
data () {
 return {
 }
},
methods:{
    Sign(){
        this.$router.push('/index');
    }
},
mounted(){
}
}
</script>
<style scoped>
.login{
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to right,#563443,#303d60);
}
.login .box{
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
.login .box input{
    width: 318px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #dcdfe6;
}
.inp1{
    margin-top: 6px;
}
.inp2{
    margin-top: 22px;
    margin-bottom: 22px;
}
.inp3{
    background: #409eff;
    color: #ffffff;
    border: none;
}
input::placeholder{
    color: #c0c4cc;
}
.inp1:focus{
    border-style:solid;
    border-color: #03a9f4;
	box-shadow: 0 0 15px #03a9f4;
}
.inp2:focus{
    border-style:solid;
    border-color: yellow;
	box-shadow: 0 0 15px yellow;
}
</style>