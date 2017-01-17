'use strict';

var app = new Vue({
  el: '.vue',
  data: {
    speed: true,
    rotationSpeed: false,
    oilWear: false,
    accelerator: false,
    shift: false
  },
  methods: {
    init: function init() {

      var option = {
        xAxis: {
          type: 'category',
          data: ['10', ' ', '30', ' ', '50', ' ', '70', ' ', '90', ' ', '110'],
          axisLine: {
            lineStyle: {
              color: "#aaa"
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: "#aaa"
            }
          }
        },
        grid: {
          left: 50
        },
        color: ['#9fe6f6'],
        series: {
          name: '直接访问',
          type: 'bar',
          data: [989, 1332, 1201, 1834, 2190, 1730, 1420, 1322, 1012, 787, 424],
          barWidth: '14px'
        }
      };
      this.option = option;
      this.render(option, 'echarts');
    },
    statusChange: function statusChange(state) {
      var that = this;
      var statusArray = ['speed', 'rotationSpeed', 'oilWear', 'accelerator', 'shift'];
      statusArray.forEach(function (item, index) {
        that[item] = false;
        console.log(that[item]);
      });
      this[state] = true;
      this.render(this.option, 'echarts');
    },
    render: function render(data, type) {
      if (type === 'echarts') {
        this.echartsRender(data);
      }
    },
    echartsRender: function echartsRender(option) {
      var timer = setTimeout(function () {
        var myChart = echarts.init(document.getElementsByClassName('bar')[0]);
        myChart.setOption(option);
      }, 100);
    }
  }

});

app.init();