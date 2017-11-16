<template>
    <div class="page-register">
        <header class="page-header">
            <mu-appbar title="联系人">
                <mu-icon-button icon="menu" slot="left"/>
            </mu-appbar>
        </header>
        <main class="page-body">
            <mu-list>
                <mu-list-item title="Mike Li" @click="viewUser()">
                    <mu-avatar src="/static/img/avatar-1.png" slot="rightAvatar"/>
                    <mu-icon value="grade" slot="left" color="pinkA200"/>
                </mu-list-item>
                <mu-list-item title="Maco Mai" inset>
                    <mu-avatar src="/static/img/avatar-2.png" slot="rightAvatar"/>
                </mu-list-item>
                <mu-list-item title="Alex Qin" inset>
                    <mu-avatar src="/static/img/avatar-3.png" slot="rightAvatar"/>
                </mu-list-item>
            </mu-list>
            <mu-divider inset/>
            <mu-list>
                <mu-list-item title="Myron Liu">
                    <mu-avatar src="/images/uicon.jpg" slot="rightAvatar"/>
                    <mu-avatar color="pinkA200" :style="{'margin-left': '-8px'}" backgroundColor="transparent" slot="leftAvatar">A</mu-avatar>
                </mu-list-item>
                <mu-list-item title="Gaia Zhou" inset>
                    <mu-avatar src="/images/avatar5.jpg" slot="rightAvatar"/>
                </mu-list-item>
                <mu-list-item title="Miller Wang" inset>
                    <mu-avatar src="/images/avatar6.jpg" slot="rightAvatar"/>
                </mu-list-item>
            </mu-list>
        </main>
        <ui-footer></ui-footer>
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
//            let key = 'user-' + this.$route.params.id + '-message'
//            console.log('key', key)
//            let messages = this.$storage.get(key)
//            if (!messages) {
//                messages = []
//            }
//            console.log(messages)
//            this.messages = messages
        },
        methods: {
            viewUser() {
                this.$router.push('/users/' + '1')
            },
            send() {
                im.send(this.$route.params.id, this.text)
            }
        }
    }
</script>

<style>
</style>
