<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="上级分类" label-width="140px">
          <el-select v-model="form.pid" placeholder="请选择菜单">
            <el-option label="----请选择----" value=""></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
            <!-- 循环请求回来渲染 -->
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" label-width="140px">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 图片 -->
        <el-form-item label="图片" label-width="140px" v-if="form.pid!==0">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-change="changeFile2"
          >
          <img v-if="imgUrl" :src="imgUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
        <el-button
          type="primary"
          @click="add"
          v-if="info.title === '添加分类列表'"
          >添加</el-button
        >
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  reqCateAdd,
  reqCateDetail,
  reqCateUpdate,
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
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
      //图片地址
      imgUrl:"",
    };
  },
  methods: {
    add() {
      let data=new FormData()
      for(let i in this.form){
        data.append(i,this.form[i])
      }
      reqCateAdd(data).then((res) => {
        if (res.data.code === 200) {
          this.cancel();
          alertSuccess(res.data.msg);
          this.empty();
          this.reqList();
        }
      });
    },
      ...mapActions({
      reqList:"sort/reqListAction"
    }), 
    //点击了取消按钮
    cancel() {
      this.info.isShow = false;
    },
    //重置form
     empty() {
      this.form = {
        pid: "",
        catename:"",
        img:null,
        status:1
      }
      this.imgUrl="";
    },
    getOne(id) {
      reqCateDetail(id).then((res) => {
        if(res.data.code===200){
          this.form=res.data.list
          this.form.id=id
          this.imgUrl=this.$imgPre+this.form.img
        }
      });
    },
    update() {
        let data = new FormData()
        for(let item in this.form){
          data.append(item,this.form[item])
        }
      reqCateUpdate(data).then((res) => {
        if (res.data.code === 200) {
          this.cancel();
          this.empty();
          alertSuccess("修改成功");
          this.reqList()
        }
      });
    },
    changeFile2(e){
      console.log(e)
       let file=e.raw;
        //判断文件大小 1M=1024Kb 1KB=1024B
        if(file.size>2*1024*1024){
        alertWarning("文件大小不能超过2M")
        return;
      }

      //判断文件格式
      let imgArr=[".jpg",".jpeg",".png",".gif"];
      let name=file.name;//'0.0.0.1.jpg'
      let extname=name.slice(name.lastIndexOf("."))
      if(!imgArr.includes(extname)){
        alertSuccess("请上传正确的图片格式");
        return
      }
      //将文件file转为一个地址
       this.imgUrl=URL.createObjectURL(file)
       console.log(this.imgUrl);
       //给form的img赋值文件
       this.form.img=file;
    }
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