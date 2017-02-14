'use strict';

// localStorage.userId = 'pinjia';
localStorage.userId = '15963129158';

var info = new Vue({
  el: '.vue',
  data: {
    userName: ''
  },
  methods: {
    init: function init() {
      this.chackUserState();
    },
    chackUserState: function chackUserState() {
      if (typeof localStorage.userId === "string") {
        this.userName = localStorage.userId;
      } else {

        location.href = common().ROOT() + "/APP/login.html";
      }
    },
    singOut: function singOut() {
      localStorage.removeItem('userId');
      location.href = common().ROOT() + "/APP/login.html";
    }
  }
});
info.init();