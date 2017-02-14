'use strict';

var app = new Vue({
  el: '.vue',
  data: {
    carImg: '',
    cph: '兰博基尼',
    cjh: 'NB88888',
    sbh: ''
  },
  methods: {
    init: function init() {
      var pinpai = common().queryString('pinpai');
      this.carImg = common().carImgUrl(pinpai);
      this.cph = common().queryString('cph');
      this.cjh = common().queryString('cjh');
      this.sbh = common().queryString('sbh');
    }
  }
});
app.init();