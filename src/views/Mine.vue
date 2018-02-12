<template>
    <my-page title="我">
        <div>
            <mu-list>
                <mu-list-item title="朋友圈">
                    <mu-icon value="grade" slot="left" color="pinkA200"/>
                </mu-list-item>
            </mu-list>
            <mu-divider inset/>
            <mu-list>
                <mu-list-item title="扫一扫" inset>
                    <mu-icon value="grade" slot="left" color="pinkA200"/>
                </mu-list-item>
                <mu-list-item title="摇一摇" inset>
                    <mu-icon value="grade" slot="left" color="pinkA200"/>
                </mu-list-item>
            </mu-list>
            <mu-divider inset/>
            <mu-list>
                <mu-list-item title="附近的人" inset>
                    <mu-icon value="grade" slot="left" color="pinkA200"/>
                </mu-list-item>
                <mu-list-item title="漂流瓶" inset>
                    <mu-icon value="grade" slot="left" color="pinkA200"/>
                </mu-list-item>
            </mu-list>
            <mu-divider inset/>
            <mu-list>
                <mu-list-item title="购物" inset>
                    <mu-icon value="grade" slot="left" color="pinkA200"/>
                    <mu-badge content="new" slot="after" secondary />
                </mu-list-item>
            </mu-list>
        </div>
        <ui-footer></ui-footer>
        <mu-toast v-if="toast" message="注册失败" @close="hideToast"/>
    </my-page>
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
            send() {
                im.send(this.$route.params.id, this.text)
            }
        }
    }
</script>

<style>
</style>
