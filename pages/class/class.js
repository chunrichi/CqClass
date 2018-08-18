// pages/index/index.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        uid: '',
        pwd: '',
        colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD", '#85C69D'],
        wlist1: [
            { "xqj": 1, "skjc": 1, "skcd": 4, "kcmc": "高等数学@教A-301" },
            { "xqj": 1, "skjc": 5, "skcd": 3, "kcmc": "高等数学@教A-301" },
            { "xqj": 2, "skjc": 1, "skcd": 2, "kcmc": "高等数学@教A-301" },
            { "xqj": 2, "skjc": 8, "skcd": 2, "kcmc": "高等数学@教A-301" },
            { "xqj": 3, "skjc": 4, "skcd": 1, "kcmc": "高等数学@教A-301" },
            { "xqj": 3, "skjc": 8, "skcd": 1, "kcmc": "高等数学@教A-301" },
            { "xqj": 3, "skjc": 5, "skcd": 2, "kcmc": "高等数学@教A-301" },
            { "xqj": 4, "skjc": 2, "skcd": 3, "kcmc": "高等数学@教A-301" },
            { "xqj": 4, "skjc": 8, "skcd": 2, "kcmc": "高等数学@教A-301" },
            { "xqj": 5, "skjc": 1, "skcd": 2, "kcmc": "高等数学@教A-301" },
            { "xqj": 6, "skjc": 3, "skcd": 2, "kcmc": "高等数学@教A-301" },
            { "xqj": 6, "skjc": 7, "skcd": 3, "kcmc": "高等数学@教A-301" },
            { "xqj": 7, "skjc": 5, "skcd": 3, "kcmc": "高等数学@教A-301" }],
        wlist:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        that.setData({
            uid: app.globalData.uid,
            pwd: app.globalData.pwd,
        });
        wx.request({
            url: 'http://127.0.0.1:5000/wechart/CqClassBox/getClass/uid=201503306&pwd=201503306',
            // url: 'http://39.107.243.115:5000/wechart/CqClassBox/getClass/uid=201503306&pwd=201503306',
            method: 'POST',
            success: function(res) {
                console.log(res.data);
                that.setData({
                    wlist:res.data,
                })
            },
            fail: function(res) {},
            complete: function(res) {},
        })
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