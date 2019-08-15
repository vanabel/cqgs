//index.js
require('../../utils/v-requrest.js')

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    seminarLists: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    Date.prototype.addDays = function(days, months) {
      let date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      date.setMonth(date.getMonth() + months);
      return date;
    }

    function formatDate(date) {
      return date.getFullYear() + '-' + ('0' + date.getMonth()).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
    }
    let todayDate = new Date();
    let today = formatDate(todayDate.addDays(0, 1))
    let nextDay = formatDate(todayDate.addDays(3, 1))
    console.log(today, nextDay)
    wx.vrequest({
      url: 'https://cqgs.vanabel.cn/server/get',
      data: {
        "dateb": today,
        "datee": nextDay
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        if (res.data.length >= 1) {
          that.setData({
            seminarLists: JSON.parse(res.data)
          })
          // console.log(res.data)
        } else {
          console.log(res.data)
        }
      }
    })
    var that = this
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