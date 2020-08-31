<template>
    <div id="mainPage">
        <img src="../static/images/main/banner.png" height="121" width="414"/>
        <span class="shopNum">
            俱乐部场馆共 {{shopNum}} 处
        </span>
        <ul class="list">
            <li v-for="l in list" @click="goAppoint(l)">
                <img src="../static/images/main/771.png" height="133" width="130"/>
                <div class="rt">
                    <h5>{{l.name}}</h5>
                    <span>今日预约名额剩余{{l.Recovered}}人</span>
                    <em class="green" v-if="l.Status == 1">点击预约</em>
                    <em class="red" v-else>不可预约</em>
                </div>
            </li>
        </ul>
        <bottomTab :curTab="thisTab"></bottomTab>
    </div>
</template>

<script>
    import {
        testSelect,
        testTable,
    } from '../api/getApiRes.js'

    import bottomTab from '../components/bottomTab'
    import axios from 'axios';

    let qs = require('qs');
    import Global from '../Global.js'

    export default {
        data() {
            return {
                thisTab: '预约课程',
                shopNum: 0,
                recordNum: 0,
                Dannum: 0,
                GetHotelCounts: 0,
                GetDetectorNum: 0,
                list: [],
            }
        },
        mounted() {
            this.getList();
        },
        destroyed() {
        },
        methods: {
            getList() {
                let that = this;
                let param = {
                    token: localStorage.token,
                };
                let postdata = qs.stringify(param);
                testTable(postdata).then(res => {
                    let json = res;
                    if (json.Code == 0) {
                        that.list = json.Rs;
                        if (that.list) {
                            that.shopNum = json.Rs.length;
                        }
                    } else {
                        that.$message.error(json.Memo);
                    }
                })
            },
            onGoNewPage(path) {
                this.$router.push({path: '/' + path});
            },
            goPage(pages) {
                this.$router.push({path: pages});
            },
            goAppoint(row) {
                let that = this;
                if (row.Status == 2) {
                    that.Toast(row.name + '不可预约');
                    return false
                } else {
                    this.$router.push({
                        path: '/appoint', query: {
                            shopId: row.id
                        }
                    });
                }
            }
        },
        components: {
            bottomTab
        }
    }
</script>

<style scoped>
    #mainPage {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        background: #f2f2f2;
    }

    .goPage {
        overflow: hidden;
        display: block;
        margin: 0 auto;
        background: #fff;
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        color: #333;
        font-size: 18px;
        border-bottom: 1px solid #f2f2f2;
    }

    .goPage span {
        float: left;
    }

    .goPage i {
        float: right;
        margin-top: 12px;
    }

    .goPage img {
        overflow: hidden;
        display: block;
        width: 8px;
        height: 14px;
        float: right;
        margin-top: 16px;
        margin-right: 10px;
    }

    .goTitle i {
        margin-top: 10px;
        float: right;
    }

    .mapContainer {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        max-height: 317px;
    }

    .shopNum {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        font-family: "PingFang SC";
        font-weight: 300;
        font-size: 14px;
        color: #909090;
        text-align: center;
    }

    .list {
        width: 94%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        padding-left: 3%;
        padding-right: 3%;
        margin-top: 10px;
        padding-bottom: 20px;
    }

    .list li {
        width: 100%;
        height: 133px;
        background: transparent;
        margin-bottom: 20px;
        border-radius: 13px;
        background: #fff;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        overflow: hidden;
    }

    .list img {
        float: left;
    }

    .list .rt {
        width: 58%;
        float: left;
        padding-left: 15px;
    }

    .list .rt h5 {
        font-family: "PingFang SC";
        font-weight: normal;
        font-size: 18px;
        text-align: left;
        color: #3b3b3b;
        margin: 0;
        margin-top: 18px;
        margin-bottom: 7px;
    }

    .list .rt span {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        font-family: "PingFang SC";
        font-weight: normal;
        font-size: 12px;
        text-align: left;
        color: #909090;
    }

    .list .rt em {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        font-family: "PingFang SC";
        font-weight: normal;
        font-size: 16px;
        padding-right: 1px;
        margin-top: 20px;
        float: right;
        text-align: right;
    }

    .list .rt em.green {
        color: #37cb00;
    }

    .list .rt em.red {
        color: #F8847F;
    }
</style>
