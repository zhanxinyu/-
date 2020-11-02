<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="上级菜单" label-width="140px">
          <el-select v-model="form.roleid" placeholder="请选择菜单">
            <el-option label="----请选择----" value=""></el-option>
            <el-option v-for="item in roleList" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
            <!-- 循环请求回来渲染 -->
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" label-width="140px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="140px">
          <el-input
            v-model="form.password"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="140px">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button
          type="primary"
          @click="add"
          v-if="info.title === '添加管理员'"
          >添加</el-button
        >
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  reqManageAdd,
  reqRole,
  reqManageDetail,
  reqManageUpdate
} from "../../../util/request";
import { alertSuccess, alertWarning } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      roleList:[]
    };
  },
  methods: {
    checked() {
      return new Promise((resolve, reject) => {
        //验证数据是否均不为空
        if (this.form.username === "") {
          alertSuccess("用户名不能为空");
          return;
        }
         if (this.form.password === "") {
          alertSuccess("密码不能为空");
          return;
        }
        resolve();
      });
    },
     add(){
      this.checked().then(()=>{
         reqManageAdd(this.form).then(res=>{
         if(res.data.code===200){
           this.cancel();
           alertSuccess(res.data.msg);
           this.empty()
           this.$emit("init")
         }
       })
      })
     },
    //点击了取消按钮
    cancel() {
      this.info.isShow = false;
    },
    //重置form
    empty() {
      this.form = {
        roleid:"",
        username:"",
        password:"",
        status: 1
      }
    },
    getOne(uid){
      reqManageDetail(uid).then(res=>{
        this.form=res.data.list;
        this.form.password=''
      })
    },
    update(){
     this.checked().then(()=>{
        reqManageUpdate(this.form).then(res=>{
        if(res.data.code===200){
          this.cancel()
          this.empty()
          alertSuccess("修改成功")
          this.$emit("init")
        }
      })
     })
    }
  },
  mounted() {
     reqRole().then(res=>{
        if(res.data.code===200){
          this.roleList=res.data.list
        }
      })
  },
};
</script>
<style scoped>
.el-input {
  width: 60%;
}
</style>