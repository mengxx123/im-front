<template>
    <my-page title="帮助与反馈" backable>
        <mu-list>
            <mu-sub-header>常规</mu-sub-header>
            <mu-list-item title="关于" to="/about"></mu-list-item>
            <mu-list-item title="高级设置" to="/about"></mu-list-item>
        </mu-list>
        <mu-list>
            <mu-sub-header>帮助与反馈</mu-sub-header>
            <mu-list-item title="获取支持" to="/help"></mu-list-item>
            <mu-list-item title="功能建议" to="/feedback"></mu-list-item>
        </mu-list>
        <mu-list>
            <mu-sub-header>关于</mu-sub-header>
            <mu-list-item title="关于" to="/about"></mu-list-item>
            <mu-list-item disabled title="版本" describeText="1.0.0"/>
        </mu-list>
    </my-page>
</template>

<script>
    import im from '@/util/im'

    export default {
        data () {
            return {
            }
        },
        mounted() {
        },
        methods: {
        }
    }
</script>

<style scoped>

</style>
