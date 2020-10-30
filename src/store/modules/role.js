import {reqRole} from "../../util/request"
const state={
    roleList:[]
}
const mutations={
    changeRoleList(state,arr){
        state.roleList = arr
    }
}
const actions={
    reqMenRoleList(context){
        //axios请求
        reqRole({istree:true}).then((res)=>{
            context.commit('changeRoleList',res.data.list)
        })
    }
}
const getters={
    roleList(state){
        return state.roleList
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}