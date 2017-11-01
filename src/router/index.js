import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const Register = resolve => require(['@/views/Register'], resolve)
const Login = resolve => require(['@/views/Login'], resolve)
const UserChat = resolve => require(['@/views/UserChat'], resolve)
const GroupChat = resolve => require(['@/views/GroupChat'], resolve)

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '',
            redirect: '/home'
        }, {
            path: '/home',
            component: Home
        }, {
            path: '/login',
            component: Login
        }, {
            path: '/register',
            component: Register
        }, {
            path: '/users/:id/chat',
            component: UserChat
        }, {
            path: '/groups/:id/chat',
            component: GroupChat
        }
    ]
})
