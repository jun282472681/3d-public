<template>
  <div>
    <MDrawer title="自定义漫游" :display.sync="drawerVisible" @updateDisplay="cancelDrawer" :inner="true" :width="drawerWidth" :mask="false">
      <div class="drawer__content">
        <el-form :model="form" label-width="90px">
          <el-form-item label="拾取路径：">
            <el-button type="primary" @click="setRoam" style="margin-right: 15px;">绘制</el-button>
            <el-button @click="clearRoam">清理</el-button>
          </el-form-item>
          <el-form-item label="高度：">
            <el-input-number v-model="form.height" :min="1" :max="10"></el-input-number>
          </el-form-item>
          <el-form-item label="速度：">
            <el-slider v-model="form.speed" :min="1" :max="10"></el-slider>
          </el-form-item>
          <el-form-item label="路径视角：" v-if="form.routeLineList.length > 0">
            <div v-for="(line,index) in form.routeLineList" :key='index' style="margin-bottom: 10px;">
              <span style="margin-right: 10px;">第{{index + 1}}段路径视角角度(°C)</span>
              <el-input-number v-model="line.angle" :step="1" :min='-360' :max='360' size="mini"></el-input-number>
            </div>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="自由视角：">
                <el-switch v-model="form.isFreeAngle"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="显示路径：">
                <el-switch v-model="form.isShowPath"></el-switch>
              </el-form-item>
            </el-col>
          </el-row> 
          <el-form-item label="场景名称：">
            <el-input v-model="form.sceneName" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
        <div class="drawer__footer">
          <el-button type="primary" @click="start">预览</el-button>
          <el-button type="primary" @click="pause">暂停/继续</el-button>
          <el-button type="primary" @click="end">停 止</el-button>
          <el-button type="primary" @click="saveCusRoam">保存</el-button>
        </div>
        <el-divider></el-divider>
        <div>
          <div class="route_content" style="display: flex;">
            <span style="line-height: 50px;">巡检组合：</span>
            <Drag style="width: 300px" :list="routeArray" :config="config">
              <template v-slot="{ item, index }">
                  <div class="item">
                    <el-select v-model="item.value" placeholder="请选择">
                      <el-option v-for="t in options" :key="t.value" :label="t.label" :value="t.value"></el-option>
                    </el-select>
                    <i class="el-icon-circle-plus-outline" v-if="index === 0" @click="addRoute" style="font-size: 20px;margin-left: 8px;cursor: pointer;"></i>
                    <i class="el-icon-remove-outline" v-if="index !== 0" @click="removeRoute(item, index)" style="font-size: 20px;margin-left: 8px;cursor: pointer;"></i>
                  </div>
              </template>
            </Drag>
          </div>
          <div class="route_content">
            巡检名称：
            <el-input v-model="pollName" placeholder="请输入内容"></el-input>
          </div>
          <div class="drawer__footer">
            <el-button type="primary" @click="startGroupRoute">预览</el-button>
            <el-button type="primary" @click="pause">暂停/继续</el-button>
            <el-button type="primary" @click="end">停 止</el-button>
            <el-button type="primary" @click="savePollCom">保存</el-button>
          </div>
        </div>
        <el-divider></el-divider>
        <div>
          <el-row style="text-align: left;margin-bottom: 10px;">
            巡检名称：
            <el-input v-model="routeName" placeholder="请输入内容" style="margin-right: 15px;"></el-input>
            <el-button type="primary" @click="getPollList">查询</el-button>
          </el-row>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="routeName" label="巡检名称" width="180"></el-table-column>
            <el-table-column prop="roamName" label="场景名称" width="180"></el-table-column>
            <el-table-column prop="data" label="更新时间" width="180"></el-table-column>
            <el-table-column prop="action" label="操作"></el-table-column>
          </el-table>
        </div>
      </div>
    </MDrawer>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapState } from 'vuex';
import MDrawer from '@/components/mDrawer/index.vue';
import Drag from '@/components/drag.vue';
import { addPollCom, getPollComList, addCusRoam, getCusRoamList } from '@/api/roam';
export default {
  name: 'roamDrawer',
  components: {
    MDrawer,
    Drag,
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
      loading: false,
      form: {
        height: 1,
        speed: 1,
        isFreeAngle: false,
        isShowPath: true,
        sceneName: '',
        routeLineList: [],
      },
      drawerWidth: '500px',
      config: {
        name: 'test',
        push: true,
        pull: true,
        exchange: true,
      },
      routeArray: [],
      options: [],
      pollName: '',
      tableData: [],
      routeName: ''
    };
  },
  watch: {
    '$store.state.app.routeList': {
      handler(newVal, oldVal) {
        this.options = []
        newVal.forEach(ele => {
          this.options.push({
            label: ele.form.sceneName,
            value: ele.form.sceneName
          })
        })
        if (this.routeArray.length == 0 && this.options.length > 0) {
          this.routeArray.push({
            name: this.options[0].label,
            value: this.options[0].value,
            draggable: true
          })
        }
      },
      deep: true
    },
    '$store.state.app.tempLineInfo': {
      handler(newVal,oldV){
        newVal.length == 0 && (this.form.routeLineList = [])
        newVal.forEach(item => {
          if(this.form.routeLineList.every(line => line.name != item.name)){
            const maxX = Math.max(item.position[0].x,item.position[1].x)
            const maxY = Math.max(item.position[0].y,item.position[1].y)
            const maxZ = Math.max(item.position[0].z,item.position[1].z)

            const minX = Math.min(item.position[0].x,item.position[1].x)
            const minY = Math.min(item.position[0].y,item.position[1].y)
            const minZ = Math.min(item.position[0].z,item.position[1].z)
            
            this.form.routeLineList.push({
              ...item,
              angle: 0,
              maxX,
              maxY,
              maxZ,
              minX,
              minY,
              minZ
            })
          }
        })
      },
      deep: true,
    }
  },
  created() {
    // this.getList();
  },
  methods: {
    // 获取数据
    getList() {
      getCusRoamList().then(res => {
        this.options = res.data.map(t => {
          return { value: t.id, label: t.sceneName };
        })
        this.routeArray.push({ name: res.data[0].sceneName,  value: res.data[0].id, draggable: true});
      })
      this.getPollList();
    },
    // 查询巡检组合
    getPollList() {
      const param = this.routeName.length > 0 ? { name: this.routeName } : null;
      getPollComList(param).then(res => {
        this.tableData = res.data.map(t => {
          const roamName = t.customizeRoamList.map(c =>　c.sceneName).join(',');
          return {routeName: t.name, roamName, data: t.updateTime};
        });
      })
    },
    //启动组合漫游
    startGroupRoute() {
      const param = []
      this.routeArray.forEach(data => {
        const result = this.$store.state.app.routeList.find(ele => ele.form.sceneName == data.value)
        param.push(_.cloneDeep(result))
      })
      window.ThreeDesign.roamClick('startGroupRoute',param);
    },
    saveCusRoam() {
      const saveRoutes = this.$store.state.app.routeList
      if (saveRoutes.some(ele => ele.form.sceneName == this.form.sceneName)){
        this.$message.error('已有相同巡检名称')
        return
      }
      window.ThreeDesign.roamClick('saveRout',_.cloneDeep(this.form))
      this.clearRoam()
      return
      const param = { ...this.form, isFreeAngle: this.form.isFreeAngle ? 1 : 0, isShowPath: this.form.isShowPath ? 1 : 0 };
      addCusRoam(param).then(res => {
        if (res.code === 200) {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    savePollCom() {
      const param = { name: this.pollName, roamIds: this.routeArray.map(t => t.value) };
      addPollCom(param).then(res => {
        if (res.code === 200) {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    setRoam() {
      console.log('绘制路径');
      window.ThreeDesign.roamClick('setRoam');
    },
    clearRoam() {
      console.log('清理路径');
      window.ThreeDesign.roamClick('clearRoam');
    },
    start() {
      console.log('开启漫游',this.form);
      window.ThreeDesign.roamClick('start', this.form);
    },
    pause() {
      console.log('暂停漫游');
      window.ThreeDesign.roamClick('pause');
    },
    keep() {
      console.log('继续漫游');
      window.ThreeDesign.roamClick('continue');
    },
    end() {
      console.log('结束漫游');
      window.ThreeDesign.roamClick('end');
    },
    cancelDrawer() {
      this.$store.commit('app/setState', { drawerVisible: false });
    },
    addRoute() {
      const route = { name: this.routeArray.length + 1, value: "", draggable: true };
      this.routeArray.push(route);
    },
    removeRoute(item, index) {
      console.log(item, index);
      this.routeArray.splice(index,1);
    }
  },
  computed: {
    ...mapState('app', ['roamList', 'selectedRoamIndex'])
  }
}
</script>

<style lang="scss" scoped>
.drawer__content {
  .route_content {
    text-align: left;
    margin-bottom: 15px;
  }
  .wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .item{
    width: 300px;
    height: 20px;
    // background-color: #42b983;
    // color: #ffffff;
    cursor: move;
    margin-bottom: 15px;
  }
  .el-input {
    width: 220px;
  }
  ::v-deep .el-form-item__content {
    text-align: start !important;
  }
}
</style>