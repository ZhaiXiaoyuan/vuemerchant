<template>
  <div id="app" v-cloak>
    <router-view/>
  </div>
</template>

<style lang="less" rel="stylesheet/less">
  @import "less/main";
  [v-cloak] { display: none }
</style>
<script>
  import Vue from 'vue'
  /**
   * 奇技淫巧：在这里显式定义全局变量和最高级的methods，在子组件里面可以直接调用，this.$root.xxxx来访问
   * */
  Vue.$rootScope = {
    access: {

    }
  }
export default {
  name: 'app',
  mounted: function () {
    /*rem单位缩放*/
    (function (doc, win) {
      var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        recalc = function () {
          var clientWidth = docEl.clientWidth;
          var clientHeight = docEl.clientHeight;
          if (!clientWidth) return;
          if(clientWidth >= 750 ){
            clientWidth = 750
            doc.body.style.width = 750 + 'px'
          }else{
            doc.body.style.width = clientWidth + 'px'
          }
          doc.body.style.height = clientHeight + 'px'
          docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
          docEl.dataset.percent = 100 * (clientWidth / 750)
        };
      recalc();
      doc.documentElement.classList.add('iosx' + win.devicePixelRatio)
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
    })(document, window);
  }
}
</script>
