import {reqCateList} from "../../util/request"

const state = {
    list:[]
}

const mutations={
    changeLIst(state,arr){
        state.list=arr
    }
}

const actions = {
    reqListAction(context){
        reqCateList({istree:true}).then(res=>{
            if(res.data.code===200){
                let list = res.data.list?res.data.list:[]
                context.commit("changeLIst",list)
            }
        })
    }
}


const getters = {
    //导出给组件
    list(state) {
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    //命名空间：如果设置了命名空间，就可以通过 模块名/变量名 访问变量，访问action 也可以通过 模块名/action名 访问
    namespaced: true
}