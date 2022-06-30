import {Maybe} from "@/js/types/utility/other";
import {IUser} from "@/js/types/interfaces/IUser";

const state: () => StateUser = () => ({
    user: null,
    users: null,
    isAuth: false,
})

export type StateUser = {
    user: Maybe<IUser>
    users: Maybe<IUser[]>
    isAuth: boolean
}

export default state
