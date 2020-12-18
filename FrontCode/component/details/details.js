// page/component/details/details.js
const app = getApp();
Page({
  data:{
    goods: {},
    review:{},
    pid: '',
    num: 1,
    goodsid:'',
    total: 0,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false,
  },

  onShow: function () {
    const that = this;
    let id = this.data.id;
    let rest = this.data.rest;
  
    console.log("rest : " + rest);
    console.log('detail Show');
    wx.request({ 
      url: 'http://18.188.215.207:3001/' + rest,
      method: "GET",
      header: { 'content-type': 'application/json' }, 
      success (res) { 
        console.log(res.data)
        that.setData({
          goods: res.data,
          pid: res.data[id]._id,
          title:res.data[id].title,
        })
        that.compare();
      }
    }) 

    wx.request({ 
      url: 'http://18.188.215.207:3001/comment',
      method: "GET",
      header: { 'content-type': 'application/json' },
      success (res) {
        console.log(res.data) 
        that.setData({
          review: res.data,
          //pid: res.data[id].parent_id,
        })
        that.compare();
      }
    })
  },

  compare(){
    if(this.data.goods[0] != null && this.data.review[0] != null){
      let total = 0;
      let len = 0;

      for(var re in this.data.review){
        if(this.data.pid === this.data.review[re].parent_id){
          total += this.data.review[re].inputscore;
          len += 1;
        }
      }
      
      for(var re in this.data.review){
        console.log(this.data.review[re]);
      }
      console.log(total);
      console.log(len);
      console.log(total/len);
      let score = parseInt(total/len);
      console.log(score);

      this.setData({
        total: score,
      })

      console.log(this.data.total)
    }
  },

  formSubmit: function(e){
    console.log('form triggers a submit event, carrying the following data: ', e.detail.value);
    console.log(this.data.pid);
    let id = this.data.id
    let rest = this.data.rest;
    wx.request({ 
      url: 'http://18.188.215.207:3001/comment',
      method: "POST",
      header: { 'content-type': 'application/json' }, 
      data:{
        parent_id: this.data.pid,
        title: this.data.title,
        inputscore: e.detail.value.inputscore,
        contents :e.detail.value.input
      },
      success (res) { 
        console.log(res.data)   
        wx.redirectTo({
          url: 'details?id='+id+"&rest="+rest,
        })
    }
    })  
  },
  addCount() {
    let num = this.data.num;
    num++;
    this.setData({
      num : num,
    })
  },

  addToCart(e) {
    let rest = this.data.rest;
    const self = this;
    const num = this.data.num;
    let id = this.data.id
    let total = this.data.totalNum;
    const cart=wx.getStorageSync('cart');


    if(!cart)
    {
      const _cart=[];
      _cart.push({
        rest: rest,
        name: this.data.goods[id].title,
        price: this.data.goods[id].price,
        num : num,
        url: this.data.goods[id].url
      })
      wx.setStorageSync('cart', _cart)
    }
    else if(rest === cart[0].rest){
      cart.push({
        rest: rest,
        name: this.data.goods[id].title,
        price: this.data.goods[id].price,
        num : num,
        url: this.data.goods[id].url
      })
      wx.setStorageSync('cart', cart)
    }
    else{
      wx.showModal({
        content: '请选择同一饭店的菜单',
        success:function(res){
          if (res.confirm){
            console.log('yes')
          } else{
            wx.clearStorageSync('cart')
            console.log('no')
          }
        }
      })
    }
 
    
    self.setData({
      show: true
    })
    setTimeout(function(){
      self.setData({
        toView: e.target.dataset.id,
        curIndex: e.target.dataset.index,
      })
    },0)
    setTimeout( function() {
      self.setData({
        show: false,
        scaleCart : true
      })
      setTimeout( function() {
        self.setData({
          scaleCart: false,
          hasCarts : true,
          totalNum: num + total,
        })
      }, 200)
    }, 300)

  },
  goToCart(event){
    const id = event.currentTarget.index;
    console.log(id);
    if(id){
      wx.navigateTo({
        url : '../cart/cart?id=' + id,
      })
    }
  },

  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    //console.log(e)
    this.setData({
      curIndex: index,
      goodsid : index 
      
    })
  },

  onLoad:function(options){
    var self = this;
     this.setData({
      pid :options.id,
      rest : options.rest,
    })
    wx.getUserInfo({
      success: function(res){
        self.setData({
          thumb: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName
        })
      }
    })
    console.log(options);
    
    // for(var x in this){
    //   console.log(x);
    // }

    this.setData({
      id: options.id,
    })
    
  },

  switchTab: function (e) {
    //console.log(e)
    var index = parseInt(e.currentTarget.dataset.index)
  },
//input

  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value,

  })
},
  save : function(e){
    this.bindKeyInput();
  }
})