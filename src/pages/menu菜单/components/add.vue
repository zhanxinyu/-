<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单" :label-width="width">
          <el-select v-model="form.pid" placeholder="请选择菜单" @change="changePid">
            <el-option label="----请选择----" value=""></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
            <!-- 循环请求回来渲染 -->
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" :label-width="width">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item
          label="菜单图标"
          :label-width="width"
          v-if="form.type == 1"
        >
          <el-select v-model="form.icon" placeholder="请选择图标">
            <el-option label="----请选择----" value=""></el-option>
            <el-option value="el-icon-camera">
              <i class="el-icon-camera"></i>
            </el-option>
            <el-option value="el-icon-video-camera">
              <i class="el-icon-video-camera"></i>
            </el-option>
            <el-option value="el-icon-bell">
              <i class="el-icon-bell"></i>
            </el-option>
            <el-option value="el-icon-s-marketing">
              <i class="el-icon-s-marketing"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" :label-width="width" v-else>
          <el-select v-model="form.url" placeholder="请选择地址">
            <el-option label="----请选择----" value=""></el-option>
            <el-option
              v-for="item in indexRoyters"
              :key="item.path"
              :value="'/'+item.path"
              :label="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" :label-width="width">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"
            >></el-switch
          >
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添加</el-button>
        <el-button type="primary" @click="updata" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { reqMenuAdd } from "../../../util/request";
import { alertSuccess, alertWarning } from "../../../util/alert";
import { indexRoyters } from "../../../router/index";
import { mapActions, mapGetters } from "vuex";
import { reqMenuListOne} from "../../../util/request";
import {reqMenuUpate } from "../../../util/request";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  data() {
    return {
      indexRoyters: indexRoyters,
      width: "120px",
      form: {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1,
      },
    };
  },
  methods: {
    //关闭弹框
    cancel() {
      this.info.isShow = false;
      this.$emit("close");
    },
    //清空数据
    empty(){
       this.form={
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1
      }
    },
    //添加数据
    add() {
      reqMenuAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          alertSuccess(res.data.msg);
          this.cancel();
          this.reqMenList();
          this.empty()
        } else {
          alertWarning(res.data.msg);
          this.cancel();
        }
      });
    },
    look(id) {
      reqMenuListOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id=id
        console.log(this.form)
      });
    },
    ...mapActions({
      reqMenList: "menu/reqMenList",
    }),
    updata(){
      reqMenuUpate(this.form).then(res=>{
        if(res.data.code===200){
          alertSuccess(res.data.msg)
          this.cancel();
           this.reqMenList();
        }else{
          alertWarning(res.data.msg)
          this.cancel();
        }
      })
    },
     changePid(){
    if(this.form.pid===0){
      this.form.type=1
    }else{
      this.form.type=2
    }
  }
  },
  mounted() {
  },
};
</script>
<style scoped>
</style>