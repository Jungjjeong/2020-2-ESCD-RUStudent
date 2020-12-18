App({
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
   
    wx.request({ url: 'http://18.188.215.207:3001/sangrokone',
   // data: { x: '', y: '' }, 
    method: "GET",
    header: { 'content-type': 'application/json' }, 
    success (res) { console.log(res.data) } }) 
    //주문:post get
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false
  }
})
