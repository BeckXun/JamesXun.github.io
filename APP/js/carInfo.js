'use strict';

var app = new Vue({
  el: '.vue',
  data: {
    cancel: false, //取消分享
    myself: false, //是否为自己车--编辑车辆
    baseInfo: true,
    carInfo: false,
    header: {},
    info: [],
    cacheInfo: {
      base: [],
      car: []
    },
    pinpai: '',
    cph: '',
    cjh: '',
    sbh: ''
  },
  methods: {
    init: function init() {

      var machineNumber = common().queryString('sbh');
      console.log(machineNumber);
      this.checkType();
      var url = null;
      var that = this;
      $.ajax({
        type: 'POST',
        DataType: 'json',
        timeout: common().timeout,
        url: common().ROOT() + '/pjwxjk/mian.aspx',
        data: {
          password: '7935hjh',
          sbh: machineNumber,
          ffm: 'get_truck_info'
        },
        success: function success(data) {
          console.log(data);
          var data = JSON.parse(data)[0];
          console.log(data);
          url = common().carImgUrl(data.brand);
          common().carImgUrl(data.brand);
          // 判断是否为自己车
          if (data.yh === localStorage.userId) {
            that.myself = true;
          }
          // 头部信息更新
          that.header = {
            imgUrl: url,
            carName: data.cxh,
            carNum: '车架号：' + data.cjh
          };
          that.pinpai = data.brand;
          that.cph = data.cph;
          that.cjh = data.cjh;
          that.sbh = data.sbh;
          //格式化设备sim卡余额
          if (data.gpsyu_e.length > 0) {
            data.gpsyu_e = data.gpsyu_e.match(/\u4f59\u989d\u662f(\S*)/)[1];
          }

          //基本信息更新
          that.info = that.cacheInfo.base = [{
            default: true,
            detil: ['品牌：' + data.brand, '购车日期：' + data.buy_time]
          }, {
            default: true,
            detil: ['设备号：' + data.sbh, '设备SIM卡号：' + data.sjh, '设备SIM卡余额：' + data.gpsyu_e]
          }, {
            default: true,
            detil: ['入网时间：' + data.opdate, 'GPS最后回传时间：' + data.gpstime]
          }, {
            default: true,
            detil: ['安装位置：' + data.clt, '硬件版本：' + data.gpssoftver]
          }, {
            default: false,
            detil: ['驾驶评分：'],
            score: that.formatScore(data.zcs)

          }];
          //车辆信息更新
          that.cacheInfo.car = [{
            default: true,
            detil: ['总里程：' + data.canzlc + "km", '月均里程：' + data.zyjlc + "km"]
          }, {
            default: true,
            detil: ['总油耗：' + data.canzyh + "L", '总均油耗：' + data.zpjyh + "L"]
          }, {
            default: true,
            detil: ['当前位置：' + data.address, '运行状态：' + data.yx_zt]
          }, {
            default: true,
            detil: ['变速箱：' + data.bsx, '后桥速比：' + data.hqsb, '轮胎：' + data.luntai_mc]
          }, {
            default: true,
            detil: ['挂车是否WABCO：' + data.cltwa, '邮箱容量：' + data.buy_time]
          }];
        }
      });
    },
    tap: function tap(type) {
      if (type === 'baseInfo') {

        if (this.baseInfo === false) {
          //上一次不是base
          this.baseInfo = true;
          this.info = this.cacheInfo.base;

          this.carInfo = false;
        }
      } else {

        if (this.carInfo === false) {
          //上一次不是car
          this.carInfo = true;
          this.info = this.cacheInfo.car;
          this.baseInfo = false;
        }
      }
    },
    formatScore: function formatScore(score) {
      var arr = [];
      if (typeof score === "number" & score >= 0) {
        for (var i = 0; i < 5; i++) {
          score > 0 ? arr.push(1) : arr.push(0);
          score--;
        }
        return arr;
      } else {
        //万一返回数据不正确
        return [1, 1, 1, 1, 1];
      }
    },
    checkType: function checkType() {
      var type = common().queryString('type');
      if (type === 'cancel') {
        this.cancel = true;
      } else {
        console.log(type);
      }
    },
    cancelShare: function cancelShare() {
      var userid = common().queryString('userid');
      var cjh = common().queryString('cjh');
      $.ajax({
        type: 'POST',
        DataType: 'json',
        timeout: common().timeout,
        url: common().ROOT() + '/pjwxjk/mian.aspx',
        data: {
          password: '7935hjh',
          ffm: 'interface_delete_share_by_userid_cjh',
          userid: userid,
          cjh: cjh
        },
        success: function success(data) {
          var data = JSON.parse(data)[0];
          console.log(data);
          if (data.Column1 === 1) {
            $.toast("取消成功");
          }
        }
      });
    }
  }
});
app.init();