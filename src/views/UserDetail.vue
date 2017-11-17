<template>
    <div class="page page-user-detail">
        <header class="page-header" style="background-image: url('/static/img/location.png')">
            <mu-appbar class="app-bar" title="用户聊天">
                <mu-icon-button icon="arrow_back" slot="left" @click="$router.go(-1)" />
                <mu-icon-button icon="more_vert" slot="right" @click="bottomSheet = true" />
            </mu-appbar>
            <mu-avatar class="avatar" src="/static/img/avatar.jpg"/>
        </header>
        <main class="page-body">
            <mu-list>
                <mu-list-item title="地区" describeText="广东 广州">
                    <mu-icon value="location_on" slot="left" color="pinkA200"/>
                </mu-list-item>
                <mu-list-item title="相册">
                    <mu-icon value="photo" slot="left" color="pinkA200"/>
                    <ul class="photo-list">
                        <li class="item"><img src="/static/img/avatar.jpg"> </li>
                        <li class="item"><img src="/static/img/avatar.jpg"> </li>
                        <li class="item"><img src="/static/img/avatar.jpg"> </li>
                    </ul>
                </mu-list-item>
            </mu-list>
            <mu-content-block>
                <mu-raised-button class="send-button" label="发消息" primary @click="sendMessage" />
            </mu-content-block>
        </main>
        <mu-toast v-if="toast" message="注册失败" @close="hideToast"/>
        <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
            <mu-list @itemClick="closeBottomSheet">
                <mu-list-item title="加入黑名单">
                    <mu-icon slot="left" value="not_interested"/>
                </mu-list-item>
                <mu-list-item title="设置备注及标签"></mu-list-item>
                <mu-list-item title="标为星标朋友"></mu-list-item>
                <mu-list-item title="设置朋友圈权限"></mu-list-item>
                <mu-list-item title="发送该名片"></mu-list-item>
                <mu-list-item title="设置朋友圈权限"></mu-list-item>
            </mu-list>
        </mu-bottom-sheet>
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
                text: 'i love you',
                bottomSheet: false
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
            sendMessage() {
                this.$router.push(`/users/${this.$route.params.id}/chat`)
            },
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
            },
            // 更多
            closeBottomSheet () {
                this.bottomSheet = false
            },
            openBottomSheet () {
                this.bottomSheet = true
            }
        }
    }
</script>

<style>
</style>
