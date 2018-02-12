<template>
    <div class="">
        <mu-appbar title="聊天记录"></mu-appbar>
        <div>
            <div v-if="!logs.length">
                聊天记录为空
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                logs: []
            }
        },
        mounted() {
            this.init()
        },
        destroyed() {
        },
        methods: {
            init() {
                this.$http.get('/logs').then(
                    response => {
                        let data = response.data
                        console.log(data)
                        this.logs = data
                    },
                    response => {
                        console.log(response)
                    })
            }
        }
    }
</script>

<style scoped>

</style>
