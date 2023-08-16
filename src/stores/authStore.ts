import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { ILoginUser, IUser } from '@interfaces/User'
import { ALREADY_REGISTER, AUTH_STORE_ID, LOGIN_SUCCESS, LOGIN_UNSUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_UNSUCCESS, REGISTER_USER_STORAGE_KEY } from '@utils/constants'
import router from '@router/index'

const INITIAL_CURRENT_USER: IUser = {
  name: "",
  email: "",
  password: "",
}

export const useAuthStore = defineStore(AUTH_STORE_ID, () => {
  // login user
  const current_user = reactive<IUser>(INITIAL_CURRENT_USER)
  const isAuthenticated = ref<boolean>(false)
  
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
      const already_exist = _registered_users.length > 0 ? _registered_users.find((m:any) => m.email === new_user.email) : undefined
      if (already_exist) {
        return { status: false, user: already_exist, msg: ALREADY_REGISTER }
      }
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
    const USER = _registered_users.find((_user: IUser) => _user.email === user.email && _user.password.toString() === user.password.toString())
    console.log("USER => ", USER,storedUsers(),user);
    
    if (USER) {
      Object.assign(current_user, USER)
      isAuthenticated.value = true
      return { user: USER, status: true, msg: LOGIN_SUCCESS }
    } else {
      return { status: false, msg: LOGIN_UNSUCCESS }
    }
  }

  const logout = () => {
    Object.assign(current_user, INITIAL_CURRENT_USER)
    isAuthenticated.value = false
    router.push("/auth/login")
    return { status: true, msg: LOGOUT_SUCCESS }
  }

  return { current_user, registerUser, loginUser, logout, isAuthenticated, storedUsers }
})
