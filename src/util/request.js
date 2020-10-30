import axios from "axios"
import qs from 'qs'
import { alertWarning } from "../util/alert";
import Vue from "vue"

//响应拦截
axios.interceptors.response.use((res)=>{
    console.log("本次请求的地址是：" + res.config.url)
    console.log(res);
    //失败了，统一弹失败的弹框
    if (res.data.code !== 200) {
        alertWarning(res.data.msg)
    }
    return res;
})

//打包时使用
// const baseUrl = ''
// Vue.prototype.$imgPre=""


//开发时使用
const baseUrl = '/api'
Vue.prototype.$imgPre="http://localhost:3000"
//请求菜单添加
export const reqMenuAdd=(from)=>{
    return axios({
        url:baseUrl+"/api/menuadd",
        method:'post',
        data:qs.stringify(from)
    })
}

//请求菜单列表
export const reqMenu=(params)=>{
    return axios({
        url:baseUrl+"/api/menulist",
        method:'get',
        params:params
    })
}


//获取一条数据
export const reqMenuListOne=(params)=>{
    return axios({
        url:baseUrl+"/api/menuinfo",
        method:'get',
        params:params
    })
}


//删除获一条数据
export const reqMenuDel=(params)=>{
    return axios({
        url:baseUrl+"/api/menudelete",
        method:'post',
        data:qs.stringify(params)
    })
}


//更新数据
export const reqMenuUpate=(params)=>{
    return axios({
        url:baseUrl+'/api/menuedit',
        method:'post',
        data:qs.stringify(params)
    })
}



/////////////////////////////////////////////////////////角色
export const reqRoleAdd=(from)=>{
    return axios({
        url:baseUrl+"/api/roleadd",
        method:'post',
        data:qs.stringify(from)
    })
}

//请求角色列表
export const reqRole=()=>{
    return axios({
        url:baseUrl+"/api/rolelist",
        method:'get',
    })
}


//获取一条数据
export const reqRoleListOne=(params)=>{
    return axios({
        url:baseUrl+"/api/roleinfo",
        method:'get',
        params:params
    })
}


//删除获一条数据
export const reqRoleDel=(params)=>{
    return axios({
        url:baseUrl+"/api/roledelete",
        method:'post',
        data:qs.stringify(params)
    })
}


//更新数据
export const reqRoleUpate=(params)=>{
    return axios({
        url:baseUrl+'/api/roleedit',
        method:'post',
        data:qs.stringify(params)
    })
}


/////////////////////////////////////////管理员添加
//管理员添加
export const reqManageAdd=(form)=>{
    return axios({
        url:baseUrl+"/api/useradd",
        method:"post",
        data:qs.stringify(form)
    })
}

//管理员请求列表
export const reqManageList=(params)=>{
    return axios({
        url:baseUrl+"/api/userlist",
        method:"get",
        params:params
    })
}

//管理员详情一条
export const reqManageDetail=(uid)=>{
    return axios({
        url:baseUrl+"/api/userinfo",
        method:"get",
        params:{
            uid:uid
        }
    })
}

//管理员修改
export const reqManageUpdate=(form)=>{
    return axios({
        url:baseUrl+"/api/useredit",
        method:"post",
        data:qs.stringify(form)
    })
}

//管理员删除一条
export const reqManageDel=(uid)=>{
    return axios({
        url:baseUrl+"/api/userdelete",
        method:"post",
        data:qs.stringify({
            uid:uid
        })
    })
}


//管理员总数
export const reqManageCount=()=>{
    return axios({
        url:baseUrl+"/api/usercount",
        method:"get",
    })
}



//商品分类添加
export const reqCateAdd=(data)=>{
    return axios({
        url:baseUrl+"/api/cateadd",
        method:"post",
        data:data
    })
}


//分类list
export const reqCateList=(params)=>{
    return  axios({
        url:baseUrl+"/api/catelist",
        method:"get",
        params:params
    })
}



//分类删除
export const reqCateDel=(id)=>{
    return  axios({
        url:baseUrl+"/api/catedelete",
        method:"post",
        data:qs.stringify({
            id:id
        })
    })
}



//分类获取一条
export const reqCateDetail=(id)=>{
    return  axios({
        url:baseUrl+"/api/cateinfo",
        method:"get",
        params:{
            id:id
        }
    })
}


//分类修改
export const reqCateUpdate=(data)=>{
    return  axios({
        url:baseUrl+"/api/cateedit",
        method:"post",
        data:data
    })
}





////////////////////////规格
//规格添加
export const reqSpecsAdd=(data)=>{
    return axios({
        url:baseUrl+"/api/specsadd",
        method:"post",
        data:qs.stringify(data)
    })
}



//规格请求列表
export const reqSpecsList=(params)=>{
    return axios({
        url:baseUrl+"/api/specslist",
        method:"get",
        params:params
    })
}



//规格删除
export const reqSpecsDel=(id)=>{
    return  axios({
        url:baseUrl+"/api/specsdelete",
        method:"post",
        data:qs.stringify({
            id:id
        })
    })
}


//规格获取一条
export const reqSpecsDetail=(id)=>{
    return  axios({
        url:baseUrl+"/api/specsinfo",
        method:"get",
        params:{
            id:id
        }
    })
}


//商品规格修改修改
export const reqSpecsUpdate=(data)=>{
    return  axios({
        url:baseUrl+"/api/specsedit",
        method:"post",
        data:qs.stringify(data)
    })
}



//规格总数
export const reqSpecsCount=()=>{
    return axios({
        url:baseUrl+"/api/specscount",
        method:"get",
    })
}



//////////////商品管理添加
export const reqManagAdd=(form)=>{
    return axios({
        url:baseUrl+"/api/goodsadd",
        method:"post",
        data:form
    })
}


//商品总数
export const reqManagCount=()=>{
    return axios({
        url:baseUrl+"/api/goodscount",
        method:"get",
    })
}


//商品列表
export const reqManagList=(params)=>{
    return axios({
        url:baseUrl+"/api/goodslist",
        method:"get",
        params:params
    })
}

//商品获取一条
export const reqManagDetail=(id)=>{
    return  axios({
        url:baseUrl+"/api/goodsinfo",
        method:"get",
        params:{
            id:id
        }
    })
}


//商品修改
export const reqManagUpdate=(form)=>{
    return  axios({
        url:baseUrl+"/api/goodsedit",
        method:"post",
        data:form
    })
}


//商品删除
export const reqManagDel=(id)=>{
    return  axios({
        url:baseUrl+"/api/goodsdelete",
        method:"post",
        data:qs.stringify({
            id:id
        })
    })
}

