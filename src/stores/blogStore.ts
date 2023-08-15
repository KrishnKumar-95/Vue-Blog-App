import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { ILoginUser, IUser } from '@interfaces/User'
import { BLOG_STORE_ID, LOGIN_SUCCESS, LOGIN_UNSUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_UNSUCCESS, REGISTER_USER_STORAGE_KEY } from '@utils/constants'
import type { IBlog } from '@interfaces/Blog'

const BLOG_POST: IBlog = {
    title: "",
    content: "",
    image: "",
}

export const useBlogStore = defineStore(BLOG_STORE_ID, () => {
    const all_posts = ref<IBlog[]>([])
    const post = reactive<IBlog>(BLOG_POST)

    const isAuthenticated = ref<boolean>(false)

    const addPost = async (post: IBlog) => {
        const response = await 

    }

    // Gives all Registered USERs if Any
    const storedUsers = () => {
        const stored_users: any = localStorage.getItem(REGISTER_USER_STORAGE_KEY);
        const _registered_users: IUser[] | any = stored_users ? JSON.parse(stored_users) : [];
        return _registered_users
    }

    // Register new USER
    const registerUser = (new_user: IUser) => {
        try {
            const _registered_users: IUser[] | any = storedUsers()
            _registered_users.push(new_user)
            const newUserAdded: string = JSON.stringify(_registered_users)
            localStorage.setItem(REGISTER_USER_STORAGE_KEY, newUserAdded)
            return { status: true, user: new_user, msg: REGISTER_SUCCESS }
        } catch (error) {
            return { status: false, user: new_user, msg: REGISTER_UNSUCCESS }
        }
    }

    // Login user
    const loginUser = (user: ILoginUser) => {
        const _registered_users: IUser[] | any = storedUsers()
        const USER = _registered_users.find((_user: IUser) => _user.email === user.email && _user.password === user.password)
        if (USER) {
            Object.assign(current_user, USER)
            isAuthenticated.value = true
            return { user: USER, status: true, msg: LOGIN_SUCCESS }
        } else {
            return { user: current_user, status: false, msg: LOGIN_UNSUCCESS }
        }
    }

    const logout = () => {
        Object.assign(current_user, INITIAL_CURRENT_USER)
        isAuthenticated.value = false
        return { status: true, msg: LOGOUT_SUCCESS }
    }

    return {}
})
