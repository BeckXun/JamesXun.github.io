var app = new Vue({
  el: '.vue',
  data: {
    info:[
      {
        carName: '兰博基尼',
        carType: '跑车',
        carNum: '8888888',
        ownership: '自有',
        status: '运行',
        distance: '403km',
        lastTime: '5分钟前',
        plate: '辽N88888',//诊断页标题
        carImg: 'http://img4.imgtn.bdimg.com/it/u=1703119562,3817441524&fm=21&gp=0.jpg'
      },
      {
        carName: '玛莎拉蒂',
        carType: '轿车',
        carNum: '6666666',
        ownership: '自有',
        status: '运行',
        distance: '103km',
        lastTime: '50分钟前',
        plate: '辽N66666',//诊断页标题
        carImg: 'http://img0.imgtn.bdimg.com/it/u=116747629,1725367409&fm=21&gp=0.jpg'
      },
      {
        carName: '保时捷',
        carType: '轿车',
        carNum: '6668888',
        ownership: '自有',
        status: '运行',
        distance: '4023km',
        lastTime: '30分钟前',
        plate: '辽N66888',//诊断页标题
        carImg: 'http://img1.imgtn.bdimg.com/it/u=515887638,283325305&fm=21&gp=0.jpg'
      }
    ]
  },
  methods: {
    init: function(){

    },
    share: function(){

      this.setShareLastPage();
      window.location.href = window.location.origin + '/APP/share.html'
    },
    setShareLastPage: function(){
      localStorage.shareLastPage = window.location.href;
    }
  }
})
app.init();
