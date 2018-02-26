<!--登录-->
<template>
    <div class="login-page">
      <i class="icon logo-icon"></i>
      <div class="form">
        <div class="input-row">
          <cm-input type="tel" v-model="account" placeholder="手机号" maxlength="11" clear="true"></cm-input>
        </div>
        <div class="input-row">
          <cm-input v-model="password" clear="true">
            <input type="password" v-model="password" placeholder="密码" maxlength="20">
          </cm-input>
        </div>
      </div>
      <p class="forget">
        <router-link to="forgetPassword">忘记密码？</router-link>
      </p>
      <div class="cm-btn handle-btn login-btn" @click="login()">登录</div>
      <router-link class="cm-btn handle-btn register-btn" to="register">注册</router-link>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .login-page{
    padding: 0.6rem 0.3rem 0rem 0.3rem;
    text-align: center;
  }
  .form{
    margin-top: 0.6rem;
    border: 1px solid #e5e5e5;
    border-radius: 0.08rem;
    overflow: hidden;
  }
  .input-row{
    background: #fff;
    &+.input-row{
      border-top: 1px solid #e5e5e5;
    }
  }
  .forget{
    padding: 0.3rem 0rem;
    text-align: right;
    a{
      font-size: 0.28rem;
      color: #999;
    }
  }
  .handle-btn{
    display: block;
    height: 0.84rem;
    line-height: 0.84rem;
    text-align: center;
    font-size: 0.32rem;
    border-radius: 0.06rem;
  }
  .login-btn{
    margin-top: 0.4rem;
    color: #fff;
    background: #4e89ee;
  }
  .register-btn{
    margin-top: 0.3rem;
    color: #4e89ee;
    border: 1px solid #4e89ee;
  }
</style>
<script>
    import Vue from 'vue'
    import md5 from 'js-md5'
    export default {
        components: {

        },
        data: function () {
            return {
              account:null,
              password:null
            }
        },
        computed: {},
        watch: {
        },
        methods: {
          login:function () {
            if(!regex.phone.test(this.account)){
              this.toast({text:regex.phoneAlert});
              return;
            }
            if(!this.password||this.password.length<6){
              this.toast({text:'请输入正确的密码'});
              return;
            }
            let hb=this.handleFeedback({
              text:'登录中...'
            });
            let that=this;
            Vue.api.login({"userName": this.account, "password": md5.hex(this.password)}).then(function (resp) {
              if(resp.result==1){
                that.$cookie.set('account',JSON.stringify(resp.para),3);
                hb.setOptions({type:'complete','text':'登录成功',duration:0});
                that.$router.push({name:'home'});
              }else{
                hb.setOptions({type:'warn','text':resp.description});
              }
            })
          },
        },
        created: function () {

        },
        mounted: function () {

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
