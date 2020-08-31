import Mock from 'mockjs'

let Random = Mock.Random;

// worldDetail
let worldDetail = function () {
    let item = [];
    for (var i = 0; i < 30; i++) {
        item.push({
            "id": "@guid",
            "name": "@region",
            "Confirmed": "@integer(36844, 368449)",
            "Deaths": "@integer(1099, 10993)",
            "Recovered": "@integer(1986, 19865)",
        })
    }

    let res = {
        Rs: item,
        Code: 0,
        Memo: ''
    };
    return res;
};

let testPic = function () {
    let res = {
        pic:  Random.image('200x100', '#894FC4', '#FFF', '@natural(1111, 9999)'),
        id: "@guid",
        Code: 0,
        Memo: ''
    };
    return res;
};

let testTable = function () {
    let item = [];

    let members = [
        {id: 1, name: '霍元甲', userCode: '15253135600', vipType: 1},
        {id: 2, name: '陈真', userCode: '15253135602', vipType: 2},
        {id: 3, name: '成龙', userCode: '15253135604', vipType: 1},
    ]

    for (var i = 0; i < 6; i++) {
        item.push({
            "id": "@guid",
            "userCode": "@integer(15253135600, 15253135699)",
            "name": "@region",
            "tel": "@integer(15253135600, 15253135699)",
            "shop": "@region",
            "create": "@datetime",
            "expTime": "@date",
            "valid": "@datetime",
            "Confirmed": "@integer(36844, 368449)",
            "Deaths": "@integer(1099, 10993)",
            "kick": "@integer(199, 993)",
            "Recovered": "@integer(1986, 9999)",
            "Status": "0",
            "level": "0",
            // "Status": "@integer(1, 2)",
            "color": "@hex",
            "memo": "@paragraph(1, 1)",
            "dialogValue": "@range(1, 3)",
            "vipType": "@integer(1, 2)",
            "members": members,
            "wxVisible": "@integer(0, 1)",
            "timeLong": "14:00-16:00",
            "timeScope":  [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        })
    }

    let res = {
        Rs: item,
        Code: 0,
        Memo: ''
    };
    return res;
};

let testSelect = function () {
    let item = [];
    for (var i = 0; i < 30; i++) {
        item.push({
            "key": i + 1,
            "value": i + 1,
            "label": "@region",
        })
    }

    let res = {
        Rs: item,
        Code: 0,
        Memo: ''
    };
    return res;
};

let SignIn = function () {

    let Rs = {
        token: "@guid"
    };
    let res = {
        Rs: Rs,
        Code: 0,
        Memo: '登陆成功'
    };
    return res;
};

let editbasicinfo = function () {

    let res = {
        Code: 0,
        Memo: '修改成功'
    };
    return res;
};

let modPwd = function () {
    let res = {
        Code: 0,
        Memo: '修改成功'
    };
    return res;
};
let logout = function () {
    let res = {
        Code: 0,
        Memo: '退出成功'
    };
    return res;
};

Mock.mock('/api/testPic', 'post', testPic());
Mock.mock('/api/testSelect', 'post', testSelect());
Mock.mock('/api/testTable', 'post', testTable());
Mock.mock('/api/worldDetail', 'post', worldDetail());
Mock.mock('/api/SignIn', 'post', SignIn());//用户登录
Mock.mock('/api/editbasicinfo', 'post', editbasicinfo());//用户设置修改
Mock.mock('/api/modPwd', 'post', modPwd());//密码修改
Mock.mock('/api/logout', 'post', logout());//退出登陆

export default Mock;
