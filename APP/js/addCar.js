'use strict';

var app = new Vue({
  el: '.vue',
  data: {
    cph: '',
    sbh: '',
    sjh: '',
    pinpai: '',
    state: false
  },
  methods: {
    init: function init() {},
    checkState: function checkState(content) {
      if (content.length > 0) {
        if (this.cph.length > 0 && this.sbh.length > 0 && this.sjh.length > 0 && this.pinpai.length > 0) {
          this.state = true;
        }
      } else {
        this.state = false;
      }
    },
    addCar: function addCar(state) {

      if (state) {
        var that = this;
        $.ajax({ //分享车辆
          type: 'POST',
          DataType: 'json',
          timeout: common().timeout,
          url: common().ROOT() + '/pjwxjk/mian.aspx',
          data: {
            password: '7935hjh',
            ffm: 'save_truck',
            cph: that.cph,
            sjh: that.sjh,
            sbh: that.sbh,
            pinpai: that.pinpai,
            yhm: localStorage.userId
          },
          success: function success(data) {

            var data = JSON.parse(data)[0];
            console.log(data);
            if (data.jg === "保存成功!") {
              location.href = common().ROOT() + "/APP/myCar.html";
            }
          }
        });
      }
    }
  }
});
app.init();