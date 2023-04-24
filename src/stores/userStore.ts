import axios from '../services/ClientAxios';
import { defineStore } from 'pinia'
import { User, UserStore } from '../interfaces/users/userInterface';
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
        setUser(user : User): void {
            this.isAuth = true
            this.user.id = user.id
            this.user.name = user.name
            this.user.email = user.email
            this.user.rol_id = user.rol_id
            this.user.campañas = user.campañas
            this.user.permisos = user.permisos
        },
        async currentUser () : Promise<User | null> {
            if (localStorage.getItem("token")) {
                try {
                    const resServer = await axios.get<User>("/getUserInfo")
                    if (resServer?.data) {
                        const { data : user } = resServer;
                        this.setUser(user)
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