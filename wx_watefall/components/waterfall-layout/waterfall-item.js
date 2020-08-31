import { querySelector } from './query-node';

Component({
  externalClasses: ['custom-class'],

  relations: {
    './waterfall': {
      type: 'parent',
      linked(target) {
        // console.log('li-target:', target)
      }
    }
  },

  properties: {

  },

  data: {
    itemCount: 10,    // 瀑布流重绘之前，在viewport之外渲染，防止低性能手机出现页面抖动的问题
    name: 'li',
    position: 'left',
    top: -1,
  },

  parent: null,
  observers: {

  },

  lifetimes: {
    ready() {
      const { itemCount } = this.data;
      const [waterfall] = this.getRelationNodes('./waterfall');
      waterfall.childCount += 1;

      this.parent = waterfall;

      this.setData({
        itemCount: itemCount + waterfall.childCount,
      })

      this.setWaterfallItemPosition();
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async setItemGap(node) {
      const { itemGap, waterfallWidth } = this.parent;
      if(itemGap < 0 && node) {
        const { width } = node;
        this.parent.itemGap = waterfallWidth - width * 2;
      }
    },

    async setWaterfallItemPosition() {
      querySelector('.waterfall-item', this)
        .then(async (node) => {
          await this.setItemGap(node);
          const {
            top,
            position,
          } = await this.parent.getWaterfallItemPostionInfo(node);

          this.setData({
            top,
            position
          })
        })
    },
  }
})
