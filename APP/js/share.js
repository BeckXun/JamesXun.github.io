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
        //this.xxx = 'sdsd';即可设置data
      } else {
        this.buttonStatus = false;
      }

      //this.$data.inputMsg 拿到data里面的数据
      //this.inputMsg 拿到data里面的数据 (推荐)

      // `this` 在方法里指当前 Vue 实例
      // `event` 是原生 DOM 事件
    },
    submit: function submit() {
      //验证是否可以分享
      if (this.buttonStatus) {
        console.log($.ajax);
        // $.ajax({
        // 	type : 'GET',
        // 	DataType : 'json',
        // 	url : ROOT+'/weixin/store/index.html',
        // 	timeout : common.timeout,
        // 	success : function(data) {
        // 		var Data = data;
        // 		if(Data.status == 200){
        //
        // 		}
        //
        // 		common.errorRedirect(Data.status);
        // 	}
        // });
        //如果分享失败
        // $.alert("此账号为空白账号", "验证失败");
        //如果分享成功
        window.location.href = window.location.origin + '/App/shareSuccess.html';
      }
    },
    inputInit: function inputInit() {}
  }
});
info.inputInit();