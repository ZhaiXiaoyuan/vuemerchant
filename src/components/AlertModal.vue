<template>
  <modal :options="options" ref="modal">
    <div class="modal-header">
      <p class="title">{{options.title}}</p>
    </div>
    <div class="modal-body" v-html="options.html">

    </div>
    <div class="modal-footer">
      <div class="handle-btn" @click="ok()">确定</div>
    </div>
  </modal>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .alert-modal{}
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
      ok:function () {
        this.close();
        this.options.ok&&this.options.ok();
      },
      close:function () {
        this.$refs.modal.close();
      },
      open:function () {
        this.show=true;
      }
    },
    created: function () {

    },
    mounted: function () {
    }
  };
</script>
