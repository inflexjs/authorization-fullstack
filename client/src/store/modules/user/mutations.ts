import { MutationTree } from 'vuex'
import { StateUser } from './state'

export enum mutationsType {
    SET_USER = 'SET_USER',
    SET_USERS = 'SET_USERS',
    SET_AUTH = 'SET_AUTH'
}

const mutations: MutationTree<StateUser> = {
    [mutationsType.SET_USER](state: StateUser, payload: StateUser['user']) {
        state.user = payload
    },
    [mutationsType.SET_USERS](state: StateUser, payload: StateUser['users']) {
        state.users = payload
    },
    [mutationsType.SET_AUTH](state: StateUser, payload: StateUser['isAuth']) {
        state.isAuth = payload
    },
}

export default mutations
