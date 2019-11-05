var api = require('../../utils/api.js');
Page({
    data: {
        inputValue: "",
        list: []
    },
    bindKeyInput: function(t) {
        this.setData({
            inputValue: t.detail.value
        });
    },
    search: function() {
        var t = this;
        wx.showLoading({
            title: "正在查询"
        }), wx.request({
            url: api.caipu_url_search,
            data: {               
                keyword: this.data.inputValue,
            },
            header: {
                "content-type": "application/json"
            },
            success: function(n) {
              if(n.data.code=="10040"){
                wx.showModal({
                  title: '超量提醒：',
                  content: n.data.msg,
                })
                wx.hideLoading();
                return;
              }
              console.log(n)
                wx.hideLoading(), t.setData({
                    list: n.data.result.result.list
                });
            }
        });
    },
    onLoad: function(t) {
      let that=this;
      that.setData({
        inputValue:'白菜'
      });
      that.search();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});