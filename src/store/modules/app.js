const state = {
  // 楼栋
  buildList: [
    // {id: 1, name: 'A1'},
    {id: 2, name: 'A2'},
    // {id: 3, name: 'A3'},
    // {id: 4, name: 'A4'},
    // {id: 5, name: 'A5'},
    // {id: 6, name: 'A6'},
    {id: 7, name: 'F'}
  ],
  // 选中的楼栋索引
  selectedBuildIndex: 0,
  // 漫游
  roamList: [
    {id: 1, name: '自定义漫游'},
    {id: 2, name: '自由漫游'},
    {id: 3, name: '固定漫游'}
  ],
  boxInfo: {
    title: '货架01-层02-格03',
    materialNo: 'SKU#GDGL18033',
    materialName: '数码产品',
    stackAmount: 380,
    trayNo: 'A159341'
  },
  // 选中的漫游
  selectedRoamIndex: 0,
  drawerVisible: false,
  homePanelVisible: true,
  warehousePanelVisible: false,
  storageVisible: false,
  //巡检路线
  routeList: [],
  tempLineInfo: []
};

const mutations = {
  setState(state, data) {
    state.drawerVisible = data.drawerVisible
  },
  selectingBuild(state, index) {
    state.selectedBuildIndex = index;
  },
  selectingRoam(state, index) {
    state.selectedRoamIndex = index;
  },
  setHomePanelVisible(state, data) {
    state.homePanelVisible = data.homePanelVisible;
    state.warehousePanelVisible = false;
    state.storageVisible = false;
  },
  setWarehousePanelVisible(state, data) {
    state.warehousePanelVisible = data.warehousePanelVisible;
    state.homePanelVisible = false;
    state.storageVisible = false;
  },
  setStorageVisibleVisible(state, data) {
    state.storageVisible = data.storageVisible;
    state.homePanelVisible = false;
    state.warehousePanelVisible = false;
  },
  setBoxInfo(state, data) {
    state.boxInfo = data;
  },
  setRouteList(state,data) {
    state.routeList = data
  },
  pushRouteList(state,data){
    state.routeList.push(data)
  },
  setTempLineInfo(state,data) {
    state.tempLineInfo = data
  }
};

export default {
  namespaced: true,
  state,
  mutations
}

