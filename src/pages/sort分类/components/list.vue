<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="分类编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" sortable width="180">
      </el-table-column>
      <el-table-column label="图片" sortable width="180">
        <template slot-scope="scope">
         <img :src="$imgPre+scope.row.img" alt="" v-if="scope.row.img!=='null'">
        </template>
      </el-table-column>
      <el-table-column prop="stayus" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { reqCateDel,} from "../../../util/request";
import { alertSuccess, alertWarning } from "../../../util/alert";
import {mapGetters,mapActions} from "vuex"
export default {
  // props: ["list"],
  computed:{
    ...mapGetters({
      list:"sort/list"
    })
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      reqList:"sort/reqListAction"
    }), 
    edit(id) {
      this.$emit("edit", id);
    },
    del(uid) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //发起请求删除数据
          reqCateDel(uid).then((res) => {
            if (res.data.code === 200) {
              alertSuccess("删除成功");
              this.reqList()
            } else {
              alertWarning(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.reqList()
  },
};
</script>
<style scoped>
img{
  width: 100px;
  height: 100px;
}
</style>