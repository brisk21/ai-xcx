// pages/cpsbIndex/cpsbIndex.js
var api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
 
  },
  
  //拍照识菜
  Dishes: function (a) {
    console.log('click')
    let types=a.currentTarget.id;
    wx.chooseImage({
        count: 1,
        sizeType: [ "original", "compressed" ],
      sourceType: [types],
        success: function(a) {
            var e = a.tempFilePaths;
            getApp().globalData.img = e,
              wx.showLoading({
                title: "正在识别"
              }),
             wx.uploadFile({
              url: api.getuploadImgUrl(),
                filePath: e[0],
                name: "file",
                formData: {
                    user: api.getToken(),
                    type:'caipu'
                },
                success: function(res) {
                  var res = JSON.parse(res.data)
                  //console.log(res)
                    if(res.code!=0){
                      wx.showToast({
                        title: res.msg,
                        icon:'none',
                        duration:2000
                      })
                    }else{                     
                      wx.hideLoading(), wx.navigateTo({
                        url: "../content/content?list=" + JSON.stringify(res.result)
                      });
                    }
                   
                },
                fail:function(e){
                   console.log(e)
                }
            });
        }
    });
  },
})