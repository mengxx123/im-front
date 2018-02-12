import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import storage from '@/util/storage'
import http from '@/util/http'
import im from '@/util/im'
import ui from './components'
import './scss/index.scss'
//import MintUI from 'mint-ui'
//import 'mint-ui/lib/style.css'

// Vue.use(MintUI)
//Vue.use(MintUI)
Vue.use(MuseUI)
Vue.use(ui)

// 全部加载
import YunserUI from 'yunser-ui-vue'
import 'yunser-ui-vue/dist/yunser-ui.css'
import './scss/main.scss'

// 全部加载
Vue.use(YunserUI)

// import './sdk/dist/strophe-1.2.8.min'
Vue.config.productionTip = false
Vue.prototype.$storage = storage
Vue.prototype.$http = http

// require('./js/webim.config')
require('easemob-websdk')

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})

im.init()