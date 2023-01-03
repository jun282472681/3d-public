<template>
  <div class="header flex">
    <div class="left">
      <!-- <div class="logo" @click="startCruise">
        <img src="@/assets/images/logo2.png" alt="" />
      </div> --> 
      <!-- <div class="title">数字孪生车间管理平台</div> -->
    </div>
    <div class="headerCenter">
      <div class="menu" :style="{color:selectedMenu === 'kq' ? '#20C72F' : '#FFFFFF'}" @click="backHome">库区总览</div>
      <div class="menu" >运营看板</div>
      <div class="menu" :style="{color:selectedMenu === 'kf' ? '#20C72F' : '#FFFFFF'}" @click="clickHC">库房管理</div>
      <div class="menu" :style="{color:selectedMenu === 'hj' ? '#20C72F' : '#FFFFFF'}" @click="clickHJ">货架管理</div>
    </div>
    <div class="right">
      <div class="rightBox flex XspaceBYcenter">
        <div class="tool flex XspaceBYcenter">
          <div class="hiht icon">
            <el-tooltip class="item" effect="dark" content="设备报警" placement="bottom-end">
              <i class="el-icon-message-solid" style="font-size: 20px; color: #fff"></i>
            </el-tooltip>
          </div>
          <!-- <div
            class="search icon"
            @click.stop="searchModel"
            v-if="!headerInput.searchFlag"
          >
            <el-tooltip
              class="item"
              effect="dark"
              content="搜索"
              placement="bottom-end"
            >
              <img
                style="width: 100%; height: 100%"
                src="@/assets/icon/header/ic_search@2x.png"
                alt=""
              />
            </el-tooltip>
          </div>
          <searchSelect v-else /> -->
          <div class="coverage icon">
            <el-tooltip class="item" effect="dark" content="后台管理" placement="bottom-end">
              <img style="width: 100%; height: 100%" src="@/assets/images/header/ic_tuceng@2x.png" alt=""/>
            </el-tooltip>
          </div>
          <div class="my icon" @click="xunyou">
            <el-tooltip class="item" effect="dark" :content="headerXunyouFlag ? '退出巡检' : '巡检'" placement="bottom-end">
              <img style="width: 100%; height: 100%" src="@/assets/images/header/ic_manyou@2x.png" alt=""/>
            </el-tooltip>
          </div>
          <div class="out icon" @click="backHome">
            <el-tooltip class="item" effect="dark" content="退出" placement="bottom-end">
              <img style="width: 100%; height: 100%" src="@/assets/images/header/ic_login@2x.png" alt=""/>
            </el-tooltip>
          </div>
        </div>
        <div class="time" @click="clickA2">
          <div class="time_top">
            {{ weatherData ? weatherData.update_time : '00:00' }}
          </div>
          <div class="time_bottom">
            {{ weatherData ? weatherData.date : '0000-00-00' }}
          </div>
        </div>
        <div class="line"></div>
        <div class="weather flex" @click="clickAc">
          <div class="weather_top">
            {{ weatherData ? weatherData.tem : '' }}°C
          </div>
          <div class="weather_bottom">
            {{ weatherData ? weatherData.city : '' }}
          </div>
        </div>
        <div class="line"></div>
        <div class="user flex">
          <div class="user_top" v-if="userinfo">{{ userinfo.username }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderCommon",
  data() {
    return {
      cruiseFlag: false,
      weatherData: {
        date: "0000-00-00",
        update_time: "00:00",
        tem: "00",
        city: "**",
      },
      userinfo: { username: 'Admin' },
      headerXunyouFlag: false,
      selectedMenu: 'kq'
    };
  },
  async created () {
    // this.userinfo = getUSERINFO()
    // this.$store.dispatch("app/setheaderXunyou", { headerXunyouFlag: false })
    setInterval(() => {
      this.setTime()
    }, 1000)
    this.weatherData.tem = "30"
    this.weatherData.city = "武汉"
  },
  methods: {
    setTime () {
      const dt = new Date()
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + "").padStart(2, "0")
      const d = (dt.getDate() + "").padStart(2, "0")
      const hh = (dt.getHours() + "").padStart(2, "0")
      const mm = (dt.getMinutes() + "").padStart(2, "0")
      const ss = (dt.getSeconds() + "").padStart(2, "0")
      this.weatherData.date = `${y}-${m}-${d}`
      this.weatherData.update_time = `${hh}:${mm}`
    },
    startCruise() {
      this.cruiseFlag = !this.cruiseFlag;
      if (this.cruiseFlag) {
        // 巡检第二栋
        window.ThreeDesign.selectBuild(2);
        window.ThreeDesign.selectRoom("配电房");
        window.ThreeDesign?.cruiseScene("play");
      } else {
        window.ThreeDesign?.cruiseScene("pause");
      }
    },
    startCruiseA5() {
      this.cruiseFlag = !this.cruiseFlag;
      if (this.cruiseFlag) {
        // 巡检第五栋
        window.ThreeDesign.selectBuild(5);
        window.ThreeDesign.selectRoom("空压机", true);
        window.ThreeDesign?.cruiseScene("play");
      } else {
        window.ThreeDesign?.cruiseScene("pause");
      }
    },
    // 巡游
    xunyou () {
      this.$store.commit('app/setState', { drawerVisible: true });
    },
    clickHC() {
      this.selectedMenu = 'kf';
      this.$store.commit('app/setWarehousePanelVisible', { warehousePanelVisible: false });
      // window.ThreeDesign.selectBuild(2);
      window.ThreeDesign.initWarehouse();
    },
    clickA2() {
      this.$store.commit('app/setHomePanelVisible', { homePanelVisible: false });
      this.$store.commit('app/setWarehousePanelVisible', { warehousePanelVisible: false });
      window.ThreeDesign.selectBuild(1);
    },
    backHome(e) {
      this.selectedMenu = 'kq';
      this.$store.commit('app/setHomePanelVisible', { homePanelVisible: true });
      window.ThreeDesign.selectBuild(3);
    },
    clickAc() {
      this.$store.commit('app/setHomePanelVisible', { homePanelVisible: false });
      this.$store.commit('app/setWarehousePanelVisible', { warehousePanelVisible: false });
      window.ThreeDesign.selectBuild(4);
    },
    clickHJ() {
      this.selectedMenu = 'hj';
      this.$store.commit('app/setStorageVisibleVisible', { storageVisible: true });
      window.ThreeDesign.initStorage('001');
    }
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 80px;
  // background: linear-gradient(
  //   270deg,
  //   rgba(0, 0, 0, 0.3) 0%,
  //   rgba(0, 0, 0, 0) 24%,
  //   rgba(0, 0, 0, 0) 73%,
  //   rgba(0, 0, 0, 0.3) 100%
  // );
  background: url('../../assets/images/logo2.png') no-repeat;
  z-index: 11;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    width: 30%;
    height: 80px;
    .logo {
      width: 240px;
      height: 100%;
      // background: linear-gradient(
      //   270deg,
      //   rgba(177, 204, 30, 0.1) 0%,
      //   #b1cc1e 100%
      // );
      background: linear-gradient(270deg, rgba(177, 204, 30, 0.1) 0%, #636e48 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 240px;
        height: 65px;
      }
    }
    .title {
      display: flex;
      justify-content: center;
      align-self: center;
      margin-left: 30px;
      color: #fff;
      font-size: 27px;
      line-height: 40px;
      font-family: TRENDS;
    }
  }
  .headerCenter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    font-family: TRENDS;
    // padding: 0 200px;
    width: 25%;

    .menu {
      cursor: pointer;
      color: #FFFFFF;
    }
  }
  .menu:hover {
    color:  #20C72F !important;
  }
  .right {
    .tool {
      .icon {
        width: 20px;
        height: 20px;
        margin: 0 10px;
        cursor: pointer;
        opacity: 0.6;
      }
      .icon:hover {
        opacity: 1;
      }
    }
    .time {
      color: #fff;
      margin-left: 40px;
      .time_top {
        font-size: 20px;
        font-weight: 400;
        color: #ffffff;
        line-height: 28px;
      }
      .time_bottom {
        font-size: 12px;
        font-weight: 400;
        color: #ffffff;
        line-height: 20px;
      }
    }
    .line {
      width: 1px;
      height: 40px;
      background: #b1cc1e;
      opacity: 0.3;
      margin: 0 20px;
      border: 1px solid #b1cc1e;
    }
    .weather {
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      .weather_top {
        font-size: 20px;
        font-weight: 400;
        color: #ffffff;
        line-height: 28px;
      }
      .weather_bottom {
        font-size: 12px;
        font-weight: 400;
        color: #ffffff;
        line-height: 20px;
      }
    }
    .user {
      margin: 0 40px 0 0px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 20px;
    }
  }
}
</style>