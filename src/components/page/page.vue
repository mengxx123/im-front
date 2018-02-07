<template>
    <ui-page :title="title" :page="page" :backable="backable" ref="page">
        <div slot="drawer">
            <ui-appbar title=""></ui-appbar>
            <ui-list @itemClick="toggle()">
                <ui-list-item title="调色板" to="/">
                    <ui-icon slot="left" value="grade"/>
                </ui-list-item>
                <ui-list-item title="配色" to="/colorScheme">
                    <ui-icon slot="left" value="grade"/>
                </ui-list-item>
                <ui-list-item title="渐变" to="/gradient">
                    <ui-icon slot="left" value="grade"/>
                </ui-list-item>
                <ui-divider />
                <ui-list-item title="中国传统色彩" to="/color/chinese">
                    <ui-icon slot="left" value="grade"/>
                </ui-list-item>
                <ui-list-item title="日本传统色彩" to="/color/japen">
                    <ui-icon slot="left" value="grade"/>
                </ui-list-item>
                <ui-list-item title="Material Design 颜色" to="/color/materialDesign">
                    <ui-icon slot="left" value="grade"/>
                </ui-list-item>
                <ui-list-item title="关于" to="/about">
                    <ui-icon slot="left" value="grade"/>
                </ui-list-item>
            </ui-list>
        </div>
        <slot></slot>
    </ui-page>
</template>

<script>
    export default {
        data() {
            return {
                open: false,
                docked: true
            }
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: 'default'
            },
            page: {
                type: Object,
                default: function () {
                    return {
                        title: '云设'
                    }
                }
            },
            backable: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            toggle() {
                console.log(this.$refs.page)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ui-page {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
    .page-body {
        min-height: 500px;
    }
    .container-main {
        padding-top: 16px;
    }
    .page-content {
        position: absolute;
        top: 0;
        left: 256px;
        right: 0;
        bottom: 0;
    }
    .page-container {
        padding: 16px;
    }
    .admin-container {
        padding: 16px;
    }
</style>
