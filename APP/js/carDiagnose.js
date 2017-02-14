'use strict';

var app = new Vue({
  el: '.vue',
  data: {
    info: [],
    sbh: ''
  },
  methods: {
    init: function init() {
      //sbh: 70001047
      this.index = common().queryString("index");
      var info = JSON.parse(localStorage.carInfo)[this.index];
      this.sbh = 70001047; //测试用
      // this.sbh = info.sbh;//上线用
      var that = this;
      $.ajax({
        type: 'POST',
        DataType: 'json',
        timeout: common().timeout,
        url: common().ROOT() + '/pjwxjk/mian.aspx',
        data: {
          password: '7935hjh',
          ffm: 'get_main_zd',
          sbh: that.sbh,
          dqy: 0
        },
        success: function success(data) {
          var data = JSON.parse(data);
          console.log(data);
          var arr = [];

          data.forEach(function (item, index) {
            var obj = {
              type: item.lx,
              // img: 'images/shuju.png',
              timestamp: item.sj,
              detail: [[item.ff, item.ss, item.ms]]
            };
            arr.push(obj);
          });
          that.info = arr;
          arr = null;
        }
      });
    }

  }
});
app.init();