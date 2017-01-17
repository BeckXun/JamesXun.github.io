'use strict';

var app = new Vue({
  el: '.vue',
  data: {},
  methods: {
    init: function init() {},
    goBack: function goBack() {
      var url = this.getStorage();

      if (url) {
        this.clearStorage();
        window.location.href = url;
      } else {
        //wx.close();
      }
    },
    getStorage: function getStorage() {
      if (localStorage.shareLastPage != undefined) {
        return localStorage.shareLastPage;
      } else {
        return false;
      }
    },
    clearStorage: function clearStorage() {
      localStorage.removeItem('shareLastPage');
    }
  }
});
app.init();