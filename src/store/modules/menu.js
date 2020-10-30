import {reqMenu} from "../../util/request"

//存数据
const state={
    list:[]
}
const mutations={
    changeList(state,arr){
        state.list = arr
    }
}
const actions={
    reqMenList(context){
        //axios请求
        reqMenu({istree:true}).then((res)=>{
            context.commit('changeList',res.data.list)
        })
    }
}
const getters={
    list(state){
        return state.list
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}