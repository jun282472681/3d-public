<template>
  <div id="boxInfoPanel" class="boxInfoPanel">
    <div class="header">
      <span class="title">{{ boxInfo.title }}</span>
      <span class="close">x</span>
    </div>
    <div class="centent">
      <div class="materialNo">
          <span>{{ boxInfo.materialNo }}</span>
      </div>
      <div class="boxInfo">
        <div>
            <span>物料名称</span>
            <div>{{ boxInfo.materialName }}</div>
        </div>
        <div>
            <span>库存数量</span>
            <div>{{ boxInfo.stackAmount }}</div>
        </div>
        <div>
            <span>托盘号</span>
            <span>{{ boxInfo.trayNo }}</span>
        </div>
        <div>
            <span>批次</span>
            <span>{{ boxInfo.sourceBillNo }}</span>
        </div>
        <div>
            <span>计量单位</span>
            <span>{{ boxInfo.unit }}</span>
        </div>
        <div>
            <span>质检状态</span>
            <span>{{ boxInfo.qualityInspectionSt }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {
  name: 'boxInfoPanel',
  data() {
    return {
    };
  },
   computed: {
    ...mapState("app", ["boxInfo"]),
  },
  methods: { 
    handleClick(id) {

    },
  }
};
</script>

<style lang="scss" scoped>
.boxInfoPanel {
  position: absolute;
  top: -310px;
  left: 0px;
  z-index: 11;
  width: 200px;
  height: 230px;
  background: rgba(0,0,0,0.2);
  backdrop-filter: blur(6px);

}
.header {
    background: #17a306;
    height: 30px;
    display: flex;
    justify-content: space-between;
}
.title {
    font-size: 16px;
    font-family: TRENDS;
    color: #FFFFFF;
    line-height: 30px;
    width: 160px;
}
.close {
    width: 30px;
    line-height: 30px;
}

.centent {
    padding: 10px;

    .materialNo {
        background: #000000;
        border-radius: 2px;
        opacity: 0.5;
        backdrop-filter: blur(10px);
        height: 25px;

        >span {
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #12cf23;
            line-height: 25px;
        }
    }

    .boxInfo {
        text-align: left;
        opacity: 0.7;

        >div {
            height: 25px;
            line-height: 25px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF; 
            display: flex;
            >:first-child {
                width: 60px;
                display: inline-block;
                margin-right: 15px;
            }
            >div {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                width: 105px;
            }
        }
    }
}

</style>