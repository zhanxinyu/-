<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="手机号" label-width="140px">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="名称" label-width="140px">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="密码" label-width="140px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
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
        <el-button @click="cancel">取 消</el-button>
       <el-button type="primary" @click="update">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  reqCateAdd,
  reqHyDetail,
  reqHyUpdate,
} from "../../../util/request";
import { alertSuccess, alertWarning } from "../../../util/alert";
import {mapGetters,mapActions} from "vuex"
export default {
  props: ["info"],
  computed:{
    ...mapGetters({
      list:"sort/list"
    })
  },
  components: {},
  data() {
    return {
      form: {
        uid: "",
        nickname:"",
        phone:"",
        password:"",
        status:1
      },
    };
  },
  methods: {
     checked() {
      return new Promise((resolve, reject) => {
        //验证数据是否均不为空
        if (this.form.phone === "") {
          alertSuccess("手机号不能为空");
          return;
        }
         if (this.form.nickname === "") {
          alertSuccess("名称不能为空");
          return;
        }
         if (this.form.password === "") {
          alertSuccess("密码不能为空");
          return;
        }
        resolve();
      });
    },
      ...mapActions({
      reqList:"sort/reqListAction",
      reqHyList:"hy/reqHyList"
    }), 
    //点击了取消按钮
    cancel() {
      this.info.isShow = false;
    },
    //重置form
     empty() {
      this.form = {
        uid: "",
        nickname:"",
        phone:"",
        password:"",
        status:1
      }
    },
    getOne(e) {
      reqHyDetail(e.uid).then((res) => {
        if(res.data.code===200){
          this.form=res.data.list
          this.form.password = ""
          this.form.nickname = e.randstr
        }
      });
    },
    update() {
      let data = {
        uid:this.form.uid,
        nickname:this.form.nickname,
        phone:this.form.phone,
        password:this.form.password,
        status:this.form.status
      }
      this.checked().then(()=>{
            reqHyUpdate(data).then((res) => {
        if (res.data.code === 200) {
          this.cancel();
          this.empty();
          alertSuccess("修改成功");
          this.reqHyList()
        }
      });
      })
    },
  },
  mounted() {
  },
};
</script>
<style scoped lang="stylus">
.el-input {
  width: 80%;
}

  .add >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>