<template>
    <div class="container">
        <h5 class="title">404</h5>
        <p class="content">网络状况不佳，请改善网络状况后重启本应用</p>
    </div>
</template>

<script>
    import axios from 'axios';
    let qs = require('qs');
    import Global from '../Global.js'
    export default {
        data() {
            return {
                lists: []
            }
        },
        mounted() {
        },
        methods: {},
    }
</script>

<style scoped>
    /*mu-header*/
    .mu-primary-color {
        line-height: 60px;
        height: 60px;
        background: url("../static/images/comm/headerBg.png") top center no-repeat;
        background-size: 100%;
    }

    /deep/ .mu-appbar-left {
        padding-top: 15px;
    }

    /deep/ .material-icons {
        color: #fff;
    }

   /deep/ .mu-appbar-title {
        text-align: center;
    }
</style>
