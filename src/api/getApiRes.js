import axios from 'axios';
import global from '../Global.js'
// 基础方法进行封装
function getApiBasic(url, postdata) {
    return  axios.post(url, postdata).then(function(data){
        let json = data.data;
        return json
    },function(response){
        console.info(response);
    })
}

// 调用的api改写成方法
export function worldDetail(postdata) {
        let url = headapi + 'worldDetail';
        return getApiBasic(url,postdata);
}

export function SignIn(postdata) {
        let url = headapi + 'SignIn';
        return getApiBasic(url,postdata);
}
export function GenVerifyPic(postdata) {
        let url = headapi + '/Auth/GenVerifyPic';
        return getApiBasic(url,postdata);
}

export function editbasicinfo(postdata) {
    let url = headapi + 'editbasicinfo';
    return getApiBasic(url,postdata);
}
export function modPwd(postdata) {
    let url = headapi + 'modPwd';
    return getApiBasic(url,postdata);
}
export function logout(postdata) {
    let url = headapi + 'logout';
    return getApiBasic(url,postdata);
}

// 调用的api改写成方法
export function testTable(postdata) {
    let url = headapi + 'testTable';
    return getApiBasic(url,postdata);
}
export function testSelect(postdata) {
    let url = headapi + 'testSelect';
    return getApiBasic(url,postdata);
}

export function testPic(postdata) {
    let url = headapi + 'testPic';
    return getApiBasic(url,postdata);
}





