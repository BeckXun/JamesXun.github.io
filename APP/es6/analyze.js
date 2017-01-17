var app = new Vue({
  el: '.vue',
  data: {
    speed: true,
    rotationSpeed: false,
    oilWear: false,
    accelerator: false,
    shift: false
  },
  methods: {
    init: function(){

      let option = {
          xAxis : {
              type : 'category',
              data : ['10',' ','30',' ','50',' ','70',' ','90',' ',
              '110'],
              axisLine:{
                  lineStyle:{
                      color:"#aaa"
                  }
              }
          },
          yAxis : {
              type : 'value',
              axisLine:{
                  lineStyle:{
                      color:"#aaa"
                  }
              },
              // offset: '-12'
          },
          grid:{
            left: 50
          },
          color: ['#9fe6f6'],
          series : {
              name:'直接访问',
              type:'bar',
              data:[989, 1332, 1201, 1834, 2190,
              1730, 1420,1322,1012,787,424],
              barWidth: '14px'
          }
      };
      this.option = option;
      this.render(option,'echarts');
    },
    statusChange: function(state){
      let that = this;
      var statusArray = [
        'speed',
        'rotationSpeed',
        'oilWear',
        'accelerator',
        'shift'
      ];
      statusArray.forEach(function(item,index){
        that[item] = false;
        console.log(that[item]);
      });
      this[state] = true;
      this.render(this.option,'echarts');
    },
    render: function(data,type){
      if(type === 'echarts'){
        this.echartsRender(data);
      }
    },
    echartsRender: function(option){
      let timer = setTimeout(function(){
        let myChart = echarts.init(document.getElementsByClassName('bar')[0]);
        myChart.setOption(option);
      },100);

    }
  }

});

app.init();
