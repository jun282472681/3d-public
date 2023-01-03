<template>
  <div id="warehouseData" class="warehouseData">
    <div class="item" :key="index" v-for="(data, index) in da" >
      <img :src="data.url" alt="" style="width: 52px; height: 52px" />
      <div> 
        <span>{{ data.title }}</span>
        <span>
          {{ data.num }}
          <span style="opacity: 0.3;font-size: 12px;">(SKU)</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import echartBox from '@/components/EchartCom/echartBox.vue';
import echartArea from '@/components/EchartArea/index.vue';

export default {
  name: 'warehouseData',

  components: {
    echartBox,
    echartArea
  },

  data() {
    return {
      da: [
          { url: require('@/assets/images/home/kc.png'), title: '当日库存量', num: 1000 },
          { url: require('@/assets/images/home/rk.png'), title: '当日入库量', num: 500 },
          { url: require('@/assets/images/home/ck.png'), title: '当日出库量', num: 300 },
        ]
    };
  },
};
</script>

<style lang="scss" scoped>
.warehouseData {
  position: absolute;
  width: 150px;
  height: 250px;
  z-index: 11;
  left: 5px;
  top: 15px;
}
.item {
    height: 55px;
    width: 125px;
    display: flex;
    margin-bottom: 12px;

    > div {
      display: flex;
      flex-direction: column;

      > span:nth-child(1) {
        text-align: left;
        color: #FFFFFF;
        height: 14px;
        font-size: 14px;
        line-height: 14px;
        opacity: 0.3;
      }

      > span:nth-child(2) {
        text-align: left;
        color: #FFFFFF;
        // height: 18px;
        font-size: 18px;
        background: url('../../assets/images/home/line.png') no-repeat;
        // line-height: 18px;

        height: 27px;
        width: 100px;
        position: relative;
        left: -27px;
        top: 7px;

        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
      }
    }
  }
</style>