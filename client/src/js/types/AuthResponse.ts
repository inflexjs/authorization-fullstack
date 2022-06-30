import {IUser} from "@/js/types/interfaces/IUser";

export interface AuthResponse {
    accessToken: string
    refreshToken: string
    user: IUser
}