<template>
    <div id="skin-blur-violate">
        <section id="login">
            <header>
                <img src="../static/images/login/logo.png" height="109" width="109" id="logo"/>
                <img src="../static/images/login/title.png" height="100%" width="274px"/>
            </header>
            <div class="clearfix"></div>
            <!-- Login -->
            <form class="box tile animated active" id="box-login">
                <h2 class="m-t-0 m-b-15"></h2>
                <div class="rowHeight">
                    <input type="text" class="login-control login_account" placeholder="输入手机号"
                           v-model="login.phone">
                </div>
                <div class="rowHeight">
                    <input type="number" class="login-control login_valid" placeholder="输入右侧图形码"
                           v-model="login.uservalid">
                    <img id="imgValidcode" :src="valImgSrc" :title="InvisibilityGiveitatry" @click="getValImgSrc">
                </div>
                <div class="rowHeight">
                    <input type="password" class="login-control login_pwd" placeholder="输入验证码" v-model="login.userpwd"
                           @keyup.enter="pwdLoginBtn">
                    <mu-button id="getValidSms" :disabled="getValidSmsState" color="success" @click="getValidSmsBtn">
                        {{btnText}}
                    </mu-button>
                </div>
                <div class="btn_center">
                    <span class="btn btn-md login_btn" @click="pwdLoginBtn">登    录</span>
                </div>
            </form>
        </section>
        <mu-snackbar :position="normal.position" :open.sync="normal.open" :color="normal.color">
            {{normal.message}}
            <mu-button flat slot="action" color="secondary" @click="normal.open = false">{{"close"}}</mu-button>
        </mu-snackbar>
    </div>
</template>

<script>
    import {
        testSelect,
        testPic,
    } from '../api/getApiRes.js'

    let qs = require('qs');

    export default {
        data() {
            let samepass = (rule, value, callback) => {
                if (value !== this.form.newpwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            let pwdPass = (rule, value, callback) => {
                let re = /^[0-9a-zA-Z_]{1,}$/;
                if (value.search(re) == -1) {
                    callback(new Error('错了哦，密码只能由字母、数字及下划线组成'));
                } else {
                    callback()
                }
            };
            let phonetest = (rule, value, callback) => {
                let re = /^1[3|4|5|7|8|9][0-9]\d{8}$/;
                if (value.search(re) == -1) {
                    callback(new Error('错了哦，手机号码格式不正确'));
                } else {
                    callback()
                }
            };
            return {
                Password: "Password",
                VerificationCode: "Verification Code",
                InvisibilityGiveitatry: "无效?再点一下试试吧!",
                valImgSrc: '',//
                picId: '',//
                getValidSmsState: false,//
                overtime: '',
                btnText: '获取验证码',
                normal: normal,
                login: {
                    phone: '',
                    userpwd: '',
                    uservalid: '',
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur'},
                    ],
                    phone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {min: 11, max: 12, message: '手机号长度是11位', trigger: 'blur'},
                        {validator: phonetest, trigger: 'blur'}
                    ],
                    re_phonevalid: [
                        {required: true, message: '请输入验证码', trigger: 'blur'},
                        {min: 4, max: 4, message: '长度在 4 个字符', trigger: 'blur'},
                    ],
                    newpwd: [
                        {required: true, message: '请输入新密码', trigger: 'blur'},
                        {min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur'},
                        {validator: pwdPass, trigger: 'blur'}
                    ],
                    again: [
                        {required: true, message: '请输入确认密码', trigger: 'blur'},
                        {min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur'},
                        {validator: pwdPass, trigger: 'blur'},
                        {validator: samepass, trigger: 'blur'},
                    ],
                }
            }
        },
        mounted() {
            // 获取图形验证码
            // alert(document.body.clientWidth);
            this.getValImgSrc();
            this.overtime = new Date();
        },
        methods: {
            // 获取验证码
            getValidSmsBtn() {
                let that = this;
                let phone = that.login.phone;
                let uservalid = that.login.uservalid;
                if (!phone) {
                    that.Toast('手机号不能为空');
                    return false
                }
                if (phone.length != 11) {
                    that.Toast('手机号只能是11位');
                    return false
                }
                if(!globalCheckPhone(phone)){
                    that.Toast('手机号格式不正确');
                    return false
                }
                if (!uservalid) {
                    that.Toast('图形验证码不能为空');
                    return false
                }
                if (uservalid.length != 4) {
                    that.Toast('图形验证码只能是4位');
                    return false
                }
                let param = {
                    token: localStorage.token,
                    uservalid: uservalid,
                };
                let postdata = qs.stringify(param);
                testSelect(postdata).then(res => {
                    let json = res;
                    if (json.Code == 0) {
                        that.Toast('短信验证码已发送', 'success');
                        that.calcTime();
                    } else {
                        that.$message.error(json.Memo);
                    }
                })
            },
            calcTime() {
                let countdown = 5;
                let that = this;
                //设置button效果，开始计时
                that.getValidSmsState = true;
                that.btnText = countdown + "S"
                //启动计时器，1秒执行一次
                let timer = setInterval(function () {
                    if (countdown == 0) {
                        clearInterval(timer);//停止计时器
                        that.getValidSmsState = false;
                        that.btnText = "重新发送"
                    } else {
                        countdown--;
                        that.btnText = countdown + "S"
                    }
                }, 1000);
            },
            clearLogin() {
                this.login.username = '';
                this.login.userpwd = '';
                this.login.uservalid = '';
                this.getValImgSrc();
            },
            // 点击验证码切换
            getValImgSrc() {
                let that = this;
                let param = {
                    token: localStorage.token,
                };
                let postdata = qs.stringify(param);
                testPic(postdata).then(res => {
                    let json = res;
                    if (json.Code == 0) {
                        that.valImgSrc = json.pic;
                        that.valImgId = json.id;
                    } else {
                        that.$message.error(json.Memo);
                    }
                })
            },
            // pwd登录
            pwdLoginBtn() {
                let that = this;
                let phone = this.login.phone;
                let uservalid = this.login.uservalid;
                // 重置验证码超时
                that.overtime = new Date();
                if (!that.globalValid(phone, 10, 12, '手机号', that)) return;
                if (!that.globalValid(uservalid, 3, 5, '短信验证码', that)) return;
                this.loginInfo();
            },
            // 校验内容长度
            globalValid(data, mins, maxs, text, that) {
                let thisVal = data;
                let thisLeng = thisVal.length;
                let min = parseInt(mins);
                let max = parseInt(maxs);
                let dispalyMin = min + 1;
                if (thisVal == '') {
                    this.Toast(text + ' ' + '不能为空');
                    return false
                } else if (thisLeng <= min) {
                    this.Toast(text + '最少' + dispalyMin + '字符');
                    return false
                } else if (thisLeng > max) {
                    this.Toast(text + '超过限制长度');
                    return false
                } else {
                    return true
                }
            },
            //            pwd登陆
            loginInfo: function () {
                const that = this;
                let url = headapi + 'v1/Auth/SignIn';
                let username = this.login.username;
                let userpwd = this.login.userpwd;
                let uservalid = this.login.uservalid;
                let picId = this.picId;
                let current = new Date();
                let betweenTime = current - that.overtime;
                let s = 120;
                if (betweenTime > s * 1000) {
                    that.changeValImg();
                    that.$message.error('The verification code has timed out. Please re-enter');
                    return false
                }
                let param = {
                    'verifyName': username,
                    'verifyCode': userpwd,
                    'picId': picId,
                    'picCode': uservalid,
                    'src': 'pc'
                };
                let postdata = qs.stringify(param);
                testSelect(postdata).then(res => {
                    let json = res;
                    if (json.Code == 0) {
                        localStorage.token = json.Rs.token;
                        that.getUserInfo(json.Rs.token);
                    } else {
                        that.Toast(json.Memo + ',错误码：' + json.Code);
                        that.getValImgSrc();//重置验证码
                        that.clearLogin();
                    }
                })
            },
            getUserInfo(token) {
                let that = this;
                let param = {
                    token: token,
                };
                let postdata = qs.stringify(param);
                testSelect(postdata).then(res => {
                    let json = res;
                    if (json.Code == 0) {
                        var userLevel = json.Rs.Rolesname;
                        localStorage.userLevel = userLevel;
                        localStorage.comId = json.Rs.Comid;
                        localStorage.Insname = json.Rs.Insname;
                        that.$router.push({path: '/'});
                    } else {
                        that.$message.error(json.Memo);
                    }
                })
            }
        },
        components: {}
    }
</script>

<style scoped>
    #skin-blur-violate {
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        background: #3B3B3B;
        background: url("../static/images/login/bg.png") top center no-repeat;
        background-size: 100% 100%;
    }

    #login {
        width: 90%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
    }

    #login .box {
        margin: 0 auto;
        position: inherit;
        margin-top: 20px;
        border-radius: 9px;
        padding: 20px 20px;
    }

    h1 {
        color: #FFA200;
        font-size: 30px;
    }

    header p {
        font-size: 14px;
        color: #7B7B7B;
    }

    #login header {
        text-align: center;
        margin-top: 15%;
    }

    #box-login h2 {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        margin-bottom: 20px;
        text-align: center;
        font-size: 24px;
        color: #fff;
    }

    #tableBordered {
        margin: 0;
        padding: 0;
    }

    #tableBordered h5 {
        margin: 0;
        text-align: center;
        padding: 0;
    }

    #login .box {
        margin: 0 auto;
        position: inherit;
        margin-top: 20px;
        border-radius: 9px !important;
    }

    #login header {
        text-align: center;
        margin-top: 15%;
    }

    #tableBordered {
        margin: 0;
        padding: 0;
    }

    #tableBordered h5 {
        margin: 0;
        text-align: center;
        padding: 0;
    }

    #imgValidcode {
        position: relative;
        float: right;
        /*bottom: 54px;*/
        width: 121px;
        height: 50px;
        background: #eee;
    }

    .login_btn {
        width: 100%;
        height: 50px;
        line-height: 50px;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        margin-top: 42px;
        background: #E75296;
        color: #fff;
        font-size: 14px;
        text-align: center;
        border: none;
        padding: 0;
        font-size: 24px;
        margin-bottom: 3%;
    }

    .clear_btn {
        width: 100%;
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.32);
        color: #FFCC00;
        font-size: 14px;
        text-align: center;
        border: none;
        padding: 0;
    }

    header p {
        margin-top: 10px;
    }

    #login .login-control {
        width: 100%;
        height: 50px;
        line-height: 50px;
        background: rgba(255, 255, 255, 0.4);
        margin-bottom: 3px;
        text-indent: 10px;
        border: none;

    }

    #login .login-control::placeholder {
        color: #000000;
        font-size: 16px;
    }

    #logo {
        overflow: hidden;
        display: block;
        margin: 0 auto;
        margin-top: 10%;
        margin-bottom: 10px;
    }

    .rowHeight {
        width: 100%;
        overflow: hidden;
        display: block;
        margin: 0 auto;
        height: 50px;
        margin-bottom: 3px;
    }

    #getValidSms {
        width: 121px;
        height: 50px;
        background: #fff;
        border: 1px solid #fff;
        opacity: 0.6;
        position: relative;
        /*bottom: 55px;*/
        float: right;
        text-align: center;
        color: #E75296;
        line-height: 50px;
        font-size: 16px;
    }

    #login .login_valid {
        width: 173px;
        float: left;
    }

    #login .login_pwd {
        width: 173px;
        float: left;
    }
    @media only screen and (max-width: 640px) {

    }
    @media only screen and (max-width: 480px) {
        #login .login_valid {
            width: 195px;
        }
        #login .login_pwd {
            width: 195px;
        }
    }
    @media only screen and (max-width: 415px) {
        #login .login_valid {
            width: 205px;
        }
        #login .login_pwd {
            width: 205px;
        }
    }
    @media only screen and (max-width: 400px) {

        #login .login_valid {
            width: 195px;
        }
        #login .login_pwd {
            width: 195px;
        }
    }
    @media only screen and (max-width: 375px) {

    }
    @media only screen and (max-width: 360px) {
        #login .login_valid {
            width: 160px;
        }
        #login .login_pwd {
            width: 160px;
        }
        #getValidSms {
            font-size: 14px;
        }
    }
    @media only screen and (max-width: 320px) {

    }
    @media only screen and (min-width: 641px) {

    }
</style>
