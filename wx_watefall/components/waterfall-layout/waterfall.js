
import { querySelector } from './query-node';

const POSITION_LEFT = 'left';
const POSITION_RIGHT = 'right';

Component({
  externalClasses: ['custom-class'],
  properties: {
    loading: {
      type: Boolean,
      value: false,
    },
    isAllLoaded: {
      type: Boolean,
      value: false,
    },
    loadingText: {
      type: String,
      value: '正在加载中...'
    },
    allLoadedText: {
      type: String,
      value: '我是有底线的'
    },
    isUpdateFlow: {
      type: Boolean,
      value: false,
    },
    isEmpty: {
      type: Boolean,
      value: false,
    },
    emptyText: {
      type: String,
      value: '暂无数据'
    }
  },
  relations: {
    './waterfall-item': {
      type: 'child',
      linked(target) {
        if(this.childNumber) {
          this.childNumber += 1;
        } else {
          this.childNumber = 1;
        }
      }
    },
  },
  data: {
    waterfallHeight: 0,
    isShowAllLoadedTxt: false,
  },

  lifetimes: {
    ready() {
      this.initParams();
      this.setWatefallWidth();
    }
  },

  observers: {
    isUpdateFlow(value) {
      if(value) {
        this.childNumber = 0;
        wx.nextTick(() => {
          this.resetParam();
          const waterfallItems = this.getRelationNodes('./waterfall-item');
          waterfallItems.forEach((waterfallItem) => {
            this.childNumber += 1;
            waterfallItem.setWaterfallItemPosition();
          })
        })
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleShowAllLoadedTxt(value) {
      if(this.data.isShowAllLoadedTxt === value) return;
      wx.nextTick(() => {
        setTimeout(() => {
          this.setData({
            isShowAllLoadedTxt: value
          })
        })
      })
    },
    initParams() {
      this.childCount = 0;
      this.itemGap = -1;
      this.waterfallWidth = -1;
      this.leftHeights = 0;
      this.rightHeights = 0;
      this.watefallItemIndex = 0;
    },

    resetParam() {
      this.childCount = 0;
      this.leftHeights = 0;
      this.rightHeights = 0;
      this.watefallItemIndex = 0;
      this.childNumber = 0;
      this.itemGap = -1;
    },

    /**
     * 设置 waterfall-item 的高度值
     * @param {Object} node waterfall-item 组件位置尺寸数据
     */
    async getWaterfallItemPostionInfo(node) {
      if(!node) return;
      let top = 0;
      const { height } = node;
      this.watefallItemIndex += 1;
      let position = POSITION_LEFT;
      const { itemGap } = this;

      if (this.leftHeights <= this.rightHeights) {
        top = this.leftHeights;

        if(this.leftHeights === 0) {
          this.leftHeights += height;
        } else {
          top += itemGap;
          this.leftHeights += height + itemGap;
        }
      } else {
        position = POSITION_RIGHT;
        top = this.rightHeights;

        if(this.rightHeights === 0) {
          this.rightHeights += height;
        } else {
          top += itemGap;
          this.rightHeights += height + itemGap;
        }
      }

      this.setWaterfallHeight(itemGap);

      return {
        top,
        position,
      }
    },

    async setWatefallWidth() {
      const info = await querySelector('.waterfall-inner', this);
      if(!info) {
        this.setWatefallWidth();
        return;
      }

      this.waterfallWidth = info.width;
    },

    async setWaterfallHeight(itemGap) {
      if(this.watefallItemIndex === this.childNumber) {
        let  waterfallHeight = Math.ceil(Math.max(this.leftHeights, this.rightHeights) + itemGap);
        this.setData({
          waterfallHeight
        })


        const loadingNode = await querySelector('.placeholder', this);

        let nodeHeight = 0;
        if(loadingNode) {
          nodeHeight = loadingNode.height;
        }

        this.triggerEvent('finish', {
          waterfallHeight: nodeHeight + waterfallHeight
        })

        this.handleShowAllLoadedTxt(this.data.isAllLoaded)
      }
    }
  }
})
