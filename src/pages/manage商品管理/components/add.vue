<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">

        <el-form-item label="一级分类" label-width="140px">
          <el-select v-model="form.first_cateid" placeholder="请选择菜单" @change="changeFirst">
            <el-option label="----请选择----" value=""></el-option>
            <el-option v-for="item in sortList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
            <!-- 循环请求回来渲染 -->
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" label-width="140px">
          <el-select v-model="form.second_cateid" placeholder="请选择菜单">
            <el-option label="----请选择----" value=""></el-option>
            <el-option v-for="item in secondCateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
            <!-- 循环请求回来渲染 -->
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" label-width="140px">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="价格" label-width="140px">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="市场价格" label-width="140px">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>

         <el-form-item label="图片" label-width="140px" v-if="form.pid!==0">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          >
          <img v-if="imgUrl" :src="imgUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-form-item>

        <el-form-item label="商品规格" label-width="140px">
          <el-select v-model="form.specsid" placeholder="请选择菜单" @change="changeSpecs">
            <el-option label="----请选择----" value=""></el-option>
            <el-option v-for="item in specsList" :key="item.id"  :label="item.specsname" :value="item.id"></el-option>
            <!-- 循环请求回来渲染 -->
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" label-width="140px">
          <el-select v-model="form.specsattr" placeholder="请选择菜单" multiple>
            <el-option label="----请选择----" value=""></el-option>
            <el-option v-for="item in atterList" :key="item" :label="item" :value="item"></el-option>
            <!-- 循环请求回来渲染 -->
          </el-select>
        </el-form-item>

<el-form-item label="是否新品" label-width="140px">
          <el-radio v-model="form.isnew" :label="1">是</el-radio ><el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="140px" >
<el-radio v-model="form.ishot" :label="1">是</el-radio ><el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="商品描述" label-width="140px">
        <textarea style="width:300px;height:100px;"></textarea>
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
  reqSpecsAdd,
  reqSpecsDetail,
  reqSpecsUpdate,
  reqCateList
} from "../../../util/request";
import { alertSuccess, alertWarning } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      specsList: "specs/list",
      sortList: "sort/list",
    }),
  },
  components: {},
  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid:"",
        goodsname: "",
        price:"",
        market_price:"",
        img:null,
        description:"",
        specsid:"",
        specsattr:[],
        isnew:1,
        ishot:1,
        status:1
      },
      //二级分类的list
      secondCateList:[],
      //规格属性的list
      atterList:[],
      //图片的临时地址
      imgUrl:""
   
    };
  },
  methods: {
    //根据一级分类获取二级分类
    changeFirst(){
      //二级分类id置空
      this.form.second_cateid=''
      //根据一级分类获取二级分类
      reqCateList({pid:this.form.first_cateid}).then(res=>{
        this.secondCateList = res.data.list
      })
    },
    //根据商品规格规格获取耳机规格
    changeSpecs(){
      //清空规格属性
      this.form.specsattr=[]
      //根据选中的商品规格，计算一下展示属性列表
      let arr = this.specsList.find(item=>item.id===this.form.specsid)
      this.atterList = arr.attrs
    },

    addArr(){
      this.atterArr.push({val:""})
    },
    delArr(index){
      this.atterArr.splice(index,1)
    },
    add() {
      let obj = {
        ...this.form
      };
      obj.specsattr = JSON.stringify(obj.specsattr);
      let data = new FormData();
      for(let i in obj){
        data.append(i,obj[i])
      }

      // this.form.attrs=JSON.stringify(this.atterArr.map(item=>item.val))
      // reqSpecsAdd(this.form).then(res=>{
      //   if (res.data.code === 200) {
      //     this.cancel();
      //     alertSuccess(res.data.msg);
      //     this.empty();
      //     this.reqList();
      //     this.reqCountAction()
      //   }
      // })
    },
    ...mapActions({
      getSortList:"sort/reqListAction",
      getSpecsList: "specs/reqListAction",
      // reqCountAction:"specs/reqCountAction"
    }),
    //点击了取消按钮
    cancel() {
      this.info.isShow = false;
    },
    //重置form
    empty() {
      this.form ={
        first_cateid: "",
        second_cateid:"",
        goodsname: "",
        price:"",
        market_price:"",
        img:null,
        description:"",
        specsid:"",
        specsattr:[],
        isnew:1,
        ishot:1,
        status:1
      },
      this.atterArr=[{val:""}]
    },
    getOne(id) {
      reqSpecsDetail(id).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.list[0];
          this.atterArr = JSON.parse(this.form.attrs).map(item=>({val:item}))
        }
      });
    },
    update() {
      console.log(this.form)
      this.form.attrs = JSON.stringify(this.atterArr.map(item=>(item.val)))
      reqSpecsUpdate(this.form).then((res) => {
        if (res.data.code === 200) {
          this.cancel();
          this.empty();
          alertSuccess("修改成功");
          this.reqList();
        }
      });
    },
  },
  mounted() {
    this.getSortList();
    this.getSpecsList(true)
  },
};
</script>
<style scoped lang="stylus">
.box {
  display: flex;
}
.box1{
  flex:1;
}

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