//details.js
var app = getApp()
Page({
  data: {
    userInfo: {},
    currentDish: {},
    cachedDishes: {},
    dishDes: '',
    dishTitle: '',
    dishIng: '',
    dishBrd: '',
    dishDetail: {},
    stepLength: '',
  },

  id : 1,
  
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    var that = this
    that.id = options.id
    wx.showLoading({
      title: '加载中',
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 2000)

   wx.request({
      url: 'https://apis.juhe.cn/cook/queryid',
      data: {
        parentid: '',
        dtype: '',
        id: that.id,
        key: '6ce3928fd610ba3b99b6003b77f0b070',
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log(res.data)
        const firstDish = res.data.result.data[0]
        const length = firstDish.steps.length
        that.setData({
          cachedDishes: res.data.result.data,
          currentDish: firstDish,
          dishDes: firstDish.imtro,
          dishTitle: firstDish.title,
          dishPic: firstDish.albums[0],
          dishIng: firstDish.ingredients,
          dishBrd: firstDish.burden,
          dishDetail: firstDish.steps,
          stepLength: length,
        })
        wx.hideLoading()
      },
      fail: function (res) {
        console.log('request failed')
      },
    })
  }
})
