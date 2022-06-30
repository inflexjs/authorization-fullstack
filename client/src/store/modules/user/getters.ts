import { GetterTree } from 'vuex'
import { StateUser } from './state'
import {StateRoot} from "@/js/types/store";

const user = (state: StateUser) => state.user
export type UserUserGetter = ReturnType<typeof user>

const users = (state: StateUser) => state.users
export type UserUsersGetter = ReturnType<typeof users>

const isAuth = (state: StateUser) => state.isAuth
export type UserIsAuthGetter = ReturnType<typeof isAuth>

const getters: GetterTree<StateUser, StateRoot> = {
    user,
    users,
    isAuth
}

export default getters
