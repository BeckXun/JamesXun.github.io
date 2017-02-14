'use strict';

var info = new Vue({
  el: '.vue',
  data: {
    inputMsg: '',
    buttonStatus: false,
    placeholder: '请填写车牌号',
    type: 'carName'
  },
  methods: {
    judgeStatus: function judgeStatus(e) {
      console.log(e.target.value);
      var value = e.target.value;
      if (value.length > 0) {
        this.buttonStatus = true;
      } else {
        this.buttonStatus = false;
      }
    },
    submit: function submit() {
      if (this.buttonStatus) {

        var that = this;
        $.ajax({
          type: 'POST',
          DataType: 'json',
          timeout: common().timeout,
          url: common().ROOT() + '/pjwxjk/mian.aspx',
          data: {
            password: '7935hjh',
            ffm: 'set_cph',
            cph: that.inputMsg,
            sbh: common().queryString('sbh')
          },
          success: function success(data) {

            var data = JSON.parse(data)[0];
            if (data.jg === 1) {
              $.toast('修改成功');
            }
          }
        });
      }
    }
  }
});