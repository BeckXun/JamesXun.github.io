'use strict';

var app = new Vue({
  el: '.vue',
  data: {
    phoneNumber: '',
    password: '',
    phoneState: false,
    passwordState: false,
    channel: '',
    validateCode: '',
    timer: '获取验证码',
    timerState: true
  },
  watch: {
    phoneNumber: function phoneNumber(curVal, oldVal) {
      this.phoneState = curVal > 0 ? true : false;
    },
    password: function password(curVal, oldVal) {
      this.passwordState = curVal > 0 ? true : false;
    }
  },
  methods: {
    init: function init() {
      this.channel = this.$refs.channel.value;
      this.validateCode = this.$refs.validateCode.value;
    },

    fnTimer: function fnTimer() {
      var that = this;
      var num = 60;
      if (this.timerState === false) {
        return false;
      }
      this.getCode();
      var _timer = setInterval(function () {
        if (num !== -1) {
          that.timerState = false;
          that.timer = num + 's';
          num -= 1;
        } else {
          clearInterval(_timer);
        }
      }, 1000);
    },

    getCode: function getCode() {
      var that = this;
      if (this.phoneState) {
        $.ajax({
          type: 'POST',
          DataType: 'json',

          timeout: 5000, //超时时间设置---------------------

          url: location.host + '/coupon/activity/aachuxing/sms.html',

          data: {
            channel: that.channel,
            validateCode: that.validateCode,
            tel: that.phoneNumber
          },
          success: function success(data) {
            if (data.status == 200) {} else {
              $.toast(data.message);
            }
          }
        });
      }
    },

    submit: function submit() {
      console.log(this.channel);
      var that = this;
      if (this.phoneState && this.passwordState) {
        $.ajax({
          type: 'POST',
          DataType: 'json',

          timeout: 5000, //超时时间设置---------------------

          url: location.host + '/coupon/activity/aachuxing/login.html',

          data: {
            channel: that.channel,
            validateCode: that.validateCode,
            tel: that.phoneNumber,
            code: that.password
          },
          success: function success(data) {
            if (data.status == 200) {
              location.href = ''; //跳转成功页面-------------
            } else {
              $.toast(data.message);
            }
          }
        });
      }
    }

  }
});
app.init();