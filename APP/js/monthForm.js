'use strict';

var app = new Vue({
  el: '.vue',
  data: {
    formState: true,
    detailState: false,
    month: 0,
    Year: '',
    Month: '',
    cph: '',
    sbh: '',
    form: {},
    form_gs: '',
    form_other: '',
    detail: ''
  },
  methods: {
    init: function init() {
      var d = new Date();
      this.Year = d.getFullYear();
      this.Month = d.getMonth() + 1;
      this.getStorage();
      this.getInfo();
      this.getLukuang();
      this.getDetail();
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
          ffm: 'get_month_report',
          sbh: that.sbh,
          dqy: that.month
        },
        success: function success(data) {
          var data = JSON.parse(data)[0];
          console.log(data);
          var ddhx = void 0,
              ds = void 0,
              kdhx = void 0,
              yx = void 0,
              tc = void 0;
          var total = data.ddhx + data.ds + data.kdhx + data.yx + data.tc;
          ddhx = "带档滑行 " + (data.ddhx / total * 100).toFixed(2) + "%";
          ds = "怠速 " + (data.ds / total * 100).toFixed(2) + "%";
          kdhx = "空档滑行 " + (data.kdhx / total * 100).toFixed(2) + "%";
          yx = "运行 " + (data.yx / total * 100).toFixed(2) + "%";
          tc = "停车 " + (data.tc / total * 100).toFixed(2) + "%";
          var option = {
            legend: {
              orient: 'vertical', //竖直排列
              align: 'left', //对齐方式
              x: 'right', //图例x轴方向位置
              y: 'middle', //图例y轴方向位置
              itemWidth: 14, //图例icon宽度
              itemHeight: 14, //图例icon高度
              textStyle: {
                fontSize: 12
              },
              data: [{
                name: ddhx,
                icon: 'roundRect', //icon：圆角矩形
                textStyle: {
                  color: "rgb(243,46,17)"
                }
              }, {
                name: ds,
                icon: 'roundRect',
                textStyle: {
                  color: "rgb(114,66,161)"
                }
              }, {
                name: kdhx,
                icon: 'roundRect',
                textStyle: {
                  color: "rgb(65,147,246)"
                }
              }, {
                name: yx,
                icon: 'roundRect',
                textStyle: {
                  color: "rgb(248,218,34)"
                }
              }, {
                name: tc,
                icon: 'roundRect',
                textStyle: {
                  color: "rgb(91,179,49)"
                }
              }]
            },
            series: [{
              name: '车辆运行月度报表',
              type: 'pie', //饼状图
              radius: ['35%', '55%'], //内外圈大小
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    fontSize: '16',
                    fontWeight: 'bold'
                  }
                }
              },
              center: ['31%', '50%'],
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [{
                value: data.ddhx,
                name: ddhx,
                itemStyle: {
                  normal: {
                    color: "rgb(243,46,17)"
                  }
                }
              }, {
                value: data.ds,
                name: ds,
                itemStyle: {
                  normal: {
                    color: "rgb(114,66,161)"
                  }
                }
              }, {
                value: data.kdhx,
                name: kdhx,
                itemStyle: {
                  normal: {
                    color: "rgb(65,147,246)"
                  }
                }
              }, {
                value: data.yx,
                name: yx,
                itemStyle: {
                  normal: {
                    color: "rgb(248,218,34)"
                  }
                }
              }, {
                value: data.tc,
                name: tc,
                itemStyle: {
                  normal: {
                    color: "rgb(91,179,49)"
                  }
                }
              }]
            }]
          };
          that.option = option;
          that.echartsRender(option);
          that.form = {
            time: '总时间：' + (total / 3600).toFixed(2) + 'h',
            bdyh: '总油耗：' + data.bdyh + 'L',
            bdlc: '总里程：' + data.bdlc + 'km',
            rjlc: '日均里程：' + data.rjlc + 'km',
            tjcs: '途经：' + data.tjds + '个城市',
            pjcs: '平均车速：' + (data.bdlc / (total - data.tc) * 3600).toFixed(2) + 'km/h'
          };
        }
      });
    },
    getDetail: function getDetail() {
      var that = this;
      $.ajax({
        type: 'POST',
        DataType: 'json',
        timeout: common().timeout,
        url: common().ROOT() + '/pjwxjk/mian.aspx',
        data: {
          password: '7935hjh',
          ffm: 'get_month_report_mx',
          sbh: that.sbh,
          dqy: 0
        },
        success: function success(data) {
          var data = JSON.parse(data);
          console.log(data);
          var arr = [];
          var obj = null;
          var total_yx = 0,
              total_ds = 0,
              total_kd = 0,
              total_dd = 0,
              total_lc = 0,
              total_yh = 0;
          data.forEach(function (item, index) {
            obj = {
              rq: item.rq,
              yx: item.yx,
              ds: item.ds,
              kd: item.kdhx,
              dd: item.ddhx,
              lc: item.bdlc,
              yh: item.bdyh
            };
            total_yx += that.time2second(item.yx);
            total_ds += that.time2second(item.ds);
            total_kd += that.time2second(item.kdhx);
            total_dd += that.time2second(item.ddhx);
            total_lc += item.bdlc;
            total_yh += item.bdyh;
            arr.push(obj);
            that.total_yx = total_yx.toFixed(1);
            that.total_ds = total_ds.toFixed(1);
            that.total_kd = total_kd.toFixed(1);
            that.total_dd = total_dd.toFixed(1);
            that.total_lc = total_lc.toFixed(2);
            that.total_yh = total_yh.toFixed(2);
          });
          that.detail = arr;
          arr = null;
        }
      });
    },
    getLukuang: function getLukuang() {
      var that = this;
      $.ajax({
        type: 'POST',
        DataType: 'json',
        timeout: common().timeout,
        url: common().ROOT() + '/pjwxjk/mian.aspx',
        data: {
          password: '7935hjh',
          ffm: 'get_month_report_road',
          sbh: that.sbh,
          dqy: 0
        },
        success: function success(data) {
          var data = JSON.parse(data);
          console.log(data);
          data.forEach(function (item, index) {
            console.log(item.isgs);
            if (item.isgs === 0) {
              //其他
              that.form_gs = '高速：' + item.lc + 'km';
            } else if (item.isgs === 1) {
              //高速
              that.form_other = '其他：' + item.lc + 'km';
            }
          });
        }
      });
    },
    time2second: function time2second(time) {
      var seconds = 0;
      var timelist = time.split(':').reverse();
      if (timelist.length === 1) {
        seconds = Number(timelist[0]);
      } else if (timelist.length === 2) {
        seconds = Number(timelist[0]) + Number(timelist[1]) * 60;
      } else if (timelist.length === 3) {
        seconds = Number(timelist[0]) + Number(timelist[1]) * 60 + Number(timelist[2]) * 3600;
      }
      return seconds / 60;
    },
    getStorage: function getStorage() {
      var index = Number(common().queryString('index'));
      var info = JSON.parse(localStorage.carInfo)[index];
      this.cph = info.cph;
      this.sbh = info.sbh;
    },
    tap: function tap(type) {
      if (type === 'form') {

        this.formState = true;
        console.log(this.detailState);
        if (this.detailState === true) {
          this.render(this.option, 'echarts');
        }
        this.detailState = false;
      } else if (type === 'detail') {
        this.formState = false;
        this.detailState = true;
      }
    },
    changeMonth: function changeMonth(type) {
      if (type === 'prev') {

        this.month -= 1;
        console.log(this.Month);

        if (this.Month > 1) {
          this.Month -= 1;
        } else {
          this.Month = 12;
          this.Year -= 1;
        }
        this.getInfo();
      } else if (this.month < 0) {
        //只能查到当前月份 也就是this.month 最大为0
        this.month += 1;
        this.getInfo();
        if (this.Month > 11) {
          this.Month = 1;
          this.Year += 1;
        } else {
          this.Month += 1;
        }
      }
    },
    render: function render(data, type) {
      if (type === 'echarts') {
        this.echartsRender(data);
      }
    },
    echartsRender: function echartsRender(option) {
      var timer = setTimeout(function () {
        var myChart = echarts.init(document.getElementsByClassName('pie')[0]);
        myChart.setOption(option);
      }, 100);
    }
  }

});

app.init();