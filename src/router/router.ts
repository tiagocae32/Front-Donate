import { createRouter,createWebHistory,RouteRecordRaw } from "vue-router"
import { useUserStore } from "../stores/userStore"
import LoginView from "../views/public/Login.vue"
import RegisterView from "../views/public/Register.vue"
import HomeAdminView from "../views/admin/Home.vue"
import HomeUserView from "../views/user/Home.vue"
import PerfilUserView from "../views/user/PerfilUsuario.vue"
import UserCampañasView from "../views/user/UserCampañas.vue"
import CrearCampañaView from "../views/campañas/CrearCampaña.vue"
import DetallesCampañasView from "../views/campañas/DetalleCampaña.vue"  
import DonacionesView from "../views/campañas/Donaciones.vue"

const roles_ids_users : Array<number> = [2,3]

const beforeEnterAdmin = async (to,_, next) : Promise<void> => {
    await useUserStore().currentUser()
    const user = useUserStore().getUser
    if (user.rol_id === 1) return next()
    if (user && roles_ids_users.includes(<number> user.rol_id)) return next({path: "/homeUser"})
    else return next({path: '/'})
}

const beforeEnterRoot = async(to,_,next) : Promise<void> => {
    await useUserStore().currentUser()
    const user = useUserStore().getUser
    console.log("user", user);
    if(!user.name) return next()
    if (user.rol_id === 1) return next({path: "/homeAdmin"})
    if (user && roles_ids_users.includes(<number> user.rol_id)) return next({path: "/homeUser"})
}


const beforeEnterUser = async (to,_,next) => {
    await useUserStore().currentUser()
    const user = useUserStore().getUser
    console.log("user", user);
    if (roles_ids_users.includes(<number> user.rol_id)) return next()
    if (user && user.rol_id === 1) return next({path: "/homeAdmin"})
    else return next({path: '/'})
}

const routes: Array<RouteRecordRaw> = [

    {
        path: "/",
        name: "authLogin",
        component: LoginView,
        beforeEnter: beforeEnterRoot
    },
    {
        path: "/register",
        name: "authRegister",
        component: RegisterView,
        beforeEnter: beforeEnterRoot
    },
    {
        path: "/homeAdmin",
        name: "homeAdmin",
        component: HomeAdminView,
        beforeEnter: beforeEnterAdmin
    },
    {
        path: "/homeUser",
        name: "homeUser",
        component: HomeUserView,
        beforeEnter: beforeEnterUser
    },
    {
        path: "/perfilUsuario/:user_id",
        name: "perfilUsuario",
        component: PerfilUserView,
        beforeEnter: beforeEnterUser
    },
    {
        path: "/misCampanias",
        name: "misCampañas",
        component: UserCampañasView,
        beforeEnter : beforeEnterUser
    },
    {
        path: "/campania/:campania_id",
        name : "detalleCampaña",
        component: DetallesCampañasView,
        beforeEnter: beforeEnterUser
    },
    {
        path: "/crearCampania",
        name: "crearCampaña",
        component: CrearCampañaView,
        beforeEnter : beforeEnterUser
    },
    {
        path: "/donaciones/:id",
        name: "donacionesCampañas",
        component: DonacionesView,
        beforeEnter : beforeEnterUser
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    },
})

export default router