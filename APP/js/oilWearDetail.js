'use strict';

var app = new Vue({
  el: '.vue',
  data: {
    month: 0,
    Year: '',
    Month: '',
    cph: '',
    sbh: '',
    detail: {},
    total: {}
  },
  methods: {
    init: function init() {
      var d = new Date();
      this.d = d;
      this.Year = d.getFullYear();
      this.Month = d.getMonth() + 1;
      this.getStorage();
      this.getInfo();
    },

    getInfo: function getInfo() {
      var that = this;
      $.ajax({
        type: 'POST',
        DataType: 'json',
        timeout: common().timeout,
        url: common().ROOT() + '/pjwxjk/mian.aspx',
        data: {
          password: '7935hjh',
          ffm: 'get_lcyh_month',
          sbh: that.sbh,
          qssj: that.Year + '-' + that.formatTime(that.Month) + '-01',
          zzsj: that.Year + '-' + that.formatTime(that.Month) + '-' + this.d.getDate()
        },
        success: function success(data) {
          var data = JSON.parse(data);
          console.log(data);

          var arr = [];
          var obj = null;
          var total_lc = 0,
              total_gps = 0,
              total_yh = 0,
              total_pjyh = 0,
              total_pjcs = 0;
          data.forEach(function (item, index) {
            obj = {
              sj: item.rq,
              lc: item.lcc,
              gps: item.gpslicheng,
              yh: item.yhc,
              pjyh: item.pjyh,
              pjcs: item.pjcs === null ? 0 : item.pjcs
            };
            total_lc += item.lcc;
            total_gps += item.gpslicheng;
            total_yh += item.yhc;
            total_pjyh += item.pjyh;
            total_pjcs += item.pjcs;
            arr.push(obj);
          });
          that.total.lc = total_lc.toFixed(2);
          that.total.gps = total_gps.toFixed(2);
          that.total.yh = total_yh.toFixed(2);
          that.total.pjyh = (total_pjyh / data.length).toFixed(2);
          that.total.pjcs = (total_pjcs / data.length).toFixed(2);

          that.detail = arr;
          arr = null;
        }
      });
    },

    formatTime: function formatTime(time) {
      return time < 10 ? '0' + time : time;
    },

    getStorage: function getStorage() {
      var index = Number(common().queryString('index'));
      var info = JSON.parse(localStorage.carInfo)[index];
      this.cph = info.cph;
      this.sbh = info.sbh;
    },

    changeMonth: function changeMonth(type) {
      if (type === 'prev') {

        if (this.Month > 1) {
          //不是一月份
          this.Month -= 1;
        } else {
          //一月份
          this.Month = 12;
          this.Year -= 1;
        }
        console.log(this.Month);
        this.getInfo();
      } else if (this.Year < this.d.getFullYear() || this.Year === this.d.getFullYear() && this.Month < this.d.getMonth() + 1) {
        //只能查到当前月份

        if (this.Month > 11) {
          //十二月
          this.Month = 1;
          this.Year += 1;
        } else {
          //不是十二月
          this.Month += 1;
        }
        console.log(this.Month);
        this.getInfo();
      }
    }
  }

});
app.init();