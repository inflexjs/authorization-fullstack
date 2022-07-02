import axios from "axios";
import {AuthResponse} from "@/js/types/AuthResponse";

export const API_URL = `https://inflexible.ru/api`

const $api = axios.create({
    withCredentials: false,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem(`token`)}`
    }
    return config
})

$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)

            return $api.request(originalRequest)
        } catch (e) {
            console.log(`Не авторизован`)
        }
    }
    throw error
})

export default $api
