<template>
    <div class="page-register">
        <mu-appbar title="用户聊天">
        </mu-appbar>
        <div class="page-body">
            <mu-list>
                <mu-sub-header>消息列表</mu-sub-header>
                <mu-list-item :title="message.from"
                              :describeText="message.data"
                              v-for="message in messages">
                    <mu-avatar src="/static/img/avatar.jpg" slot="leftAvatar"/>

                    <mu-icon value="chat_bubble" slot="right"/>
                </mu-list-item>
            </mu-list>
            <div class="send-box">
                <input v-model="text">
                <button @click="send">发送</button>
            </div>
        </div>
        <mu-toast v-if="toast" message="注册失败" @close="hideToast"/>
    </div>
</template>

<script>
    import im from '@/util/im'

    export default {
        data () {
            return {
                messages: [],
                username: 'yunser',
                password: '123456',
                toast: false,

                text: 'i love you'
            }
        },
        mounted() {
            let key = 'user-' + this.$route.params.id + '-message'
            console.log('key', key)
            let messages = this.$storage.get(key)
            if (!messages) {
                messages = []
            }
            console.log(messages)
            this.messages = messages
        },
        methods: {
            send() {
                im.send(this.$route.params.id, this.text)
            }
        }
    }
</script>

<style>
</style>
