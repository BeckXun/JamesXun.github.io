var app = new Vue({
  el: '.vue',
  data: {

  },
  methods: {
    init: function(){
      let option = {
        longitude: 116.404,
        latitude: 39.915
      };
      this.option = option;
      this.render(option);
    },
    refresh: function(){
      window.location.reload();
    },
    render: function(option){
      // 百度地图API功能
    	let map = new BMap.Map("map");    // 创建Map实例(id="map")
    	map.centerAndZoom(new BMap.Point(option.longitude, option.latitude), 16);  // 初始化地图,设置中心点坐标和地图级别
    	// map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    	map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
    	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    }
  }
});

app.init();
