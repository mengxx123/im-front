import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const Register = resolve => require(['@/views/Register'], resolve)
const Login = resolve => require(['@/views/Login'], resolve)
const UserChat = resolve => require(['@/views/UserChat'], resolve)
const UserDetail = resolve => require(['@/views/UserDetail'], resolve)
const GroupChat = resolve => require(['@/views/GroupChat'], resolve)
const Contacts = resolve => require(['@/views/Contacts'], resolve)
const Mine = resolve => require(['@/views/Mine'], resolve)
const Chatroom = resolve => require(['@/views/Chatroom'], resolve)
const Chatlog = resolve => require(['@/views/Chatlog'], resolve)
const Db = resolve => require(['@/views/Db'], resolve)

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '',
            redirect: '/login'
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
            path: '/users/:id',
            component: UserDetail
        }, {
            path: '/users/:id/chat',
            component: UserChat
        }, {
            path: '/groups/:id/chat',
            component: GroupChat
        }, {
            path: '/contacts',
            component: Contacts
        }, {
            path: '/mine',
            component: Mine
        },
        {
            path: '/chatroom',
            component: Chatroom
        },
        {
            path: '/chatlog',
            component: Chatlog
        },
        {
            path: '/db',
            component: Db
        }
    ]
})
