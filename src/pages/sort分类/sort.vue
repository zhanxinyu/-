<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list @edit="willUpdate($event)"></v-list>
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";
export default {
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
      this.$refs.add.empty()
    },
    willUpdate(id){
      this.info = {
        isShow: true,
        title: "修改分类列表",
      };
      this.$refs.add.getOne(id)
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>