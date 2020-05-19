
const randomNumer = function(min, range) {
  return Math.floor(min + Math.random() * range);
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: [],
    updateLoading: false,
    isAllLoaded: false,
  },
  updatedCount: 0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
  },

  initData() {
    const mockList = [];

    for(let i = 0; i < 10; i++) {
      const index = i + this.updatedCount * 20
      let item = {
        value: index,
        action: {
          logCode: `wx#bpm${index}.${index}${index+1}`
        },
        height: 400 + Math.random() * 200,
        background: `rgb(${randomNumer(0, 255)},${randomNumer(0, 255)}, ${randomNumer(0, 255)})`
      }
      mockList.push(item)
    }

    this.setData({
      products: this.data.products.concat(mockList),
    });
    this.updatedCount += 1;
  },

  getWaterFall() {
    this.fetchData()
  },

  fetchData() {
    if (this.updatedCount > 3) return;
    this.setData({
      updateLoading: true,
    })
    setTimeout(() => {
      const mockList = [];

      for(let i = 0; i < 10; i++) {
        const index = i + this.updatedCount * 20
        let item = {
          value: index,
          action: {
            logCode: `wx#bpm${index}.${index}${index+1}`
          },
          height: 400 + Math.random() * 200,
          background: `rgb(${randomNumer(0, 100)},${randomNumer(0, 100)}, ${randomNumer(0, 100)})`
        }
        mockList.push(item)
      }

      this.setData({
        isAllLoaded: this.updatedCount >= 3,
        updateLoading:  false,
        updateLoading: false,
        products: this.data.products.concat(mockList),
      });
      this.updatedCount += 1;
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  onTap() {
    wx.showModal({
      title: 'Title',
      content: 'content',
      success({ confirm, cancel }) {
        if (confirm) {
          console.log('success');
        }

        if(cancel) {
          console.log('cancel');
        }
        
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.fetchData();
  },

  handleScrollLower() {
    if(this.data.updateLoading || this.data.isAllLoaded) return;
    this.fetchData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})