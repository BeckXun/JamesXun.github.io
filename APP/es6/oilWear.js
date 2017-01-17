;(function  (gold) {
var ROOT = 'http://'+window.location.host;
gold.SignIn =  function() {
  this.testPhone = /^1[3|4|5|7|8][0-9]\d{8}$/;

};
gold.SignIn.prototype = {
	init : function () {
    this.formInit();
	},
  formInit: function(){
    // 指定图表的配置项和数据
    let option = {
        // title: {//大标题设置
        //     text: '里程报表km',
        //     textStyle:{
        //         color: '#fff',
        //         fontSize: 22
        //     },
        //     textAlign:'left'
        //     // subtext: '纯属虚构'
        // },
        tooltip: {//提示设置
            trigger: 'axis'
        },
        legend: {
            data:['里程报表km','最低气温'],
            textStyle:{
                color: '#fff',
                fontSize: 14
            },
            top: '8%'

        },
        toolbox: {
            show: false,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis:  {
            type: 'category',
            boundaryGap: true,
            data: ['8月25','26','27','28','29','30','31'],
            axisLine:{
                lineStyle:{
                    color:"#fff"
                }
            },
            axisTick:{
                show:false
            }
        },
        yAxis: {
            // show: false,
            type: 'value',
            // scale: true,
            axisLabel: {
                formatter: '{value}',
                textStyle: {
                    color: '#fff'
                }
            },
            axisLine:{
                lineStyle:{
                    color:"#09bb07",
                    fontSize: 12
                }
            },
            offset: -16
        },
        color: ['#fff'],//全局颜色设置array
        backgroundColor: '#09bb07',//全局背景颜色设置string
        series: {
            name:'里程报表km',
            type:'line',
            data:[250, 450, 350, 680, 580, 620, 860],
            lineStyle:{//折线样式
                normal:{
                    color:"#fff"
                }
            },
            areaStyle:{//折线下方区域样式
                normal:{
                    color:'rgba(255,255,255,0.3)'
                }
            }
        }
    };
    this.createForm(option);
  },
  createForm: function(option){
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('main'));
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }


};
new gold.SignIn().init();

})(typeof window != 'undefined' ? window : this);
