<template>
    <div class="page-register">
        <mu-appbar title="登录">
            <mu-icon-button icon="menu" slot="left"/>
        </mu-appbar>
        <div class="page-body">
            <div>
                <div>
                    <h2>登录</h2>
                    <mu-text-field v-model="username" hintText="提示文字"/><br/>
                    <mu-text-field v-model="username" hintText="提示文字"/><br/>
                    <mu-flat-button icon="android" class="demo-flat-button" label="登录" @click="login" backgroundColor="#a4c639" color="#FFF" />
                </div>
            </div>
        </div>
        <mu-toast v-if="toast" message="注册失败" @close="hideToast"/>
    </div>
</template>

<script>
//    import im from '@/util/im'

    export default {
        data () {
            return {
                username: this.$storage.get('username') || '15602229283',
                password: '123456',
                toast: false
            }
        },
        methods: {
            login() {
                this.$storage.set('username', this.username)

//                im.login(this.username)
                var options = {
                    apiUrl: WebIM.config.apiURL,
                    user: this.username,
                    pwd: this.username,
                    appKey: WebIM.config.appkey,
                    success: () => {
                        localStorage.user = this.username
                        console.log('跳转')
                        this.$router.push('/')
                    }
                }
                conn.open(options)
            }
        }
    }
</script>

<style scoped="">
    .page-body {
        padding: 0 40px;
    }
</style>
