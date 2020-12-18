// page/component/new-pages/user/user.js
Page({
  data:{
    thumb:'',
    nickname:'',
    orders:[],
    hasAddress:false,
    address:{}
  },
  onLoad(){
    const payments=wx.getStorageSync('payments');
    var self = this;
    this.setData({
      orders:payments
    })
    console.log(this.data.orders);

    wx.getUserInfo({
      success: function(res){
        self.setData({
          thumb: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName
        })
      }
    }),
    wx.request({
      url: 'http://www.gdfengshuo.com/api/wx/orders.txt',
      success(res){
      }
    })
  },
  onShow(){
    var self = this;
    wx.getStorage({
      key: 'address',
      success: function(res){
        self.setData({
          hasAddress: true,
          address: res.data
        })
      }
    })
    wx.clearStorageSync('cart')
  },
})