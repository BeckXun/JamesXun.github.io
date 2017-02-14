'use strict';

var app = new Vue({
  el: '.vue',
  data: {
    list: [],
    cacheInfo: [],
    key: ''
  },
  methods: {
    init: function init(e) {
      var that = this;
      $.ajax({ //获取用户可分享车辆
        type: 'POST',
        DataType: 'json',
        timeout: common().timeout,
        url: common().ROOT() + '/pjwxjk/mian.aspx',
        data: {
          password: '7935hjh',
          ffm: 'interface_get_my_share',
          userid: localStorage.userId
        },
        success: function success(data) {

          var data = JSON.parse(data);
          console.log(data);
          var info = [];
          data.forEach(function (item, index) {

            item.cph = item.cph.replace(/(^\s+)|(\s+$)/g, "");
            item.cjh = item.cjh.replace(/(^\s+)|(\s+$)/g, "");
            item.sbh = item.sbh.replace(/(^\s+)|(\s+$)/g, "");
            var obj = {
              "userid": item.userid,
              "cjh": item.cjh,
              "sbh": item.sbh,
              "cph": item.cph
            };
            info.push(obj);
          });
          that.list = that.cacheInfo = info;
          info = null;
        }
      });
    },
    search: function search(key) {

      var list = this.cacheInfo;
      var arr = [];
      list.forEach(function (item, index) {
        if (item.cph === key || item.cjh === key) {
          arr.push(item);
        }
      });
      this.list = arr;
      arr = null;
    }
  }
});
app.init();