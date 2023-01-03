<template>
  <div id="visButton" class="visButton flex XspaceBYcenter">
    <div class="line diagonal diagonal_topLeft" :class="getLoginClass()"></div>
    <div class="line diagonal diagonal_topRight" :class="getLoginClass()"></div>
    <div
      class="line diagonal diagonal_bottomRight"
      :class="getLoginClass()"
    ></div>
    <div
      class="line diagonal diagonal_bottomLeft"
      :class="getLoginClass()"
    ></div>
    <div class="center flex XcenterYcenter">
      <!-- 定义插槽 -->
      <div class="icon">
        <slot name="icon"> </slot>
      </div>
      <span class="title">{{ title }}</span>
    </div>
  </div>
</template>

<script>
/**
 * 巡航报告右下角按钮样式
 */
import { mapGetters } from "vuex";
export default {
  name: "visButton",
  props: {
    // list: {
    //   type: String,
    //   // required: true,
    //   default: ''
    // },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // settings:
    };
  },
  computed: {
    // ...mapGetters(["token"]),
  },
  created() {
    // console.log(this.settings, "settings");
  },
  methods: {
    getLoginClass() {
      return "diagonal_normal";
    },
  },
};
</script>

<style lang="scss" scoped>
.visButton {
  position: relative;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #454545;
  // width: 350px;
  height: 32px;
  padding: 0 13px;
  margin: 0 10px;
}
.visButton:hover {
  background: rgba(177, 204, 30, 0.4);
}
.center {
  .icon {
    width: 20px;
    height: 20px;
    img {
      width: 100%;
      height: 100%;
      margin-right: 5px;
    }
  }
  .title {
    font-size: 18px;
    font-family: TRENDS;
    color: #ffffff;
    line-height: 23px;
  }
}
// 斜线
.diagonal {
  position: relative;
  // margin: 2px auto;
  width: 6px;
  height: 6px;
  // box-sizing: border-box;
  // border: 1px solid #333;
  // background-color:#333;
  // line-height: 10px;
  // text-indent: 1px;
}
.diagonal::before {
  content: "";
  position: absolute;

  width: 100%;
  height: 2px;
  box-sizing: border-box;
  border-bottom: 1px solid;
  // transform-origin: bottom center;

  // animation: slash 5s infinite ease;
}
// 左上
.diagonal_topLeft {
  position: absolute;
  top: 0;
  left: 0;
}
.diagonal_topLeft::before {
  left: 0px;
  top: 1px;
  transform: rotateZ(45deg) scale(1);
}
// 右上
.diagonal_topRight {
  position: absolute;
  top: 0;
  right: 0;
}
.diagonal_topRight::before {
  right: -1px;
  top: 1.5px;
  transform: rotateZ(135deg) scale(1);
}
// 右下
.diagonal_bottomRight {
  position: absolute;
  bottom: 0;
  right: 0;
}
.diagonal_bottomRight::before {
  right: 0px;
  bottom: 4px;
  transform: rotateZ(225deg) scale(1);
}
// 左下
.diagonal_bottomLeft {
  position: absolute;
  bottom: 0;
  left: 0;
}
.diagonal_bottomLeft::before {
  left: -1px;
  bottom: 4.5px;
  transform: rotateZ(315deg) scale(1);
}
.diagonal_normal {
  border-bottom-color: rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.3);
}
</style>
