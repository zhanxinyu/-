<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list :list="list" @edit="willUpdate($event)" @init="getInit"></v-list>
    <v-add ref="add" :info="info" @init="getInit"></v-add>

    <el-pagination
      layout="prev, pager, next"
      :page-size="size"
      @current-change="changePage"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";

import { reqManageList, reqManageCount } from "../../util/request";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        isShow: false,
        title: "添加管理员",
      },
      //列表数据
      list: [],
      //   总数
      total: 0,
      //   一页的数量
      size: 2,
      //   页码
      page: 1,
    };
  },
  methods: {
    willAdd() {
      this.info.isShow = true;
      this.info.title = "添加管理员";
    },
    willUpdate(uid) {
      this.info.isShow = true;
      this.info.title = "编辑管理员";
      //根据id，add发起获取一条数据的请求
      //父组件要调用子组件的方法或者属性
      this.$refs.add.getOne(uid);
    },
    getInit() {
      reqManageCount().then((res) => {
        if (res.data.code === 200) {
          this.total = res.data.list[0].total;
        }
      });
      this.getList();
    },
    getList() {
      reqManageList({ size: this.size, page: this.page }).then((res) => {
        if (res.data.code == 200) {
          //如果取到了的数据是null,那么应该赋值一个空数组
          let list = res.data.list ? res.data.list : []

          //如果list是空数组，这个时候应该看一下，当前页是不是第一页。
          //如果是在第一页，就赋值
          //如果不是第一页，假设是第4页，这时候，应该访问第3页的2条数据

          if (list.length === 0 && this.page > 1) {
            this.page--;
            this.getList();
            return;
          }
          this.list = list;
        }
      });
    },
    //   页码变了
    changePage(page) {
      this.page = page;
      //重新获取list
      this.getList();
    },
  },
  mounted() {
    this.getInit();
  },
};
</script>
<style scoped>
</style>