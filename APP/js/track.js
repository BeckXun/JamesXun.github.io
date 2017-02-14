'use strict';

var info = new Vue({
  el: '.vue',
  data: {
    year: '',
    month: '',
    day: '',
    sbh: '',
    info: [],
    totalKm: '',
    totalOilWear: '',
    date: ''
  },
  methods: {
    init: function init() {
      this.initTime();
      this.getStorage();
      this.getTrackInfo();
    },
    initTime: function initTime() {
      var d = new Date();
      this.year = d.getFullYear();
      this.month = this.fomatDate(d.getMonth() + 1);
      this.day = this.fomatDate(d.getDate());
      this.date = new Date();
    },
    getStorage: function getStorage() {
      var index = Number(common().queryString('index'));
      var info = JSON.parse(localStorage.carInfo)[index];
      this.sbh = info.sbh;
    },
    getTrackInfo: function getTrackInfo() {
      var that = this;
      $.ajax({
        type: 'POST',
        DataType: 'json',
        timeout: common().timeout,
        url: common().ROOT() + '/pjwxjk/mian.aspx',
        data: {
          password: '7935hjh',
          ffm: 'get_plbk_xc_list',
          sbh: that.sbh,
          // qsj: that.year+'-'+that.month+'-'+that.day+' 00:00:00',// (yyyy-MM-dd HH:mm:ss)
          // zsj: that.year+'-'+that.month+'-'+that.day+' 23:59:59'
          rq: that.year + '-' + that.month + '-' + that.day
        },
        success: function success(data) {

          var data = JSON.parse(data);
          console.log(data);
          var arr = [];
          var totalKm = 0,
              totalOilWear = 0;
          data.forEach(function (item, index) {
            var timeSlot = item.qssj.substr(11) + '-' + item.zzsj.substr(11);
            var obj = {
              timeSlot: timeSlot,
              timeDifference: item.yxsc,
              startAdress: item.qsdz,
              endAdress: item.zzdz,
              oilWear: '油耗：' + item.bdyh + 'L',
              averageOilWear: '平均油耗：' + item.pjyh + 'L/100km',
              km: '里程：' + item.bdlc + 'km',
              averageSpeed: '平均速度：' + item.pjlc + 'km/h'
            };
            arr.push(obj);
            totalKm += item.bdlc;
            totalOilWear += item.bdyh;
          });
          that.info = arr;
          arr = null;
          that.totalKm = totalKm + 'km';
          that.totalOilWear = totalOilWear + 'L';
        }
      });
    },
    dateController: function dateController(type) {
      if (type === 'prev') {
        this.dateChange('prev');
      } else {
        this.dateChange('next');
      }
      this.getTrackInfo();
    },
    dateChange: function dateChange(type) {
      console.log(type);
      if (type === 'prev') {
        //点击前一天
        var d = new Date(this.date.getTime() - 24 * 60 * 60 * 1000);
      } else {
        //点击后一天
        var d = new Date(this.date.getTime() + 24 * 60 * 60 * 1000);
      }
      this.year = d.getFullYear();
      this.month = this.fomatDate(d.getMonth() + 1);
      this.day = this.fomatDate(d.getDate());
      this.date = d;
      console.log(d);
    },
    fomatDate: function fomatDate(date) {
      if (date < 10) {
        return '0' + date;
      } else {
        return date;
      }
    }
  }
});
info.init();