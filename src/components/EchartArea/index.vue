<template>
  <div class="echartLine" ref="echartLine" style="width: 100%; height: 100%">
    <!-- <div
      :id="echartId"
      :style="{
        height: this.options.echartStyle.height + 'px',
        width: this.options.echartStyle.width + 'px',
      }"
    ></div> -->
    <div
      :id="echartId"
      :style="{
        height: options.echartStyle
          ? `${options.echartStyle.height}px`
          : 'inherit',
        width: options.echartStyle
          ? `${options.echartStyle.width}px`
          : 'inherit',
      }"
    ></div>
    <!-- <div :id="echartId" :style="{ height: `${echartStyle.height}`,width: `${echartStyle.width}` }">
    </div> -->
  </div>
</template>

<script>
import * as echarts from 'echarts';

import { mapGetters } from 'vuex';
export default {
  name: 'echartLine',
  props: {
    echartId: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
    // className: {
    //   type: String,
    //   default: ''
    // }
  },
  data() {
    return {
      line: null,
      echartStyle: {
        width: '100%',
        height: '100%',
      },
    };
  },
  computed: {
    // ...mapGetters(["token"]),
  },
  created() {},
  mounted() {
    // if(this.$refs.echartLine.offsetWidth){
    //   this.echartStyle.width=this.$refs.echartLine.offsetWidth+'px'
    //   this.echartStyle.height=this.$refs.echartLine.offsetHeight+'px'
    // }

    // console.log(this.echartStyle,'this.echartStyle')

    this.line = echarts.init(document.getElementById(this.echartId));
    //随着屏幕大小调节图表
    this.line.resize();
    window.addEventListener('resize', () => {
      this.line.resize();
    });
    this.options.initChatFlag ? this.initChart() : '';
    // ;
  },
  methods: {
    // getChart() {
    //   console.log(this.options,'this.options')
    //   this.option && this.line.setOption(this.options);
    // },
    initChart() {
      // console.log(this.line,'this.line')
      let option = {
        tooltip: this.options.tooltip
          ? this.options.tooltip
          : {
              trigger: 'axis',
            },
        legend: this.options.legend
          ? this.options.legend
          : {
              data: [''],
              bottom: '0%',
            },
        grid: this.options.grid
          ? this.options.grid
          : {
              //调整图表上下左右位置
              top: '30px',
              left: '0%',
              right: '0%',
              bottom: '30px',
              containLabel: true,
            },

        xAxis: this.options.xAxisIsFlag
          ? this.options.xAxis
          : {
              type: 'category',
              boundaryGap: false,
              data: this.options.xAxis.data,
              // 横向网格线
              splitLine: {
                show: false,
                lineStyle: {
                  // color:'pink'
                },
              },
              axisLine: {
                // 轴线
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.2)',
                  width: 1,
                  opacity: 1,
                  type: 'solid',
                },
              },
              //x轴文字的配置
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#fff',
                },
              },
              axisTick: {
                // 刻度
                show: false,
                // length: 6,
                // lineStyle: {
                //   type: "dashed",
                //   // ...
                // },
              },
            },
        yAxis: this.options.yAxisIsFlag
          ? this.options.yAxis
          : {
              type: 'value',
              // 横向分割线
              splitLine: {
                show: true,
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.2)',
                },
              },
              axisLine: {
                // 轴线
                // symbol: "arrow",
                // lineStyle: {
                //   color: "rgba(255, 255, 255, 0.6)",
                //   width: 1,
                //   type: "solid",
                // },
              },
              //x轴文字的配置
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#fff',
                },
              },
            },
        series: this.options.series,
      }
      if (this.options.color) option.color = this.options.color
      this.line.setOption(option);

      this.line.resize();
    },
  },
};
</script>

<style lang="scss" scoped></style>
