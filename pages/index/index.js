//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    currentDish: {},
    cachedDishes: {},
    dishDes: '',
    dishTitle: '',
  },
  
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    wx.showLoading({
      title: '加载中',
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 2000)

    app.getUserInfo(function(userInfo){
      that.setData({
        userInfo:userInfo
      })
    })

   wx.request({
      url: 'https://apis.juhe.cn/cook/index',
      data: {
        parentid: '',
        dtype: '',
        cid: '1',
        key: '6ce3928fd610ba3b99b6003b77f0b070',
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log(res.data)
        const chosenOne = Math.floor(Math.random() * 10)
        const firstDish = res.data.result.data[chosenOne]
        that.setData({
          cachedDishes: res.data.result.data,
          currentDish: firstDish,
          dishDes: firstDish.imtro,
          dishTitle: firstDish.title,
          dishPic: firstDish.albums[0],
        })
        wx.hideLoading()
      },
      fail: function (res) {
        console.log('request failed')
      }
    })
  }
})
