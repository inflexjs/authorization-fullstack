import {ActionContext, ActionTree} from "vuex";
import {StateUser} from "@/store/modules/user/state";
import {ActionType, StateRoot} from "@/js/types/store";
import AuthService from "@/js/services/AuthService";
import {mutationsType} from "@/store/modules/user/mutations";
import {IUser} from "@/js/types/interfaces/IUser";
import axios from "axios";
import {AuthResponse} from "@/js/types/AuthResponse";
import {API_URL} from "@/js/http";
import UserService from "@/js/services/UserService";

const loginUser = async ({ commit }: ActionContext<StateUser, StateRoot>, payload: {email: string, password: string}) => {
    try {
        const response = await AuthService.login(payload.email, payload.password)

        localStorage.setItem('token', response.data.accessToken)

        commit(mutationsType.SET_AUTH, true)
        commit(mutationsType.SET_USER, response.data.user)
    } catch (error) {
        // @ts-ignore
        console.log(error.response?.data?.message)
    }
}
export type UserLoginUserAction = ActionType<typeof loginUser>

const registrationUser = async ({ commit }: ActionContext<StateUser, StateRoot>, payload: {email: string, password: string}) => {
    try {
        const response = await AuthService.registration(payload.email, payload.password)

        localStorage.setItem('token', response.data.accessToken)

        commit(mutationsType.SET_AUTH, true)
        commit(mutationsType.SET_USER, response.data.user)
    } catch (error) {
        // @ts-ignore
        console.log(error.response?.data?.message)
    }
}
export type UserRegistrationUserAction = ActionType<typeof registrationUser>

const logoutUser = async ({ commit }: ActionContext<StateUser, StateRoot>) => {
    try {
        const response = await AuthService.logout()

        localStorage.removeItem('token')

        commit(mutationsType.SET_AUTH, false)
        commit(mutationsType.SET_USER, {} as IUser)
    } catch (error) {
        // @ts-ignore
        console.log(error.response?.data?.message)
    }
}
export type UserLogoutUserAction = ActionType<typeof logoutUser>

const checkAuthUser = async ({ commit }: ActionContext<StateUser, StateRoot>) => {
    try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})

        localStorage.setItem('token', response.data.accessToken)

        commit(mutationsType.SET_AUTH, true)
        commit(mutationsType.SET_USER, response.data.user)
    } catch (error) {
        // @ts-ignore
        console.log(error.response?.data?.message)
    }
}
export type UserCheckAuthUserAction = ActionType<typeof checkAuthUser>

const getUsers = async ({commit}: ActionContext<StateUser, StateRoot>) => {
    try {
        const response = await UserService.fetchUsers()
        commit(mutationsType.SET_USERS, response.data)
    } catch (e) {
        console.log(e)
    }
}
export type UserGetUsersUserAction = ActionType<typeof getUsers>

const actions: ActionTree<StateUser, StateRoot> = {
    loginUser,
    registrationUser,
    logoutUser,
    checkAuthUser,
    getUsers
}

export default actions
