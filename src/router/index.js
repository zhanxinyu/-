import Vue from 'vue'
import Router from 'vue-router'
import store from "../store/index"

Vue.use(Router)
import "../assets/css/reset.css"

function checkedRoute(path,next) {
  //如果该用户 menus_url 中有 "/menu"就next();没有，next("/")

  let userInfo = store.state.userInfo;
  console.log(userInfo)
  if (userInfo.menus_url.includes(path)) {
    next()
  } else {
    next("/")
  }
}

const login =()=>import("../pages/login/login")
const index =()=>import("../pages/index/index")
const menu =()=>import("../pages/menu菜单/menu")
const role =()=>import("../pages/role角色/role")
const administrators =()=>import("../pages/administrators管理员/administrators")
const sort =()=>import("../pages/sort分类/sort")
const specs =()=>import("../pages/specs规格/specs")
const manage =()=>import("../pages/manage商品管理/manage")
const huiyuan =()=>import("../pages/会员/huiyuan")
const banner =()=>import("../pages/banner/banner")
const seckill =()=>import("../pages/seckill秒杀/seckill")
const home =()=>import("../pages/home/home")


export const indexRoyters=[
  {
    path: 'home',
    component: home,
    name:"首页"
  },
  {
    path: 'menu',
    component: menu,
    name:"菜单管理",
    beforeEnter(to, from, next) {
      checkedRoute("/menu",next)
    }
  },
  {
    path: 'role',
    component: role,
    name:"角色管理",
    beforeEnter(to, from, next) {
      checkedRoute("/role",next)
    }
  },
  {
    path: 'administrators',
    component: administrators,
    name:"管理员管理",
    beforeEnter(to, from, next) {
      //reqLogin请求回来的路由跟自己写的不一样
      checkedRoute("/administrators",next)
    }
  },
  {
    path: 'sort',
    component: sort,
    name:"商品分类",
    beforeEnter(to, from, next) {
      //reqLogin请求回来的路由跟自己写的不一样
      checkedRoute("/sort",next)
    }
  },
  {
    path: 'specs',
    component: specs,
    name:"商品规格",
    beforeEnter(to, from, next) {
      checkedRoute("/specs",next)
    }
  },
  {
    path: 'manage',
    component: manage,
    name:"商品管理",
    beforeEnter(to, from, next) {
      //reqLogin请求回来的路由跟自己写的不一样
      checkedRoute("/manage",next)
    }
  },
  {
    path: 'huiyuan',
    component: huiyuan,
    name:"会员管理",
    beforeEnter(to, from, next) {
      //reqLogin请求回来的路由跟自己写的不一样
      checkedRoute("/huiyuan",next)
    }
  },
  {
    path: 'banner',
    component: banner,
    name:"轮播图管理",
    beforeEnter(to, from, next) {
      checkedRoute("/banner",next)
    }
  },
  {
    path: 'seckill',
    component: seckill,
    name:"秒杀活动",
    beforeEnter(to, from, next) {
      checkedRoute("/seckill",next)
    }
  },
]

 let router= new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/index',
      component: index,
      children:[
        {
          path: '',
          component: home
        },
        ...indexRoyters
      ]
    }
  ]
})

//登录拦截
router.beforeEach((to, from, next) => {
  //1.如果前往的是/login ,next()
  if (to.path === "/") {
    next()
    return;
  }
  //2.如果前往的不是登录，判断是否登陆 ,从vuex|sessionStorage 取值
  let userInfo = store.state.userInfo;
  //如果登录过了，next()
  if (userInfo.username) {
    next()
    return;
  }
  //如果没有登录 ，next("/login")
  next("/")
})


export default router
