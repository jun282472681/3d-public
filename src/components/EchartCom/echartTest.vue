<template>
  <div class="echartTest">
    <div
      class="echart"
      :id="echartId"
      :style="{ float: 'left', width: '100%', height: '230px' }"
    ></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

import { mapGetters } from "vuex";
export default {
  name: "echartTest",
  props: {
    echartId: {
      type: String,
      required: true
    },
    options:{
      type: Object,
      required: true
    }
    // className: {
    //   type: String,
    //   default: ''
    // }
  },
  data() {
    return {
      
    };
  },
  computed: {
    // ...mapGetters(["token"]),
  },
  created() {
    
  },
  mounted(){
    this.initChart()
  },
  methods: {
    initChart() {
      let getchart = echarts.init(document.getElementById(this.echartId));
      getchart.setOption(this.options);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        getchart.resize();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
