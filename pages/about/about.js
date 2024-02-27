var a = require("../../utils/util.js");
var api = require('../../utils/api.js');
Page({
  data: {
    show: !1,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function(a) {
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          var that = this
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              //console.log(res.userInfo)
              api.httpRequest(api.getUserInfoUrl(),{
                user: api.getToken(),
                type: "userInfo",
                userInfo: res.userInfo
              },function(res){
                  console.log(res.data)
                },'GET');

            
            }
          })
        }
      }
    })
  },
  
  bindGetUserInfo(e) {
    //console.log(e.detail.userInfo)
    api.httpRequest(api.getUserInfoUrl(), {
      user: api.getToken(),
      type: "userInfo",
      userInfo: e.detail.userInfo
    }, function (res) {
      console.log(res.data)
    }, 'GET');
    
  },
  onShareAppMessage: function(a) {
    return {
      title: "图片识物-文字识别、菜品识别、植物识别、动物识别、车辆识别、菜谱大全、人脸检测",
      path: "/pages/index/index",
      success: function(a) {},
      fail: function(a) {}
    };
  },
  goZan: function() {
    wx.navigateToMiniProgram({
      appId: "wx18a2ac992306a5a4",
      path: "pages/apps/largess/detail?id=Jerpw4hPtFg%3D",
      extraData: {
        foo: 'bar'
      },
      success: function(a) {
   
      }
    });
  },
  goWx: function() {
    this.setData({
      show: !0
    });
  },
  close_lay: function(a) {
    this.setData({
      show: !1
    });
  },
  copyWx: function() {
    wx.setClipboardData({
      data: "wbs2463080236",
      success: function(s) {
        a.showModel("复制成功", "请使用微信添加朋友搜索！");
      }
    });
  }
});