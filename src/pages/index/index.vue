<template>
  <div>
    <el-container class="index">
      <el-aside width="180px" class="box">
        <!-- 左边框 -->
        <el-menu
          router
          default-active=""
          unique-opened
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/menu">菜单管理</el-menu-item>
              <el-menu-item index="/index/role">角色管理</el-menu-item>
              <el-menu-item index="/index/administrators"
                >管理员管理</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/sort">商品分类</el-menu-item>
              <el-menu-item index="/index/specs">商品规格</el-menu-item>
              <el-menu-item index="/index/manage">商品管理</el-menu-item>
              <el-menu-item index="/index/huiyuan">会员管理</el-menu-item>
              <el-menu-item index="/index/banner">轮播图管理</el-menu-item>
              <el-menu-item index="/index/seckill">秒杀活动</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right" v-if="$route.name">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="box2"><router-view></router-view></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    // index(){
    //     this.$route.push('/index/home');
    // },
  },
  mounted() {},
};
</script>
<style scoped>
.el-header,.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #20222a;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #fff;
  color: #333;
  /* text-align: center; */
  /* line-height: 160px; */
}
.index {
  width: 100vw;
  height: 100vh;
}
.box2{
  margin-top: 20px;
}
</style>