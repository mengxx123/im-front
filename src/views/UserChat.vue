<template>
    <div class="page page-user-chat">
        <header class="page-header">
            <mu-appbar title="用户聊天">
                <mu-icon-button icon="arrow_back" slot="left" @click="$router.go(-1)" />
            </mu-appbar>
        </header>
        <main class="page-body">
            <div id="chat-msg-list" class="chat-msg-list">
                <div class="item" v-for="message in messages" :class="{'item-me': message.from === me.id}">
                    <mu-avatar class="avatar" src="/static/img/avatar-1.png"/>
                    <div class="content">
                        {{ message.data }}
                    </div>
                    <!--{{ message.from }}-->
                </div>
            </div>
            <div class="send-box">
                <input v-model="text">
                <button @click="send">发送</button>
            </div>
        </main>
        <mu-toast v-if="toast" message="注册失败" @close="hideToast"/>
    </div>
</template>

<script>
    import im from '@/util/im'

    export default {
        data () {
            return {
                me: {},
                messages: [],
                username: 'yunser',
                password: '123456',
                toast: false,

                text: 'i love you'
            }
        },
        mounted() {
//            let key = 'user-' + this.$route.params.id + '-message'
//            console.log('key', key)
//            let messages = this.$storage.get(key)
//            if (!messages) {
//                messages = []
//            }
//            console.log(messages)
//            this.messages = messages

            this.me.id = this.$storage.get('username')
            this.messages = im.getUserMessage(this.$route.params.id)

            im.setListener(() => {
                console.log('列表应该更新啦')
                this.messages = im.getUserMessage(this.$route.params.id)
            })
        },
        methods: {
            send() {
                im.send(this.$route.params.id, {
                    type: 'text',  // 文本消息
                    msg: 'this.text',
                    time: new Date().getTime() // 发送时间
                })
                this.text = ''
                // 页面滚动到顶部
                let msgList = document.getElementById('chat-msg-list')
                console.log(msgList.offsetHeight)
                msgList.scrollTop = msgList.scrollHeight + msgList.offsetHeight
                msgList.scrollTop = 100000
            }
        }
    }
</script>

<style>
</style>
