<template>
    <div class="page-register">
        <mu-appbar title="注册">
            <mu-icon-button icon="menu" slot="left"/>
        </mu-appbar>
        <div class="page-body">
            <div>
                <mu-text-field v-model="username" hintText="提示文字"/><br/>
                <mu-text-field v-model="password" hintText="提示文字"/><br/>
                <mu-text-field v-model="nickname" hintText="提示文字"/><br/>
            </div>
            <button @click="register">注册</button>
        </div>
        <mu-toast v-if="toast" message="注册失败" @close="hideToast"/>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                username: 'username',
                password: 'password',
                nickname: 'nickname',
                toast: false
            }
        },
        methods: {
            register() {
                var options = {
                    username: this.username,
                    password: this.password,
                    nickname: this.nickname,
                    appKey: WebIM.config.appkey,
                    success: function () { },
                    error: err => {
                        console.log(err)

                        this.toast = true
                        if (this.toastTimer) clearTimeout(this.toastTimer)
                        this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
                    },
                    apiUrl: WebIM.config.apiURL
                };
                conn.registerUser(options);
            }
        }
    }
</script>
