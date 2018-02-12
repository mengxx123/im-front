<template>
    <div class="bg">
        <mu-appbar class="top" title="数据库"></mu-appbar>
        <mu-paper class="mysql-table">
            <table>
                <tr>
                    <td class="table-name" colspan="6">ys_user（用户表）</td>
                </tr>
                <tr class="head-row">
                    <th>字段</th>
                    <th>类型</th>
                    <th>空</th>
                    <th>默认</th>
                    <th>其他</th>
                    <th>注释</th>
                </tr>
                <tr class="table-row">
                    <td>id</td>
                    <td>varchar(32)</td>
                    <td>否</td>
                    <td>无</td>
                    <td>自增</td>
                    <td>用户 ID</td>
                </tr>
                <tr class="table-row">
                    <td>name</td>
                    <td>varchar(16)</td>
                    <td>否</td>
                    <td></td>
                    <td></td>
                    <td>用户名</td>
                </tr>
                <tr class="table-row">
                    <td>password</td>
                    <td>varchar(50)</td>
                    <td>否</td>
                    <td></td>
                    <td></td>
                    <td>密码</td>
                </tr>
            </table>
        </mu-paper>
        <div class="mysql-table">
            <table>
                <td class="table-name" colspan="6">ys_user</td>
                <tr>
                    <th>字段</th>
                    <th>类型</th>
                    <th>空</th>
                    <th>默认</th>
                    <th>其他</th>
                    <th>注释</th>
                </tr>
                <tr>
                    <td>id</td>
                    <td>varchar(32)</td>
                    <td>否</td>
                    <td>无</td>
                    <td>自增</td>
                    <td>用户 ID</td>
                </tr>
                <tr>
                    <td>name</td>
                    <td>varchar(16)</td>
                    <td>否</td>
                    <td></td>
                    <td></td>
                    <td>用户名</td>
                </tr>
                <tr>
                    <td>password</td>
                    <td>varchar(50)</td>
                    <td>否</td>
                    <td></td>
                    <td></td>
                    <td>密码</td>
                </tr>
            </table>
        </div>
        <div class="mysql-table">
            <table>
                <td class="table-name" colspan="6">ys_user</td>
                <tr>
                    <th>字段</th>
                    <th>类型</th>
                    <th>空</th>
                    <th>默认</th>
                    <th>其他</th>
                    <th>注释</th>
                </tr>
                <tr>
                    <td>id</td>
                    <td>varchar(32)</td>
                    <td>否</td>
                    <td>无</td>
                    <td>自增</td>
                    <td>用户 ID</td>
                </tr>
                <tr>
                    <td>name</td>
                    <td>varchar(16)</td>
                    <td>否</td>
                    <td></td>
                    <td></td>
                    <td>用户名</td>
                </tr>
                <tr>
                    <td>password</td>
                    <td>varchar(50)</td>
                    <td>否</td>
                    <td></td>
                    <td></td>
                    <td>密码</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
            }
        },
        mounted() {
        },
        destroyed() {
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
    .top {
        margin-bottom: 16px;
    }
    .bg {
        padding: 16px;
        background-color: #fff;
    }
    .mysql-table {
        display: inline-block;
        margin-bottom: 16px;
        .table-name {
            font-size: 16px;
            text-align: center;
        }
        table {
            th {
                font-weight: bold;
            }
            th,
            td {
                padding: 8px 16px;
                border: 1px solid #ccc;
            }
            .head-row {
                background-color: #f1f1f1;
            }
            .table-row:nth-child(2n) {
                background-color: #f9f9f9;
            }
        }
    }
</style>
