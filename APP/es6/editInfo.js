var app = new Vue({
  el: '.vue',
  data: {
    carImg: 'http://img3.imgtn.bdimg.com/it/u=2368545682,2930337165&fm=23&gp=0.jpg',
    carName: '兰博基尼',
    carNum: 'NB88888'
  },
  methods: {
    init: function(){
      console.log('vue init');
    }
  }
})
app.init();
