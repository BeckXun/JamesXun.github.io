'use strict';

var app = new Vue({
  el: '.vue',
  data: {
    userName: '',
    password: '',
    userNameState: false,
    passwordState: false
  },
  watch: {
    userName: function userName(curVal, oldVal) {
      console.log(curVal);
      this.userNameState = curVal.length > 0 ? true : false;
    },
    password: function password(curVal, oldVal) {
      console.log(curVal);
      this.passwordState = curVal.length > 0 ? true : false;
    }
  },
  methods: {
    init: function init() {},

    cacheUserInfo: function cacheUserInfo() {
      localStorage.userId = this.userName;
    },

    singUp: function singUp() {
      var that = this;
      if (this.userNameState && this.passwordState) {
        $.ajax({
          type: 'POST',
          DataType: 'json',
          timeout: common().timeout,
          url: common().ROOT() + '/pjwxjk/mian.aspx',
          data: {
            password: '7935hjh',
            ffm: 'user_in',
            yhm: that.userName,
            mm: that.password
          },
          success: function success(data) {
            var data = JSON.parse(data)[0];
            console.log(data);
            if (data.jg === "注册成功") {
              $.toast('注册成功');
              that.cacheUserInfo();
              that.login();
            }
          }
        });
      }
    },
    login: function login() {
      var that = this;
      if (this.userNameState && this.passwordState) {
        $.ajax({
          type: 'POST',
          DataType: 'json',
          timeout: common().timeout,
          url: common().ROOT() + '/pjwxjk/mian.aspx',
          data: {
            password: '7935hjh',
            ffm: 'user_login',
            yhm: that.userName,
            mm: that.password
          },
          success: function success(data) {
            var data = JSON.parse(data)[0];
            console.log(data);
            if (data.jg === "OK") {
              location.href = common().ROOT() + '/APP/myCar.html';
            }
          }
        });
      }
    }
  }
});
app.init();