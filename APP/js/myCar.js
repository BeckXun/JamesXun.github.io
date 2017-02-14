'use strict';

// TODO: 挂车只有 轨迹，诊断，信息，分享
var app = new Vue({
  el: '.vue',
  data: {
    info: [],
    lastType: "main",
    key: '',
    mainInfo: [], //主车数据缓存
    guaInfo: [] //挂车数据缓存
  },
  watch: {
    //监视info的变化 跳转子页面前以确保是对应的数据
    info: function info(curVal, oldVal) {
      console.log(curVal);
      localStorage.carInfo = JSON.stringify(curVal);
    }
  },
  methods: {
    init: function init() {
      var that = this;
      if (typeof localStorage.userId === "undefined") {
        location.href = common().ROOT() + '/APP/login.html';
      }
      $.ajax({ //获取我的车辆
        type: 'POST',
        DataType: 'json',
        timeout: common().timeout,
        url: common().ROOT() + '/pjwxjk/mian.aspx',
        data: {
          password: '7935hjh',
          ffm: 'get_truck_by_user',
          yhm: localStorage.userId,
          cs: 0,
          tj1: '',
          tj2: '',
          tj3: '',
          tj4: ''
        },
        success: function success(data) {
          var data = JSON.parse(data);
          console.log(data);
          var main = [],
              gua = [];
          if (data.length === 0) {
            //没有车数据自动跳转到添加车辆页面
            location.href = common().ROOT() + '/APP/addCar.html';
          } else {
            data.forEach(function (item, index) {

              var url = common().carImgUrl(item.brand);
              item.cph = item.cph.replace(/(^\s+)|(\s+$)/g, "");
              item.cjh = item.cjh.replace(/(^\s+)|(\s+$)/g, "");
              item.sbh = item.sbh.replace(/(^\s+)|(\s+$)/g, "");
              var obj = {
                "cjh": item.cjh,
                "sbh": item.sbh,
                "cph": item.cph,
                "zt": item.zt,
                "lc": item.lc + "km",
                "zhsj": item.zhsj,
                "carImg": url,
                "type": item.cl_type
              };
              item.cl_type === "主车" ? main.push(obj) : gua.push(obj);
            });
            that.info = that.mainInfo = main;
            that.guaInfo = gua;
            main = gua = null;
          }
        }
      });
    },
    share: function share() {

      this.setShareLastPage();
      this.setShareStorage();
      window.location.href = window.location.origin + '/APP/share.html';
    },
    setShareLastPage: function setShareLastPage() {
      localStorage.shareLastPage = window.location.href;
    },
    setShareStorage: function setShareStorage() {
      // localStorage.shareList =
      //cph cjh sbh
      var obj = {
        "cph": "",
        "cjh": "",
        "sbh": ""
      };
      var arr = [obj];
    },
    tap: function tap(type) {
      if (type !== this.lastType) {
        this.info = this[type + "Info"];
        this.lastType = type;
      }
    },
    search: function search(key) {
      console.log(key);
      var arr = [],
          info = [];
      info = this[this.lastType + "Info"]; //遍历当前状态（主车还是挂车）的数据
      info.forEach(function (item, index) {
        if (item.cph === key || item.cjh === key) {
          arr.push(item);
        }
        console.log(item.cph, item.cjh);
      });
      this.info = arr;
      arr = null;
    }
  }
});
app.init();
// window.onload = function(){
//
//   var lazyload = {
//           init : function(opt){
//             var that = this,
//             op = {
//                 anim: true,
//                 extend_height:0,
//                 selectorName:"img",
//                 realSrcAtr:"dataimg"
//             };
//             // 合并对象，已有的{anim:true}+用户自定义对象。也就是op = op + opt
//             $.extend(op,opt);
//             // 调用lazyload.img.init(op)函数
//             that.img.init(op);
//
//           },
//
//           img : {
//             init : function(n){
//
//               var that = this,
//               selectorName = n.selectorName,
//               realSrcAtr = n.realSrcAtr,
//               anim = n.anim;
// //              console.log(n);
//
//               // 要加载的图片是不是在指定窗口内
//               function inViewport( el ) {
//                   // 当前窗口的顶部
//                 var top = window.pageYOffset,
//                 // 当前窗口的底部
//                btm = window.pageYOffset + window.innerHeight,
//                 // 元素所在整体页面内的y轴位置
//                elTop = $(el).offset().top;
//                 // 判断元素，是否在当前窗口，或者当前窗口延伸400像素内
//                 return elTop >= top && elTop - n.extend_height <= btm;
//               }
//
//               // 滚动事件里判断，加载图片
//                $(window).on('scroll', function() {
//                   $(selectorName).each(function(index,node) {
//                     var $this = $(this);
//
//                     if(!$this.attr(realSrcAtr) || !inViewport(this)){
//                       return;
//                     }
//
//                     act($this);
//
//                   })
//                 }).trigger('scroll');
//
//                // 展示图片
//                function act(_self){
//                       // 已经加载过了，则中断后续代码
//                    if (_self.attr('lazyImgLoaded')) return;
//                     var img = new Image(),
//                     original = _self.attr('dataimg');
//                     // 图片请求完成后的事件，把dataimg指定的图片，放到src里面，浏览器显示
//                     img.onload = function() {
//                         _self.attr('src', original);
//                         anim && _self.css({ opacity: .2 }).animate({ opacity: 1 }, 280);
//                     };
//                     // 当你设置img.src的时候，浏览器就在发送图片请求了
//                     original && (img.src = original);
//                      _self.attr('lazyImgLoaded', true);
//                }
//             }
//           }
//         };
//
//   lazyload.init({
//       anim:false,
//       selectorName:".carImg"
//   });
// }