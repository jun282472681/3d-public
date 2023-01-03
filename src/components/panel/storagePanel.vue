<template>
  <div id="storagePanel" class="storagePanel">
    <div class="item" :key="index" v-for="(data, index) in da" @click="handleClick(data.id)" :style="{backgroundColor:  data.selected ? '#009944' : ''}">
      <span :id="data.id">{{ data.title }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'storagePanel',
  data() {
    return {
      da: [
          { id: '001', title: '货架01', selected: true  },
          { id: '002', title: '货架02', selected: false },
          { id: '003', title: '货架03', selected: false },
          { id: '004', title: '货架04', selected: false },
          { id: '005', title: '货架05', selected: false },
          { id: '006', title: '货架06', selected: false },
          { id: '007', title: '货架07', selected: false },
          { id: '008', title: '货架08', selected: false },
          { id: '009', title: '货架09', selected: false },
          { id: '010', title: '货架10', selected: false },
          { id: '011', title: '货架11', selected: false },
          { id: '012', title: '货架12', selected: false },
          { id: '013', title: '货架13', selected: false },
          { id: '014', title: '货架14', selected: false },
          { id: '015', title: '货架15', selected: false },
          { id: '016', title: '货架16', selected: false },
        ]
    };
  },
  methods: { 
    handleClick(id) {
      window.ThreeDesign.initStorage(id);
      this.da.forEach(t => {
        t.selected = false;
        if (t.id === id) {
          t.selected = true;
        }
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.storagePanel {
  position: absolute;
  // width: 80px;
  // height: 250px;
  z-index: 11;
  right: 10px;
  top: 20%;
  width: 100px;
  height: 250px;
  background: rgba(0,0,0,0.5);
  border-radius: 6px;
  backdrop-filter: blur(6px);
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
  overflow-x: hidden;
  overflow-y: scroll;
}
.storagePanel::-webkit-scrollbar { width: 0 !important }
.item {
    height: 20px;
    width: 100px;
    display: flex;
    // margin-bottom: 10px;
    margin: 5px 0;
    justify-content: center;
    align-items: center;

    > span {
        text-align: left;
        color: #FFFFFF;
        height: 14px;
        font-size: 14px;
        line-height: 14px;
        opacity: 0.5;
    }
}
.item:hover {
  background-color: #009944;
}
</style>