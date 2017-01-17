'use strict';

var info = new Vue({
  el: '.vue',
  data: {
    inputMsg: '',
    buttonStatus: false,
    placeholder: '请填写车辆名称',
    type: 'carName'
  },
  methods: {
    judgeStatus: function judgeStatus(e) {
      console.log(e.target.value);
      var value = e.target.value;
      if (value.length > 0) {
        this.buttonStatus = true;
        //this.xxx = 'sdsd';即可设置data
      } else {
        this.buttonStatus = false;
      }

      //this.$data.inputMsg 拿到data里面的数据
      //this.inputMsg 拿到data里面的数据 (推荐)
      console.log(this.inputMsg);

      // `this` 在方法里指当前 Vue 实例
      // `event` 是原生 DOM 事件
    },
    submit: function submit() {
      if (this.buttonStatus) {
        console.log($.ajax);
        if (this.type === 'carName') {} else if (this.type === 'carNum') {}
      }
    },
    inputInit: function inputInit() {
      var type = window.location;
      //type default carName
      //judge type carNum
      if (type.search === "?type=carNum") {
        this.placeholder = '请填写车架号';
        this.type = 'carNum';
      }
    }
  }
});
info.inputInit();