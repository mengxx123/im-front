<template>
    <div class="page page-home">
        <header class="page-header">
            <mu-appbar title="微信">
                <mu-icon-button icon="menu" slot="left"  @click="toggle(true)"/>
                <mu-icon-button icon="search" slot="right"/>
                <mu-icon-menu icon="add" slot="right">
                    <mu-menu-item title="菜单 1"/>
                    <mu-menu-item title="菜单 2"/>
                    <mu-menu-item title="菜单 3"/>
                    <mu-menu-item title="菜单 4"/>
                    <mu-menu-item title="菜单 5"/>
                </mu-icon-menu>
            </mu-appbar>
        </header>
        <div class="page-body">
            <router-link to="/register">注册</router-link>
            <router-link to="/login">登录</router-link>

            <input v-model="name" placeholder="好友账号">
            <button @click="addFriend">添加好友</button>
            <mu-list>
                <mu-sub-header>消息列表</mu-sub-header>
                <mu-list-item :title="message.from"
                              :describeText="message.data"
                              @click="chat(message)"
                              v-for="message in messages">
                    <mu-avatar src="/static/img/avatar.jpg" slot="leftAvatar"/>

                    <mu-icon value="delete" slot="right" @click.native="removeMessage($event, message)"/>
                </mu-list-item>
            </mu-list>
            <mu-list>
                <mu-sub-header>好友</mu-sub-header>
                <mu-list-item :title="ro.name" @click="chatTo(ro)" v-for="ro in roster">
                    <mu-avatar src="/static/img/avatar.jpg" slot="leftAvatar"/>
                    <mu-icon value="chat_bubble" slot="right"/>
                </mu-list-item>
            </mu-list>
            <div v-if="!roster.length">
                <div>你还没有任何好友</div>
            </div>
            <mu-divider/>
            <mu-list>
                <mu-sub-header>群组</mu-sub-header>
                <mu-list-item :title="group.groupname" v-for="group in groups" @click="groupChat(group)">
                    <mu-avatar src="/images/avatar5.jpg" slot="leftAvatar"/>
                    <mu-icon value="chat_bubble" slot="right"/>
                </mu-list-item>
            </mu-list>
        </div>
        <ui-footer></ui-footer>
        <mu-drawer :open="open" :docked="docked" @close="toggle()">
            <mu-list @itemClick="docked ? '' : toggle()">
                <mu-list-item title="个人资料">
                    <mu-icon value="chat_bubble" slot="left"/>
                </mu-list-item>
                <mu-list-item title="相册">
                    <mu-icon value="photo" slot="left"/>
                </mu-list-item>
                <mu-list-item title="收藏">
                    <mu-icon value="collections" slot="left"/>
                </mu-list-item>
                <mu-list-item title="表情">
                    <mu-icon value="tag_faces" slot="left"/>
                </mu-list-item>
                <mu-list-item title="表情">
                    <mu-icon value="chat_bubble" slot="left"/>
                </mu-list-item>
                <mu-list-item title="钱包">
                    <mu-icon value="chat_bubble" slot="left"/>
                </mu-list-item>
                <mu-list-item title="设置">
                    <mu-icon value="chat_bubble" slot="left"/>
                    <mu-badge content="new" slot="after" secondary />
                </mu-list-item>
                <mu-list-item v-if="docked" @click.native="open = false" title="Close"/>
            </mu-list>
        </mu-drawer>
    </div>
</template>

<script>
    import im from '@/util/im'

    export default {
        data () {
            return {
                messages: [],
                roster: [],
                groups: [],
                username: '15602229283',
                password: '123456',
                name: '15602229283',
                open: false,
                docked: true
            }
        },
        mounted() {
            im.init()

            this.username = this.$storage.get('username') || '15602229283'

            // 自动登录
            console.log('登录'+localStorage.token)
            if (!localStorage.user) {
//                this.$router.push('/login')
            }


            // 获取好友列表
            im.getFriends().then(roster => {
                console.log('121212')
                console.log(roster)
                this.roster = roster
                //获取好友列表，并进行好友列表渲染，roster格式为：
                /** [
                 {
                   jid:'asemoemo#chatdemoui_test1@easemob.com',
                   name:'test1',
                   subscription: 'both'
                 }
                 ]
                 */

                for (var i = 0, l = roster.length; i < l; i++) {
                    var ros = roster[i];
                    //ros.subscription值为both/to为要显示的联系人，此处与APP需保持一致，才能保证两个客户端登录后的好友列表一致
                    if (ros.subscription === 'both' || ros.subscription === 'to') {

                    }
                }
            }, err => {
                console.log(err)
            })

            // 列出当前登录用户加入的所有群组
//            conn.getGroup({
//                success: resp => {
//                    console.log("Response: ", resp)
//                    this.groups = resp.data
//                },
//                error: err => {
//                    console.log('获取群组失败')
//                }
//            })
            im.getGroups().then(groups => {
                this.groups = groups
            }, err => {
                console.log('获取群组失败', err)
            })

            // 获取本地消息列表
            this.messages = im.getMessages()

            im.setListener(() => {
                console.log('首页更新')
                this.messages = im.getMessages()
                console.log(this.messages)
            })
        },
        methods: {
            toggle (flag) {
                this.open = !this.open
                this.docked = !flag
            },
            chat(message) {
                this.$router.push('/users/' + message.from + '/chat')
            },
            chatTo(ro) {
                console.log(ro)
                this.$router.push('/users/' + ro.name + '/chat')
            },
            groupChat(group) {
                console.log(group)
                this.$router.push(`/groups/${group.groupid}/chat`)
            },
            handleChange (val) {
                this.bottomNav = val
            },
            addFriend() {
                conn.subscribe({
                    to: this.name,
                    // Demo里面接收方没有展现出来这个message，在status字段里面
                    message: '加个好友呗!'
                });
            },
            removeMessage(e, message) {
                e.stopPropagation()
                im.removeMessage(message.from).then(() => {
                    this.messages = im.getMessages()
                })
            }
        }
    }
</script>

<style scoped>

</style>
