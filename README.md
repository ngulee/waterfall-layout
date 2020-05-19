# waterfall-layout
微信小程序瀑布流组件

## 用法
**第一步**：下载`waterfall-layout`组件源码到项目目录下；  
**第二步**：在json文件中引入`waterfall-layout`组件；

```javascript
{
  "navigationBarTitleText": "瀑布流组件",
  "usingComponents": {
    "waterfall": "../../components/waterfall-layout/waterfall",
    "waterfall-item": "../../components/waterfall-layout/waterfall-item"
  }
}
```
**第三步**：在`wxml`文件中使用；
```html
<waterfall
  custom-class="waterfall-box"
  loading="{{updateLoading}}"
  isAllLoaded="{{isAllLoaded}}"
>
  <waterfall-item 
    custom-class="product-item-box"
    wx:for="{{products}}" 
    wx:key="index"
  >
    <view>
      业务代码
    </view>
  </waterfall-item>
</waterfall>
```
