var t = require("../../wxParse/wxParse.js");
var api = require('../../utils/api.js');
Page({
    data: {
        list: [],
        image: null,
        content:'',
        material: null,
        peoplenum: null,
        preparetime: null,
        process: []
    },
    onLoad: function(a) {
        var e = this;
        wx.request({
            url: api.caipu_url_detail,
            data: {              
                id: a.id
            },
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                e.setData({
                    list: a.data.result.result
                }), e.setData({
                    image: e.data.list.pic,
                    content: t.wxParse("content", "html", e.data.list.content, e, 5),
                    material: e.data.list.material,
                    peoplenum: e.data.list.peoplenum,
                    preparetime: e.data.list.preparetime,
                    process: e.data.list.process
                });
            }
        });
    }
});