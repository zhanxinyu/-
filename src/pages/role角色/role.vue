<template>
<div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-add :info="info" ref="add"></v-add>
</div>
</template>
<script>
import vList from "./components/list"
import vAdd from "./components/add"
export default {
components:{
    vList,
    vAdd
 },
data () {
 return {
     info:{
         isShow:false,
         title:"角色添加",
         isAdd: true,
     }
 }
},
methods:{
    willAdd(){
        this.info={
            isShow:true,
            title:"角色添加",
            isAdd: true,
        }
    },
    edit(id) {
      this.info = {
        isShow: true,
        title: "角色修改",
        isAdd: false,
      };
      this.$refs.add.look(id)
    },
},
mounted(){
}
}
</script>
<style scoped>
</style>