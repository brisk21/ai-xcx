//域名地址 请替换成自己的域名 如果使用XAI项目 接口地址无需更改只需要域名地址或者本地IP

var baseUrl = 'https://api.alipay168.cn/api/';
//接口访问类型 
var version = '1.0';
var sercret = 'aoy54fewxbREODe16x4fe02s1dfef5xd1fdfdfw125f1sa12epexfwe';
/*接口地址开始*/
//菜谱地址
const caipu_url_search = baseUrl + '?version=' + version + '&request=wxxcx.other.caipuSearch' + '&app_secret=' + sercret;
const caipu_url_detail = baseUrl + '?version=' + version + '&request=wxxcx.other.caipuDetail' + '&app_secret=' + sercret;
//图片上传，主要的接口
const uploadImgUrl = baseUrl + '?version=' + version + '&request=wxxcx.security.uploadImg' + '&app_secret=' + sercret;
//用户信息
const userUrl = baseUrl + '?version=' + version + '&request=wxxcx.security.getOpenid' + '&app_secret=' + sercret;
const userInfoUrl = baseUrl + '?version=' + version + '&request=wxxcx.security.userInfo' + '&app_secret=' + sercret;
/*常量函数*/
function getuploadImgUrl() {
  return uploadImgUrl;
}

function getUserOpenidUrl() {
  return userUrl;
}
function getUserInfoUrl() {
  return userInfoUrl;
}

function getLocationToken() {
  return wx.getStorageSync('userToken');
}

// api.httpRequest(baseCheckApi,{user:'123',time:123465},function(res){
//   console.log(res)
// },'GET');
function httpRequest(url, data, returnFun, method = 'POST') {
  wx.request({
    url: url,
    data: data,
    method: method,
    header: {
      "content-type": "application/json"
    },
   // dataType: 'json',
    success: function(res) {
      //console.log('request',res)
      return returnFun(res);
    },
    fail: function() {
      console.log('request fail', url)
    }
  })
}

/*暴露常量函数*/
module.exports.getUserOpenidUrl = getUserOpenidUrl;
module.exports.getUserInfoUrl = getUserInfoUrl;
module.exports.getuploadImgUrl = getuploadImgUrl;
module.exports.httpRequest = httpRequest;
module.exports.getToken = getLocationToken;
//module.exports.caipu_appkey = caipu_appkey;
module.exports.caipu_url_search = caipu_url_search;
module.exports.caipu_url_detail = caipu_url_detail;