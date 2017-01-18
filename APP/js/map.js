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

      var map = new BMap.Map("map"); // 创建Map实例(id="map")
      var point = new BMap.Point(option.longitude, option.latitude);
      var marker = new BMap.Marker(point);
      map.centerAndZoom(point, 16);
      map.addOverlay(marker);
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    }
  }
});

app.init();