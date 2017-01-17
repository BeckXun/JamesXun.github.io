#OBD gulp zepto echarts

分享回跳逻辑
1. 在每个能进入分享的入口 进入分享前 把当页url存入localstorage
2. 分享成功后 先提取 localstorage.shareLastPage
3. 删除localstorage.shareLastPage 并跳转到 它的页面
4. 直接进入分享时 是没有 localstorage.shareLastPage
5. 没有 localstorage.shareLastPage 直接关闭（wx.close）
