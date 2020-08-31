<template>
    <div class="page">
        <img src="../static/images/main/banner.png" height="121" width="414"/>
        <div class="context">
              <span class="num">
                会员卡信息
            </span>
            <div class="user">
                <img src="../static/images/mine/User.png" height="53" width="53"/>
                <span>{{user.name}}</span>
<!--                <p @click="change">修改</p>-->
                <em>{{user.userCode}}</em>
            </div>
            <div class="value">
                <div class="vTitle year" v-if="user.level == 0"><i></i>年会员</div>
                <div class="vTitle price" v-if="user.level == 1"><i></i>充值会员</div>
                <div class="vNum">
                    <div class="center">
                        总{{user.kick}}课时
                    </div>
                    <em>（有效期至2020.12.09）</em>
                </div>
                <mu-flex class="linear-progress">
                    <mu-linear-progress mode="determinate" :value="30"  :size="10"  color="secondary"></mu-linear-progress>
                </mu-flex>
                <div class="limit">
                    <em>剩余 {{user.kick}} 课时</em>
                    <span>完成 {{user.kick}} 课时</span>
                </div>
            </div>
            <div class="dataSum">
                <div class="row">
                    <em>卡路里（月度）</em>
                    <div class="mid midl"></div>
                    <span>{{user.kick}}</span>
                </div>
                <div class="row">
                    <em>总卡路里</em>
                    <div class="mid"></div>
                    <span>{{user.kick}}</span>
                </div>
            </div>
            <div class="dataSum">
                <div class="row">
                    <em>CK（月度）</em>
                    <div class="mid midl"></div>
                    <span>{{user.kick}}</span>
                </div>
                <div class="row">
                    <em>总CK</em>
                    <div class="mid"></div>
                    <span>{{user.kick}}</span>
                </div>
            </div>
            <div class="btn_center">
                <span class="btn btn-md login_btn" @click="logoutBtn">退出</span>
            </div>
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
                thisTab: '我的',
                active: 0,
                sum: 0,
                openAlert: false,
                list: [],
                dialog: {
                    id: '',
                    name: '',
                    timeLong: '',
                },
                user: {
                    name: '',
                    userCode: '',
                    remain: 0,
                    Class: 0,
                    sum: 0,
                    Cal: 0,
                    sumCal: 0,
                    ck: 0,
                    sumCk: 0,
                }
            }
        },
        mounted() {
            this.getInfo();
        },
        methods: {
            logoutBtn(){
                  let that = this;
                this.$confirm('是否退出当前账号？', '提示', {
                    type: 'warning'
                }).then(({ result }) => {
                    if (result) {
                        localStorage.token = '';
                        that.$router.push({path: '/login'});
                    } else {
                        that.$toast.message('点击了取消');
                    }
                });
            },
            getInfo() {
                let that = this;
                let param = {
                    token: localStorage.token,
                    active: this.active
                };
                let postdata = qs.stringify(param);
                testTable(postdata).then(res => {
                    let json = res;
                    if (json.Code == 0) {
                        that.user = json.Rs[0];
                    } else {
                        that.$message.error(json.Memo);
                    }
                })
            },
            change() {

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

    .user {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        height: 58px;
        background: #fff;
        padding: 17px 3%;
        margin-bottom: 10px;
    }

    .user img {
        width: 26.29px;
        height: 26.29px;
        float: left;
        margin-right: 11px;
    }

    .user span {
        font-family: "PingFang SC";
        font-weight: 500;
        font-size: 18px;
        text-align: left;
        color: #3b3b3b;
    }

    .user em {
        font-family: "PingFang SC";
        font-weight: normal;
        font-size: 18px;
        text-align: left;
        color: #3b3b3b;
        float: right;
    }

    .user p {
        font-family: "PingFang SC";
        font-weight: normal;
        font-size: 14px;
        text-align: left;
        color: #ffb43c;
        float: right;
        padding: 0;
        margin: 0;
        margin-left: 3px;
        line-height: 26px;
    }

    .value {
        width: 100%;
        height: 131px;
        background: #fff;
        padding: 13px 0;
    }

    .value .vTitle {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        text-align: center;

        font-family: "PingFang SC";
        font-weight: 300;
        font-size: 15px;
    }

    .vTitle i {
        width: 8px;
        height: 8px;
        display: inline-block;
        border-radius: 250px;
        margin-right: 3px;
    }

    .vTitle.year {
        color: #E75296;
    }

    .vTitle.year i {
        background: #e75296;
    }

    .vTitle.price {
        color: #FFB43C;
    }

    .vTitle.price i {
        background: #FFB43C;
    }
    .vNum {
        width: 100%;
        height: 25px;
        overflow: hidden;
        display: block;
        margin: 5px auto;
    }
    .center {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        text-align: center;
    }
    .vNum em {
        position: relative;
        float: right;
        bottom: 20px;
        font-family: "PingFang SC";
        font-weight: 500;
        font-size: 12px;
        color: #c9c9c9;
        padding-right: 3%;
    }
    /deep/ .linear-progress {
        width: 90%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        border-radius: 250px;
    }
    .limit {
        width: 90%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        margin-top: 8px;
    }
    .limit em {
        font-family: "PingFang SC";
        font-weight: 300;
        font-size: 12px;
        text-align: right;
        color: #e75296;
        padding-left: 10px;
    }
    .limit span {
        font-family: "PingFang SC";
        font-weight: 300;
        font-size: 12px;
        text-align: right;
        color: #909090;
        float: right;
        text-align: right;
        padding-right: 10px;
    }
    .dataSum {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        height: 95px;
        background: #fff;
        margin-top: 10px;
    }
    .dataSum .row {
        width: 94%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        padding: 3% 0;
    }
    .dataSum .row em {
        float: left;
        font-family: "PingFang SC";
        font-weight: 300;
        font-size: 18px;
        text-align: right;
        color: #3b3b3b;
    }
    .dataSum .row span {
        font-family: "PingFang SC";
        font-weight: 500;
        font-size: 18px;
        text-align: right;
        color: #3b3b3b;
        float: right;
    }
    .row .mid {
        width: 66%;
        height: 0px;
        background: transparent;
        border: 1px dotted #e0e0e0;
        float: left;
        margin-top: 11px;
        margin-right: 5px;
        margin-left: 10px;
    }
    .row .midl {
        width: 54%;
        height: 0px;
    }
    .login_btn {
        width: 96%;
        height: 50px;
        line-height: 50px;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        margin-top: 10px;
        margin-bottom: 30px;
        padding-left: 3%;
        padding-right: 3%;
        background: #E75296;
        color: #fff;
        font-size: 14px;
        text-align: center;
        border: none;
        padding: 0;
        font-size: 24px;
    }
    @media only screen and (max-width: 640px) {

        }
        @media only screen and (max-width: 480px) {

        }
        @media only screen and (max-width: 375px) {
            .vNum em {
                padding-right: 0!important;
            }
            .row .mid {
                width: 49%;
            }
            .row .midl {
                width: 44%;
                height: 0px;
            }
        }
        @media only screen and (max-width: 360px) {
            .vNum em {
                padding-right: 0!important;
            }
            .row .mid {
                width: 49%;
            }
            .row .midl {
                width: 44%;
                height: 0px;
            }
        }
        @media only screen and (max-width: 320px) {

        }
        @media only screen and (min-width: 641px) {

        }
</style>