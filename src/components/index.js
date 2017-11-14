import footer from './footer'
import back from './back'

export default {
    install: function (Vue) {
        Vue.component('ui-footer', footer)
        Vue.component('ui-back', back)
    }
}
