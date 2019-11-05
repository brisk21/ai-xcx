
var api = require('../../utils/api.js');
Page({
  onLoad: function (t) {
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: api.getUserOpenidUrl(),
            method:'GET',
            data: {
              code: res.code
            },
            success:function(res){
                //console.log(res)
                if(res.data.code==0){
                   wx.setStorage({
                     key: 'userToken',
                     data: res.data.token,
                     success: function(res) {
                       //console.log('save TOKEN ok')
                     },
                     fail: function(res) {},
                     complete: function(res) {},
                   })
                }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    
  },
    data: {
        
    },

    previewImage: function(a) {
        wx.previewImage({
            current: this.data.imgalist,
            urls: this.data.imgalist
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
    //跳转菜品识别
    Dishes: function(a) {
      wx.navigateTo({
        url: "../cpsbIndex/cpsbIndex"
      });
    },
    //跳转车型识别
    CarDetect: function(a) {
      wx.navigateTo({
        url: "../cxsbIndex/cxsbIndex"
      });
    },
    //跳转动物识别
    AnimalDetect: function(a) {
      wx.navigateTo({
        url: "../dwsbIndex/dwsbIndex"
      });
    },
    //跳转植物识别
    PlantDetect: function(a) {
      wx.navigateTo({
        url: "../zwsbIndex/zwsbIndex"
      });
    },
    //跳转物品识别
    AdvancedGeneral: function(a) {
      wx.navigateTo({
        url: '../wpsbIndex/wpsbIndex',
      })
    },
    //跳转人脸检测
    Face: function(a) {
      wx.navigateTo({
        url: '../faceIndex/faceIndex',
      })
    },
    PhoneInfo: function(a) {
        try {
            var e = wx.getSystemInfoSync();
            wx.navigateTo({
                url: "../phone/phone?list=" + JSON.stringify(e)
            });
        } catch (a) {}
    },    
    caipu: function(a) {
        wx.navigateTo({
            url: "../caipu/caipu"
        });
    },
    about: function(a) {
        wx.navigateTo({
            url: "../about/about"
        });
    },
    //跳转文字识别
    bindPickerChange: function(a) {
        wx.navigateTo({
          url: '../wzsbIndex/wzsbIndex',
        })
    },
  /**
* 用户点击右上角分享
*/
  onShareAppMessage: function (a) {
    return {
      title: "AI识物-文字识别、菜品识别、植物识别、动物识别、车辆识别、菜谱大全、人脸检测",
      path: "/pages/index/index",
      success: function (a) { },
      fail: function (a) { }
    };
  },
});