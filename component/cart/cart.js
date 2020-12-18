// page/component/new-pages/cart/cart.js
Page({
  data: {
    carts:[],               
    hasList:false,          
    totalPrice:0,           
    selectAllStatus:true,    
    obj:{
        name:"hello"
    }
  },
  onShow() {
    const cart=wx.getStorageSync('cart');
    console.log(cart);
    this.setData({
      hasList: true,
      carts:cart
    });
    this.getTotalPrice();
  },
  onLoad:function(options){
    console.log("hello!");
    console.log(options);

    this.setData({
      id: options.id,
    });

    this.getTotalPrice();
  },

  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    console.log(index +"+" +selected);
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },


  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts.splice(index,1);
    this.setData({
      carts: carts
    });
    if(!carts.length){
      this.setData({
        hasList: false
      });
    }else{
      this.getTotalPrice();
    }
  },

  selectAll(e) {
    const cart=wx.getStorageSync('cart');
    wx.clearStorage('cart')
    wx.switchTab({
      url: '/page/component/index'
    })
  },

  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },


  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let carts = this.data.carts;
    let num = carts[index].num;
    if(num <= 1){
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  getTotalPrice() {
    let carts = this.data.carts;                 
    let total = 0;
    for(let i = 0; i<carts.length; i++) {        
     total += carts[i].num * carts[i].price;  
    }
    this.setData({                               
      carts: carts,
      totalPrice: total.toFixed(0)
    });
  }

})