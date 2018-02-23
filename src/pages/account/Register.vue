<!--注册-->
<template>
    <div class="register-page">
      <div class="block">
        <div class="input-row">
          <cm-input v-model="name" placeholder="姓名" maxlength="10" clear="true"></cm-input>
        </div>
      </div>
      <div class="block">
        <div class="input-row">
          <cm-input tel="tel" v-model="phone" placeholder="手机号" maxlength="11" clear="true"></cm-input>
        </div>
        <div class="input-row">
          <cm-input tel="text" v-model="phone" placeholder="手机号" maxlength="4" clear="true"></cm-input>
        </div>
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .block{
    margin-top: 0.3rem;
  }
</style>

<script>
    import Vue from 'vue'

    export default {
        components: {

        },
        data: function () {
            return {
              name:null,
              phone:null,
              code:null,
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
