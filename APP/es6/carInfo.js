var app = new Vue({
  el: '.vue',
  data: {
    cancel: false,//取消分享
    myself: false,//是否为自己车--编辑车辆
    info:[
      {
        default:  true,
        detil: [
          '品牌：重汽',
          '购车日期：2016-01-01'
        ]
      },
      {
        default:  true,
        detil: [
          '设备号：7001080',
          '设备SIM卡号：7001080',
          '设备SIM卡余额：85.15元'
        ]
      },
      {
        default:  true,
        detil: [
          '入网时间：2016-01-01  14:00:00',
          'GPS最后回传时间：2016-01-01  14:00:00'
        ]
      },
      {
        default:  true,
        detil: [
          '安装位置：主车',
          '硬件版本：V5.56_Z_HD10.A_BLDR3.05'
        ]
      },
      {
        default:  false,
        detil: [
          '驾驶评分：'
        ],
        score: [1,1,1,1,0.5]
      }

    ]
  },
  methods: {
    init: function(){
      let type = common().queryString('type');
      if(type === 'cancel'){
        this.cancel = true;
      }else {
        console.log(type);
      }
    }
  }
})
app.init();
