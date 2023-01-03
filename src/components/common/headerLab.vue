<template>
  <div class="headerLab flex XcenterYcenter">
    <!-- 图表盒子 -->
    <div class="header">
      <div class="headerContent flex">
        <div class="titleBar flex">
          <img :src="imgSrc" alt="" style="width: 20px; height: 20px" />
          <span class="title" style="margin-left: 10px">{{ headerTitle }}</span>
        </div>
        <!-- 定义插槽 -->
        <slot name="rightCom">
        </slot>
      </div>
      <!-- 分割线 -->
      <div class="separator">
        <!-- <leftLine /> -->
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 插槽
 * rightCom
 */
import { mapGetters } from "vuex"
import leftLine from "@/components/common/leftline.vue"
export default {
  name: "HeaderCommon",
  props: {
    imgSrc: {
      type: String,
      default: require("@/assets/images/echart/ic_title@2x.png"),
      // required: true
    },
    headerTitle: {
      type: String,
      required: true,
    },
  },
  components: {
    leftLine
  },
  data () {
    return {
      // settings:
    }
  },
  computed: {
    // ...mapGetters(["token"]),
  },
  created () {
    // console.log(this.settings, "settings");
  },
};
</script>

<style lang="scss" scoped>
.headerLab {
  width: 100%;
  .header {
    width: 100%;
    padding: 18px 20px 0px;
    .headerContent {
      justify-content: space-between;
      .titleBar {
        align-items: center;
        .title {
          font-size: 18px;
          color: #ffffff;
          line-height: 18px;
          font-family: TRENDS;
        }
      }
      // .buttonTab {
      //   width: 120px;
      // }
    }
    .separator {
      background: url('../../assets/images/echart/line.png');
      height: 5px;
      // opacity: 0.3;
      // border: 1px solid #f4f4f569;
      margin-top: 3px;
      margin-bottom: 6px;
      position: relative;
    }
  }
}
</style>
