// im.js 通用的即时通讯模块

import storage from '@/util/storage'

let WebIM = window.WebIM

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

let im = {
    messages: [
        {
            data: "1212",
            from: "admin",
            id: "399760244995003508",
            type: "text"
        }, {
            data: "1212",
            from: "15602229284",
            id: "399760244995003508",
            type: "chat"
        }, {
            data: "1212",
            from: "15602229283",
            id: "399760244995003508",
            type: "chat"
        }
    ],
    isInit: false,
    username: '',
    asd: 'asd',
    callbacks: [],
    isInit: false,
    init() {
        if (this.isInit) {
            return
        }
        this.isInit = true
        console.log('初始化')
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

        // 获取消息列表
        let messages = this.getMessages()

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
            onTextMessage: message => {
                console.log('收到文本消息', message)
                // 把文本消息写入本地存储
                if (message.type === 'chat') {
                    console.log('添加')

                    // 单用户消息
                    this.addUserMessage(message, message.from)
                }
                console.log('更新本地消息列表')
                // 更新消息列表
                this.addMessage(message)
                console.log('更新本地消息列表2')

                this.callbackAll()
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
            onError: message => {
                console.log('失败回调')
                console.log(message)
                if (message.data && message.data.type === 17) {
                    let data = JSON.parse(message.data.data)
                    if (data.error_description === 'user not found') {
                        // 注册用户
                        this.register()
                    }
                }
            },          //
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
    },
    isLogin: false,
    login(phone, success) {
        if (this.isLogin) {
            return
        }
        this.username = phone
        var options = {
            apiUrl: WebIM.config.apiURL,
            user: '' + phone,
            pwd: '' + phone,
            appKey: WebIM.config.appkey,
            success: () => {
                console.log('登录成功')
                success && success()
            }
        }
        conn.open(options)
    },
    register() {
        var options = {
            username: this.username,
            password: this.username,
            nickname: this.username,
            appKey: WebIM.config.appkey,
            success: function () {
                console.log('注册成功')
            },
            error: function () {
                console.log('注册失败')
            },
            apiUrl: WebIM.config.apiURL
        };
        conn.registerUser(options);
    },
    send(to, text) {

        let id = conn.getUniqueId() // 生成本地消息id
        let msg = new WebIM.message('txt', id) // 创建文本消息
        console.log(`发送${text}给${to}`)
        msg.set({
            msg: text,
            to: to,
            roomType: false,
            success: (id, serverMsgId) => {
                console.log('发送成功')
                // 发送成功后，写入本地存储
                console.log('发送测试', this.username)
                this.addUserMessage({
                    data: text,
                    from: this.username,
                    id: '' + new Date().getTime(),
                    type: 'chat'
                }, to)
                console.log('发送完成')
                this.callbackAll()
                console.log('发送完成2')
            },
            fail: function(e){
                console.log("Send private text error")
            }
        });
        msg.body.chatType = 'singleChat'
        conn.send(msg.body)
    },
    // 把消息添加到消息列表
    addMessage(message) {
        if (message.type === 'chat') {
            console.log('添加')
            console.log(this.messages)
            // 查找消息列表是否已经有对应用户的消息，没有则
            let find = false
            for (let i = 0; i < this.messages.length; i++) {
                let msg = this.messages[i]
                if (msg.from === message.from) {
                    console.log('找到了')

                    let targetMsg = this.messages[i]
                    targetMsg.data = message.data
                    targetMsg.number = 1
                    targetMsg.time = new Date().getTime()

                    this.messages.splice(i, 1)
                    this.messages.unshift(targetMsg) // TODO
                    find = true
                }
            }
            if (!find) {
                this.messages.push({
                    data: message.data,
                    from: message.from,
                    id: "399760244995003508",
                    type: "chat",
                    time: new Date().getTime()
                })
            }
            console.log('添加完成', this.messages)
            // 消息数量最多保存 10 条
            if (this.messages.length > 10) {
                this.messages = this.messages.slice(0, 9)
            }
            storage.set('messages', this.messages)
        }
    },
    getMessages() {
        let messages = storage.get('messages')
        if (!messages) {
            messages = [
                // 测试消息
                // {
                //     data: "1212",
                //     from: "admin",
                //     id: "399760244995003508",
                //     type: "chat"
                // }, {
                //     data: "1212",
                //     from: "15602229284",
                //     id: "399760244995003508",
                //     type: "chat"
                // }, {
                //     data: "1212",
                //     from: "15602229283",
                //     id: "399760244995003508",
                //     type: "chat"
                // }
            ]
        }
        console.log('排序', messages)
        messages = messages.sort((msg1, msg2) => {
            return msg2.time - msg1.time
        })
        return messages
    },
    removeMessage(from) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < this.messages.length; i++) {
                let msg = this.messages[i]
                if (msg.from === from) {
                    this.messages.splice(i, 1)
                    storage.set('messages', this.messages)
                }
            }
            resolve()
        })
    },
    getUserMessage(name) {
        let key = 'user-' + name + '-message'
        let userMessage = storage.get(key)
        if (!userMessage) {
            userMessage = []
        }
        return userMessage
    },
    addUserMessage(message, username) {
        console.log('__addUserMessage')
        console.log(message)
        let key = 'user-' + username + '-message'
        let userMessage = storage.get(key)
        if (!userMessage) {
            userMessage = []
        }
        userMessage.push({
            data: message.data,
            from: message.from,
            id: "399760244995003508",
            type: "chat"
        })
        storage.set(key, userMessage)
        console.log('保存' + key)
    },
    getFriends() {
        return new Promise((resolve, reject) => {
            conn.getRoster({
                success: roster => {
                    console.log('获取好友成功')
                    resolve(roster)
                },
                error: err => {
                    console.log('获取好友失败')
                    reject(err)
                },
            })
        })
    },
    getGroups() {
        return new Promise((resolve, reject) => {
            conn.getGroup({
                success: resp => {
                    console.log("Response: ", resp)
                    resolve(resp.data)
                },
                error: err => {
                    reject(err)
                    console.log('获取群组失败')
                }
            })
        })
    },
    setListener(callback) {
        this.callbacks.push({
            id: '' + new Date().getTime(),
            callback: callback
        })
    },
    removeListener(id) {
        for (let i = 0; i < this.callbacks.length; i++) {
            if (this.callbacks[i].id === id) {
                this.callbacks.splice(i, 1)
                return
            }
        }
    },
    callbackAll() {
        console.log('回调数量' + this.callbacks.length)
        this.callbacks.forEach(callback => {
            callback.callback()
        })
    }
}

export default im