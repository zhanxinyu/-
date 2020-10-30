<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-add :info="info" @close="close" ref="add"></v-add>
  </div>
</template>
<script>
import flaterVue from "../../../../../vue/第五天/src/components/parent/flater.vue";
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info: {
        isShow: false,
        title: "菜单添加",
        isAdd: true,
      },
    };
  },
  methods: {
    willAdd() {
      this.info = {
        isShow: true,
        title: "菜单添加",
        isAdd: true,
      };
    },
    close() {
      this.info.isShow = false;
    },
    //父组件收到信息
    edit(id) {
      this.info = {
        isShow: true,
        title: "菜单修改",
      };
      this.$refs.add.look(id);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>