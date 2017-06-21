//index.js
//获取应用实例
var app = getApp()
Page({
  currentDishIndex: 0,
  cachedDishes: {},
  currentDish: {},
  data: {
    motto: 'Hello World',
    userInfo: {},
    dishDes: '',
    dishTitle: '',
  },
  requestDish: function() {
    var that = this
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
        let allDishes = res.data.result.data
        allDishes = that.swapDishes(allDishes, chosenOne, that.currentDishIndex)
        that.cachedDishes = allDishes
        that.currentDishIndex = chosenOne + 1
        that.currentDish = firstDish
        that.setData({
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
  },
  goDetails: function () {
    wx.navigateTo({ url: '../dishDetails/dishDetails?id=' + this.currentDish.id})
  },
  updateDish: function() {
    var that = this
    const chosenOne = Math.floor(Math.random() * (10 - that.currentDishIndex))
    const firstDish = that.cachedDishes[chosenOne]
    let allDishes = that.cachedDishes
    allDishes = that.swapDishes(allDishes, chosenOne, that.currentDishIndex)
    that.cachedDishes = allDishes
    that.currentDishIndex = that.currentDishIndex + 1
    that.currentDish = firstDish
    that.setData({
      dishDes: firstDish.imtro,
      dishTitle: firstDish.title,
      dishPic: firstDish.albums[0],
    })
  },
  nextDish: function() {
    this.updateDish()
  },
  swapDishes: function (allDishes, chosenOne, index) {
    const tmp = allDishes[chosenOne]
    allDishes[chosenOne] = allDishes[index]
    allDishes[index] = tmp
    return allDishes
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    wx.showLoading({
      title: '准备您的专属食谱',
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 2000)

    app.getUserInfo(function(userInfo){
      that.setData({
        userInfo:userInfo
      })
    })

    that.requestDish()
  }
})
