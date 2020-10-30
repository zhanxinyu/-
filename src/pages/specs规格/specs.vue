<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list @edit="willUpdate($event)"></v-list>
    <v-add :info="info" ref="add"></v-add>

    <el-pagination
      layout="prev, pager, next"
      :page-size="size"
      @current-change="currentPage"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { mapGetters, mapActions } from "vuex";
export default {
   computed: {
    ...mapGetters({
      list: "specs/list",
      size: "specs/size",
      total: "specs/total",
    }),
  },
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        isShow: false,
        title: "添加分类列表",
      },
    };
  },
  methods: {
    willAdd() {
      this.info = {
        isShow: true,
        title: "添加分类列表",
      };
      this.$refs.add.empty();
    },
    willUpdate(id) {
      this.info = {
        isShow: true,
        title: "修改分类列表",
      };
      this.$refs.add.getOne(id);
    },
    ...mapActions({
      reqCountAction:"specs/reqCountAction",
      reqListAction:"specs/reqListAction",
      changePageAction:"specs/changePageAction"
    }),
    currentPage(page){
      console.log(page)
      this.changePageAction(page)
    }
    
  },
  mounted() {
    this.reqListAction()
    this.reqCountAction()
  },
};
</script>
<style scoped>
</style>