// pages/welcome/welcome.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userName: '张三',
        firstName: '？',
        week: new Date().getDay(), // 今天的周数
        theDay: new Date().toLocaleDateString(), //今日时间
        todayWeek: [], //开学周期 week周 day星期
        todayClassName: '', //今日课程班级
        todayClass: '', //今日课程
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var uid = wx.getStorageSync('uid');
        var pwd = wx.getStorageSync('pwd');
        // var stuName = wx.getStorageSync('stuName');
        var userMessage = wx.getStorageSync('userMessage');
        var that = this;
        
        console.log(userMessage)

        that.setData({
            userName: userMessage['stuName'],
            major: userMessage['major'],
            firstName: userMessage['stuName'][0],
        });

        console.log(that.data)
        if (pwd == "") {
            wx.showToast({
                title: '请求出错！',
                icon: 'none',
                duration: 2000
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
        var that = this;
        var wlist = wx.getStorageSync('wlist');
        var todayWeek = new Array();
        var cls;
        console.log(wlist);
        for (cls in wlist) {
            if (wlist[cls].xqj == that.data.week) {
                todayWeek.push(wlist[cls]);
            }
        }
        console.log(todayWeek);
        that.setData({
            todayWeek: todayWeek,
        });
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