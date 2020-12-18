Page({
  data: {
    imgUrls: [
      '/image/main1.png',
      '/image/123.gif',
      '/image/456.gif'
    ],
    showmenu:{},
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
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
          showmenu: res.data
        })
      } 
    }) 
  },
  goToDetail(event){
    const id = event.currentTarget.id;
    const tempList = id.split(" ");
    console.log(tempList[0]);
    console.log(tempList[1]);

      wx.navigateTo({
        url : "../component/details/details?id="+ tempList[1] + "&rest="+tempList[0],
      })
  },
})

