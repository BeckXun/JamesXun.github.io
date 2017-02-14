'use strict';

var info = new Vue({
  el: '.vue',
  data: {
    inputMsg: '',
    buttonStatus: false
  },
  methods: {
    judgeStatus: function judgeStatus(e) {
      console.log(e.target.value);
      var value = e.target.value;
      var reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      if (reg.test(value)) {
        this.buttonStatus = true;
        this.phoneNumber = value;
      } else {
        this.buttonStatus = false;
      }
    },
    submit: function submit() {
      //验证是否可以分享
      var that = this;
      if (this.buttonStatus) {
        (function () {
          var cacheInfo = JSON.parse(localStorage.shareList);
          console.log(cacheInfo);
          cacheInfo.forEach(function (item, index) {
            item.cph = item.cph.replace(/(^\s+)|(\s+$)/g, "");
            item.cjh = item.cjh.replace(/(^\s+)|(\s+$)/g, "");
            item.sbh = item.sbh.replace(/(^\s+)|(\s+$)/g, "");
            console.log(item);
            $.ajax({ //分享车辆
              type: 'POST',
              DataType: 'json',
              timeout: common().timeout,
              url: common().ROOT() + '/pjwxjk/mian.aspx',
              data: {
                password: '7935hjh',
                ffm: 'interface_set_share',
                cph: item.cph,
                cjh: item.cjh,
                sbh: item.sbh,
                oper: localStorage.userId,
                to_user: that.phoneNumber
              },
              success: function success(data) {

                // var data = JSON.parse(data);
                console.log(data);
                if (index === cacheInfo.length - 1) {
                  window.location.href = window.location.origin + '/App/shareSuccess.html';
                }
              }
            });
          });

          //如果分享失败
          // $.alert("此账号为空白账号", "验证失败");
          //如果分享成功
        })();
      }
    },
    inputInit: function inputInit() {}
  }
});
info.inputInit();