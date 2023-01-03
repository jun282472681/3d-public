<template>
  <div id="app">
    <div id="threeView"></div>
    <div id="twoView" class="flex YcenterXcenter">
      <HeaderCommon></HeaderCommon>
      <div class="center">
        <div class="centerLeft"></div>
        <router-view></router-view>
        <div class="centerRight"></div>
      </div>
      <div class="footer"></div>
    </div>
  </div>
</template>

<script>
import HeaderCommon from '@/components/header/index.vue';
export default {
  components: {
    HeaderCommon
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  #threeView {
    width: 100%;
    height: 100vh;
    position: absolute;
    overflow: hidden;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 10;
  }
  #twoView {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;

    .center {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;

      .centerLeft {
        height: 100%;
        width: 20px;
        background: url('./assets/images/home/centerLeft.png') no-repeat center;
        z-index: 11;
      }
      .centerRight {
        height: 100%;
        width: 20px;
        background: url('./assets/images/home/centerRight.png') no-repeat center;
        z-index: 11;
      }
    }

    .footer {
      width: 100%;
      height: 18px;
      background: url('./assets/images/home/footer.png') no-repeat center;
      z-index: 11;
    }
  }
}
</style>
