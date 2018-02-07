<template>
    <my-page title="登录">
        <div>
            <h2>登录</h2>
            <mu-text-field v-model="username" hintText="提示文字"/><br/>
            <mu-text-field v-model="username" hintText="提示文字"/><br/>
            <mu-flat-button icon="android" class="demo-flat-button" label="登录" @click="login" backgroundColor="#a4c639" color="#FFF" />
        </div>
        <mu-toast v-if="toast" message="注册失败" @close="hideToast"/>
    </my-page>
</template>

<script>
    import im from '@/util/im'

    export default {
        data () {
            return {
                username: this.$storage.get('username') || '9',
                password: '9',
                toast: false
            }
        },
        mounted() {
            im.init()
        },
        methods: {
            login() {
                this.$storage.set('username', this.username)

                im.login(this.username, () => {
                    localStorage.user = this.username
                    console.log('登录成功')
                    console.log('跳转')
                    this.$router.push('/home')
                })
//
////                im.login(this.username)
//                var options = {
//                    apiUrl: WebIM.config.apiURL,
//                    user: this.username,
//                    pwd: this.username,
//                    appKey: WebIM.config.appkey,
//                    success: () => {
//
//                    }
//                }
//                conn.open(options)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
