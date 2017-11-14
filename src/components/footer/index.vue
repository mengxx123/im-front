<template>
    <footer class="page-footer">
        <mu-bottom-nav :value="bottomNav" @change="handleChange">
            <mu-bottom-nav-item value="home" title="消息" icon="home" @click.native="page('/home')"/>
            <mu-bottom-nav-item value="contacts" title="联系人" icon="history" @click.native="page('/contacts')"/>
            <mu-bottom-nav-item value="mine" title="我" icon="event" @click.native="page('/mine')"/>
        </mu-bottom-nav>
    </footer>
</template>

<script>
    export default {
        data() {
            return {
                bottomNav: 'home'
            }
        },
        mounted() {
            let _this = this
            let paths = ['home', 'contacts', 'mine']
            for (let path of paths) {
                if (location.href.indexOf(path) !== -1) {
                    console.log(path)
                    _this.bottomNav = path
                }
            }
        },
        methods: {
            page(path) {
                this.$router.push(path)
            },
            handleChange(val) {
                this.bottomNav = val
            }
        }
    }
</script>
