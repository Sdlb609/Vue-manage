import Vue from "vue"
import VueRouter from "vue-router"
import MainView from "../views/MainView.vue"

Vue.use(VueRouter)

const routes = [
    {
        path:'/',           //路径
        name:'main',        //name
        redirect: '/home',
        component:MainView,
        children:[
        //     {
        //         path:'home',
        //         name:'home',
        //         component:() => import('../views/home/IndexView.vue')
        //     },
        //     {
        //         path:'user',
        //         name:'user',
        //         component:() => import('../views/user/IndexView.vue')
        //     },
        //     {
        //         path:'mall',
        //         name:'mall',
        //         component:() => import('../views/mall/IndexView.vue')
        //     },
        //     {
        //         path:'page1',
        //         name:'page1',
        //         component:() => import('../views/other/pageOne.vue')
        //     },
        //     {
        //         path:'page2',
        //         name:'page2',
        //         component:() => import('../views/other/pageTwo.vue')
        //     }
         ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/LoginView.vue')
    }
]
const router = new VueRouter(
    {
        mode:'history',              //路由匹配模式
        routes                    //接受上面的用于保存路由的数组
    }
) 

export default router  