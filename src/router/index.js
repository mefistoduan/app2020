import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'muse-ui-progress';

Vue.use(VueRouter);

let NPconfig = {
    zIndex: 2000,          // progress z-index
    top: 0,                // position fixed top
    speed: 300,            // progress speed
    color: '#E75296',      // color
    size: 2,               // progress size
    className: ''          // progress custom class
}
Vue.use(NProgress,NPconfig);



const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import( '../page/index.vue'),
        meta: {index: 0},//meta对象的index用来定义当前路由的层级,由小到大,由低到高
        children: [
            {
                path: '/',
                name: 'main',
                meta: {
                    title: '预约课程',
                    index: 1
                },
                component: () => import( '../page/mainpage.vue')
            },
            {
                path: '/appoint',
                name: 'appoint',
                meta: {
                    title: '预约课程',
                    index: 2
                },
                component: () => import( '../page/appoint.vue')
            },  {
                path: '/record',
                name: 'record',
                meta: {
                    title: '预约记录',
                    index: 1
                },
                component: () => import( '../page/record.vue')
            }, {
                path: '/mine',
                name: 'mine',
                meta: {
                    title: '我的',
                    index: 1
                },
                component: () => import( '../page/mine.vue')
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登陆',
            index: 1
        },
        component: () => import( '../page/login.vue')
    }, {
        path: '*',
        name: 'notFound',
        meta: {
            title: '404',
            index: 3
        },
        component: () => import( '../page/notFound.vue')
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

// 路由守卫
router.beforeEach((to,from,next)=>{
    NProgress.start()
    const isLogin = localStorage.token? true : false;
    next();
    // if(to.path == '/login' || to.path == '/register'){//'login'和'register'相当于是路由白名单
    //     next();
    // }else{
    //     //如果token存在，就正常跳转，如果不存在，则说明未登陆，则跳转到'login'
    //     isLogin? next() : next("/login");
    // }
});

router.afterEach(() => {
    NProgress.done()
})

export default router
