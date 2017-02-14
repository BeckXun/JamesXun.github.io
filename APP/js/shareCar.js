'use strict';

var info = new Vue({
  el: '.vue',
  data: {
    list: [{
      imgUrl: 'images/carImg/df.png',
      selectState: false,
      cjh: '车架号FL232424',
      sbh: 'eafsfafa',
      cph: '辽N99999'
    }],
    buttonStatus: false,
    canShare: false
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
          yhm: localStorage.userId,
          ffm: 'interface_get_own_truck_by_user'
        },
        success: function success(data) {

          var data = JSON.parse(data);
          console.log(data);
          var info = [];
          data.forEach(function (item, index) {

            var url = common().carImgUrl(item.brand);

            var obj = {
              "imgUrl": url,
              "selectState": false,
              "cjh": item.cjh,
              "sbh": item.sbh,
              "cph": item.cph
            };
            info.push(obj);
          });
          that.list = info;
          info = null;
        }
      });
    },
    submit: function submit() {
      //验证是否可以分享
      if (this.canShare) {
        this.cacheInfo();
        location.href = common().ROOT() + '/APP/share.html';
      }
    },
    select: function select(index) {
      console.log(index);
      this.list[index].selectState = !this.list[index].selectState;
      if (this.list[index].selectState) {
        this.canShare = true;
      }
    },
    cacheInfo: function cacheInfo() {
      var list = this.list;
      var info = [];
      list.forEach(function (item, index) {
        if (item.selectState) {
          var obj = {
            "cjh": item.cjh,
            "sbh": item.sbh,
            "cph": item.cph
          };
          info.push(obj);
        }
      });
      localStorage.shareList = JSON.stringify(info);
      info = null;
    }
  }
});
info.init();