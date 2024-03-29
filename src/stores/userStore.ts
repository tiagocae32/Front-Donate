import axios from '../services/ClientAxios';
import { defineStore } from 'pinia'
import { UserResponse, User, UserStore } from '../interfaces/users/userInterface';
import { Campañas } from '../interfaces/campañas/campañasInterface';

export const useUserStore = defineStore('user', {
    state: () : UserStore => ({ 
        user: {
            name: null,
            email: null,
            rol_id: null,
            campañas: [],
            permisos: []
        },
        isAuth: false
     }),
    actions: {
        setUser(payload : UserResponse){
            const { user, token } = payload
            const tokenStorage = localStorage.getItem('token')
            if(tokenStorage){
                this.token = tokenStorage
            }else {
                if(token){
                    this.token = token
                    localStorage.setItem('token', token)
                }
            }
            if(user){
                this.user = user
                this.isAuth = true
            }
        }
        ,
        async currentUser () : Promise<User | null> {
            if (localStorage.getItem("token")) {
                try {
                    const resServer = await axios.get<User>("/getUserInfo")
                    if (resServer?.data) {
                        const { data : user } = resServer;
                        this.setUser({ user  })
                        return user
                    }
                } catch (error) {
                    console.log(error);
                    this.logOut()
                }
            }
            return null
        },
        setCampañas(campaña : Campañas): void {
            this.user.campañas?.push(campaña)
        },

        deleteCampaña(id : number){
            this.user.campañas = this.user.campañas.filter(campaña => campaña.id !== id)
        },
        logOut() : void {
            if (localStorage.getItem("token")) {
                localStorage.removeItem("token");
            }
            Object.keys(this.user).forEach(key => {
                if(Array.isArray(this.user[key])){
                    this.user[key] = []
                } else {
                    this.user[key] = null
                }
            })
            this.isAuth = false
        }
    },
    getters: {
        getUser(state): User {
            return state.user;
        },
        userIsAuth(state): Boolean | undefined {
            return state.isAuth
        },
        getCampañas(state) : Array<Campañas> | undefined {
            return state.user.campañas          
        },
        verificarPermiso : (state) => {
            return (paramPermiso : string) : Boolean => {
                return state.user.permisos.some(({permiso})=> permiso === paramPermiso)
            };
        }
    }
  })