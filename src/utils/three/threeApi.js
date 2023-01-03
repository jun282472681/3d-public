import store from "@/store";
import {
  initFactory,
  animateFactory,
  startCruiseFactory,
  pauseCruiseFactory,
  startA2PdfToKyj
} from "./factory";
import {
  initA2KyjAndZdj,
  animateA2KyjAndZdj,
  startCruiseA2Kyj,
  startKeyBoard,
  startRoam,
  start,
  pause,
  keep,
  end,
  clearRoam,
  startGroupRoute,
  saveRout
} from './A2KyjAndZdj';
import { rotationAngle } from '../index.js';
import initSndHouse from './SndHouse';
import initAction from './actions';
import initStorageRack from './StorageRack';
import { getInventoryList, getAllInventoryList } from '@/api/storageRack';
 
let initKyjAndZdj, animateKyjAndZdj, initBjfAndPdf, animateBjfAndPdf, initKt, animateKt;
let sceneInfos = [
  {
    buildIndex: 1,
    bjfAndPdfLoaded: false,
    bjfPositions: {
      px: -9.512825919350556, 
      py: 15.29058513980582, 
      pz: -1.691389555603588,
      vx: -9.511121516228398, 
      vy: 2.039816338117306, 
      vz: -5.0485432557895145
    },
    pdfPositions: {
      px: -23.64592000371206, 
      py: 15.321298157975571, 
      pz: -4.7697775199021075,
      vx: -23.6448631135106, 
      vy: 1.9168021369129211, 
      vz: -4.949531147495128
    }
  },
  {
    buildIndex: 2,
    bjfAndPdfLoaded: false,
    kyjAndZdjLoaded: false,
    kyjPositions: {
      px: 39.57563839545124, 
      py: 14.65914654737838, 
      pz: -20.091284691573765,
      vx: 45.72431347929342, 
      vy: 6.278184223972802, 
      vz: -20.137039455497238
    },
    zdjPositions: {
      px: 69.98890930949295, 
      py: 13.527619934326708, 
      pz: -20.30502957437188,
      vx: 60.72221773193591, 
      vy: 1.8812817576809033, 
      vz: -20.080682092959325
    }
  },
  {
    buildIndex: 3,
    bjfAndPdfLoaded: false,
    kyjAndZdjLoaded: false,
    bjfPositions: {
      px: -12.783344883091964,
      py: 22.952841598788133, 
      pz: 26.682017006141905,
      vx: -12.783348910425573,
      vy: -10.34998567735623,
      vz: 17.7346083482155275,
    },
    pdfPositions: {
      px: 9.282517951497057,
      py: 21.497952600631056,
      pz: 28.425214819814947,
      vx: 9.435681616128981,
      vy: -7.510584396473778, 
      vz: 22.71518891808549,
    },
  },
  {
    buildIndex: 4,
    bjfAndPdfLoaded: false
  },
  {
    buildIndex: 5,
    bjfAndPdfLoaded: false,
    kyjAndZdjLoaded: false,
    bjfPositions: {
      px: -35.86756011848621,
      py: 17.256678940758242,
      pz: 17.85468835796391,
      vx: -35.902085659241166,
      vy: -6.267446010186896,
      vz: 12.704401008758753,
    },
    pdfPositions: {
      px: -35.99758754682701,
      py: 18.722628543440038,
      pz: 11.159781837200498,
      vx: -36.03211308758197,
      vy: -4.8014964075050965, 
      vz: 6.009494487995354,
    },
  },
  {
    buildIndex: 6,
    bjfAndPdfLoaded: false
  },
  {
    buildIndex: 7,
    bjfAndPdfLoaded: false,
    kyjAndZdjLoaded: false,
    kyjPositions: {
      px: 6.63026946258,
      py: 14.2615773828,
      pz: 32.037509254,
      vx: 6.852554790061694,
      vy: -13.215524297713838,
      vz: 21.151736709669716
    },
    pdfPositions: {
      px: -1.84333730735,
      py: 8.2406597987,
      pz: -15.05358157438,
      vx: -1.7931151516386756,
      vy: 2.03260596565167,
      vz: -17.513064483307907
    }
  }
];

export function ThreeDesign() {
  this.context = null
  // 当前选中楼层
  this.currentBuildIndex = 0;
  // 初始化
  this.init = () => {
    window.completeState = false;
    if (!window.three) {
      initFactory();
      animateFactory();
    }
  };

  this.setText = (context) => {
    this.context = context
  }

  // 三维漫游点击
  this.roamClick = (flag, data) => {
    switch (flag) {
      case 'setRoam':
        startRoam();
        break;
      case 'clearRoam':
        clearRoam();
        break;
      case 'start':
        start(data);
        break;
      case 'pause':
        // if (this.route) this.route.pause();
        pause();
        break;
      case 'continue':
        // if (this.route) this.route.continue();
        keep();
        break;
      case 'end':
        // if (this.route) this.route.destroy();
        end();
        // this._map.closePathMark();
        break;
      case 'saveRout':
        saveRout(data)
        break;
      case 'startGroupRoute':
        startGroupRoute(data)
        break;
    }
  }

  // 选择漫游
  this.selectRoam = (i) => {
    store.commit('app/selectingRoam', i);
    if (i === 1) {
      console.log('自定义漫游');

    }
    if (i === 2) {
      console.log('自由漫游');
      startKeyBoard();
    }
    if (i === 3) {
      console.log('固定漫游');
      startCruiseA2Kyj();
    }
  } 

  // 选择楼栋
  this.selectBuild = (i, id) => {
    store.commit('app/selectingBuild', i);
    this.currentBuildIndex = i;
    if (i == 1) {
      this.clear();
      initA2KyjAndZdj(this.context);
      animateA2KyjAndZdj();
    }
    if (i == 2) {
      this.clear();
      initSndHouse();
    }
    if (i === 3) {
      this.clear();
      initFactory();
      animateFactory();
    }
    if (i === 4) {
      this.clear();
      initAction();
    }
  };

  /**
   * 初始化仓库
   */
  this.initWarehouse = () => {
    this.clear();
    initSndHouse();
    // getAllInventoryList().then(t => {
    //   if(t.data) {
    //     initSndHouse(t.data);
    //   }
    // })
  }

  /**
   * 初始化货架
   */
  this.initStorage = (id) => {
    this.clear();
    getInventoryList({ position: id }).then(t => {
      if(t.data) {
        initStorageRack(t.data, id);
      }
    })
  }

  /**
   * nav选择房间
   * @param {*} name 房间名称 
   * @param {*} isCruise 是否巡检
   * @param {*} type 巡检类型
   */
  this.selectRoom = (name, isCruise, type) => {
    if (name == '总览') {
      this.clear();
      initFactory();
      animateFactory();
      this.selectBuild(0);
      this.resetFlag();
    }
    
    if (name == '空压机' || name == '制氮机') {
      sceneInfos.forEach(item => {
        if (item.buildIndex == this.currentBuildIndex) {
          if (item.kyjAndZdjLoaded) {
            let positions;
            if (name == '空压机') {
              positions = item.kyjPositions;
            } else {
              positions = item.zdjPositions;
            }
            rotationAngle(window.three.orbit, positions);
          } else {
            this.clear();
            initKyjAndZdj(name);
            animateKyjAndZdj();
            item.kyjAndZdjLoaded = true;
            // 将其余场景的标识设为false
            sceneInfos.forEach(item => {
              if (item.buildIndex == this.currentBuildIndex) {
                if (item.bjfAndPdfLoaded) {
                  item.bjfAndPdfLoaded = false;
                }
                if (this.currentBuildIndex == 7) {
                  item.bjfAndPdfLoaded = true;
                }
              } else {
                if (item.bjfAndPdfLoaded) {
                  item.bjfAndPdfLoaded = false;
                }
                if (item.kyjAndZdjLoaded) {
                  item.kyjAndZdjLoaded = false;
                }
              }
            });
          }
        }
      });
    }

    if (name == '冰机房' || name == '配电房') {
      sceneInfos.forEach(item => {
        if (item.buildIndex == this.currentBuildIndex) {
          if (item.bjfAndPdfLoaded) {
            let positions;
            if (name == '冰机房') {
              positions = item.bjfPositions;
            } else {
              positions = item.pdfPositions;
            }
            rotationAngle(window.three.orbit, positions);
          } else {
            this.clear();
            initBjfAndPdf(name);
            animateBjfAndPdf();
            item.bjfAndPdfLoaded = true;
            // 将其余场景的标识设为false
            sceneInfos.forEach(item => {
              if (item.buildIndex == this.currentBuildIndex) {
                if (item.kyjAndZdjLoaded) {
                  item.kyjAndZdjLoaded = false;
                }
                if (this.currentBuildIndex == 7) {
                  item.kyjAndZdjLoaded = true;
                }
              } else {
                if (item.bjfAndPdfLoaded) {
                  item.bjfAndPdfLoaded = false;
                }
                if (item.kyjAndZdjLoaded) {
                  item.kyjAndZdjLoaded = false;
                }
              }
            });
          }
        }
      });
    }

    if (name == '空调房') {
      this.clear();
      initKt();
      animateKt();
      this.resetFlag();
    }

    if (isCruise) {
      switch(this.currentBuildIndex) {
        case 0:
          startA2PdfToKyj();
          break;
        case 2:
          if (type == 'kyj') {
            startCruiseA2Kyj();
          }
          if (type == 'kt') {
            startCruiseA2Kt();
          }
          break;
      }
    }
  }

  // 销毁
  this.clear = () => {
    window.three?.scene.traverse((child) => {
      if (child.material && child.material instanceof Array) {
        child.material.forEach((item) => {
          item.dispose();
        });
      } else if (child.material) {
        child.material.dispose();
      }
      if (child.geometry) {
        child.geometry.dispose();
      }
      child = null;
    });

    // 清除循环
    cancelAnimationFrame(window.loopId);

    window.three.scene.clear();
    window.three.renderer.dispose();
    window.three.scene = null;
    window.three.renderer.domElement = null;
    window.three.renderer = null;
    window.three = null;
  }

  // 将所有场景的加载标识重置为false
  this.resetFlag = () => {
    sceneInfos.forEach(item => {
      if (item.bjfAndPdfLoaded) {
        item.bjfAndPdfLoaded = false;
      }
      if (item.kyjAndZdjLoaded) {
        item.kyjAndZdjLoaded = false;
      }
    });
  }
}