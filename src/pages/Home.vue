<!--首页-->
<template>
    <div class="home">
      <div class="survey-panel">
        <div class="sub">
          <div class="item">
            <p class="field">今日总收益</p>
            <p class="value">
              <span class="num">100</span>
              <span class="unit">元</span>
            </p>
          </div>
        </div>
        <div class="detail">
          <div class="item">
            <p class="field">在线支付</p>
            <p class="value"><span class="num">100000</span><span class="unit">元</span></p>
          </div>
          <div class="item">
            <p class="field">广告收益</p>
            <p class="value"><span class="num">100</span><span class="unit">元</span></p>
          </div>
          <div class="item">
            <p class="field">现金收益</p>
            <p class="value"><span class="num">100</span><span class="unit">元</span></p>
          </div>
        </div>
        <div class="detail style2">
          <div class="item">
            <p class="field">礼品消耗</p>
            <p class="value">0个，0.00元</p>
          </div>
          <div class="item">
            <p class="field">线下投币</p>
            <p class="value">0个</p>
          </div>
        </div>
        <div class="help-btn">
          <svg class="icon" aria-hidden="true">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-yiwen"></use>
          </svg>
        </div>
      </div>
      <div class="panel">
        <div class="row">
          <a class="item">
            <i class="icon lyyfont icon-device"></i>
            <div class="text">
              <p class="title">设备管理</p>
              <p class="desc">共<em>24</em>台，在线<em>6</em>台</p>
            </div>
          </a>
        </div>
        <div class="row">
          <a class="item">
            <i class="icon lyyfont icon-manger"></i>
            <div class="text">
              <p class="title">设备注册</p>
              <p class="desc">扫描设备二维码</p>
            </div>
          </a>
          <a class="item">
            <i class="icon lyyfont icon-coupons"></i>
            <div class="text">
              <p class="title">优惠设置</p>
              <p class="desc">10元=N个币</p>
            </div>
          </a>
        </div>
        <div class="row">
          <a class="item">
            <i class="icon lyyfont icon-income"></i>
            <div class="text">
              <p class="title">经营统计</p>
              <p class="desc">经营数据监控</p>
            </div>
          </a>
          <a class="item">
            <i class="icon lyyfont icon-bear"></i>
            <div class="text">
              <p class="title">礼品统计</p>
              <p class="desc">消耗统计及管理</p>
            </div>
          </a>
        </div>
      </div>
      <div class="panel">
        <div class="row">
          <a class="item">
            <i class="icon lyyfont icon-addcoins"></i>
            <div class="text">
              <p class="title">远程上分</p>
              <p class="desc">在线解决吃币</p>
            </div>
          </a>
          <a class="item">
            <i class="icon lyyfont icon-check"></i>
            <div class="text">
              <p class="title">订单查询</p>
              <p class="desc">追溯用户充值</p>
            </div>
          </a>
        </div>
        <div class="row">
          <a class="item">
            <i class="icon lyyfont member-icon"></i>
            <div class="text">
              <p class="title">会员管理</p>
              <p class="desc">会员消费记录</p>
            </div>
          </a>
          <a class="item">
            <i class="icon lyyfont send-coin-record-icon"></i>
            <div class="text">
              <p class="title">会员派币</p>
              <p class="desc">派送电子游戏币</p>
            </div>
            <span class="dot"></span>
          </a>
        </div>
      </div>
      <div class="panel">
        <div class="row">
          <a class="item">
            <i class="icon lyyfont icon-ad"></i>
            <div class="text">
              <p class="title">我的账号</p>
              <p class="desc">钱包、投放地址、消息设置</p>
            </div>
          </a>
        </div>
      </div>
      <div class="panel">
        <div class="row">
          <a class="item">
            <i class="icon lyyfont icon-account"></i>
            <div class="text">
              <p class="title">我的账号</p>
              <p class="desc">钱包、投放地址、消息设置</p>
            </div>
          </a>
        </div>
      </div>
      <div class="page-footer">
        <p class="mui-text-center index-tip" style="margin-bottom: 0">如有问题，请拨打<a href="tel:400-807-3833" style="color: #1010cc">400-807-3833</a></p>
        <p class="mui-text-center index-tip"><a id="open_pop_btn" style="color: #1010cc">联系微信在线客服</a></p>
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">

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
          let that=this;
          /*加载首页数据*/
          let hb=this.handleFeedback({text:'加载中...'});
          Vue.api.homePageData().then(function (resp) {
            if(resp.result==0){
              let data = resp.data;
              hb.setOptions({type:'complete',text:'加载成功',duration:0});
              
              sessionStorage.access = JSON.stringify(data.access)
            }else{
              hb.setOptions({type:'warn',text:resp.description});
            }
          });
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
