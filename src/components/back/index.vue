<template>
    <mu-icon-button icon="arrow_back_ios" slot="left" @click="back"/>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
            back() {
                this.$router.go(-1)
            }
        }
    }
</script>
