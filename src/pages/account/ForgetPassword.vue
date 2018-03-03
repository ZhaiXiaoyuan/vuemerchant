<!--忘记密码-->
<template>
    <div class="forget-password-page">
      <div class="panel" v-if="step==1">
        <div class="block">
          <div class="input-row">
            <cm-input type="tel" v-model="phone" placeholder="手机号" maxlength="11" clear="true"></cm-input>
          </div>
          <div class="input-row">
            <cm-input class="code-input" type="text" v-model="code" placeholder="验证码" maxlength="4" clear="true"></cm-input>
            <gen-code :phone="phone" type="resetPassword" url="/lyy/rest/group/distributor/getForgetCode"></gen-code>
          </div>
        </div>
        <div class="btn-wrap">
          <div class="cm-btn handle-btn" @click="checkCode()">下一步</div>
        </div>
      </div>
      <div class="panel" v-if="step==2">
        <div class="block">
          <div class="input-row">
            <cm-input type="password" v-model="pwd" placeholder="密码" maxlength="20" clear="true"></cm-input>
          </div>
          <div class="input-row">
            <cm-input type="password" v-model="rePwd" placeholder="再次确认密码" maxlength="20" clear="true"></cm-input>
          </div>
        </div>
        <div class="btn-wrap">
          <div class="cm-btn handle-btn" @click="register()">完成</div>
        </div>
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../less/password-setting.less";
</style>

<script>
    import Vue from 'vue'

    export default {
        components: {

        },
        data: function () {
            return {
              phone:null,
              code:null,
              pwd:null,
              rePwd:null,
              step:1,
              isRequesting:false,
            }
        },
        computed: {},
        watch: {},
        methods: {
          checkCode:function () {
            let that=this;
            if(!regex.phone.test(this.phone)){
              this.toast({text:regex.phoneAlert});
              return;
            }
            if(!this.code||this.code.length!=4){
              this.toast({text:'请输入正确的验证码'});
              return;
            }
            let hb=this.handleFeedback({text:'操作中...'});
            Vue.api.checkResetPasswordCode({"phoneNumber": this.phone, "code": this.code}).then(function (resp) {
              if(resp.result==1){
                hb.setOptions({type:'complete','text':'验证成功',duration:0});
                that.step=2;
                that.$router.push({name:'forgetPassword',params:{step:that.step}});
                localStorage.setItem('resetPasswordData',JSON.stringify({step:that.step,phone:that.phone}));
              }else{
                hb.setOptions({type:'warn','text':resp.description});
              }
            });
          },
        },
        created: function () {
        },
        mounted: function () {
          let that=this;
          let resetPasswordData=JSON.parse(localStorage.getItem('resetPasswordData'));
          if(resetPasswordData){
            this.phone=resetPasswordData.phone;
          }
          if(this.$route.params.step){
            this.step=this.$route.params.step;
          }
        },
        route: {
           /* data: function(transition) {
                return Vue.utils.getCustomer().then(function (data) {
                    {
                        return {}
                    }
                });


            },
            waitForData: true,*/
        }
    };
</script>
