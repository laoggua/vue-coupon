//引入vue-router
import { createRouter, createWebHashHistory } from 'vue-router'
//ES6  import输入  export 输出
// 模块化 默认私有，如何被别人使用？
// 通过export 输出
// 如何使用
// export default 默认输出
import Index from '@/views/static/index.vue'
import LayoutAdmin from '@/layout/admin/index.vue'
import LayoutCoupon from '@/layout/coupon/index.vue'
//白名单
const whiteList = [
    "/",
    "/login"
]
import { useUserStore } from '../store/user'

//路由表
const routes = [
    {
        path: '/',
        name: 'coupon',
        component: LayoutCoupon,
        children: [
            {
                path: 'coupon',
                name: 'sms-coupon',
                component: () => import('@/views/coupon/smsCoupon.vue'),
            },
            {
                path: 'history',
                name: 'sms-coupon-history',
                component: () => import('@/views/coupon/smsCouponHistory.vue')
            },
            {
                path: 'productcategory',
                name: 'sms-coupon-product-category',
                component: () => import('@/views/coupon/smsCouponProductCategory.vue')
            },
            {
                path: 'productrelation',
                name: 'sms-coupon-product-relation',
                component: () => import('@/views/coupon/smsCouponProductRelation.vue')
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('../views/404.vue')// 懒加载  
    }

]
const router = createRouter({
    //模式
    history: createWebHashHistory(),
    routes
})
//前置路由守卫
//用户状态 user.js
router.beforeEach((to, from, next) => {
    const userStore = useUserStore();

    if (whiteList.includes(to.path)) {
        next();
    }
    else {
        next()
        // if (userStore.token && userStore.token.length > 0) {
        //     next()
        // }
        // else {
        //     next({ name: "login" })
        // }

    }


})
export default router;