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
        ifGetNewClass: false,
        semester_id: '49'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        var today = new Date();
        var getwlist = wx.getStorageSync('wlist');
        var lastDay = wx.getStorageSync('lastDay');
        console.log(lastDay);
        // var lastDay = new Date(that.data.lastRequestsTime);
        that.setData({
            uid: app.globalData.uid,
            pwd: app.globalData.pwd,
            wlist: getwlist,
        });
        // 判断是否获得新的课表
        console.log(getwlist);
        if (getwlist != '' || getwlist == []) {
            // 如果
            console.log(getwlist != '' & getwlist != []);
            console.log(today.getDate());
            console.log(lastDay.getDate());
            if (today.getDate() - 7 >= lastDay.getDate() || today.getDay() < lastDay.getDay()) {
                console.log(today.getDate() - 7 >= lastDay.getDate())
                that.data.ifGetNewClass = true;
            }
        } else {
            console.log('else');
            that.data.ifGetNewClass = true;
        }

        // 判断获得新的课表
        that.getclass(that.data.ifGetNewClass, that);
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
        console.log('onPullDownRefresh');
        var that = this;
        that.getclass(true, that)
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

    /** 
     * 获取新的课表内容 
     */
    getclass: function(ifGetNewClass, that) {
        console.log(that.data);
        console.error(ifGetNewClass);
        if (ifGetNewClass) {
            // 开始请求
            wx.request({
                // url: 'http://127.0.0.1:5000/wechart/CqClassBox/getClass/uid=' + that.data.uid + '&pwd=' + that.data.pwd,
                url: 'http://39.107.243.115:5000/wechart/CqClassBox/getClass/uid=' + that.data.uid + '&pwd=' + that.data.pwd,
                data: {
                    semester_id: that.data.semester_id
                },
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: 'POST',
                success: function(res) {
                    // var day = new Date();
                    console.log(res.data);
                    that.setData({
                        wlist: res.data
                    })
                    // 设置课表的本地缓存，用来下次进入时候使用
                    wx.setStorageSync('wlist', res.data);
                    wx.setStorageSync('lastDay', new Date());
                    // 结束下拉动画
                    wx.stopPullDownRefresh();
                },
                fail: function(res) {
                    wx.showToast({
                        title: '请求课表失败，请稍后再试！',
                        image: '/images/info.png',
                        icon: 'none',
                        duration: 2000
                    });
                },
                complete: function(res) {

                },
            });
        } else {
            // 结束下拉动画
            wx.stopPullDownRefresh();
            // console.log('getNewClass-useless')
        }
    },
    toOtherClass: function() {
        var that = this;
        var itemValue = ['49', '48', '47'];
        wx.showActionSheet({
            itemList: ['课表： 2018-下半年', '课表： 2018-上半年', '课表： 2017-下半年'],
            success: function(res) {
                // console.log(that.data);
                // console.log(res.tapIndex)
                that.setData({
                    semester_id: itemValue[res.tapIndex],
                });
                // console.log(itemValue[res.tapIndex])
            },
            fail: function(res) {
                console.log(res.errMsg)
            }
        })
    }
})