// pages/wpsbIndex/wpsbIndex.js
var api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  AdvancedGeneral: function (a) {
    let types = a.currentTarget.id;
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: [types],
      success: function (a) {
        var e = a.tempFilePaths;
        getApp().globalData.img = e, wx.showLoading({
          title: "正在识别"
        }), wx.uploadFile({
          url: api.getuploadImgUrl(),
          filePath: e[0],
          name: "file",
          formData: {
            user: api.getToken(),
            type:"tongyong"
          },
          success: function (res) {
            res = JSON.parse(res.data)
            wx.hideLoading();
            if (res.code != 0) {
              wx.showToast({
                title: res.msg,
                icon: 'none',
                duration: 2000
              })
            } else {
            wx.navigateTo({
              url: "../tongyong/tongyong?list=" + JSON.stringify(res.result)
            }), console.info(res.result);
          }}
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})