// pages/index/index.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        uid: '',
        pwd: '',
        jsonContent: {},
        jsonStr: "",
        help_status: false,
        userid_focus: false,
        passwd_focus: false,
        angle: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var uid = wx.getStorageSync('uid')
        var pwd = wx.getStorageSync('pwd')
        if (pwd != "") {
            app.globalData.uid = uid;
            app.globalData.pwd = pwd;
            wx.switchTab({
                url: '../welcome/welcome',
            })
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

    },
    /**
     * 登录的点击事件
     */
    submitInfo: function(e) {
        // console.log('form发生了submit事件，携带数据为：', e.detail.value)
        var that = this;
        app.globalData.uid = e.detail.value.uid;
        app.globalData.pwd = e.detail.value.pwd;
        if (e.detail.value.uid.length == 0 || e.detail.value.pwd.length == 0) {
            wx.showToast({
                title: '输入有误',
                image: '/images/info.png',
                icon: 'none',
                duration: 1000
            });
        } else {
            wx.request({
                url: 'http://39.107.243.115:5000/wechart/CqClassBox/login/uid=' + e.detail.value.uid + '&pwd=' + e.detail.value.pwd,
                // url: 'http://127.0.0.1:5000/wechart/CqClassBox/login/uid=' + e.detail.value.uid + '&pwd=' + e.detail.value.pwd,
                data: {
                    semester_id: '49',
                },
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: 'POST',

                success: function(res) {
                    that.setData({
                        jsonStr: res.data,
                    })
                    console.log("res:" + res)
                    console.log(that)
                    console.log(res.data);
                    console.log(res.data[0].stuName)
                    //账号密码错误以下功能实现密码错误Toast
                    if (res.data[0].stuName == '' || res.data[0].stuName == undefined) {
                        wx.showToast({
                            title: '账号密码有误',
                            image: '/images/info.png',
                            icon: 'none',
                            duration: 1000
                        });
                    } else {
                        //设置本地Storage,维持登录态用
                        wx.setStorageSync('uid', e.detail.value.uid);
                        wx.setStorageSync('pwd', e.detail.value.pwd);
                        // 登录获得的用户信息
                        wx.setStorageSync('userMessage', res.data[0]);
                        // 课表信息
                        if (res.data[1]) {
                            wx.setStorageSync('wlist', res.data[1]);
                        } else {

                            wx.showToast({
                                title: '请求课表失败，请稍后再试！',
                                image: '/images/info.png',
                                duration: 2000
                            });
                        }
                        // 跳转到主页面
                        wx.switchTab({
                            url: '../welcome/welcome',
                        })
                    }
                },
                fail: function() {
                    wx.showTo
                    ast({
                        title: '服务器出错！请联系管理员',
                        icon: 'none',
                        duration: 1000
                    });
                }
            })
        }
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