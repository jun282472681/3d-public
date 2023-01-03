<template>
  <div class="buttonTab flex XspaceBYcenter">

    <div class="tab" v-for="(item, index) in list" :key="item.id" :class="index === tabIndex ? 'tabAvtive' : ''" @click="handleTab(item,index)">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "HeaderCommon",
  props: {
    list: {
      type: Array,
      // required: true,
      default: () => {
        return [
          {
            id: 1,
            type:'hour',
            name: "实时",
          },
          {
            id: 2,
            type:'year',
            name: "年",
          },
          {
            id: 3,
            type:'month',
            name: "月",
          },
          {
            id: 4,
            type:'day',
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
  methods:{
    handleTab(item,index){
      this.$emit('buttonTab',{
        item,
        tabIndex:index
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.buttonTab {
  width: 100%;
  height: 24px;
  background: rgba(177, 204, 30, 0.2);
  // box-shadow: 0px 0px 10px 0px rgba(177, 204, 30, 0.4);
  box-shadow: 0px 0px 10px 0px rgba(32,199,47,0.4000);
  border-radius: 2px;
  border: 1px solid #20C72F;
  box-sizing: border-box;
  padding: 1px;
  .tab {
    cursor: pointer;
    background: #305d34;
    // opacity: 0.2;
    padding: 0 5px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #e7f9ff;
    line-height: 20px;
  }
  .tabAvtive {
    background: #009944;
  }
}
</style>
