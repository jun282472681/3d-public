<template>
  <div>
    <MDrawer title='多视角镜头' :display.sync="drawerVisible" @updateDisplay="cancelDrawer" :inner="true" :width="drawerWidth" :mask="false">
      <div id="drawer_content">
        <p class="tips">✳多视角起始位置为屏幕右下角</p>
        <div v-for="(item,index) in visualList" :key='index' class="drawer-item">
          <i v-if="index == 0" class="el-icon-circle-plus-outline btn-add" @click="addCamera"></i>
          <i v-else class="el-icon-circle-close btn-add" @click='delCamera(index)'></i>
          <div class="drawer-row">
            <p>
              <span class="item-label">高度:</span>
              <el-input-number v-model="item.height" class="drawer-input" :min="50" size="mini"/>
              <span>px</span>
            </p>
            <p>
              <span class="item-label">宽度:</span>
              <el-input-number v-model="item.width" class="drawer-input" :min="50" size="mini"/>
              <span>px</span>
            </p>
          </div>
          <div class="drawer-row">
            <p>
              <span class="item-label">右边距:</span>
              <el-input-number v-model="item.right" class="drawer-input" :min="0" size="mini"/>
              <span>px</span>
            </p>
            <p>
              <span class="item-label">下边距:</span>
              <el-input-number v-model="item.bottom" class="drawer-input" :min="0" size="mini"/>
              <span>px</span>
            </p>
          </div>
          <div class="drawer-row">
            <p>
              <span>镜头位置:</span>
              <span v-if="item.cameraPos != null">
                x:{{item.cameraPos[0].toFixed(2)}} y:{{item.cameraPos[1].toFixed(2)}} z:{{item.cameraPos[2].toFixed(2)}}
              </span>
            </p>
            <p>
              <span>镜头朝向:</span>
              <span v-if="item.cameraLook != null">
                x:{{item.cameraLook[0].toFixed(2)}} y:{{item.cameraLook[1].toFixed(2)}} z:{{item.cameraLook[2].toFixed(2)}}
              </span>
            </p>
          </div>
          <el-button type="primary" @click="setCamera(index)" style="width:100%">得到镜头信息</el-button>
        </div>
        <el-button type="primary" class="btn-save" @click="saveVisualInfo">保存</el-button>
      </div>
    </MDrawer>
  </div>
</template>

<script>
import MDrawer from '@/components/mDrawer/index.vue';
export default {
  name: 'visualDrawer',
  components: {
    MDrawer
  },
  props: {
    // 是否打开
    drawerVisible: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      drawerWidth: '500px',
      visualList: [
        {
          right: 10,
          bottom: 10,
          width: 100,
          height: 100,
          cameraPos: null,
          cameraLook: null
        }
      ]
    }
  },
  methods: {
    cancelDrawer(){
      this.$store.commit('app/setVisual', { visualVisable: false });
    },
    //得到镜头信息
    setCamera(index) {
      const info = window.ThreeDesign.getCameraInfo();
      this.$set(this.visualList[index],'cameraPos',info.postion)
      this.$set(this.visualList[index],'cameraLook',info.look)
    },
    //保存多镜头信息
    saveVisualInfo(){
      if(this.visualList.every(item => item.cameraPos != null && item.cameraLook != null))
        window.ThreeDesign.saveMoreCameraInfo(this.visualList)
      else
        this.$message.error('请输入镜头信息')
    },
    //添加摄像头
    addCamera() {
      this.visualList.push({
        right: 10,
        bottom: 10,
        width: 100,
        height: 100,
        cameraPos: null,
        cameraLook: null
      })
    },
    //删除摄像头
    delCamera(index) {
      this.visualList.splice(index,1)
    }
  }
}
</script>

<style lang="scss" scoped>
#drawer_content{
  .tips {
    text-align: left;
    color: #cc0000;
  }
  .drawer-item{
    margin-bottom: 30px
  }
  .drawer-row {
    display: flex;
    &>p{
      flex: 1;
      text-align: left;
    }
    .item-label {
      width: 50px;
      display: inline-block;
      text-align: right;
    }
    .drawer-input{
      display: inline-block;
      width: 100px;
      margin: 5px;
    }
  }
  .btn-add{
    position: absolute;
    right: 20px;
    font-size: 20px;
    cursor: pointer;
  }
  .btn-save {
    float: right;
  }
}
</style>