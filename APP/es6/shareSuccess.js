var app = new Vue({
  el: '.vue',
  data: {

  },
  methods: {
    init: function(){

    },
    goBack: function(){
      let url = this.getStorage();

      if(url){
        this.clearStorage();
        window.location.href = url;
      }else {
        //wx.close();
      }

    },
    getStorage: function(){
      if(localStorage.shareLastPage != undefined){
        return localStorage.shareLastPage;
      }else {
        return false;
      }
    },
    clearStorage: function(){
      localStorage.removeItem('shareLastPage');
    }
  }
})
app.init();
