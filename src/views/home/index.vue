<template>
  <div class="home flex XspaceBYcenter">
    <visualDrawer :drawerVisible.sync='visualVisable'/>
    <roam-drawer :drawerVisible.sync="drawerVisible"></roam-drawer>
    <home-panel v-if="homePanelVisible" ></home-panel>
    <warehouse-panel v-if="warehousePanelVisible"></warehouse-panel>
    <warehouse-data v-if="warehousePanelVisible"></warehouse-data>
    <storage-panel v-if="storageVisible"></storage-panel>
    <box-info-panel></box-info-panel>
  </div>
</template>

<script>
import { mapState } from "vuex"
import buildSelect from '@/components/buildSelect.vue';
import roamSelect from '@/components/roam/roamSelect.vue';
import roamDrawer from '@/components/roam/roamDrawer.vue';
import visualDrawer from '@/components/visualRoam/visualDrawer.vue';
import homePanel from '@/components/panel/homePanel.vue';
import warehousePanel from '@/components/panel/warehousePanel.vue';
import warehouseData from '@/components/panel/warehouseData.vue';
import storagePanel from '@/components/panel/storagePanel.vue';
import boxInfoPanel from '@/components/panel/boxInfoPanel.vue';
export default {
  name: 'HomeView',
  components: {
    buildSelect,
    roamSelect,
    roamDrawer,
    homePanel,
    warehousePanel,
    warehouseData,
    storagePanel,
    boxInfoPanel,
    visualDrawer
  },
  mounted() {
    if (typeof window.scene == 'undefined') {
      window.ThreeDesign.init();
    }
  },
  data() {
    return {
      navTools: [
        {
          id: 0,
          name: '总览',
          icon: require('@/assets/images/nav/ic_home@2x.png'),
          activeicon: require('@/assets/images/nav/ic_home_light@2x.png'),
          show: true
        },
        {
          id: 1,
          name: '空压机',
          icon: require('@/assets/images/nav/ic_kyj@2x.png'),
          activeicon: require('@/assets/images/nav/ic_kyj_light@2x.png'),
          show: false
        }, {
          id: 2,
          name: '制氮机',
          icon: require('@/assets/images/nav/ic_zdj@2x.png'),
          activeicon: require('@/assets/images/nav/ic_zdj_light@2x.png'),
          show: false
        }, {
          id: 3,
          name: '配电房',
          icon: require('@/assets/images/nav/ic_pdf@2x.png'),
          activeicon: require('@/assets/images/nav/ic_pdf_light@2x.png'),
          show: false
        }, {
          id: 4,
          name: '冰机房',
          icon: require('@/assets/images/nav/ic_bjf@2x.png'),
          activeicon: require('@/assets/images/nav/ic_bjf_light@2x.png'),
          show: false
        }
      ],
      navIndex: 0,
      buildRooms: [
        {
          index: 1,
          // rooms: ['冰机房', '配电房']
           rooms: ['配电房', '空压机', '制氮机']
        },
        {
          index: 2,
          rooms: ['配电房', '空压机', '制氮机']
          // rooms: []
        },
        {
          index: 3,
          rooms: ['冰机房', '配电房', '空压机']
        },
        {
          index: 4,
          rooms: ['配电房']
        },
        {
          index: 5,
          rooms: ['冰机房', '配电房', '空压机']
        },
        {
          index: 6,
          rooms: ['配电房']
        },
        {
          index: 7,
          // rooms: ['配电房', '空压机']
        }
      ],
      hideNav: false,
      // drawerVisible: false
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
    }
  },
  computed: {
    ...mapState("app", ["drawerVisible", 'visualVisable', "homePanelVisible", "warehousePanelVisible", "storageVisible"]),
  },
  methods: {
    // 选择房间
    selectNav(index, name) {
      if (index == this.navIndex) return;
      this.navIndex = index;
      window.ThreeDesign.selectRoom(name);
    },
    // 选择楼栋后左侧导航栏变化
    buildChange(newIndex) {
      if (newIndex === 2) {
        // nav选择了总览，就隐藏nav
        this.hideNav = true;
      } else if (newIndex > 0) {
        this.hideNav = false;
        this.navIndex = -1;
        const rooms = this.buildRooms.find(item => item.index == newIndex).rooms;
        for (let i = 1; i < this.navTools.length; i++) {
          this.navTools[i].show = false;
        }
        rooms.forEach(room => {
          for (let i = 1; i < this.navTools.length; i++) {
            const nav = this.navTools[i];
            if (nav.name == room) {
              nav.show = true;
            }
          }
        });
      }
    },
  },
  watch: {
    '$store.state.app.selectedBuildIndex': {
      handler(newVal, oldVal) {
        this.buildChange(newVal);
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 8px 0 5px;
  overflow: hidden;
  .navTool {
    width: 100px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    backdrop-filter: blur(6px);
    padding: 30px 0;
    z-index: 11;
    .nav {
      cursor: pointer;
        .name {
          text-align: center;
          color: #ffffff;
          line-height: 28px;
        }
    }
  }
}
.show {
  display: block;
}
.hide {
  display: none;
}
</style>
