// <script>
//   var shareLink = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxda3e4ce65df74eb9&redirect_uri=http%3A%2F%2Fwww.kuaixiansheng.net%2Fweixin%2Fjump.html%3Fredirect_uri%3Dhttp%253a%252f%252fapi.kuaixiansheng.net%252fweixin%252fstore%252flogin.html&response_type=code&scope=snsapi_base&state=ILoveMrKuai#wechat_redirect";
//
//   window.onload = function  () {
//     Weixin.init();
//   }
// </script>
// <script src="/scripts/weixin.js"></script>

var common = () => {
	return {
    createTag:  (type, url) => {
			//只在需要添加jq-weiUI的地方添加
			let pageUrlLists = ['/APP/login.html','/APP/.html'];
			let need = false;
			pageUrlLists.forEach(function(item,index){
				console.log(item)
					if(item === location.pathname){
						need = true;
					}
			});
			if(need){
				let oTag = document.createElement(type);
				oTag.async = true;
	      if(type === 'script'){


	        let body = document.querySelector('body');
	        let lastScript = body.querySelectorAll('script')[2];
	        oTag.src = url;
	        body.insertBefore(oTag,lastScript.nextSibling);

	        document.body.appendChild(oTag);
	      }else if(type === 'link'){
	        let head = document.querySelector('head');
	        let lastLink = head.querySelector('link');
	        oTag.href = url;
	        oTag.rel = 'stylesheet'
	        head.insertBefore(oTag,lastLink.nextSibling);
	      }
			}

		},
		queryString: (key) => {
			let res = location.search.match(new RegExp("[\?\&]"
      + key + "=([^\&]*)(\&?)","i"));
			if(res === null){
				return false;
			}else {
				return decodeURI(res[1]);
			}
		},
		timestamp2Date: json => {
			var json = json||{};
			var timestamp = json.T;
			var outType = json.type;//
			var oDate = new Date();
			oDate.setTime(timestamp);
			var Y = oDate.getFullYear();
			var M = oDate.getMonth()+1;
			var D = oDate.getDate();
			var h = oDate.getHours();
			var m = oDate.getMinutes();
			var s = oDate.getSeconds();
			switch(outType){
				case 1 :
					return Y+'-'+this.toDou(M)+'-'+this.toDou(D)+' '+this.toDou(h)+':'+this.toDou(m);
					break;
				case 2 :
					return Y+'年'+this.toDou(M)+'月'+this.toDou(D)+'日';
					break;
				case 3 :
					return Y+'-'+this.toDou(M)+'-'+this.toDou(D);
					break;
			}
		},
		toDou : n => {
			return n>10 ? ''+n : '0'+n;
		},
		timeout : () => {
			return 3000;
		},
		getLocation: obj => {
			console.log('开始调用getLocation',wx.getLocation);
			var that = this;
			wx.ready(function(){
				wx.getLocation({
					type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
					success: function (res) {
						console.log('微信获取地址成功');
						var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
						var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
						localStorage.currentLongitude = longitude;
						localStorage.currentLatitude = latitude;
						if(obj.success != undefined){
							obj.success();
							console.log('定位成功并调用success()');
						}else{
							console.log('定位成功&&没有传success的参数');
						}
					},
					cancel: function(){
						console.log('微信获取地址失败');
						if(obj.false != undefined){
							obj.false();
						}else {
							console.log('定位失败&&没有传false的参数');
						}
					},
					error: function(){
						console.log('微信获取地址失败');
					}
				});
			});
			console.log("调用getLocation成功");
		},
		errorRedirect : httpStatusCode => {
			if(httpStatusCode == 303){
				window.location.href = 'http://api.kuaixiansheng.net/wxstore/error.html';
			}else if(httpStatusCode != 200){
				console.log('未输入正确http状态码');
			}
		}
	}
};
common();
//找到第一个link倒叙插入
common().createTag('link', 'css/jquery-weui.min.css');
common().createTag('link', 'https://cdn.bootcss.com/weui/1.1.0/style/weui.min.css');
common().createTag('script', 'https://cdn.bootcss.com/jquery-weui/1.0.0-rc.0/js/jquery-weui.min.js');