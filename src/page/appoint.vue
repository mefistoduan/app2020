<template>
    <div>
        <img src="../static/images/main/banner.png" height="121" width="414"/>
        <mu-tabs :value.sync="active" color="#F2F2F2" indicator-color="#33CAF7" center>
            <mu-tab v-for="item in 5">8月5日 <br> <em>星期二</em></mu-tab>
        </mu-tabs>
        <div class="context">
                <span class="sum">
                    今日预约名额剩余
                    <em class="green" v-if="num > 0">{{num}}</em>
                    <em class="red" v-else>{{num}}</em>
                    人
                </span>
            <ul class="list">
                <li v-for="l in list"
                    :class="[{'greenLi':l.Status == 0},{'redLi':l.Status == 1},{'yellowLi':l.Status == 2},{'whiteLi':l.Status == 3}]">
                    <div class="dotContainer">
                        <i class="dot" v-if="l.Status==0"></i>
                        <i class="cubes" v-if="l.Status==1"></i>
                        <i class="tri" v-if="l.Status==2"></i>
                        <i class="x" v-if="l.Status==3"></i>
                    </div>
                    <div class="title">
                        <h5>{{l.name}}</h5>
                        <span>{{l.timeLong}}</span>
                    </div>
                    <div class="current">
                        <h5>剩余
                            <em class="green" v-if="l.kick > 0">{{l.kick}}</em>
                            <em class="red" v-else>{{l.kick}}</em>
                            人</h5>
                        <span>总名额 {{l.kick}} 人</span>
                    </div>
                    <mu-button class="appointBtn greenBtn" v-if="l.Status == 0" @click="appointNow(l)">预约
                    </mu-button>
                    <mu-button class="appointBtn redBtn" v-if="l.Status == 1" @click="isFulled">已满</mu-button>
                    <mu-button class="appointBtn yellowBtn" v-if="l.Status == 2" @click="isAppointed(l)">已约
                    </mu-button>
                    <mu-button class="appointBtn disableBtn" v-if="l.Status == 3" @click="isDisable">不可约</mu-button>
                </li>
            </ul>
        </div>
        <bottomTab :curTab="thisTab"></bottomTab>
        <div class="doalog">
            <mu-dialog title="预约课程" width="600" max-width="80%" :esc-press-close="false"
                       :overlay-close="false" :open.sync="openAlert">
                <p>
                    是否预约 课程：{{dialog.name}} ，时间：{{dialog.timeLong}}
                    <br>
                </p>
                <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">取消</mu-button>
                <mu-button slot="actions" flat color="primary" @click="confirmAppoint">确定</mu-button>
            </mu-dialog>
        </div>
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
                thisTab: '预约课程',
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
            confirmAppoint() {
                let that = this;
                let param = {
                    token: localStorage.token,
                    id: that.dialog.id
                };
                let postdata = qs.stringify(param);
                testSelect(postdata).then(res => {
                    let json = res;
                    if (json.Code == 0) {
                        that.Toast('已成功预约', 'success');
                        that.openAlert = false;
                        that.getList();
                    } else {
                        that.Toast(json.Memo + ',错误码：' + json.Code);
                    }
                })

            },
            closeAlertDialog() {
                this.openAlert = false;
            },
            appointNow(row) {
                this.dialog = row;
                this.openAlert = true;
            },
            isFulled() {
                let that = this;
                that.$alert('当前课程已满，请选择其他课程或其他时间预约', '提示', {
                    okLabel: '知道了'
                }).then(() => {
                    that.getList();
                });
            },
            isAppointed(row) {
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
                                that.Toast('当前课程已取消预约', 'success');
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
            isDisable(row) {
                this.Toast('课程不可预约，请选择其他课程或其他时间预约', 'info');
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

    /deep/ .mu-tab {
        height: 51px;
        margin-right: 6px;
    }
    /deep/ .mu-tab:nth-child(5) {
        margin-right: 0px;
    }

    /deep/ .mu-tab-wrapper {
        height: 51px;
        background: #fff;
        color: #363636;
        box-shadow: 1px 0px 6px rgba(0, 0, 0, 0.16);
        border-radius: 8px 8px 0px 0px;
        font-size: 14px;
    }

    /deep/ .mu-tab-active .mu-tab-wrapper {
        height: 56px;
        border-radius: 8px 8px 0px 0px;
        background: #33caf7;
        box-shadow: 1px 0px 6px rgba(0, 0, 0, 0.16);
        color: #fff;
    }

    /deep/ .mu-tab-wrapper em {
        font-size: 12px;
    }

    .sum {
        width: 100%;
        height: 55px;
        line-height: 55px;
        background: #fff;
        font-family: "PingFang SC";
        font-weight: 300;
        font-size: 16px;
        text-align: center;
        color: #909090;
        overflow: hidden;
        display: block;
        margin: 0 auto;
    }

    .green {
        color: #37CB00;
    }

    .red {
        color: #F8847F;
    }

    .list {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        margin-top: 8px;
        padding-bottom: 30px;
    }

    .list li {
        width: 100%;
        height: 70px;
        margin-bottom: 8px;
        padding-top: 16px;
        padding-bottom: 16px;
    }

    .list .dotContainer {
        width: 50px;
        float: left;
        height: 60px;
        padding-left: 22px;
        padding-top: 10px;
    }

    .dotContainer .dot {
        width: 12px;
        height: 12px;
        background: #37cb00;
        border-radius: 250px;
        float: left;
    }

    .cubes {
        width: 12px;
        height: 12px;
        background: #f8847f;
        float: left;
    }

    .tri {
        width: 12px;
        height: 12px;
        background: url("../static/images/appoint/tri.png") top center no-repeat;
        background-size: 100% 100%;
        float: left;
    }

    .x {
        width: 12px;
        height: 12px;
        background: url("../static/images/appoint/x.png") top center no-repeat;
        background-size: 100% 100%;
        float: left;
    }


    .yellowLi {
        background: #FFFBED;
    }

    .redLi {
        background: #FFF7F7;
    }

    .greenLi {
        background: #F7FFF4;
    }

    .whiteLi {
        background: #fff;
    }

    .list li .title {
        width: 90px;
        height: 60px;
        float: left;
    }

    li .title h5 {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        font-weight: normal;
        font-size: 14px;
        text-align: left;
        color: #3b3b3b;
    }

    li .title span {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        font-weight: normal;
        font-size: 12px;
        text-align: left;
        color: #909090;
    }

    .list li .current {
        width: 120px;
        height: 60px;
        float: left;
    }

    li .current h5 {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        font-family: "PingFang SC";
        font-weight: normal;
        font-size: 14px;
        text-align: left;
        color: #3b3b3b;
    }

    .current h5 em {
        font-family: "PingFang SC";
        font-weight: normal;
        font-size: 14px;
        text-align: left;
    }

    .current span {
        font-family: "PingFang SC";
        font-weight: normal;
        font-size: 12px;
        text-align: left;
        color: #909090;
    }

    .appointBtn {
        width: 79px;
        height: 37px;
        border-radius: 18.5px;
        background: #fff;
        float: right;
        font-family: "PingFang SC";
        font-weight: normal;
        font-size: 18px;
        margin-right: 2%;
    }

    .greenBtn {
        border: 1px solid #37cb00;
        color: #37cb00;
    }

    .redBtn {
        border: 1px solid #F8847F;
        color: #F8847F;
    }

    .yellowBtn {
        border: 1px solid #FFB43C;
        color: #fff;
        background: #FFB43C;
    }

    .disableBtn {
        border: 1px solid #C9C9C9;
        color: #C9C9C9;
    }

    /deep/ .mu-tabs-center {
        display: flex;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
    }
    /deep/ .mu-tabs-center::-webkit-scrollbar {
        display: none;
    }


    /deep/ .mu-modal-inner {
        width: 90%;
        float: left;
    }

</style>