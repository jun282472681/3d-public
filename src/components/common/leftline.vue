<template>
  <div class="leftLine flex XcenterYcenter">
    <div class="left"></div>
    <div class="center"></div>
    <div class="right"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "HeaderCommon",
  props: {
    // iconClass: {
    //   type: String,
    //   required: true
    // },
    // className: {
    //   type: String,
    //   default: ''
    // }
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
};
</script>

<style lang="scss" scoped>
.leftLine {
  position: absolute;
  left: -1px;
  height: 4px;
  top: 0;
  transform: translateY(-50%);
  .left {
    box-sizing: border-box;
    width: 4px;
    height: 4px;
    background: #035910;
    border: 1px solid #b1cc1e;
  }
  .center {
    width: 15px;
    height: 2px;
    background: #b1cc1e;
  }
  .right {
    width: 4px;
    height: 4px;
    background: #b1cc1e;
    border-radius: 2px;
  }
}
</style>
