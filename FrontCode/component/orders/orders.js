// page/component/orders/orders.js
Page({
  data:{
    address:{},
    orders:[],
    hasAddress: false,
    total:0,
  },

  onReady() {
    const t = this;
    this.getTotalPrice();
    wx.login({
      success (res) {
      if (res.code) {
        t.setData({
          code: res.code
      })
        console.log(res.code);
      }
  }
})},
  
  onShow:function(){
    const self = this;
    const order=wx.getStorageSync('cart');
    wx.getUserInfo({
      success: function(res){
        self.setData({
          thumb: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName
        })
      }
    }),
    self.setData({
      orders:order
    })
    
    this.getTotalPrice();
    console.log(this.data.orders);
  },

  getTotalPrice() {
    let orders = this.data.orders;
    let total = 0;
    for(let i = 0; i < orders.length; i++) {
      total += orders[i].num * orders[i].price;
    }
    this.setData({
      total: total
    })
  },

  toPay() {
    
    const that = this;
    const cart = wx.getStorageSync('cart');
    wx.request({ url: 'https://open.ifprod.cc/api/v1/shoots/pay',
    data: { openId: 'omjQ649eIViDl5WNMocC7nOFpyZg', amount: 'that.data.total' }, 
    method: "POST",

    header: { 'content-type': 'application/json' }, 
    success (res) { 
      console.log(res.data)
      wx.requestPayment({
        nonceStr: res.data.nonceStr,
        package:  res.data.package,
        paySign: res.data.paySign,
        timeStamp:  res.data.timeStamp,
        signType: "MD5",
        success (res) { },
        fail (res) { wx.switchTab({
          url: '/page/component/user/user'
        })
        const payments = wx.getStorageSync('payments');
        const cart = wx.getStorageSync('cart');

        if(!payments)
        {
          const _payments=[];
          wx.request({ 
            url: 'http://18.188.215.207:3001/payment',
            method: "POST",
            header: { 'content-type': 'application/json' }, 
            data:{
              js_code: that.data.code
            },
            success (res) { 
              console.log(res.data)   
          }
          })  

          for(var ca in cart){
            _payments.push({
              name: cart[ca].name,
              price: cart[ca].price,
              totalprice: that.data.total,
              num: cart[ca].num,
              url: cart[ca].url,
              time: (new Date()).toUTCString(),
              nickname: that.data.nickname

            })
            wx.request({ 
              url: 'http://18.188.215.207:3001/payment',
              method: "POST",
              header: { 'content-type': 'application/json' }, 
              data:{
                name: cart[ca].name,
                price: cart[ca].price,
                totalprice: that.data.total,
                num: cart[ca].num,
                nickname: that.data.nickname
              },
              success (res) { 
                console.log(res.data)   
            }
            })  
            

          }
          wx.setStorageSync('payments', _payments)
        }
        else{
          wx.request({ 
            url: 'http://18.188.215.207:3001/oreder',
            method: "POST",
            header: { 'content-type': 'application/json' }, 
            data:{
              js_code: that.data.code,
               amount: that.data.total
            },
            success (res) { 
              console.log(res.data)   
          }
          })  
          for(var ca in cart){
            payments.push({
              name: cart[ca].name,
              price: cart[ca].price,
              totalprice: that.data.total,
              num: cart[ca].num,
              url: cart[ca].url,
              time: (new Date()).toUTCString(),
              nickname: that.data.nickname

            })
            wx.request({ 
              url: 'http://18.188.215.207:3001/payment',
              method: "POST",
              header: { 'content-type': 'application/json' }, 
              data:{
                name: cart[ca].name,
                price: cart[ca].price,
                totalprice: that.data.total,
                num: cart[ca].num,
                nickname: that.data.nickname
              },
              success (res) { 
                console.log(res.data)   
            }
            })  

          }
          console.log(payments)
          
          wx.setStorageSync('payments', payments);
        }
        console.log("payments storage");
        console.log(wx.getStorageSync('payments'))

        that.setData({
          orders: wx.getStorageSync('payments'),
          total: 0
        })
        

      }//결제완료페이지만들기
      }
      )
    
    
    } }) 
    //주문:post get
  },

   
  
})