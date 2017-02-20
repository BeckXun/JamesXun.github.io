'use strict';

var app = new Vue({
  el: '.vue',
  data: {
    phoneNumber: ''
  },
  // watch: {
  //   phoneNumber(curVal,oldVal){
  //     this.phoneState = curVal > 0 ? true : false;
  //   },
  //   password(curVal,oldVal){
  //     this.passwordState = curVal > 0 ? true : false;
  //   }
  // },
  methods: {
    init: function init() {
      // this.channel = this.$refs.channel.value;
      // this.validateCode = this.$refs.validateCode.value;
    },

    pay: function pay() {
      var that = this;
      // location.href = '/login.html'; //development
      location.href = '/guqin/login.html'; //production
    }

  }
});
app.init();