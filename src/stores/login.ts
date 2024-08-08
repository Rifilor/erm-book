import { defineStore } from 'pinia'
import type {ILoginData, ILoginStore, IUserLogin, Permissions} from "@/interface/interfaces";
import {useMockStore} from './mockSrore'
import type {Router} from "vue-router";



export const useLoginStore = defineStore('login', {

    state: () : ILoginStore => {
        return {
            userLogin: null,
        }
    },
    actions: {
        async actionLogin(data: ILoginData): Promise<boolean> {
            const mockStore = useMockStore()

            const res: IUserLogin | null = await mockStore.checkLogin(data)
            console.log('actionLogin', res)
            if(res) {
                this.userLogin = res
                localStorage.setItem('userLogin', JSON.stringify(res))
                return true
            } else {
                this.userLogin = null;
                localStorage.removeItem('userLogin');
                return false;
            }
        },
        async logout(router: Router) {
            if (localStorage.getItem('userLogin')) {
                localStorage.removeItem('userLogin')
                this.userLogin = null
            }
            router.push({ name: 'login' });
        }
    },
    getters: {
        getUserData: (state): IUserLogin | null => {
            if(!state.userLogin && localStorage.getItem('userLogin')) {
                state.userLogin = JSON.parse(''+localStorage.getItem('userLogin'))
            }
            return state.userLogin
        },
        getPermissionAccess: (state): ((name: keyof Permissions) => boolean) => {
            if(!state.userLogin && localStorage.getItem('userLogin')) {
                state.userLogin = JSON.parse(''+localStorage.getItem('userLogin'))
            }
            return (name: keyof Permissions): boolean => {
                const userData = state.userLogin;

                if (userData && userData.role.permissions) {
                    return userData.role.permissions[name];
                }

                return false;
            };
        },


    },
})