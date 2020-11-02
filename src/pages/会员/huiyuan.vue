<template>
  <div>
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
        title: "添加会员列表",
      },
    };
  },
  methods: {
    willUpdate(e){
      this.info = {
        isShow: true,
        title: "修改会员列表",
      };
      this.$refs.add.getOne(e)
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>