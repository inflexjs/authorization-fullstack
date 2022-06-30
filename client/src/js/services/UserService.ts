import $api from "@/js/http";
import {AxiosResponse} from "axios";
import {IUser} from "@/js/types/interfaces/IUser";

export default class UserService {
    static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }
}