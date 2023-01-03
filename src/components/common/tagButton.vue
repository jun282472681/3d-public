<template>
  <div class="tagButton" @click="eventClick">
    {{ text }}
  </div>
</template>

<script>
/** 
 * 巡航报告表格右侧按钮样式
*/
import { mapGetters } from "vuex";
export default {
  name: "tagButton",
  props: {
    // iconClass: {
    //   type: String,
    //   required: true
    // },
    text: {
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
  methods:{
    // 代理点击事件
    eventClick(){
      this.$emit('eventClick')
    }
  }
};
</script>

<style lang="scss" scoped>
.tagButton {
  background: rgba(177, 204, 30, 0.2);
  box-shadow: 0px 0px 10px 0px rgba(177, 204, 30, 0.4);
  border-radius: 2px;
  border: 1px solid #b1cc1e;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #e7f9ff;
  line-height: 20px;
  padding: 0 5px;
  cursor: pointer;
}
</style>
