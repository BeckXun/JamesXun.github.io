"use strict";

var app = new Vue({
  el: '.vue',
  data: {},
  methods: {
    init: function init() {
      var option = {
        longitude: 116.404,
        latitude: 39.915
      };
      this.option = option;
      this.render(option);
    },
    refresh: function refresh() {
      window.location.reload();
    },
    render: function render(option) {

      // 百度地图API功能
      var sContent = "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>天安门</h4>" + "<img style='float:right;margin:4px' id='imgDemo' src='http://app.baidu.com/map/images/tiananmen.jpg' width='139' height='104' title='天安门'/>" + "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>天安门坐落在中国北京市中心,故宫的南侧,与天安门广场隔长安街相望,是清朝皇城的大门...</p>";
      var map = new BMap.Map("map"); // 创建Map实例(id="map")
      var point = new BMap.Point(option.longitude, option.latitude);
      var marker = new BMap.Marker(point);
      var infoWindow = new BMap.InfoWindow(sContent); // 创建信息窗口对象
      map.centerAndZoom(point, 16);
      map.addOverlay(marker);
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      marker.openInfoWindow(infoWindow); //图片加载完毕重绘infowind
    }
  }
});

app.init();