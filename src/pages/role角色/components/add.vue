<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="width">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="width">
          <el-tree
            :data="list"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
        </el-form-item>

        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添加</el-button>
        <el-button type="primary" @click="updata" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { reqRoleAdd,reqRoleListOne,reqRoleUpate } from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import { alertSuccess, alertWarning } from "../../../util/alert";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "menu/list",
      // roleList:"role/roleList"
    }),
  },
  components: {},
  data() {
    return {
      width: "120px",
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
    };
  },
  methods: {
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.form).then((res) => {
        //获取菜单中的数据
        this.reqMenList();
        this.reqMenRoleList();
        //清空数据
        this.empty();
        this.info.isShow = false;
        alertSuccess(res.data.msg);
      });
    },
    //清空数据
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        stayus: 1,
      };
    },
    ...mapActions({
      reqMenList: "menu/reqMenList",
      reqMenRoleList: "role/reqMenRoleList",
    }),
    look(id) {
      this.empty()
      reqRoleListOne({ id: id }).then((res) => {
        this.form = res.data.list;
        // menus ="[1,3,4,5,5]"
        //  this.form.menus =  this.$refs.tree.setCheckedKeys([1]);
        this.form.id = id;
        this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus));
      });
    },
    updata() {
       this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
      reqRoleUpate(this.form).then((res) => {
        alertSuccess(res.data.msg)
         this.info.isShow = false;
         this.reqMenList();
        this.reqMenRoleList();
      });
    },
    mounted() {
      this.reqMenList();
      this.reqMenRoleList();
    },
  },
};
</script>
<style scoped>
</style>