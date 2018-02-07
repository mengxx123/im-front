import footer from './footer'
import back from './back'
import page from './page'

export default {
    install: function (Vue) {
        Vue.component('ui-footer', footer)
        Vue.component('ui-back', back)
        Vue.component('my-page', page)
    }
}
