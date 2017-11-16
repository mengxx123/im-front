// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import storage from '@/util/storage'
import im from '@/util/im'
import ui from './components'
import './scss/index.scss'

Vue.use(MuseUI)
Vue.use(ui)

// import './sdk/dist/strophe-1.2.8.min'
Vue.config.productionTip = false
Vue.prototype.$storage = storage

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