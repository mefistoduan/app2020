<template>
    <div class="page">
        <img src="../static/images/main/banner.png" height="121" width="414"/>
        <div class="context">
            <span class="num">
                记录共 {{num}} 条
            </span>
            <mu-tabs :value.sync="active" color="#F2F2F2" indicator-color="#E75296" center>
                <mu-tab>已预约</mu-tab>
                <mu-tab>预约记录</mu-tab>
                <mu-tab>消费记录</mu-tab>
            </mu-tabs>
            <div class="whiteCube"></div>
            <ul class="list">
                <li v-for="l in list">
                    <div class="lt">
                        <h5>{{l.expTime}}</h5>
                        <span>{{l.timeLong}}</span>
                    </div>
                    <div class="md">
                        <em>
                            {{l.name}}
                        </em>
                        <span class="green" v-if="l.Status == 0">
                            预约成功
                        </span>
                        <span class="red" v-if="l.Status == 1">
                            预约失败
                        </span>
                    </div>
                    <div class="rt">
                        <div class="cancleBtn" v-if="l.Status == 0" @click="cancleAppoint(l)">取消</div>
                        <span v-if="l.Status == 1" class="isFinish">
                          已完成
                        </span>
                        <span class="red" v-if="l.Status == 2" >
                            已取消
                        </span>
                        <em v-if="l.Status == 3">
                            - {{l.Status}}课时
                        </em>
                    </div>
                </li>
            </ul>
        </div>
        <bottomTab :curTab="thisTab"></bottomTab>
    </div>
</template>

<script>
    import axios from 'axios';
    import bottomTab from '../components/bottomTab'
    import {
        testSelect,
        testTable,
    } from '../api/getApiRes.js'

    let qs = require('qs');
    import Global from '../Global.js'

    export default {
        data() {
            return {
                num: 0,
                thisTab: '预约记录',
                active: 0,
                sum: 0,
                openAlert: false,
                list: [],
                dialog: {
                    id: '',
                    name: '',
                    timeLong: '',
                },
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            cancleAppoint(row){
                let that = this;
                this.$confirm('是否取消前课程预约？', '提示', {
                    type: 'warning'
                }).then(({result}) => {
                        if (result) {
                            let param = {
                                token: localStorage.token,
                            };
                            let postdata = qs.stringify(param);
                            testTable(postdata).then(res => {
                                let json = res;
                                if (json.Code == 0) {
                                    that.Toast('当前课程已取消预约','success');
                                    that.getList();
                                } else {
                                    that.Toast(json.Memo + ',错误码：' + json.Code);
                                }
                            })
                        } else {
                            this.$toast.message('点击了取消');
                        }
                });
            },
            getList() {
                let that = this;
                let param = {
                    token: localStorage.token,
                    active: this.active
                };
                let postdata = qs.stringify(param);
                testTable(postdata).then(res => {
                    let json = res;
                    if (json.Code == 0) {
                        that.list = json.Rs;
                        if (that.list) {
                            that.num = json.Rs.length;
                        }
                    } else {
                        that.$message.error(json.Memo);
                    }
                })
            },
        },
        watch: {
            'active'() {
                this.getList();
            }
        },
        components: {
            bottomTab
        }
    }
</script>

<style scoped>
    .page {
        background: #F2F2F2;
    }

    .num {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        font-family: "PingFang SC";
        font-weight: 300;
        font-size: 14px;
        text-align: center;
        color: #909090;
        padding: 13px 0;
    }

    /deep/ .mu-appbar-title {
        text-align: center;
    }

    /deep/ .mu-tab {
        width: 115px;
        height: 35px;
        margin-right: 6px;
    }

    /deep/ .mu-tab-wrapper {
        height: 35px;
        line-height: 25px;
        background: #fff;
        color: #363636;
        box-shadow: 1px 0px 6px rgba(0, 0, 0, 0.16);
        border-radius: 8px 8px 0px 0px;
        font-size: 16px;
        padding-top: 5px;
    }

    /deep/ .mu-tab-active .mu-tab-wrapper {
        height: 35px;
        line-height: 25px;
        border-radius: 8px 8px 0px 0px;
        background: #E75296;
        box-shadow: 1px 0px 6px rgba(0, 0, 0, 0.16);
        color: #fff;
    }

    /deep/ .mu-tab-wrapper em {
        font-size: 12px;
    }

    .list {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        padding-top: 6px;
        padding-bottom: 30px;

    }

    .list li {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        background: #fff;
        padding: 20px 3%;
        margin-bottom: 10px;
    }

    .whiteCube {
        width: 100%;
        height: 6px;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        background: #fff;
        border-bottom: 1px solid #ccc;
    }
    .list .lt {
        width: 120px;
        float: left;
    }
    .list .lt h5 {
        font-family: "PingFang SC";
        font-weight: normal;
        font-size: 14px;
        text-align: left;
        color: #4e4e4e;
        margin: 0;
    }
    .list .lt span {
        font-family: "PingFang SC";
        font-weight: normal;
        font-size: 12px;
        text-align: left;
        color: #909090;
    }
    .list .md {
        max-width: 200px;
        /*width: 220px;*/
        float: left;
        padding-top: 5px;
    }
    .list .rt {
        width: 55px;
        float: right;
        margin-right: 2%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        padding-top: 4px;
    }
    .md em {
        float: left;
        font-family: "PingFang SC";
        font-weight: normal;
        font-size: 18px;
        text-align: left;
        color: #3b3b3b;
        margin-right: 20px;
    }
    .md span {
        font-family: "PingFang SC";
        font-weight: normal;
        font-size: 14px;
        text-align: left;
        color: #37cb00;
        line-height: 30px;
    }
    span.green {
        color: #37cb00;
    }
    span.red {
        color:#FF453C;
    }
    .rt span {
        float: right;
        line-height: 35px;
        font-family: "PingFang SC";
        font-weight: normal;
        font-size: 14px;
        text-align: left;
        color: #909090;

    }
    .rt .red {
        font-family: "PingFang SC";
        font-weight: normal;
        font-size: 14px;
        text-align: left;
        color: #f8847f;
    }
    .rt .cancleBtn {
        width: 55px;
        height: 24px;
        border-radius: 12px;
        background: #ff453c;
        padding: 0;
        overflow: hidden;
        text-align: center;
        color: #fff;
        line-height: 24px;
        margin-top: 6px;
    }
    .rt em {
        font-family: "PingFang SC";
        font-weight: normal;
        font-size: 14px;
        text-align: left;
        color: #909090;
        margin-top: 6px;
    }
</style>