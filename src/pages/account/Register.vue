<!--注册-->
<template>
    <div class="register-page">
      <div class="panel" v-if="step==1">
        <div class="block">
          <div class="input-row">
            <cm-input v-model="name" placeholder="姓名" maxlength="10" clear="true"></cm-input>
          </div>
          <p class="tips">请填写真实姓名以便审核</p>
        </div>
        <div class="block">
          <div class="input-row">
            <cm-input tel="tel" v-model="phone" placeholder="手机号" maxlength="11" clear="true"></cm-input>
          </div>
          <div class="input-row">
            <cm-input class="code-input" tel="text" v-model="code" placeholder="验证码" maxlength="4" clear="true"></cm-input>
            <gen-code :phone="phone" url="/lyy/rest/group/distributor/getRegisterCode"></gen-code>
          </div>
        </div>
        <div class="btn-wrap">
          <div class="cm-btn handle-btn" @click="checkCode()">下一步</div>
        </div>
      </div>
      <div class="panel" v-if="step==2">
        <div class="block">
          <div class="input-row">
            <cm-input tel="password" v-model="pwd" placeholder="密码" maxlength="20" clear="true"></cm-input>
          </div>
          <div class="input-row">
            <cm-input tel="password" v-model="rePwd" placeholder="再次确认密码" maxlength="20" clear="true"></cm-input>
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
  .block{
    margin-top: 0.3rem;
  }
  .input-row{
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    background: #fff;
    &+.input-row{
      border-top: none;
    }
  }
  .tips{
    padding-top: 0.06rem;
    padding-left: 0.2rem;
    color: rgba(0,0,0,.8);
    font-size: 0.28rem;
  }
  .code-input{
    width: 4.5rem;
  }
  .btn-wrap{
    margin-top: 0.5rem;
    padding: 0rem 0.3rem;
  }
  .handle-btn{
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    font-size: 0.32rem;
    color: #fff;
    border-radius: 0.06rem;
    background: #4e89ee;
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
              name:null,
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
            if(!this.name||this.name.length<2){
              this.toast({text:'请输入真实姓名'});
              return;
            }
            if(!regex.phone.test(this.phone)){
              this.toast({text:regex.phoneAlert});
              return;
            }
            if(!this.code||this.code.length!=4){
              this.toast({text:'请输入正确的验证码'});
              return;
            }
            let hb=this.handleFeedback({text:'操作中...'});
            Vue.api.checkRegisterCode({"phoneNumber": this.phone, "code": this.code}).then(function (resp) {
              if(resp.result==1){
                hb.setOptions({type:'complete','text':'验证成功',duration:0});
                that.step=2;
                that.$router.replace({name:'register', params: { step: that.step }});
              }else if(resp.result == 0){
                this.confirm({title:'温馨提示',html:'手机号已注册',no:'立即登录',cancel:function () {
                  that.$router.push({name:'login'});
                }});
                hb.setOptions({type:'warn','text':resp.description,duration:0});
              }else{
                hb.setOptions({type:'warn','text':resp.description});
              }
            });
          },
          register:function () {
            let that=this;
            if(this.isRequesting){
              return;
            }
            if(!this.pwd||this.pwd.length<6||this.pwd.length>20){
              this.toast({text:'密码需为6-20位的字符组合'});
              return;
            }
            if(this.pwd!=this.rePwd){
              this.toast({text:'两次密码输入不一致'});
              return;
            }
            let params={
              "password": md5.hex(this.pwd), "confirm": md5.hex(this.rePwd),
              "name": this.name, "phoneNumber": this.phone
            }
            let hb=this.handleFeedback({text:'注册中...'});
            this.isRequesting=true;
            Vue.api.register(params).then(function (resp) {
              that.isRequesting=false;
              if(resp.result==1){
                hb.setOptions({type:'complete','text':'注册成功',duration:0});
                that.$router.push('home');
              }else{
                hb.setOptions({type:'warn','text':resp.description});
              }
            });
          }
        },
        created: function () {
        },
        mounted: function () {
          let that=this;
          this.$route.params.step
          this.step=this.$route.params.step?this.$route.params.step:this.step;
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
