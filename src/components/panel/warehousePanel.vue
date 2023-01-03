<template>
  <div id="warehousePanel" class="warehousePanel">
    <div class="topPanel">
      <div class="column">
        <span class="item">
          <echartBox :headerTitle="kqqj.name" :isShowButton="false">
            <template slot="echartview">
              <echartArea ref="echart-line-kqqj" echartId="echart-line-kqqj"  :options="kqqj.options"/>
            </template>
          </echartBox>
        </span>
        <span class="item">
          <echartBox :headerTitle="sjtj.name" :isShowButton="false">
            <template slot="echartview">
              <echartArea ref="echart-line-sjtj" echartId="echart-line-sjtj"  :options="sjtj.options"/>
            </template>
          </echartBox>
        </span>
      </div>
      <div class="column">
        <span class="item">
          <echartBox :headerTitle="cksj.name" :isShowButton="false">
            <template slot="echartview">
              <echartArea ref="echart-line-cksj" echartId="echart-line-cksj"  :options="cksj.options"/>
            </template>
          </echartBox>
        </span>
        <span class="item">
          <echartBox :headerTitle="rksj.name" :isShowButton="false">
            <template slot="echartview">
              <echartArea ref="echart-line-rksj" echartId="echart-line-rksj"  :options="rksj.options"/>
            </template>
          </echartBox>
        </span>
      </div>
    </div>

    <div class="rightPanel">
      <echartBox :headerTitle="dqyl.name" :isShowButton="false">
        <template slot="echartview">
          <echartArea ref="echart-line-dqyl" echartId="echart-line-dqyl"  :options="dqyl.options"/>
        </template>
      </echartBox>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import echartBox from '@/components/EchartCom/echartBox.vue';
import echartArea from '@/components/EchartArea/index.vue';

export default {
  name: 'warehousePanel',

  components: {
    echartBox,
    echartArea
  },

  data() {
    return {
      kqqj: {
        tabIndex: 3,
        name: '库区全局OEE',
        el: 'echart-line-dqyl',
        options: {
          initChatFlag: true,
          echartStyle: { height: 210, width: 350 },
          grid: {
            //调整图表上下左右位置
            top: '30px',
            left: '0%',
            right: '5%',
            bottom: '30px',
            containLabel: true,
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              animation: false,
              label: {
                backgroundColor: '#505765',
              },
            },
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['04.29', '04.30','05.01', '05.02','05.03'],
          },
          yAxisIsFlag: true,
          yAxis: {
            type: 'value',
             name: '(单位)',
            nameTextStyle: {
              color: '#fff',
              nameLocation: 'start',
              padding: [0, 0, 0, -25],
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.6)',
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff',
              },
            },
          },
          series: [
            {
              data: [150, 100, 250, 100, 150],
              type: 'line',
              smooth: true,
              showSymbol: false,
              color: ['#20C72F'],
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: 'rgba(32,199,47,0)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(32,199,47,0.6000)',
                  },
                ]),
              },
            },
          ],
        },
      },
      sjtj: {
        tabIndex: 3,
        name: '时间统计',
        el: 'echart-line-dqyl',
        options: {
          initChatFlag: true,
          echartStyle: { height: 210, width: 350 },
          grid: {
            //调整图表上下左右位置
            top: '30px',
            left: '3%',
            right: '5%',
            bottom: '30px',
            containLabel: true,
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              animation: false,
              label: {
                backgroundColor: '#505765',
              },
            },
          },
          legend: {
            data: ['MTTF', 'MTTR'],
            right: 35,
            textStyle: {
              color: '#fff',
              fontSize: 8,
            },
          },
          xAxis: {
            type: 'category',
            data: ['04.29', '04.30','05.01', '05.02','05.03'],
          },
          yAxisIsFlag: true,
          yAxis: {
            type: 'value',
            name: '(单位)',
            min: 1,
            max: 8,
            nameTextStyle: {
              color: '#fff',
              nameLocation: 'start',
              padding: [0, 0, 0, -20],
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255, 255, 255, 0.8)",
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff',
              },
            },
          },
          series: [
            {
              name: 'MTTF',
              data: [5,3,2,7,5],
              type: 'line',
              smooth: true,
              showSymbol: false,
              color: '#0082FF',
              areaStyle: {
                //区域填充渐变颜色
                color: {
                  type: 'linear',
                  x: 0,
                  y: 1,
                  x2: 0,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(0, 130, 255, 0.2)', // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'rgba(0, 130, 255, 1)', // 100% 处的颜色
                    },
                  ],
                },
              },
            },
            {
              name: 'MTTR',
              data: [2,4,7,3,1],
              type: 'line',
              smooth: true,
              showSymbol: false,
              color: '#B1CC1E',
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: 'rgba(177, 204, 30, 0.2)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(177, 204, 30, 1)',
                  },
                ]),
              },
            },
          ],
        },
      },
      cksj: {
        tabIndex: 3,
        name: '出库数据跟踪',
        el: 'echart-line-dqyl',
        options: {
          echartStyle: { height: 210, width: 350 },
          initChatFlag: true,
          legend: {
            data: ['WPF', 'SWD'],
            right: 10,
            textStyle: {
              color: '#fff',
              fontSize: 8,
            },
          },
          grid: {
            //调整图表上下左右位置
            top: '30px',
            left: '0%',
            right: '5%',
            bottom: '30px',
            containLabel: true,
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              animation: false,
              label: {
                backgroundColor: '#505765',
              },
            },
          },
          xAxis: {
            type: 'category',
            data: ['04.29', '04.30','05.01', '05.02','05.03'],
          },
          yAxisIsFlag: true,
          yAxis: {
            type: 'value',
            name: '(%)',
            nameTextStyle: {
              color: '#fff',
              nameLocation: 'start',
              padding: [0, 0, 0, -25],
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255, 255, 255, 0.2)",
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff',
              },
            },
          },
          series: [
            {
              name: 'WPF',
              type: 'bar',
              barWidth: 8,
              stack: 'jzldydl',
              emphasis: {
                focus: 'series',
              },
              data: [60, 80, 40, 20, 80],
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: 'rgba(32,199,47,0)'
                  },
                  {
                    offset: 1,
                    color: '#20C72F'
                  }
                ]),
              },
            },
            {
              name: 'SWD',
              type: 'bar',
              stack: 'jzldydl',
              emphasis: {
                focus: 'series'
              },
              data: [35, 50, 65, 50, 20],
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: 'rgba(255,201,122,0)',
                  },
                  {
                    offset: 1,
                    color: '#FFC97A',
                  },
                ])
              },
            },
          ],
        },
      },
      rksj: {
        tabIndex: 3,
        name: '入库数据跟踪',
        el: 'echart-line-dqyl',
        options: {
          echartStyle: { height: 210, width: 350 },
          initChatFlag: true,
          legend: {
            data: ['WPF', 'SWD'],
            right: 10,
            textStyle: {
              color: '#fff',
              fontSize: 8,
            },
          },
          grid: {
            //调整图表上下左右位置
            top: '30px',
            left: '0%',
            right: '5%',
            bottom: '30px',
            containLabel: true,
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              animation: false,
              label: {
                backgroundColor: '#505765',
              },
            },
          },
          xAxis: {
            type: 'category',
            data: ['04.29', '04.30','05.01', '05.02','05.03'],
          },
          yAxisIsFlag: true,
          yAxis: {
            type: 'value',
            name: '(%)',
            nameTextStyle: {
              color: '#fff',
              nameLocation: 'start',
              padding: [0, 0, 0, -25],
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255, 255, 255, 0.2)",
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff',
              },
            },
          },
          series: [
            {
              name: 'WPF',
              type: 'bar',
              barWidth: 8,
              stack: 'jzldydl',
              emphasis: {
                focus: 'series',
              },
              data: [60, 80, 40, 20, 80],
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: 'rgba(32,115,199,0)',
                  },
                  {
                    offset: 1,
                    color: '#2073C7',
                  },
                ]),
              },
            },
            {
              name: 'SWD',
              type: 'bar',
              stack: 'jzldydl',
              emphasis: {
                focus: 'series'
              },
              data: [35, 50, 65, 50, 20],
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: 'rgba(255,119,52,0)'
                  },
                  {
                    offset: 1,
                    color: '#FF7734'
                  }
                ])
              },
            },
          ],
        },
      },
      dqyl: {
        tabIndex: 3,
        name: '垛机OEE',
        el: 'echart-line-dqyl',
        options: {
          echartStyle: { height: 210, width: 750 },
          initChatFlag: true,
          grid: {
            //调整图表上下左右位置
            top: '30px',
            left: '0%',
            right: '5%',
            bottom: '30px',
            containLabel: true,
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              animation: false,
              label: {
                backgroundColor: '#505765',
              },
            },
          },
          legend: {
            data: ['堆垛机1', '堆垛机2', '堆垛机3', '堆垛机4'],
            align: 'auto',
            padding: 2,
            itemGap: 5,
            right: 1,
            top: 5,
            textStyle: {
              color: '#fff',
              fontSize: 8,
            },
          },
          xAxis: {
            type: 'category',
            data: ['04.26', '04.27','04.28','04.29', '04.30','05.01', '05.02','05.03', '05.04','05.05'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: '堆垛机1',
              data: [10, 20, 30, 40, 50, 180, 140, 120, 50, 10],
              type: 'line',
              smooth: true,
              color: '#0082FF',
            },
            {
              name: '堆垛机2',
              data: [100, 120, 130, 40, 50, 80, 40, 20, 150, 110],
              type: 'line',
              smooth: true,
              lineStyle: {
                color: '#0082FF',
                width: 2,
                type: 'dotted',
              },
            },
            {
              name: '堆垛机3',
              data: [100, 120, 80, 140, 20, 10, 40, 10, 150, 20],
              type: 'line',
              smooth: true,
              color: '#B1CC1E',
            },
            {
              name: '堆垛机4',
              data: [110, 20, 130, 40, 150, 30, 40, 20, 100, 180],
              type: 'line',
              smooth: true,
              lineStyle: {
                color: '#B1CC1E',
                width: 2,
                type: 'dotted',
              },
            },
          ],
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.warehousePanel {
  position: absolute;
  width: 800px;
  height: 770px;
  z-index: 11;
  right: 5px;
  top: 15px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.topPanel {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  height: 510px;

  .column {

  }

  .item {
    width: 390px;
    height: 252px;
  }
}

.column {
  flex-basis: 100%;
  display: flex;
  justify-content: space-between;
}

.rightPanel {
  width: 800px;
  height: 250px;
  background: rgba(2,10,3,0.4000);
  border: 1px solid rgba(174,197,182,0.3000);
  backdrop-filter: blur(10px);

  .panelCenter {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  .box {
    height: 90%;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .boxTop {
      height: 30%;
      display: flex;
      justify-content: space-between;

      .boxTopLeft {
        background: url('../../assets/images/home/box.png') no-repeat;
        height: 70px;
        width: 100px;
      }

      .boxTopRight {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 65px;
        width: 150px;
        > span {
          width: 56px;
          height: 14px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 14px;
          margin-left: 10px;
        }
        > div {
          width: 63px;
          height: 28px;
          background: linear-gradient(90deg, #20C72F 0%, rgba(32,199,47,0) 100%);
          opacity: 0.9;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #FFFFFF;
          line-height: 18px;
          font-size: 16px;
        }
      }
    }

    .boxCenter {
      height: 24px;
      background: url('../../assets/images/home/path.png') no-repeat center;
    }

    .boxBottom {
      height: 50%;
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;

      .boxBottomColumn {
        flex-basis: 100%;
        display: flex;
        justify-content: space-between;
      }
      .boxBottomItem {
        height: 46px;
        width: 115px;
        display: flex;

        > div {
          display: flex;
          flex-direction: column;

          > span:nth-child(1) {
            text-align: left;
            color: #FFFFFF;
            height: 18px;
            font-size: 18px;
            line-height: 18px;
          }

          > span:nth-child(2) {
            text-align: left;
            color: #FFFFFF;
            // height: 18px;
            font-size: 14px;
            opacity: 0.7;
            // line-height: 18px;
          }
        }
      }
    }
  }
}
</style>