;(function  (gold) {
var ROOT = 'http://'+window.location.host;
gold.SignIn =  function() {
  this.testPhone = /^1[3|4|5|7|8][0-9]\d{8}$/;
  this.scanButton = $('.scanCode');
};
gold.SignIn.prototype = {
	init : function () {
    this.scanCode()
	},
  scanCode: function(){
    this.scanButton.on('click',function(){
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          console.log(result);
          console.log(res);
        }
      });
    });
  }
};
new gold.SignIn().init();
})(typeof window != 'undefined' ? window : this);
