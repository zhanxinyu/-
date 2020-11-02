import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import {actions} from "./actions"
import {state,mutations,getters} from "./mutations"
import menu from "./modules/menu"
import role from "./modules/role"
import sort from "./modules/sort"
import specs from './modules/specs'
import manage from "./modules/manage"
import hy from "./modules/hy"

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        menu,
        role:role,
        sort,
        specs,
        manage,
        hy
    }
})