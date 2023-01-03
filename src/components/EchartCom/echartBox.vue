<template>
  <div class="echartBox flex YspaceBXcenter">
    <headerLab :headerTitle="headerTitle" :src="imgSrc">
      <template slot="rightCom">
        <!-- 切换年月日 待优化 -->
        <div class="flex">
          <el-select v-model="selectValue" v-if="isShowSelect" size="mini" class="select" placeholder="">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <buttonTab @buttonTab="handlebuttonTab" v-if="isShowButton" :class="list.length===4?'buttonTab':'buttonclass'" :tabIndex="tabIndex" :list="list" :isShowSelect="isShowSelect" />
          <el-date-picker v-model="dateValue" type="year" placeholder="" v-if="showDatePicker" size="mini" class="datePicker" format="yyyy年">
          </el-date-picker>
        </div>
        <div class="closeButton" v-if="isClose" @click.stop="Setclose">
          <img src="@/assets/images/echart/ic_off@2x.png" alt="">
        </div>
        <!-- <buttonTab v-if="isShowButton" class="buttonTab" :tabIndex="buttonTabIndex" :list="buttonTabList" /> -->
      </template>
    </headerLab>
    <!-- 图表 -->
    <div class="contentBox">
      <!-- 定义插槽 -->
      <slot name="echartview"></slot>
    </div>
  </div>
</template>

<script>
import headerLab from "@/components/common/headerLab.vue"
import buttonTab from "@/components/common/buttonTab.vue"
// import leftLine from "@/components/common/leftline.vue"
import { mapGetters } from "vuex"
export default {
  name: "echartBox",
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
    isClose: { // 是否显示关闭按钮
      type: Boolean,
      default: false,
    },
    isShowButton: { // 显示年月日切换tab
      type: Boolean,
      default: false,
    },
    isShowSelect: { // 年月日下拉选择
      type: Boolean,
      default: false,
    },
    showDatePicker: { // 日期选择
      type: Boolean,
      default: false,
    },
    selectValue: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      // required: true,
      default: () => {
        return [
          {
            id: 1,
            type: 'hour',
            name: "实时",
          },
          {
            id: 2,
            type: 'year',
            name: "年",
          },
          {
            id: 3,
            type: 'month',
            name: "月",
          },
          {
            id: 4,
            type: 'day',
            name: "日",
          },
        ]
      },
    },
    tabIndex: {
      type: Number,
      default: 0,
    },
  },
  components: {
    headerLab,
    buttonTab,
    // leftLine
  },
  // watch: {
  //   list: {
  //     handler (val) {
  //       console.log(val)
  //     },
  //     immediate: true,
  //     deep: true
  //   }
  // },
  data () {
    return {
      options: [{
        value: 'year',
        label: '年'
      },
      {
        value: 'E9',
        label: 'E9'
      },
      ],
      dateValue: '2022',
      //   buttonTabIndex: 0,
      //   buttonTabList: [
      //     {
      //       id: 1,
      //       name: "实时",
      //     },
      //     {
      //       id: 2,
      //       name: "年",
      //     },
      //     {
      //       id: 3,
      //       name: "月",
      //     },
      //     {
      //       id: 4,
      //       name: "日",
      //     },
      //   ]
      //   // settings:
    }
  },
  computed: {
    // iconName () {
    //   return `iconfont icon-${this.iconClass}`
    // }
    // ...mapGetters(["token"]),
  },
  created () {
    // console.log(this.settings, "settings");
  },
  methods: {
    handlebuttonTab (e) {
      this.$emit('selectTab', e)
    },
    Setclose () {
      // this.$emit('close')
      this.$store.dispatch('app/setOverviewDevDetail', { overviewDevDetailShow: false })
    }
  }
};
</script>

<style lang="scss" scoped>
.echartBox {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  backdrop-filter: blur(8px);
  // .header {
  //   width: 100%;
  //   // padding: 18px 20px 0px;
  //   .headerContent {
  //     justify-content: space-between;
  //     .titleBar {
  //       align-items: center;
  //       .title {
  //         font-size: 18px;
  //         color: #ffffff;
  //         line-height: 18px;
  //       }
  //     }
  .buttonTab {
    width: 120px;
  }
  .buttonclass {
    width: 78px;
  }
  .closeButton {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
  //   }
  //   .separator {
  //     height: 1px;
  //     // opacity: 0.3;
  //     border: 1px solid #f4f4f569;
  //     margin-top: 8px;
  //     position: relative;
  //   }
  // }
  .contentBox {
    width: 100%;
    flex: 1;
    padding: 0 20px;
  }
}
.select {
  width: 70px;
  // height: 32px;
  margin-right: 6px;
}
.datePicker {
  width: 110px;
  // height: 32px;
}
::v-deep .el-input--mini .el-input__icon {
  line-height: 20px;
}
::v-deep .el-input__prefix {
  // top: -3px;
  color: #fff;
}
::v-deep .el-input__suffix {
  // top: -1px;
  color: #fff;
}
::v-deep .el-input--mini .el-input__inner {
  height: 24px;
  line-height: 24px;
  background: rgba(177, 204, 30, 0.2);
  box-shadow: 0px 0px 10px 0px rgba(177, 204, 30, 0.4);
  border-radius: 2px;
  border: 1px solid #b1cc1e;
  color: #e7f9ff;
  font-size: 14px;
}
::v-deep .el-select .el-input .el-select__caret {
  color: rgba(255, 255, 255, 0.7);
}
</style>
