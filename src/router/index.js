import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import "../assets/css/reset.css"

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
    name:"菜单管理"
  },
  {
    path: 'role',
    component: role,
    name:"角色管理"
  },
  {
    path: 'administrators',
    component: administrators,
    name:"管理员管理"
  },
  {
    path: 'sort',
    component: sort,
    name:"商品分类"
  },
  {
    path: 'specs',
    component: specs,
    name:"商品规格"
  },
  {
    path: 'manage',
    component: manage,
    name:"商品管理"
  },
  {
    path: 'huiyuan',
    component: huiyuan,
    name:"会员管理"
  },
  {
    path: 'banner',
    component: banner,
    name:"轮播图管理"
  },
  {
    path: 'seckill',
    component: seckill,
    name:"秒杀活动"
  },
]

export default new Router({
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
