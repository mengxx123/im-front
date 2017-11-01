<template>
    <div class="page-home">
        <mu-paper>
            <router-link to="/register">注册</router-link>
            <router-link to="/login">登录</router-link>

            <input v-model="name" placeholder="好友账号">
            <button @click="addFriend">添加好友</button>
            <mu-list>
                <mu-sub-header>好友</mu-sub-header>
                <mu-list-item :title="ro.name" v-for="ro in roster">
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
            <mu-bottom-nav :value="bottomNav" @change="handleChange">
                <mu-bottom-nav-item value="recents" title="Recents" icon="restore"/>
                <mu-bottom-nav-item value="favorites" title="Favorites" icon="favorite"/>
                <mu-bottom-nav-item value="nearby" title="Nearby" icon="location_on"/>
            </mu-bottom-nav>
        </mu-paper>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                roster: [],
                groups: [],
                username: 'yunser',
                password: '123456',
                name: 'yunser',
                bottomNav: 'recents'
            }
        },
        mounted() {
            console.log('登录'+localStorage.token)
            if (!localStorage.user) {
//                this.$router.push('/login')
            }
            // 获取好友列表
            conn.getRoster({
                success: roster => {
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
                },
                error: err => {
                    console.log('获取好友失败')
                    console.log(err)
                },
            })
            // 列出当前登录用户加入的所有群组
            conn.getGroup({
                success: resp => {
                    console.log("Response: ", resp)
                    this.groups = resp.data
                },
                error: e => {

                }
            })
        },
        methods: {
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
            }
        }
    }
</script>

<style scoped>

</style>
