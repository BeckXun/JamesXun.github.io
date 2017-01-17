'use strict';

var app = new Vue({
  el: '.vue',
  data: {
    form: true,
    detail: false
  },
  methods: {
    init: function init() {

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
            name: '带档滑行 4.32%',
            icon: 'roundRect', //icon：圆角矩形
            textStyle: {
              color: '#f87670'
            }
          }, {
            name: '怠速 5.81%',
            icon: 'roundRect',
            textStyle: {
              color: '#95ccac'
            }
          }, {
            name: '空档滑行 13.62%',
            icon: 'roundRect',
            textStyle: {
              color: '#fea9c8'
            }
          }, {
            name: '运行 34.57%',
            icon: 'roundRect',
            textStyle: {
              color: '#FFDF6C'
            }
          }, {
            name: '停车 12%',
            icon: 'roundRect',
            textStyle: {
              color: '#34b3e0'
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
            value: 432,
            name: '带档滑行 4.32%',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                  offset: 0, color: '#ff6871' // 0% 处的颜色
                }, {
                  offset: 1, color: '#f26860' // 100% 处的颜色
                }], false)
              }
            }
          }, {
            value: 581,
            name: '怠速 5.81%',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                  offset: 0, color: '#93d7ae' // 0% 处的颜色
                }, {
                  offset: 1, color: '#7fb591' // 100% 处的颜色
                }], false)
              }
            }
          }, {
            value: 1362,
            name: '空档滑行 13.62%',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                  offset: 0, color: '#f7b6ce' // 0% 处的颜色
                }, {
                  offset: 1, color: '#e595b8' // 100% 处的颜色
                }], false)
              }
            }
          }, {
            value: 2257,
            name: '运行 34.57%',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                  offset: 0, color: '#fee68c' // 0% 处的颜色
                }, {
                  offset: 1, color: '#fede6f' // 100% 处的颜色
                }], false)
              }
            }
          }, {
            value: 2562,
            name: '停车 12%',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                  offset: 0, color: '#a2ddfe' // 0% 处的颜色
                }, {
                  offset: 1, color: '#83dbf1' // 100% 处的颜色
                }], false)
              }
            }
          }]
        }]
      };
      this.option = option;
      this.render(option, 'echarts');

      // this.bindTap();
    },
    tap: function tap(type) {
      if (type === 'form') {

        this.form = true;
        console.log(this.detail);
        if (this.detail === true) {
          console.log('调用render');
          this.render(this.option, 'echarts');
          console.log('调用render结束');
        }
        this.detail = false;
      } else if (type === 'detail') {
        this.form = false;
        this.detail = true;
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