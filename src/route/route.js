const Home = () => import(/* webpackChunkName: "home" */'../module/home/home.vue')
const Detail = () => import(/* webpackChunkName: "detail" */'../module/detail/detail.vue')

const routes = [
    { path: '/', component: Home },
    { path: '/detail', component: Detail },
]
export default routes;