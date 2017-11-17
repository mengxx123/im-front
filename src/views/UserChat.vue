<template>
    <div class="page page-user-chat">
        <header class="page-header">
            <mu-appbar title="用户聊天">
                <mu-icon-button icon="arrow_back" slot="left" @click="$router.go(-1)" />
                <mu-icon-button icon="person" slot="right" @click="viewUser" />
            </mu-appbar>
        </header>
        <main class="page-body">
            <div class="no-message" v-if="!messages.length">没有消息</div>
            <div id="chat-msg-list" class="chat-msg-list" :style="{'bottom': boxType === null ? '57px' : '200px'}">
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
                        <div class="content content-video" v-else-if="message.type === 'video'">
                            <img class="thumbnail" src="/static/img/red-packet.png">
                            <mu-icon value="play_arrow" color="#ffffff" :size="48"/>
                        </div>
                        <div class="content content-link" v-else-if="message.type === 'link'" @click="viewUrl(message.data.url)">
                            <div class="title">{{ message.data.title }}</div>
                            <div class="text">{{ message.data.content }}</div>
                            <img class="thumbnail" :src="message.data.image">
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
            <div class="send-box" :style="{'height': boxType === null ? '57px' : '200px'}">
                <div class="header">
                    <mu-text-field v-model="text" hintText="请输入内容"/>
                    <!--<input>-->
                    <mu-icon-button class="button" icon="tag_faces" @click="viewEmotion"/>
                    <mu-icon-button class="button" icon="add circle outline" @click="viewTool" v-if="!text.length"/>
                    <mu-icon-button class="button" icon="send" @click="send" v-if="text.length"/>
                </div>
                <ul class="tool-list" v-if="boxType === 'tool'">
                    <li class="item">
                        <div class="content">
                            <mu-icon class="icon" value="play_arrow" color="#7e57c2" :size="48" @click="sendText"/>
                            <div class="text">发送文本</div>
                        </div>
                        <div class="content">
                            <mu-icon class="icon" value="play_arrow" color="#7e57c2" :size="48" @click="sendbaidu"/>
                            <div class="text">相册</div>
                        </div>
                    </li>
                    <li class="item">
                        <div class="content">
                            <mu-icon value="play_arrow" color="#7e57c2" :size="48" @click="sendVideo"/>
                            <div class="text">视频</div>
                        </div>
                    </li>
                    <li class="item">
                        <div class="content">
                            <mu-icon value="play_arrow" color="#7e57c2" :size="48"/>
                            <div class="text">相册</div>
                        </div>
                    </li>
                    <li class="item">
                        <div class="content">
                            <mu-icon value="play_arrow" color="#7e57c2" :size="48"/>
                            <div class="text">相册</div>
                        </div>
                    </li>
                </ul>
                <ul v-if="boxType === 'emotion'">
                    <li v-for="emotion in emotions">
                        <img :src="emotion.icon">
                    </li>
                </ul>
            </div>
        </main>
        <mu-toast v-if="toast" message="注册失败" @close="hideToast"/>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui'
    import im from '@/util/im'
    import asd from '@/emotions.json'
    const emotions = asd.data
    console.log('导入表情')
    console.log(emotions)

    export default {
        data () {
            return {
                me: {},
                messages: [],
                username: 'yunser',
                password: '123456',
                toast: false,
                text: '',
                boxType: null,
                emotions: emotions
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
            setTimeout(() => {
                this.scrollToBottom()
            }, 500)

            im.setListener(() => {
                console.log('列表应该更新啦')
                this.messages = im.getUserMessage(this.$route.params.id)
            })
        },
        methods: {
            viewTool() {
                if (this.boxType === 'tool') {
                    this.boxType = null
                } else {
                    this.boxType = 'tool'
                }
            },
            viewEmotion() {
                if (this.boxType === 'emotion') {
                    this.boxType = null
                } else {
                    this.boxType = 'emotion'
                }
            },
            viewUrl(url) {
                window.open(url)
            },
            viewUser() {
                this.$router.push('/users/' + this.$route.params.id)
            },
            send() {
                // TODO 发送失败处理
                im.sendText(this.$route.params.id, this.text).then(() => {
                    Toast('发送成功')
                })
                this.text = ''
                this.scrollToBottom()
            },
            sendText() {
                im.sendText(this.$route.params.id, '测试文本')
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
                setTimeout(() => {
                    // 页面滚动到顶部
                    let msgList = document.getElementById('chat-msg-list')
                    console.log(msgList.offsetHeight)
                    msgList.scrollTop = msgList.scrollHeight + msgList.offsetHeight
                    msgList.scrollTop = 100000
                }, 500)
            }
        }
    }
</script>

<style>
</style>
