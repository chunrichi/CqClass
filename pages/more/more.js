// pages/test/test.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        help_status: false
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

    },
    logout: function() {
        wx.clearStorage();
        wx.redirectTo({
            url: '../index/index',
        })
    },
    tapHelp: function(e) {
        if (e.target.id == 'help') {
            this.hideHelp();
        }
    },
    showHelp: function(e) {
        this.setData({
            'help_status': true
        });
    },
    hideHelp: function(e) {
        this.setData({
            'help_status': false
        });
    },
    UidInput: function(e) {
        if (e.detail.value.length >= 9) {
            wx.hideKeyboard();
        }
    },
})