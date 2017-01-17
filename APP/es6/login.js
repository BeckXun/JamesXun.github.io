;(function  (gold) {
var ROOT = 'http://'+window.location.host;
gold.SignIn =  function() {
  this.testPhone = /^1[3|4|5|7|8][0-9]\d{8}$/;
  this.phoneNumInput = $('.box input').eq(0);
  this.codeInput = $('.box input').eq(1);
  this.codeButton = $('.button-forbidden');
  this.confirmButton = $('.common-button-forbidden');
  this.isRequireCode = false;
  this.isConfirm = false;
};
gold.SignIn.prototype = {
	init : function () {
		this.interfaceInit();
    this.requireCode();
    this.confirm();
	},
  interfaceInit: function () {
    console.log(this.phoneNumInput.value)
    this.phoneNumInput.on('input',function(){
      console.log(this.phoneNumInput.val())
      if(this.testPhone.test(this.phoneNumInput.val()) === true){

        // this.confirmButton.attr("class","common-button");
        this.codeButton.addClass('button');
        this.isRequireCode = true;

      }else {
        this.codeButton.attr('class','button-forbidden');
        this.isRequireCode = false;
      }
    }.bind(this));
    this.codeInput.on('input',function(){
      //如果验证码是6位且手机号输入满足正则匹配 就可以提交
      if(this.codeInput.val().length == 6 && this.testPhone.test(this.phoneNumInput.val()) === true){
        console.log(11)
        // this.confirmButton.attr("class","common-button");
        this.confirmButton.addClass('common-button');
        this.isConfirm = true;
      }else {
        this.confirmButton.attr('class','common-button-forbidden');
        this.isConfirm = false;
      }
    }.bind(this));
  },
  requireCode: function(){
    let that = this;
    this.codeButton.on('click',function(){
      console.log(that.isRequireCode)
      if(that.isRequireCode){
        $.toast("验证码已发送");
        that.isRequireCode = false;
        that.codeButton.html('60s');
        that.codeButton.attr('class','button-forbidden');
        let time = 60;
        let timer = setInterval(function  () {
          time -= 1;
          that.codeButton.html(time+'s');
          if(time == 0){
            clearInterval(timer);
            time = 60;
            that.codeButton.html('重新发送');
            that.codeButton.addClass('button');
            that.isRequireCode = true;
            console.log(that.isRequireCode)
          }
        },1000);
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
      }
    });
  },
  confirm: function(){
    let that = this;
    this.confirmButton.on('click',function(){
      console.log(that.isRequireCode,that.isConfirm)
      if(that.isConfirm){
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

        //没有车辆不做跳转
        //有车辆再跳转至我的车辆页面
        if(that.codeInput.val() === '111111'){
          window.location.href = ROOT+'/APP/myCar.html'
        }else {
          $.toast('验证码错误','cancel');
        }
      }
    });

  }
};
new gold.SignIn().init();
})(typeof window != 'undefined' ? window : this);
