<template>
  <div class="gen-code" :class="{'cm-disabled':time<60||!phone}" @click="genCode()">
    {{time==60?'获取验证码':time+'S'}}
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .gen-code{
    position: absolute;
    width: 2.6rem;
    height: 0.76rem;
    line-height: 0.76rem;
    border-radius: 0.06rem;
    background: #4e89ee;
    font-size: 0.28rem;
    color: #fff;
    text-align: center;
    top:0rem;
    bottom:0rem;
    right: 0.3rem;
    margin: auto;
    cursor: pointer;
  }
</style>
<script>
  import Vue from 'vue'
  export default {
    components: {

    },
    props:{
      type:{
        type:String,
        default:'register',
      },
      phone:{
        type:String,
      },
      url:{
        type:String,
      }
    },
    data: function () {
      return {
        time:60,
        isRequesting:false,
        urlObj:{
          register:'/lyy/rest/group/distributor/getRegisterCode',
          resetPassword:'/lyy/rest/group/distributor/getForgetCode'
        }
      }
    },
    computed: {},
    watch: {

    },
    methods: {
      genCode:function () {
        let that=this;
        if(!regex.phone.test(this.phone)){
          this.toast({text:regex.phoneAlert});
          return;
        }
        if(this.isRequesting||this.time<60){
          return;
        }
        this.isRequesting=true;
        let hb=this.handleFeedback({
          text:'发送中...'
        });
        let params=null;
        let method=null;
        switch (this.type){
          case 'register':
            params={"phoneNumber": this.phone};
            break;
          case 'resetPassword':
            params={"phone": this.phone};
            method='get';
            break;
        }
        Vue.api.getCode(params,this.urlObj[this.type],method).then(function (resp) {
          that.isRequesting=false;
          if(resp.result==1){
            hb.setOptions({type:'complete','text':'发送成功'});
            var interval=setInterval(function () {
              if(that.time==0){
                that.time=60;
                clearInterval(interval);
              }else{
                that.time--;
              }
            },1000);
          }else{
            hb.setOptions({type:'warn','text':resp.description});
          }
        });
      }
    },
    created: function () {

    },
    mounted: function () {
      /*修改父dom的position*/
      this.$el.parentNode.style.position='relative';
    }
  };
</script>
