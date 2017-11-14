<template>
    <div class="page-register">
        <mu-appbar title="群组聊天">
            <mu-icon-button icon="input" slot="left"/>
        </mu-appbar>
        <div class="page-body">
            <div>人数：{{ info.affiliations_count }} {{ users.length }}</div>
            <div>简介：{{ info.description }}</div>
            <mu-list>
                <mu-sub-header>成员</mu-sub-header>
                <mu-list-item :title="user.member || user.owner" v-for="user in users">
                    <mu-avatar src="/static/img/avatar.jpg" slot="leftAvatar"/>
                    <div v-if="user.owner">群主</div>
                    <mu-icon value="chat_bubble" slot="right"/>
                </mu-list-item>
            </mu-list>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                groupId: '',
                info: {},
                users: []
            }
        },
        mounted() {
            this.groupId = this.$route.params.id
            // 获取群成员
            var pageNum = 1,
                pageSize = 1000;
            conn.listGroupMember({
                pageNum: pageNum,
                pageSize: pageSize,
                groupId: this.groupId,
                success: resp => {
                    this.users = resp.data
                    console.log("Response: ", resp)
                    console.log('语义化', this.users)
                },
                error: e => {

                }
            })
            console.log(this.$route.params.id)
            // 获取群组信息
            conn.getGroupInfo({
                groupId: this.groupId,
                success: resp => {
                    this.info = resp.data[0]
                    console.log("Response: ", resp);
                },
                error: function(){}
            })
        },
        methods: {
            login() {
                var options = {
                    apiUrl: WebIM.config.apiURL,
                    user: this.username,
                    pwd: this.password,
                    appKey: WebIM.config.appkey,
                    success: () => {
                        localStorage.user = this.username
                        console.log('跳转')
                        this.$router.push('/')
                    }
                }
                conn.open(options)
            }
        }
    }
</script>

<style>
</style>
