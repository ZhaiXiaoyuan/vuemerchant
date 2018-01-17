<!--首页-->
<template>
    <div class="home">
   <!--   首页：{{name}}-->
      <router-view></router-view>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

</style>

<script>
    import Vue from 'vue'

    export default {
        components: {

        },
        data: function () {
            return {
              name:null,
            }
        },
        computed: {},
        watch: {},
        methods: {

        },
        created: function () {
          console.log('dd:',this.$route);
          this.name=this.$route.params.name;
         /* Vue.api.homePageData().then(function (resp) {

          });*/
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
