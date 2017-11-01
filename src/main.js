// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
Vue.use(MuseUI)

// import './sdk/dist/strophe-1.2.8.min'
Vue.config.productionTip = false

// require('./js/webim.config')
require('easemob-websdk')

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})

let WebIM = window.WebIM
/* eslint-disable new-cap */
var conn = new WebIM.connection({
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
    url: WebIM.config.xmppURL,
    heartBeatWait: WebIM.config.heartBeatWait,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval,
    apiUrl: WebIM.config.apiURL,
    isAutoLogin: true
})

window.conn = conn

console.log(conn)
conn.listen({
    onOpened: function ( message ) {          //连接成功回调
        console.log('呵呵哒啊')
        // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
        // 手动上线指的是调用conn.setPresence() 如果conn初始化时已将isAutoLogin设置为true
        // 则无需调用conn.setPresence()



    },
    onClosed(message) {
        console.log('连接关闭回调')
    },
    onTextMessage(message) {
        /*{
            id: "394984173384762492", type
        :
            "chat", from
        :
            "admin", to
        :
            "yunser", data
        :
            "12121212", …
        }
        data: "12121212"
        error: falseerrorCode: ""
        errorText: ""
        ext: {
        }
        from: "admin"
        id: "394984173384762492"
        to: "yunser"
        type: "chat"
        __proto__: Object
        */
        console.log('收到文本消息', message)
    },
    onEmojiMessage(message) {
        console.log('收到表情消息')
    },
    onPictureMessage: function ( message ) {
        console.log('收到图片消息')
    },
    onCmdMessage: function ( message ) {
        console.log('收到命令消息')
    },
    onAudioMessage: function ( message ) {
        console.log('收到音频消息')
    },
    onLocationMessage: function ( message ) {
        console.log('收到位置消息')
    },
    onFileMessage: function ( message ) {
        console.log('收到文件消息')
    },
    onVideoMessage: function (message) {
        var node = document.getElementById('privateVideo')
        var option = {
            url: message.url,
            headers: {
                'Accept': 'audio/mp4'
            },
            onFileDownloadComplete: function (response) {
                var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response)
                node.src = objectURL
            },
            onFileDownloadError: function () {
                console.log('File down load error.')
            }
        }
        WebIM.utils.download.call(conn, option)
    },   //收到视频消息
    onPresence: function(message) {
        console.log('onPresence')
        console.log(message)
    },       //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
    onRoster(message) {
        console.log('处理好友申请')
    },
    onInviteMessage: function ( message ) {},  //处理群组邀请
    onOnline: function() {},                  //本机网络连接成功
    onOffline: function () {},                 //本机网络掉线
    onError: function( message ) {},          //失败回调
    onBlacklistUpdate: function (list) {       //黑名单变动
                                               // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
        console.log(list)
    },
    onReceivedMessage: function(message){},    //收到消息送达服务器回执
    onDeliveredMessage: function(message){},   //收到消息送达客户端回执
    onReadMessage: function(message){},        //收到消息已读回执
    onCreateGroup: function(message){},        //创建群组成功回执（需调用createGroupNew）
    onMutedMessage: function(message){}        //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
})

var options2 = {
    username: 'username',
    password: 'password',
    nickname: 'nickname',
    appKey: WebIM.config.appkey,
    success: function () { },
    error: function () { },
    apiUrl: WebIM.config.apiURL
};
// conn.registerUser(options2);
