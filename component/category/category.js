Page({
    data: {
        category: [
            {name:'常绿园',id:'sangrok'},
            {name:'宿舍食堂',id:'dormitory'},
            {name:'咕咚咕噜',id:'groo'},
            {name:'园丁',id:'garden'},
            {name:'南山哈卡萨',id:'namsan'},
            {name:'淫妇',id:'pen'},
            {name:'高努里',id:'gaon'},
            {name:'蓝罐子',id:'blue'},
        ],
        menusang:{},
        menudor:{},
        menugroo:{},
        menugarden:{},
        menunam:{},
        menupan:{},
        manugaon:{},
        menublue:{},
        detail:[],
        curIndex: 0,
        isScroll: false,
        // toView: 'sangrok'
    },
    onShow: function () {
      const that = this;
      console.log('category Show')
      wx.request({ 
        url: 'http://18.188.215.207:3001/sangrokone',
        method: "GET",
        header: { 'content-type': 'application/json' }, 
        success (res) { 
          console.log(res.data) 
          that.setData({
            menusang: res.data
          })
        } 
      }) 
      wx.request({ 
        url: 'http://18.188.215.207:3001/dormitory',
        method: "GET",
        header: { 'content-type': 'application/json' }, 
        success (res) { 
          console.log(res.data) 
          that.setData({
            menudor: res.data
          })
        } 
      })
      wx.request({ 
        url: 'http://18.188.215.207:3001/groot',
        method: "GET",
        header: { 'content-type': 'application/json' }, 
        success (res) { 
          console.log(res.data) 
          that.setData({
            menugroo: res.data
          })
        } 
      })
      wx.request({ 
        url: 'http://18.188.215.207:3001/gardencook',
        method: "GET",
        header: { 'content-type': 'application/json' }, 
        success (res) { 
          console.log(res.data) 
          that.setData({
            menugarden: res.data
          })
        } 
      })
      wx.request({ 
        url: 'http://18.188.215.207:3001/namsan',
        method: "GET",
        header: { 'content-type': 'application/json' }, 
        success (res) { 
          console.log(res.data) 
          that.setData({
            menunam: res.data
          })
        } 
      })
      wx.request({ 
        url: 'http://18.188.215.207:3001/pandorothy',
        method: "GET",
        header: { 'content-type': 'application/json' }, 
        success (res) { 
          console.log(res.data) 
          that.setData({
            menupan: res.data
          })
        } 
      })
      wx.request({ 
        url: 'http://18.188.215.207:3001/gaonnuri',
        method: "GET",
        header: { 'content-type': 'application/json' }, 
        success (res) { 
          console.log(res.data) 
          that.setData({
            menugaon: res.data
          })
        } 
      })
      wx.request({ 
        url: 'http://18.188.215.207:3001/bluepot',
        method: "GET",
        header: { 'content-type': 'application/json' }, 
        success (res) { 
          console.log(res.data) 
          that.setData({
            menublue: res.data
          })
        } 
      })
    },
    onReady(){
        var self = this;
        wx.request({
            success(res){
              console.log(res.data)
              self.setData({
                  detail : res.data
              })
            }
        });
    },
    switchTab(e){
      const self = this;
      this.setData({
        isScroll: true
      })
      setTimeout(function(){
        self.setData({
          toView: e.target.dataset.id,
          curIndex: e.target.dataset.index,
        })
      },0)
      setTimeout(function () {
        self.setData({
          isScroll: false
        })
      },1) 
    },

    goToDetail(event){
      const id = event.currentTarget.id;
      const l1 = id.split(" ");
      console.log(l1[0]);
      console.log(l1[1]);

        wx.navigateTo({
          url : "../details/details?id="+ l1[1] + "&rest="+l1[0],
        })
    },
    onLoad:function(options){
      console.log("hello!");
      console.log(options);
  
      const self = this;

      this.setData({
        isScroll: true
      })
      setTimeout(function(){
        self.setData({
          toView: options.res_id,
          curIndex: options.cur_id,
        })
      },1)
      setTimeout(function () {
        self.setData({
          isScroll: false
        })
      },1)
      
    },
})