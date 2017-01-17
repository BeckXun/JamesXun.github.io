'use strict';

var app = new Vue({
  el: '.vue',
  data: {
    info: [{
      type: 'ABS故障',
      img: 'images/shuju.png',
      timestamp: '2016-02-12 18:00:30',
      detail: [['SPN:791', 'FMI:5', '传感器二桥左－传感器开路或中断'], ['SPN:791', 'FMI:5', '传感器二桥左－传感器开路或中断']]
    }, {
      type: '发动机故障',
      img: 'images/shuju.png',
      timestamp: '2016-02-12 18:00:30',
      detail: [['SPN:791', 'FMI:5', '传感器二桥左－传感器开路或中断']]
    }, {
      type: 'AMT故障',
      img: 'images/shuju.png',
      timestamp: '2016-02-12 18:00:30',
      detail: [['SPN:791', 'FMI:5', '传感器二桥左－传感器开路或中断']]
    }]
  },
  methods: {
    init: function init() {}

  }
});
app.init();