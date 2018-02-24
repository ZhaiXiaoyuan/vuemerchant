<template>
  <div class="cm-input" :class="{'cm-clear-input':clear=='true'||clear=='clear'}">
    <slot>
      <input ref="input" :type="type" :value="value" :placeholder="placeholder" :maxlength="maxlength" @input="updateValue($event)">
    </slot>
    <span class="clear-btn" @click="clearInput()" v-if="value&&value.length>0">&times;</span>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  input{
    height: 0.88rem;
    width: 100%;
    padding: 0rem 0.3rem;
    outline: none;
    border: none;
    border-radius: 0.08rem;
    font-size: 0.32rem;
    border-radius: 0rem;
  }
  .clear-btn{
    display: none;
    position: absolute;
    content: '';
    font-size: 0.36rem;
    color: #fff;
    background: rgba(0,0,0,0.6);
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    top:0rem;
    right: 0.2rem;
    bottom: 0rem;
    margin: auto;
    text-align: center;
  }
  .cm-clear-input{
    position: relative;
    input{
      padding-right: 0.8rem !important;
    }
    .clear-btn{
     display: inline-block;
    }
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
        default:'text'
      },
      value:{},
      placeholder:String,
      maxlength:{},
      clear:String
    },
    data: function () {
      return {
      }
    },
    computed: {},
    watch: {
      value:function (newValue) {

      }
    },
    methods: {
      updateValue: function ($event) {
        // 通过 input 事件带出数值
        this.$emit('input', $event.target.value);
      },
      clearInput:function () {
        this.$emit('input', '');
      },
    },
    created: function () {

    },
    mounted: function () {

    }
  };
</script>
