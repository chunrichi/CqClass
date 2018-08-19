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
        wlist: [],
        ifGetNewClass: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        var today = new Date();
        var getwlist = wx.getStorageSync('wlist');
        var lastDay = wx.getStorageSync('lastDay');
        // var lastDay = new Date(that.data.lastRequestsTime);
        that.setData({
            uid: app.globalData.uid,
            pwd: app.globalData.pwd,
            wlist: getwlist,
        });   
        if (getwlist != '') {
            console.log(getwlist)
            // lastDay.getDate() -7 <= today.getDate()
            if (today.getDate() - 7 >= lastDay.getDate() || today.getDay() < lastDay.getDay()) {
                console.log(that.data.lastRequestsTime)
                that.data.ifGetNewClass = true;
            }
        } else {
            that.data.ifGetNewClass = true;
        }
        if (that.data.ifGetNewClass) {
            wx.request({
                url: 'http://127.0.0.1:5000/wechart/CqClassBox/getClass/uid=201503306&pwd=201503306',
                // url: 'http://39.107.243.115:5000/wechart/CqClassBox/getClass/uid=201503306&pwd=201503306',
                method: 'POST',
                success: function(res) {
                    var day = new Date()
                    console.log(res.data);
                    that.setData({
                        wlist: res.data
                    })
                    // 设置课表的本地缓存，用来下次进入时候使用
                    wx.setStorageSync('wlist', res.data);
                    wx.setStorageSync('lastDay', new Date())
                },
                fail: function(res) {},
                complete: function(res) {},
            });
        }
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