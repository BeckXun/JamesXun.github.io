'use strict';

var app = new Vue({
  el: '.vue',
  data: {
    index: ''
  },
  methods: {
    init: function init() {
      this.index = common().queryString("index");
    }
  }
});
app.init();