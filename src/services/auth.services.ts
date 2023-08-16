import type { IUser } from "@interfaces/User";
import { useAuthStore } from "@stores/authStore";
import { REGISTER_USER_STORAGE_KEY } from "@utils/constants";

interface IUserWithConfPass extends IUser {
    confirm_pass?: string
}

export class _AuthService {

    allUsers() {
        const _savedRegUsers = localStorage.getItem(REGISTER_USER_STORAGE_KEY)
        const savedRegUsers = _savedRegUsers ? JSON.parse(_savedRegUsers) : []
        return savedRegUsers
    }

    registerUser(payload: IUserWithConfPass) {
        try {
            const authStore = useAuthStore()
            const resp = authStore.registerUser(payload)
            return { status: resp.status, user: resp.user, msg: resp.msg }
        } catch (error) {
            return { status: false, msg: "Error creating account" }
        }
    }

    loginUser(payload: IUser) {
        try {
            const authStore = useAuthStore()
            const resp = authStore.loginUser(payload)
            if (resp.status) {
                return { status: resp.status, user: resp.user, msg: resp.msg }
            } else {
                return { status: resp.status, msg: resp.msg }
            }
        } catch (error) {
            return { status: false, msg: "Error Login your account" }
        }
    }
}

export const AuthService = new _AuthService();