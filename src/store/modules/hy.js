import {reqHyList} from "../../util/request"

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
    reqHyList(context){
        //axios请求
        reqHyList().then((res)=>{
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