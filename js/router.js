const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory('/'),
    routes: [
        {
            name: 'Home',
            path: '/',
            redirect: { name: 'Map' },
            component: () => import('./views/Home.vue.js')
        },
        {
            name: 'Map',
            path: '/map',
            component: () => import('./views/Map.vue.js'),
        },
        {
            path: '/:pathMatch(.*)', 
            redirect: { name: 'Home' }
        }
    ],
})

export default router;