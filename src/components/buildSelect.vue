<template>
  <div class="buildSelect flex RYcenterXcenter">
    <div 
      class="build flex YcenterXcenter"
      v-for="(item, index) in buildList"
      :key="item.id"
    >
      <div class="top" v-if="index + 1 < buildList.length"></div>
      <div class="bottom">
        <div :class="(index + 1 == buildList.length) ? 'left spe' : 'left'" @click="selectBuild(index)">{{item.name}}</div>
        <div class="right" @click="selectBuild(index)">
          <img
            v-if="selectedBuildIndex === index + 1"
            src="@/assets/images/nav/ic_building_light@2x.png"
            alt=""
          />
          <img v-else src="@/assets/images/nav/ic_building@2x.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'buildSelect',
  data() {
    return {}
  },
  methods: {
    selectBuild(index) {
      window.ThreeDesign.selectBuild(index + 1);
    }
  },
  computed: {
    ...mapState('app', ['buildList', 'selectedBuildIndex'])
  }
}
</script>

<style lang="scss" scoped>
.buildSelect {
  position: absolute;
  top: 30px;
  left: 120px;
  width: 50px;
  padding-left: 25px;
  z-index: 11;
  .build {
    .top {
      width: 1px;
      height: 20px;
      margin: 1px 0;
      background: #ffffff;
      opacity: 0.4;
    }
    .bottom {
      position: relative;
      .left {
        position: absolute;
        top: 50%;
        right: 16px;
        transform: translate(0, -50%);
        font-size: 18px;
        font-family: TRENDS;
        color: #ffffff;
        line-height: 18px;
        &.spe {
          right: 22px;
        }
      }
      .right {
        width: 14px;
        height: 14px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>