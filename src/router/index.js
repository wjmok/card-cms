import Vue from 'vue';
import Router from 'vue-router';
import store from '../../store/index'

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        
        {
            path: '/home',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: {
            requireAuth: true,
            },
            children:[
                {
                    path: '/Readme',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },

                {
                    path: '/adminLists',
                    component: resolve => require(['../components/page/adminLists.vue'], resolve)
                },
                
                {
                    path: '/Menu',
                    component: resolve => require(['../components/page/Menu.vue'], resolve)
                },

                {
                    path: '/menu-two',
                    component: resolve => require(['../components/page/menu-two.vue'], resolve)
                },
                
                {
                    path: '/Content',
                    component: resolve => require(['../components/page/Content.vue'], resolve)
                },

                {
                    path: '/Content-two',
                    component: resolve => require(['../components/page/Content-two.vue'], resolve)
                },

                {
                    path: '/Category',
                    component: resolve => require(['../components/page/Category.vue'], resolve)
                },
                {
                    path: '/Product',
                    component: resolve => require(['../components/page/Product.vue'], resolve)
                },

                {
                    path: '/Order',
                    component: resolve => require(['../components/page/Order.vue'], resolve)
                },

                {
                    path: '/Theme',
                    component: resolve => require(['../components/page/Theme.vue'], resolve)
                },

                {
                    path: '/ThemeContent',
                    component: resolve => require(['../components/page/ThemeContent.vue'], resolve)
                },

                {
                    path: '/Member',
                    component: resolve => require(['../components/page/Member.vue'], resolve)
                },

                {
                    path: '/MemberCard',
                    component: resolve => require(['../components/page/MemberCard.vue'], resolve)
                },

                {
                    path: '/Book',
                    component: resolve => require(['../components/page/Book.vue'], resolve)
                },

                {
                    path: '/BookOrder',
                    component: resolve => require(['../components/page/BookOrder.vue'], resolve)
                },
                {
                    path: '/User',
                    component: resolve => require(['../components/page/User.vue'], resolve)
                },
                {
                    path: '/user-two',
                    component: resolve => require(['../components/page/user-two.vue'], resolve)
                },
                {
                    path: '/InvitationMenu',
                    component: resolve => require(['../components/page/InvitationMenu.vue'], resolve)
                },

                {
                    path: '/Invitation',
                    component: resolve => require(['../components/page/Invitation.vue'], resolve)
                },

                {
                    path: '/Coupon',
                    component: resolve => require(['../components/page/Coupon.vue'], resolve)
                },
                {
                    path: '/Remark',
                    component: resolve => require(['../components/page/Remark.vue'], resolve)
                },
                {
                    path: '/message',
                    component: resolve => require(['../components/page/message.vue'], resolve)
                },
                {
                    path: '/score',
                    component: resolve => require(['../components/page/score.vue'], resolve)
                },

                
                
                

                
                
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        
        
    ]



});



/*if (localStorage.getItem('username')&&localStorage.getItem('token')) {
    store.commit('setUser', {"username":localStorage.getItem('username'),"token":localStorage.getItem('token')}
        )
};*/

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.getters.getUserInfo.token) {

            next();
            
        }
        else {
            next({
                path: '/login',
                
            })
        }
    }
    else {
        next();
    }
})

export default router;
