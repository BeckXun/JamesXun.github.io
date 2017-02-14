'use strict';

var app = new Vue({
  el: '.vue',
  data: {
    info: [],
    sbh: '',
    abs: 0,
    asr: 0
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
          ffm: 'get_abs_yx',
          sbh: that.sbh,
          dqy: 0
        },
        success: function success(data) {
          var data = JSON.parse(data)[0];
          console.log(data);
          var obj = {
            title: data.sj,
            cont: ['abs编号：' + data.devNum, '生产日期：' + data.prdcDate, '电瓶电压：' + data.v_30, '点火电压：' + data.V_15]
          };
          this.info.push(obj);
          var obj = {
            title: 'A1轮',
            cont: ['左侧1轮速：' + data.a1l, '右侧1轮速：' + data.a1r, '左1最高电压：' + data.a1l_dy_max, '右1最高电压：' + data.a1r_dy_max, '左1最低电压：' + data.a1l_dy, '右1最低电压：' + data.a1r_dy]
          };
          this.info.push(obj);
          var obj = {
            title: 'A2轮',
            cont: ['左侧2轮速：' + data.a2l, '右侧2轮速：' + data.a2r, '左2最高电压：' + data.a2l_dy_max, '右2最高电压：' + data.a2r_dy_max, '左2最低电压：' + data.a2l_dy, '右2最低电压：' + data.a2r_dy]
          };
          this.info.push(obj);
          var obj = {
            title: 'A3轮',
            cont: ['左侧3轮速：' + data.a3l, '右侧3轮速：' + data.a3r, '左3最高电压：' + data.a3l_dy_max, '右3最高电压：' + data.a3r_dy_max, '左3最低电压：' + data.a3l_dy, '右3最低电压：' + data.a3r_dy]
          };
          this.info.push(obj);
          this.abs = data.abs_lamp;
          this.asr = data.ASR_lamp;
        }
      });
    }
  }
});
app.init();