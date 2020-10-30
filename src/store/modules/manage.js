import { reqManagList} from "../../util/request"
const state = {
    list: [],
    size: 2,
    total: 0,
    page: 1,
}

const mutations = {
    changeLIst(state, arr) {
        state.list = arr
    },
    changeSize(state, arr) {
        state.size = arr
    },
    changeTotal(state, arr) {
        state.total = arr
    },
    changePage(state, arr) {
        state.page = arr
    }
}

const actions = {
    reqListAction(context) {
        reqManagList({ size: 10, page: 1 }).then(res => {
            console.log(res)
            let list = res.data.list ? res.data.list : [];
            //分页自动更新
            if (list.length == 0 && context.state.page > 1) {
                context.commit("changePage", context.state.page - 1)
                context.dispatch("reqListAction")
                return;
            }
            //  由于取回来的数据attrs是字符串 需要转换一下
            // res.data.list.forEach(item => {
            //     item.attrs = JSON.parse(item.attrs)
            // })
            context.commit("changeLIst", list)
        })
    },
    reqCountAction(context) {
        reqSpecsCount().then(res => {
            if (res.data.code === 200) {
                context.commit("changeTotal", res.data.list[0].total)
            }
        })
    },
    //修改页码
    changePageAction(context, page) {
        //修改page
        context.commit("changePage", page)
        //重新请求list
        context.dispatch("reqListAction")
    }

}

const getters = {
    list(state) {
        return state.list
    },
    size(state) {
        return state.size
    },
    total(state) {
        return state.total
    },
    page(state) {
        return state.page
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