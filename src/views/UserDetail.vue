<template>
    <div class="page page-user-detail">
        <header class="page-header" style="background-image: url('/static/img/location.png')">
            <mu-appbar class="app-bar" title="用户聊天">
                <mu-icon-button icon="arrow_back" slot="left" @click="$router.go(-1)" />
                <mu-icon-button icon="more_vert" slot="right" />
            </mu-appbar>
            <mu-avatar src="/static/img/avatar.png"/>
        </header>
        <main class="page-body">
            <div id="chat-msg-list" class="chat-msg-list">
                <div v-for="message in messages">
                    <div class="time-tag" v-if="message.timeTag">
                        <mu-badge class="text" :content="message.timeTag" />
                    </div>
                    <div class="item" :class="{'item-me': message.from === me.id}">
                        <mu-avatar class="avatar" src="/static/img/avatar-1.png"/>
                        <div class="content content-text" v-if="message.type === 'text'">
                            {{ message.data }}
                        </div>
                        <div class="content content-img" v-else-if="message.type === 'image'">
                            <img :src="message.data">
                        </div>
                        <div class="content content-location" v-else-if="message.type === 'location'">
                            <div class="address">海珠区琶洲保利天悦·叁悦广场西北</div>
                            <img class="img" :src="message.data.image">
                        </div>
                        <div class="content content-red-packet" v-else-if="message.type === 'red_packet'">
                            <img class="red-packet" src="/static/img/red-packet.png">
                            <div class="info">
                                <div class="text">{{ message.data }}</div>
                                <div class="view">查看红包</div>
                            </div>
                        </div>
                        <div class="content content-unknown" v-else>
                            <div>未知类型的消息</div>
                        </div>
                        <!--{{ message.from }}-->
                    </div>
                </div>
            </div>
            <div class="send-box">
                <input v-model="text">
                <button @click="send">发送</button>
                <button @click="sendbaidu">发送百度图片</button>
                <button @click="sendVideo">发送视频消息</button>
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
            this.me.id = this.$storage.get('username')
            this.messages = im.getUserMessage(this.$route.params.id)
            for (let i = 0; i < this.messages.length; i++) {
                if (i === 0) {
                    this.messages[i].timeTag = '早上10:18'
                }
            }
            im.setListener(() => {
                console.log('列表应该更新啦')
                this.messages = im.getUserMessage(this.$route.params.id)
            })
        },
        methods: {
            send() {
                im.send(this.$route.params.id, {
                    type: 'text',  // 文本消息
                    data: this.text,
                    time: new Date().getTime() // 发送时间
                })
                this.text = ''
                this.scrollToBottom()
            },
            sendbaidu() {
                im.send(this.$route.params.id, {
                    type: 'image',
                    data: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png',
                    time: new Date().getTime() // 发送时间
                })
                this.scrollToBottom()
            },
            sendVideo() {
                im.send(this.$route.params.id, {
                    type: 'video',
                    data: 'http://www.w3school.com.cn/i/movie.mp4',
                    time: new Date().getTime() // 发送时间
                })
                this.scrollToBottom()
            },
            scrollToBottom() {
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
