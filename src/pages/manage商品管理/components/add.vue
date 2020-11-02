<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isShow" @opened="opened">
      <el-form :model="form">
        <el-form-item label="一级分类" label-width="140px">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择菜单"
            @change="changeFirst"
          >
            <el-option label="----请选择----" value=""></el-option>
            <el-option
              v-for="item in sortList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
            <!-- 循环请求回来渲染 -->
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" label-width="140px">
          <el-select v-model="form.second_cateid" placeholder="请选择菜单">
            <el-option label="----请选择----" value=""></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
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

        <el-form-item label="图片" label-width="140px" v-if="form.pid !== 0">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeFile2"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品规格" label-width="140px">
          <el-select
            v-model="form.specsid"
            placeholder="请选择菜单"
            @change="changeSpecs"
          >
            <el-option label="----请选择----" value=""></el-option>
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
            <!-- 循环请求回来渲染 -->
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" label-width="140px">
          <el-select v-model="form.specsattr" placeholder="请选择菜单" multiple>
            <el-option label="----请选择----" value=""></el-option>
            <el-option
              v-for="item in atterList"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
            <!-- 循环请求回来渲染 -->
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" label-width="140px">
          <el-radio :label="1" v-model="form.isnew">是</el-radio>
          <el-radio :label="2" v-model="form.isnew">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="140px">
          <el-radio :label="1" v-model="form.ishot">是</el-radio>
          <el-radio :label="2" v-model="form.ishot">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" label-width="140px">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

        <el-form-item label="商品描述" label-width="140px">
          <!-- 富文本编辑器 -->
          <div id="editor"></div>
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
import E from "wangeditor";
import {
  reqSpecsAdd,
  reqManagDetail,
  reqManagUpdate,
  reqCateList,
  reqManagAdd,
} from "../../../util/request";
import { alertSuccess, alertWarning } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      specsList: "specs/list",
      sortList: "sort/list",
      manageList: "manage/list",
    }),
  },
  components: {},
  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      //二级分类的list
      secondCateList: [],
      //规格属性的list
      atterList: [],
      //图片的临时地址
      imgUrl: "",
    };
  },
  methods: {
    checked() {
      return new Promise((resolve, reject) => {
        //验证数据是否均不为空
        if (this.form.first_cateid === "") {
          alertSuccess("一级分类不能为空");
          return;
        }
        if (this.form.second_cateid === "") {
          alertSuccess("二级分类不能为空");
          return;
        }
        if (this.form.goodsname === "") {
          alertSuccess("商品名称不能为空");
          return;
        }
        if (this.form.price === "") {
          alertSuccess("价格不能为空");
          return;
        }
        if (this.form.market_price === "") {
          alertSuccess("市场不能为空");
          return;
        }
        if (!this.form.img) {
          alertSuccess("请选择图片");
          return;
        }
        if (this.form.specsid === "") {
          alertSuccess("规格不能为空");
          return;
        }
        if (this.form.specsattr.length === 0) {
          alertSuccess("请选择商品属性");
          return;
        }

        if (this.form.description === "") {
          alertSuccess("描述不能为空");
          return;
        }
        resolve();
      });
    },
    //根据一级分类获取二级分类
    changeFirst() {
      //二级分类id置空
      this.form.second_cateid = "";
      //根据一级分类获取二级分类
      this.getSecondList();
    },
    getSecondList() {
      reqCateList({ pid: this.form.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
      });
    },
    //根据商品规格规格获取耳机规格
    changeSpecs() {
      //清空规格属性
      this.form.specsattr = [];
      //根据选中的商品规格，计算一下展示属性列表
      this.getAttrsList();
    },
    getAttrsList() {
      let arr = this.specsList.find((item) => item.id === this.form.specsid);
      this.atterList = arr.attrs;
    },
    changeFile2(e) {
      let file = e.raw;
      //判断文件大小 1M=1024Kb 1KB=1024B
      if (file.size > 2 * 1024 * 1024) {
        alertSuccess("文件大小不能超过2M");
        return;
      }
      //判断文件格式
      let imgArr = [".jpg", ".jpeg", ".png", ".gif"];
      let name = file.name; //'0.0.0.1.jpg'
      let extname = name.slice(name.lastIndexOf("."));
      if (!imgArr.includes(extname)) {
        alertSuccess("请上传正确的图片格式");
        return;
      }
      //将文件file转为一个地址
      this.imgUrl = URL.createObjectURL(file);
      //给form的img赋值文件
      this.form.img = file;
    },
    //弹框打开完成，开始创建富文本编辑器
    opened() {
      this.editor = new E("#editor");
      this.editor.create();
      this.editor.txt.html(this.form.description);
    },

    addArr() {
      this.atterArr.push({ val: "" });
    },
    delArr(index) {
      this.atterArr.splice(index, 1);
    },
    add() {
      this.form.description = this.editor.txt.html();
       this.checked().then(()=>{
      let obj = {
        ...this.form,
      };
      obj.specsattr = JSON.stringify(obj.specsattr);
      console.log(obj);
      let data = new FormData();
      for (let i in obj) {
        data.append(i, obj[i]);
      }
      reqManagAdd(data).then((res) => {
        if (res.data.code === 200) {
          this.cancel();
          alertSuccess(res.data.msg);
          this.empty();
          this.reqList();
          this.reqCountAction();
        }
      });
       })
    },
    ...mapActions({
      getSortList: "sort/reqListAction",
      getSpecsList: "specs/reqListAction",
      reqList: "manage/reqListAction",
      reqCountAction: "manage/reqCountAction",
    }),
    //点击了取消按钮
    cancel() {
      this.info.isShow = false;
    },
    //重置form
    empty() {
      (this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      }),
        //二级分类的list
        (this.secondCateList = []);
      //规格属性的list
      this.atterList = [];
      //图片的临时地址
      this.imgUrl = "";
    },
    getOne(id) {
      reqManagDetail(id).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.list;
          //id
          this.form.id = id;
          // 2.根据一级分类的id 获取二级分类展示的列表
          this.getSecondList();
          //图片
          this.imgUrl = this.$imgPre + this.form.img;
          //4. 根据规格，获取属性值的列表
          // this.getAttrsList()
          //规格转成
          this.form.specsattr = JSON.parse(this.form.specsattr);

          //6.将form.description 赋值给富文本编辑器
          if (this.editor) {
            this.editor.txt.html(this.form.description);
          }
        }
      });
    },
    update() {
      this.form.description = this.editor.txt.html();
      this.checked().then(()=>{
      let obj = {
        ...this.form,
      };
      obj.specsattr = JSON.stringify(obj.specsattr);
      let data = new FormData();
      for (let i in obj) {
        data.append(i, obj[i]);
      }

     this.checked().then(()=>{
        reqManagUpdate(data).then((res) => {
        if (res.data.code === 200) {
          this.cancel();
          this.empty();
          alertSuccess("修改成功");
          this.reqList();
        }
      });
     })
      })
    },
    
  },
  mounted() {
    this.getSortList();
    this.getSpecsList(true);
  },
};
</script>
<style scoped lang="stylus">
.box {
  display: flex;
}

.box1 {
  flex: 1;
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