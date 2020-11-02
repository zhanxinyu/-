<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="规格名称" label-width="140px">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="规格属性"
          label-width="140px"
          v-for="(item, index) in atterArr"
          :key="item.index"
        >
          <div class="box">
            <div class="box1">
              <el-input v-model="item.val" autocomplete="off"></el-input>
            </div>
            <el-button type="primary" @click="addArr" v-if="index == 0"
              >新增规格属性</el-button
            >
            <el-button type="danger" v-else @click="delArr(index)"
              >删除</el-button
            >
          </div>
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
} from "../../../util/request";
import { alertSuccess, alertWarning } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "specs/list",
    }),
  },
  components: {},
  data() {
    return {
      form: {
        specsname: "",
        attrs: "[]",
        status: 1,
      },
      atterArr: [{ val: "" }],
    };
  },
  methods: {
    checked() {
      return new Promise((resolve, reject) => {
        //验证数据是否均不为空
        if (this.form.specsname === "") {
          alertSuccess("商品名称不能为空");
          return;
        }
        console.log(this.form.attrs)
        if (this.form.attrs === '[""]') {
          alertSuccess("商品属性不能为空");
          return;
        }
        resolve();
      });
    },
    addArr() {
      this.atterArr.push({ val: "" });
    },
    delArr(index) {
      this.atterArr.splice(index, 1);
    },
    add() {
      this.form.attrs = JSON.stringify(this.atterArr.map((item) => item.val));
      //  console.log(this.form.attrs)
      this.checked().then(() => {
        reqSpecsAdd(this.form).then((res) => {
          if (res.data.code === 200) {
            this.cancel();
            alertSuccess(res.data.msg);
            this.empty();
            this.reqList();
            this.reqCountAction();
          }
        });
      });
    },
    ...mapActions({
      reqList: "specs/reqListAction",
      reqCountAction: "specs/reqCountAction",
    }),
    //点击了取消按钮
    cancel() {
      this.info.isShow = false;
    },
    //重置form
    empty() {
      this.form = {
        specsname: "",
        attrs: "[]",
        status: 1,
      };
      this.atterArr = [{ val: "" }];
    },
    getOne(id) {
      reqSpecsDetail(id).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.list[0];
          this.atterArr = JSON.parse(this.form.attrs).map((item) => ({
            val: item,
          }));
        }
      });
    },
    update() {
      this.form.attrs = JSON.stringify(this.atterArr.map((item) => item.val));
      this.checked().then(() => {
        reqSpecsUpdate(this.form).then((res) => {
          if (res.data.code === 200) {
            this.cancel();
            this.empty();
            alertSuccess("修改成功");
            this.reqList();
          }
        });
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.box {
  display: flex;
}
.box1 {
  flex: 1;
}
</style>