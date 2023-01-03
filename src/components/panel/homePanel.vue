<template>
  <div id="homePanel" class="homePanel">
    <div class="rightPanel">
      <echartBox :headerTitle="sbqk.name" :isShowButton="false">
        <template slot="echartview">
          <div class="panelCenter"> 
            <div class="box"> 
              <div class="boxTop">
                <div class="boxTopLeft"> </div>
                <div class="boxTopRight">
                  <span>设备总数</span>
                  <div>50</div>
                </div>
              </div>
              <div class="boxCenter"></div>
              <div class="boxBottom" >
                <div class="boxBottomColumn" :key="index" v-for="(item, index) in sbqk.item">
                  <span class="boxBottomItem" :key="data.title" v-for="(data) in item">
                    <img :src="data.url" alt="" style="width: 46px; height: 46px" />
                    <div> 
                      <span>{{ data.num }}</span>
                      <span>{{ data.title }}</span>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </echartBox>
    </div>

    <div class="rightPanel">
      <echartBox :headerTitle="dqyl.name" :isShowButton="true">
        <template slot="echartview">
          <echartArea ref="echart-line-dqyl" echartId="echart-line-dqyl"  :options="dqyl.options"/>
        </template>
      </echartBox>
    </div>
  </div>
</template>

<script>
import echartBox from '@/components/EchartCom/echartBox.vue';
import echartArea from '@/components/EchartArea/index.vue';

export default {
  name: 'homePanel',

  components: {
    echartBox,
    echartArea
  },

  data() {
    return {
      sbqk: {
        name: '设备运行情况',
        el: 'echart-line-dqyl',
        total: 50,
        item: [[
          { url: require('@/assets/images/home/yx.png'), title: '运行设备', num: 65 },
          { url: require('@/assets/images/home/warn.png'), title: '报警设备', num: 8 },
        ],
        [
          { url: require('@/assets/images/home/close.png'), title: '离线设备', num: 12 },
          { url: require('@/assets/images/home/tj.png'), title: '停机设备', num: 6 }
        ]]
      },
      dqyl: {
        tabIndex: 3,
        name: '用能概括',
        el: 'echart-line-dqyl',
        options: {
          echartStyle: { height: 210, width: 350 },
          initChatFlag: true,
          grid: {
            //调整图表上下左右位置
            top: '30px',
            left: '0%',
            right: '15px',
            bottom: '15px',
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
          xAxisIsFlag: true,
          xAxis: {
            type: 'category',
            data: ['04.29', '04.30','05.01', '05.02','05.03', '05.04'],
            boundaryGap: false,
            // 横向网格线
            splitLine: {
              show: false,
              lineStyle: {},
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
              // textStyle: {
              color: '#fff',
              // },
            },
            axisTick: {
              // 刻度
              show: false,
            },
          },
          yAxisIsFlag: true,
          yAxis: [
            {
              type: 'value',
              name: '(%)',
              nameTextStyle: {
                color: '#fff',
                nameLocation: 'start',
                padding: [0, 0, 0, -30],
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.2)',
                },
              },
              //文字的配置
              axisLabel: {
                show: true,
                // textStyle: {
                color: '#fff',
                // },
              },
            }
          ],
          series: [
            {
              name: '压力',
              type: 'bar',
              barWidth: 8,
              data: [100, 50, 20, 60, 80, 10],
              color: '#20C72F',
            }
          ],
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.homePanel {
  position: absolute;
  width: 390px;
  height: 550px;
  z-index: 11;
  right: 5px;
  top: 15px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.rightPanel {
  width: 390px;
  height: 265px;
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