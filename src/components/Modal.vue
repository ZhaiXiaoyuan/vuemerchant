<template>
  <div class="modal">
    <div class="mask"></div>
    <div class="modal-content">
      <div class="modal-header">
        <p class="title">弹窗标题</p>
      </div>
      <div class="modal-body">
        <p>弹窗内容</p>
        <p>弹窗内容</p>
        <p>弹窗内容</p>
      </div>
      <div class="modal-footer">
        <div class="handle-btn">取消</div>
        <div class="handle-btn">确定</div>
      </div>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .modal{
    display: flex;
    position: fixed;
    z-index: 200;
    width: 100%;
    height: 100%;
    top:0rem;
    left: 0rem;
    align-items: center;
    justify-content: center;
    .mask{
      position: absolute;
      z-index: 201;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.7);
      top:0rem;
      left: 0rem;
    }
    .modal-content{
      position: relative;
      z-index: 202;
      width: 70%;
      margin: auto;
      background: #fff;
      border-radius: 0.04rem;
    }
    .modal-header{
      padding: 0.4rem;
      .title{
        color: #333;
        font-size: 0.36rem;
        text-align: center;
      }
    }
    .modal-body{
      padding: 0rem 0.2rem 0.3rem 0.2rem;
      p{
        font-size: 0.28rem;
        color: #666;
      }
    }
    .modal-footer{
      border-top: 1px solid #e5e5e5;
      display: -webkit-flex;
      display: flex;
      .handle-btn{
        height: 0.88rem;
        line-height: 0.88rem;
        text-align: center;
        color: #368df3;
        font-size: 0.3rem;
        flex: 1;
        -webkit-flex: 1;
        &+.handle-btn{
          border-left: 1px solid #e5e5e5;
        }
      }
    }
  }
</style>
<script>
  import Vue from 'vue'
  export default {
    components: {

    },
    props:{

    },
    data: function () {
      return {
      }
    },
    computed: {},
    watch: {

    },
    methods: {

    },
    created: function () {

    },
    mounted: function () {

    }
  };
</script>
