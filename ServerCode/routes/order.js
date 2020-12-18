const express = require('express');
const router = express.Router();
const request = require('request');
const Order = require('../models/Order');
const OpenID = require('../models/OpenID');

/*params: {
appid: _user.mini_appid,
secret: _user.mini_secret,
js_code: code,
grant_type: 'authorization_code'
}*/

//appid & secret은 추후에 가져와야함
const baseURL = "https://api.weixin.qq.com/sns/jscode2session"
const appid = '123';
const secret = '123';
var js_code;
const grant_type = "'authorization_code'";
var amount;
var openID;

/*function get_openID(){
    const openID = new OpenID({
        js_code: req.body.js_code,
        amount: req.body.request
    })
    console.log(wechatAPI)
    request(wechatAPI, function(error, response, body){
        openID = body.openID;
    });
    console.log(openID)
    request('https://open.ifprod.cc/api/v1/shoots/pay', 'POST', {
        openId: openID,
        amount: 100,
    });
}*/



router.post('/', function(req, res) {
    const order = new Order({
        js_code: req.body.js_code,
        amount: req.body.amount
    })
    console.log(order.js_code)
    console.log(order.amount)
    wechatAPI = baseURL+'?appid='+appid+'&secret='+secret+'&js_code='+order.js_code+'&grant_type='+grant_type
    console.log(wechatAPI)

    request(wechatAPI, function(error, response, body){
        const openID = new OpenID({
            openID: body.openID
        })
    });
    console.log(openID)
    request('https://open.ifprod.cc/api/v1/shoots/pay', 'POST', {
        openId: openID,
    });
});

module.exports = router;