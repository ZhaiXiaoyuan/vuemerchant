<!--登录-->
<template>
    <div class="login-page">
      <i class="icon logo-icon"></i>
      <div class="form">
        <div class="input-row">
          <input type="tel" placeholder="手机号" maxlength="11">
        </div>
        <div class="input-row">
          <input type="password" placeholder="密码" maxlength="20">
        </div>

      </div>
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
  input{
    height: 0.88rem;
    width: 100%;
    padding: 0rem 0.3rem;
    outline: none;
    border: none;
    border-radius: 0.08rem;
    font-size: 0.32rem;
  }
</style>

<script>
    import Vue from 'vue'

    export default {
        components: {

        },
        data: function () {
            return {

            }
        },
        computed: {},
        watch: {},
        methods: {

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
