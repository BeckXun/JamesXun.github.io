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
      // localStorage.userid = ;
    },

    login: function login() {
      var that = this;
      if (this.userNameState && this.passwordState) {
        $.ajax({ //获取我的车辆
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
            var data = JSON.parse(data);
            console.log(data);
          }
        });
      }
    }
  }
});
app.init();