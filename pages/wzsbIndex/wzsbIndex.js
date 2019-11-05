// pages/wzsbIndex/wzsbIndex.js
var api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ["中英文混合", "英文", "葡萄牙语", "法语", "德语", "意大利语", "西班牙语", "俄语", "日语", "韩语"],
    objectArray: [{
      id:0,
      name: "CHN_ENG"
    }, {
      id: 1,
      name: "ENG"
    }, {
      id: 2,
      name: "POR"
    }, {
      id: 3,
      name: "FRE"
    }, {
      id: 4,
      name: "GER"
    }, {
      id: 5,
      name: "ITA"
    }, {
      id: 6,
      name: "SPA"
    }, {
      id: 7,
      name: "RUS"
    }, {
      id: 8,
      name: "JAP"
    }, {
      id: 9,
      name: "KOR"
    }],
    index: 0,
    lang: "",
  },
  bindPickerChange: function(a) {
    var e = this;
    let types = a.currentTarget.id;
    e.setData({
      lang: e.data.objectArray[a.detail.value].name
    }), 

    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: [types],
      success: function(a) {
        var t = a.tempFilePaths;
        getApp().globalData.img = t, wx.showLoading({
          title: "正在识别"
        }), wx.uploadFile({
          url: api.getuploadImgUrl(),
          filePath: t[0],
          name: "file",
          formData: {
            user: api.getToken(),
            type:"wenzi",
            language: e.data.lang
          },
          success: function(res) {
            res = JSON.parse(res.data);
           // console.log(res)
            
            if (res.code != 0) {
              wx.showToast({
                title: res.msg,
                icon: 'none',
                duration: 2000
              })
            } else {
              wx.setStorage({
                key: 'ocrText',
                data: JSON.stringify(res.result)
              })
              wx.hideLoading(), wx.navigateTo({
              url: "../font/font?list=" + ''
            }), console.log(res.result);
            }}
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})