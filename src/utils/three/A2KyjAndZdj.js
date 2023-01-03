import * as THREE from 'three';
import _ from 'lodash';
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';
import {
  PointerLockControls
} from 'three/examples/jsm/controls/PointerLockControls.js';
import {
  TransformControls
} from 'three/examples/jsm/controls/TransformControls.js';
import {
  KTX2Loader
} from 'three/examples/jsm/loaders/KTX2Loader';
import {
  MeshoptDecoder
} from 'three/examples/jsm/libs/meshopt_decoder.module';
import {
  GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader';
import {
  DDSLoader
} from 'three/examples/jsm/loaders/DDSLoader';
import TWEEN from '@tweenjs/tween.js';

import {
  createSpriteTag1
} from './createSpriteTag.js';
import PRoute from '@/utils/three/route';

var container;
var camera, scene, raycaster, renderer, orbit, control, controls, route;

var mouse = new THREE.Vector2(),
  INTERSECTED,
  SELECTINTERSECTED;
var radius = 100,
  theta = 0;


var intersectsObjs = [];

let glbArray = [
  'SM_diwangge',
  'LXWZ_2-4F',
  'LX_Luoganji',
  'LX_KongYa_A2',
  'LX_KongYa_A2a',
  'LX_Lengganji',
  'LX_Xiganji',
  'LX_Zhidanji',
  'LX_Chuqiguan',
  'LX_fuyaji',
  'LX_zhongyangkongtiaojiankongxitong',
  'LX_csrsxt',
];
let modelLoaded = false;
let modelList = {};
let transparentList = [];

let kyjTags = [{
    name: 'A2-1#空压机',
    attrName: 'A2空压房空压群控柜K1',
    data: {
      排气温度: 0,
      排气压力: 0,
      压力露点: 0,
    },
    position: [45.66233772314349, 3.972863320399583, -11.355497405607277],
    status: 0,
    type: 'kyjSpriteTag',
    params: {
      bgWidth: 400,
      contentHeight: 180,
      valueLeft: 310,
      scale: 3,
    },
  },
  {
    name: 'A2-2#空压机',
    attrName: 'A2空压房空压群控柜K2',
    data: {
      排气温度: 0,
      排气压力: 0,
      压力露点: 0,
    },
    position: [45.66233772314349, 3.972863320399583, -14.655497405607277],
    status: 0,
    type: 'kyjSpriteTag',
    params: {
      bgWidth: 400,
      contentHeight: 180,
      valueLeft: 310,
      scale: 3,
    },
  },
  {
    name: 'A2-3#空压机',
    attrName: 'A2空压房空压群控柜K3',
    data: {
      排气温度: 0,
      排气压力: 0,
      压力露点: 0,
    },
    position: [45.66233772314349, 3.972863320399583, -17.955497405607277],
    status: 0,
    type: 'kyjSpriteTag',
    params: {
      bgWidth: 400,
      contentHeight: 180,
      valueLeft: 310,
      scale: 3,
    },
  },
  {
    name: 'A2-4#空压机',
    attrName: 'A2空压房空压群控柜K4',
    data: {
      排气温度: 0,
      排气压力: 0,
      压力露点: 0,
    },
    position: [45.66233772314349, 3.972863320399583, -21.255497405607277],
    status: 0,
    type: 'kyjSpriteTag',
    params: {
      bgWidth: 400,
      contentHeight: 180,
      valueLeft: 310,
      scale: 3,
    },
  },
  {
    name: 'A2-5#空压机',
    attrName: 'A2空压房空压群控柜K5',
    data: {
      排气温度: 0,
      排气压力: 0,
      压力露点: 0,
    },
    position: [45.66233772314349, 3.972863320399583, -24.555497405607277],
    status: 0,
    type: 'kyjSpriteTag',
    params: {
      bgWidth: 400,
      contentHeight: 180,
      valueLeft: 310,
      scale: 3,
    },
  },
  {
    name: 'A2-6#空压机',
    attrName: 'A2空压房空压群控柜K6',
    data: {
      排气温度: 0,
      排气压力: 0,
      压力露点: 0,
    },
    position: [45.66233772314349, 3.972863320399583, -27.855497405607277],
    status: 0,
    type: 'kyjSpriteTag',
    params: {
      bgWidth: 400,
      contentHeight: 180,
      valueLeft: 310,
      scale: 3,
    },
  },
];

let zdjTags = [{
    name: 'A2-1#制氮机',
    attrName: 'A2空压房氮气机1',
    data: {
      氮气流量: 0,
      氮气压力: 0,
      氧含量: 0,
    },
    position: [62.02008179532583, 3.972863320399583, -14.766070321746575],
    status: 0,
    type: 'zdjSpriteTag',
    params: {
      bgWidth: 460,
      contentHeight: 180,
      valueLeft: 330,
      scale: 4,
    },
  },
  {
    name: 'A2-2#制氮机',
    attrName: 'A2空压房氮气机2',
    data: {
      氮气流量: 0,
      氮气压力: 0,
      氧含量: 0,
    },
    position: [62.02008179532583, 3.972863320399583, -18.366070321746575],
    status: 0,
    type: 'zdjSpriteTag',
    params: {
      bgWidth: 460,
      contentHeight: 180,
      valueLeft: 330,
      scale: 4,
    },
  },
  {
    name: 'A2-3#制氮机',
    attrName: 'A2空压房氮气机3',
    data: {
      氮气流量: 0,
      氮气压力: 0,
      氧含量: 0,
    },
    position: [62.02008179532583, 3.972863320399583, -21.976070321746575],
    status: 0,
    type: 'zdjSpriteTag',
    params: {
      bgWidth: 460,
      contentHeight: 180,
      valueLeft: 330,
      scale: 4,
    },
  },
  {
    name: 'A2-4#制氮机',
    attrName: 'A2空压房氮气机4',
    data: {
      氮气流量: 0,
      氮气压力: 0,
      氧含量: 0,
    },
    position: [62.02008179532583, 3.972863320399583, -25.586070321746575],
    status: 0,
    type: 'zdjSpriteTag',
    params: {
      bgWidth: 460,
      contentHeight: 180,
      valueLeft: 330,
      scale: 4,
    },
  },
];

const tagCanvas = [{
    spriteName: 'zdjSpriteTag0',
    thingName: '1#氮气机',
    canvas: null,
  },
  {
    spriteName: 'zdjSpriteTag1',
    thingName: '2#氮气机',
    canvas: null,
  },
  {
    spriteName: 'zdjSpriteTag2',
    thingName: '3#氮气机',
    canvas: null,
  },
  {
    spriteName: 'zdjSpriteTag3',
    thingName: '4#氮气机',
    canvas: null,
  },
  {
    spriteName: 'kyjSpriteTag0',
    thingName: '1#空压机',
    canvas: null,
  },
  {
    spriteName: 'kyjSpriteTag1',
    thingName: '2#空压机',
    canvas: null,
  },
  {
    spriteName: 'kyjSpriteTag2',
    thingName: '3#空压机',
    canvas: null,
  },
  {
    spriteName: 'kyjSpriteTag3',
    thingName: '4#空压机',
    canvas: null,
  },
  {
    spriteName: 'kyjSpriteTag4',
    thingName: '5#空压机',
    canvas: null,
  },
  {
    spriteName: 'kyjSpriteTag5',
    thingName: '6#空压机',
    canvas: null,
  },
];

const units = {
  kyjSpriteTag: {
    排气温度: '℃',
    排气压力: 'bar',
    压力露点: '℃',
    电机电流: 'A',
    进气阀开度: '%',
    三级排气温度: '℃',
    三级排气压力: 'bar',
  },
  zdjSpriteTag: {
    氮气流量: 'Nm³/h',
    氮气压力: 'bar',
    氧含量: 'ppm',
  },
  bsxtgSpriteTag: {
    冷却塔温度: '℃',
    水箱温度: '℃',
    环境温度: '℃',
    供水压力: 'bar',
  },
  lqxtgSpriteTag: {
    出水压力: 'bar',
    出水温度: '℃',
  },
};

let progress = 0;
let a2KyjFlag = false, // 空压机巡检标识
  a2ZdjFlag = false, // 制氮机巡检标识
  customPathFlag = false,
  a2Keyboard = false,
  setRoam = false; 
// A2空压机巡检路线点
const a2KyjCruisePoints = [
  new THREE.Vector3(40, 9.478734291549252, -27.462800520779712),
  new THREE.Vector3(40, 9.478734291549252, -12),
];
// A2制氮机巡检路线点
const a2ZdjCruisePoints = [
  new THREE.Vector3(72.96824525028599, 7.460042900962133, -23.952321349168855),
  new THREE.Vector3(72.96824525028599, 7.460042900962133, -14),
];
let a2KyjCurve = null,
    a2ZdjCurve = null,
    customPath = null;

let moveState = false;
let offsetArr = [];
let texture = null;

const LightPathGuidance1 = [
  new THREE.Vector3(43.022429767339645, 1.5, -5.796574759798716),
  new THREE.Vector3(67.3234200346129, 1.5, -6.670939479502248),
];

export function initA2KyjAndZdj(context,name) {
  container = document.getElementById('threeView');
  container.innerHTML = '';

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    30000
  );
  camera.position.set(90, 20, -20);
  // camera.lookAt(44.95314441040162,0, -29.24496408261156)
  scene = new THREE.Scene();

  // 创建一个纹理图片加载器加载图片
  var textureLoader = new THREE.TextureLoader();
  // 加载背景图片
  var texture = textureLoader.load(require('@/assets/images/sceneBg.png'));
  // 纹理对象Texture赋值给场景对象的背景属性.background
  scene.background = texture;

  //灯光
  scene.add(new THREE.AmbientLight(0x666666));
  scene.add(new THREE.HemisphereLight(0xffffff, 0x000000, 0.8));

  //坐标辅助
  var axes = new THREE.AxesHelper(20);
  scene.add(axes);


  raycaster = new THREE.Raycaster();

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  orbit = new OrbitControls(camera, renderer.domElement);
  orbit.addEventListener("change", render);
  orbit.minPolarAngle = 0;
  orbit.maxPolarAngle = Math.PI / 180 * 90;
  orbit.minAzimuthAngle = -Infinity;
  orbit.maxAzimuthAngle = Infinity;
  if (name == "空压机") {
    orbit.target.set(45.72431347929342, 6.278184223972802, -20.137039455497238)
    orbit.object.position.set(39.57563839545124, 14.65914654737838, -20.091284691573765)
  } else if (name == "制氮机") {
    orbit.target.set(60.72221773193591, 1.8812817576809033, -20.080682092959325)
    orbit.object.position.set(69.98890930949295, 13.527619934326708, -20.30502957437188)
  }

  orbit.update();

  //添加控制器
  control = new TransformControls(camera, renderer.domElement);
  control.addEventListener("change", render);
  control.addEventListener("mouseDown", (ele, event) => {
    console.log(ele.target.object.position);
    // event.preventDefault();
  });
  control.addEventListener("mouseUp", ele => {
    var mesh = ele.target.object;
    if (mesh.target) {
      console.log(ele.target.object.position);
      mesh.target.position.x = ele.target.object.position.x;
      mesh.target.position.y = ele.target.object.position.y;
      mesh.target.position.z = ele.target.object.position.z;
    }
  });
  control.addEventListener("dragging-changed", function (event) {
    orbit.enabled = !event.value;
  });
  scene.add(control);

  // 创建巡检路线
  createCruiseLine();
  // createLightRoad(LightPathGuidance1);

  document.addEventListener("mousemove", onDocumentMouseMove, false);
  document.addEventListener("click", onDocumentMouseDown, false);
  window.addEventListener("resize", onWindowResize, false);

  initControls();
  route = new PRoute(scene, camera, raycaster, controls, context);

  //模型加载
  function loadModel() {
    window.three = {
      scene,
      orbit,
      renderer
    };

    var lineAllGorup = new THREE.Group();
    modelList['LXWZ_2-4F'].position.y = 2.3202
    const {
      SM_diwangge,
      LX_Luoganji,
      LX_KongYa_A2,
      LX_KongYa_A2a,
      LX_Lengganji,
      LX_Xiganji,
      LX_Zhidanji,
      LX_Chuqiguan,
      LX_fuyaji,
      LX_zhongyangkongtiaojiankongxitong,
      LX_csrsxt
    } = modelList;
    SM_diwangge.position.set(0, -7.6702, 0);

    LX_Luoganji.position.set(54.65314441040162, 0, -33.24496408261156) // 空压机
    lineAllGorup.add(LX_Luoganji);

    // 管道
    LX_KongYa_A2.position.set(54.65314441040162, 0, -33.24496408261156);
    // LX_KongYa_A2.rotateY(-Math.PI/2);
    lineAllGorup.add(LX_KongYa_A2); // 管道1

    LX_KongYa_A2a.position.set(54.65314441040162, 0, -16.24496408261156); // 管道2


    LX_Chuqiguan.position.set(54.65314441040162, 0, -34.29496408261156)
    lineAllGorup.add(LX_Chuqiguan); // 两个储气罐

    cloneModel(LX_Chuqiguan, {
      x: 0,
      y: 0,
      z: 1.04
    }, 2, lineAllGorup);



    LX_Lengganji.position.set(54.65314441040162, 0, -33.24496408261156);
    lineAllGorup.add(LX_Lengganji); // 冷干机

    LX_Xiganji.position.set(54.65314441040162, 0, -33.24496408261156);
    lineAllGorup.add(LX_Xiganji); // 吸干机

    cloneModel(lineAllGorup, {
      x: 0,
      y: 0,
      z: 3.3
    }, 6)


    var lineAllGorup2 = new THREE.Group();
    let LX_Chuqiguan_2 = LX_Chuqiguan.clone(); // 四个储气罐
    LX_Chuqiguan_2.position.set(63.61314441040162, 0, -32.49496408261156);
    lineAllGorup2.add(LX_Chuqiguan_2);
    cloneModel(LX_Chuqiguan_2, {
      x: 0,
      y: 0,
      z: 1.24
    }, 2, lineAllGorup2);
    cloneModel(LX_Chuqiguan_2, {
      x: 1.04,
      y: 0,
      z: 0
    }, 2, lineAllGorup2);
    cloneModel(LX_Chuqiguan_2, {
      x: 1.04,
      y: 0,
      z: 1.24
    }, 2, lineAllGorup2);

    LX_Zhidanji.position.set(54.65314441040162, 0, -27.24496408261156); // 制氮机
    lineAllGorup2.add(LX_Zhidanji);
    var lineAllGorupAll2 = new THREE.Group();
    cloneModel(lineAllGorup2, {
      x: 0,
      y: 0,
      z: 3.61
    }, 2, lineAllGorupAll2);

    lineAllGorup2.children.forEach(child => {
      if (child.name == 'LX_Chuqiguan') {
        for (let i = 0; i < child.children.length; i++) {
          child.children[i].material = LX_Chuqiguan.children[i].material.clone();
        }
      }
    })
    lineAllGorupAll2.children[0].children.forEach(child => {
      if (child.name == 'LX_Chuqiguan') {
        for (let i = 0; i < child.children.length; i++) {
          child.children[i].material = LX_Chuqiguan.children[i].material.clone();
        }
      }
    })
    var lineAllGorup2_2 = new THREE.Group();
    let LX_Chuqiguan_2_2 = LX_Chuqiguan.clone();


    LX_Chuqiguan_2_2.position.set(63.61314441040162, 0, -25.18496408261156); // 四个储气罐
    lineAllGorup2_2.add(LX_Chuqiguan_2_2); // 四个储气罐
    cloneModel(LX_Chuqiguan_2_2, {
      x: 0,
      y: 0,
      z: 1.24
    }, 2, lineAllGorup2_2);
    cloneModel(LX_Chuqiguan_2_2, {
      x: 1.04,
      y: 0,
      z: 0
    }, 2, lineAllGorup2_2);
    cloneModel(LX_Chuqiguan_2_2, {
      x: 1.04,
      y: 0,
      z: 1.24
    }, 2, lineAllGorup2_2);

    let LX_Zhidanji_2 = LX_Zhidanji.clone();
    LX_Zhidanji_2.position.set(54.65314441040162, 0, -19.92996408261156);
    lineAllGorup2_2.add(LX_Zhidanji_2);
    var lineAllGorup2_2_2 = new THREE.Group();
    cloneModel(lineAllGorup2_2, {
      x: 0,
      y: 0,
      z: 3.68
    }, 2, lineAllGorup2_2_2);
    lineAllGorup2_2.children.forEach(child => {
      if (child.name == 'LX_Chuqiguan') {
        for (let i = 0; i < child.children.length; i++) {
          child.children[i].material = LX_Chuqiguan.children[i].material.clone();
        }
      }
    })
    lineAllGorup2_2_2.children[0].children.forEach(child => {
      if (child.name == 'LX_Chuqiguan') {
        for (let i = 0; i < child.children.length; i++) {
          child.children[i].material = LX_Chuqiguan.children[i].material.clone();
        }
      }
    })


    var lineAllGorup3 = new THREE.Group();
    let LX_Chuqiguan_3 = LX_Chuqiguan.clone(); // 六个储气罐
    LX_Chuqiguan_3.position.set(69.65314441040162, 0, -34.08496408261156);
    lineAllGorup3.add(LX_Chuqiguan_3);
    cloneModel(LX_Chuqiguan_3, {
      x: 0,
      y: 0,
      z: 1.84
    }, 2, lineAllGorup3);
    cloneModel(LX_Chuqiguan_3, {
      x: 0,
      y: 0,
      z: 2.94
    }, 2, lineAllGorup3);
    cloneModel(LX_Chuqiguan_3, {
      x: 1.58,
      y: 0,
      z: 0
    }, 2, lineAllGorup3);
    cloneModel(LX_Chuqiguan_3, {
      x: 1.58,
      y: 0,
      z: 1.84
    }, 2, lineAllGorup3);
    cloneModel(LX_Chuqiguan_3, {
      x: 1.58,
      y: 0,
      z: 2.94
    }, 2, lineAllGorup3);


    let LX_Chuqiguan_3_2 = LX_Chuqiguan.clone(); // 六个储气罐
    LX_Chuqiguan_3_2.position.set(69.65314441040162, 0, -29.68496408261156);
    lineAllGorup3.add(LX_Chuqiguan_3_2);
    cloneModel(LX_Chuqiguan_3_2, {
      x: 0,
      y: 0,
      z: 1.11
    }, 2, lineAllGorup3);
    cloneModel(LX_Chuqiguan_3_2, {
      x: 0,
      y: 0,
      z: 2.26
    }, 2, lineAllGorup3);
    cloneModel(LX_Chuqiguan_3_2, {
      x: 1.58,
      y: 0,
      z: 0
    }, 2, lineAllGorup3);
    cloneModel(LX_Chuqiguan_3_2, {
      x: 1.58,
      y: 0,
      z: 1.11
    }, 2, lineAllGorup3);
    cloneModel(LX_Chuqiguan_3_2, {
      x: 1.58,
      y: 0,
      z: 2.26
    }, 2, lineAllGorup3);

    lineAllGorup3.children.forEach(child => {
      if (child.name == 'LX_Chuqiguan') {
        for (let i = 0; i < child.children.length; i++) {
          child.children[i].material = LX_Chuqiguan.children[i].material.clone();
        }
      }
    })


    var lineAllGorup4 = new THREE.Group(); // 六个储气罐
    let LX_Chuqiguan_4 = LX_Chuqiguan.clone();
    LX_Chuqiguan_4.position.set(69.55314441040162, 0, -25.36496408261156);
    lineAllGorup4.add(LX_Chuqiguan_4);
    cloneModel(LX_Chuqiguan_4, {
      x: 0,
      y: 0,
      z: 1.54
    }, 2, lineAllGorup4);
    cloneModel(LX_Chuqiguan_4, {
      x: 1.84,
      y: 0,
      z: 0
    }, 2, lineAllGorup4);
    cloneModel(LX_Chuqiguan_4, {
      x: 2.94,
      y: 0,
      z: 0
    }, 2, lineAllGorup4);
    cloneModel(LX_Chuqiguan_4, {
      x: 1.84,
      y: 0,
      z: 1.54
    }, 2, lineAllGorup4);
    cloneModel(LX_Chuqiguan_4, {
      x: 2.94,
      y: 0,
      z: 1.54
    }, 2, lineAllGorup4);

    var lineAllGorup4_2 = new THREE.Group();

    cloneModel(lineAllGorup4, {
      x: 0,
      y: 0,
      z: 3.7
    }, 2, lineAllGorup4_2)

    lineAllGorup4.children.forEach(child => {
      if (child.name == 'LX_Chuqiguan') {
        for (let i = 0; i < child.children.length; i++) {
          child.children[i].material = LX_Chuqiguan.children[i].material.clone();
        }
      }
    })
    lineAllGorup4_2.children[0].children.forEach(child => {
      if (child.name == 'LX_Chuqiguan') {
        for (let i = 0; i < child.children.length; i++) {
          child.children[i].material = LX_Chuqiguan.children[i].material.clone();
        }
      }
    })

    let allFuyaji = new THREE.Group();

    LX_fuyaji.position.set(59.45314441040162, 1.2, -11.58496408261156); // 真空变频
    allFuyaji.add(LX_fuyaji);
    cloneModel(LX_fuyaji, {
      x: 6.3,
      y: 0,
      z: 0
    }, 2, allFuyaji);

    LX_zhongyangkongtiaojiankongxitong.position.set(27.057031290621114, 1.2, 12.33476433760919); // 中央空调监控系统
    LX_zhongyangkongtiaojiankongxitong.rotateY(-Math.PI / 2);

    LX_csrsxt.position.set(31.057031290621114, 1.2, -28.33476433760919); // 纯水软水系统

    transparentList[0] = lineAllGorup;




    scene.add(lineAllGorup)
    scene.add(lineAllGorup2)
    scene.add(lineAllGorupAll2)
    scene.add(lineAllGorup2_2)
    scene.add(lineAllGorup2_2_2)
    scene.add(lineAllGorup3)
    scene.add(lineAllGorup4)
    scene.add(lineAllGorup4_2)
    scene.add(allFuyaji)

    let kyjGroup = new THREE.Group();
    let zdjGroup = new THREE.Group();
    kyjTags.forEach((tag, index) => {
      createSpriteTag1(tag, index, tagCanvas, scene, units).then((sprite) => {
        if (sprite) {
          kyjGroup.add(sprite)
          intersectsObjs.push(sprite);
          if(kyjGroup.children.length==6){
            transparentList[1]= kyjGroup;
          }
        }
      })
    });

    zdjTags.forEach((tag, index) => {
      createSpriteTag1(tag, index, tagCanvas, scene, units).then((sprite) => {
        if (sprite) {
          zdjGroup.add(sprite);
          intersectsObjs.push(sprite);
        }
      })
    });
    
    scene.add(kyjGroup);
    scene.add(zdjGroup);
    modelLoaded = true;
  };



  function cloneModel(obj, distance, num, group = false) { //params: 模型， 坐标xyz，自定义数据
    for (let i = 1; i < num; i++) {
      let cloneObj = obj.clone();
      cloneObj.position.set(obj.position.x + distance.x * i, obj.position.y + distance.y * i, obj.position.z + distance.z * i);
      intersectsObjs.push(cloneObj);
      if (group) {
        group.add(cloneObj)
      } else {
        scene.add(cloneObj)
      }
    }
  }

  var manager = new THREE.LoadingManager(loadModel);
  manager.addHandler(/\.dds$/i, new DDSLoader());

  glbArray.forEach((item, j) => {
    const ktx2Loader = new KTX2Loader().detectSupport(renderer);
    const loader = new GLTFLoader(manager);
    loader.setKTX2Loader(ktx2Loader);
    loader.setMeshoptDecoder(MeshoptDecoder);
    loader.load(
      `./model/${item}/${item}.glb`,
      function (gltf) {
        modelList[item] = gltf.scene;
        gltf.scene.name = item;
        scene.add(gltf.scene);
        intersectsObjs.push(gltf.scene);
      },
      onProgress,
      onError,
    );
  });

  function onProgress(xhr) {
    if (xhr.lengthComputable) {
      var percentComplete = (xhr.loaded / xhr.total) * 100;
      console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');
    }
  }

  function onError() {}

  // 测量位置
  function testPosition() {
    var geometry2 = new THREE.BoxGeometry(1, 1, 1);
    var material2 = new THREE.MeshLambertMaterial({
      color: 0xff00ff
    });
    var mesh2 = new THREE.Mesh(geometry2, material2);
    scene.add(mesh2);
    intersectsObjs.push(mesh2);
  }

  // testPosition();
}



export function animateA2KyjAndZdj() {
  window.loopId = requestAnimationFrame(animateA2KyjAndZdj);

  route.render();
  render();
  TWEEN.update();
  
  if (texture) {
    texture.offset.x -= 0.01;
  }

  let cruiseSpeed = 0.001;
  // 巡检空压机
  if (a2KyjCurve && a2KyjFlag) {
    if (progress <= 1) {
      const point = a2KyjCurve.getPointAt(progress);
      orbit.object.position.set(point.x, point.y, point.z);
      orbit.target.set(point.x + 4, point.y - 3.73, point.z);
      orbit.update();
      progress += cruiseSpeed;
    } else {
      a2KyjFlag = false;
      startCruiseA2Zdj();
      progress = 0;
    }
  }

  // 巡检制氮机
  if (a2ZdjCurve && a2ZdjFlag) {
    if (progress <= 1) {
      const point = a2ZdjCurve.getPointAt(progress);
      orbit.object.position.set(point.x, point.y, point.z);
      orbit.target.set(point.x - 2, point.y - 1, point.z);
      orbit.update();
      progress += cruiseSpeed;
    } else {
      a2ZdjFlag = false;
      progress = 0;
      window.ThreeDesign.selectRoom('空调房', true, 'kt');
    }
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onDocumentMouseDown(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(intersectsObjs, false);
  if (intersects.length > 0) {
    if (SELECTINTERSECTED != intersects[0].object) {
      // control.attach(intersects[0].object);
      SELECTINTERSECTED = intersects[0].object;
    }
  } else {
    // SELECTINTERSECTED=null;
    // control.detach ();
  }
  renderer.render(scene, camera);
}

// 创建巡检路径
function createCruiseLine() {
  a2KyjCurve = new THREE.CatmullRomCurve3(a2KyjCruisePoints);
  const geo = new THREE.BufferGeometry().setFromPoints(a2KyjCurve.getSpacedPoints(1000));
  const mat = new THREE.LineBasicMaterial({
    color: 'red'
  });
  const line = new THREE.Line(geo, mat);
  // scene.add(line);

  a2ZdjCurve = new THREE.CatmullRomCurve3(a2ZdjCruisePoints);
  const geo1 = new THREE.BufferGeometry().setFromPoints(a2ZdjCurve.getSpacedPoints(1000));
  const line1 = new THREE.Line(geo1, mat);
  // scene.add(line1);
}

// 开始巡检A2空压机
export function startCruiseA2Kyj() {
  let af = requestAnimationFrame(startCruiseA2Kyj);
  if (modelLoaded) {
    cancelAnimationFrame(af);
    a2KyjFlag = true;
  }
}

// 开始巡检A2制氮机
export function startCruiseA2Zdj() {
  a2ZdjFlag = true;
  transparentList[0].traverse(child => {
    if (child.isMesh) {
      child.material.transparent = true;
      child.material.opacity = 0.2;
      child.material.needsUpdate = true;
    }
  })

  transparentList[1].traverse(child => {
    if (child.type == 'Sprite') {
      child.material.transparent = true;
      child.material.opacity = 0.2;
      child.material.needsUpdate = true;
    }
  })

}

// 开启键盘漫游
export function startKeyBoard() {
  a2Keyboard = true;
}

// 开启路径绘制
export function startRoam() {
  route.drawPath();
}

function initControls() {
  controls = new PointerLockControls(camera, renderer.domElement);
  scene.add(controls.getObject());
}

export function startGroupRoute(data) {
  route.startGroupRoute(data)
}

export function saveRout(form) {
  route.saveRout(form)
}

// 开启漫游
export function start(data) {
  route.singleStart(data)
}

// 暂停漫游
export function pause() {
  route.end(1);
}

// 继续漫游
export function keep() {
  route.end(2);
}

// 停止漫游
export function end() {
  route.end(3);
  camera.position.set(90, 20, -20);
  camera.lookAt(53.96756421594237, 1.5, -14.817409093336444);
}

// 清理路径
export function clearRoam() {
  route.dispose();
}

/**
 * 加载uv偏移材质
 * @param {*} model ：模型
 * @param {*} picPath ：贴图路径
 */
function loadTexture(model, picPath, side, repeat) {
  const texture = new THREE.TextureLoader().load(
    require('@/assets/images/route/light.png'),
  );
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  texture.repeat.set(repeat, 2);
  // 通过纹理生成材质
  let material = null;
  if (!side) {
    material = new THREE.MeshBasicMaterial({
      map: texture,
    });
  } else {
    material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      transparent: true,
    });
  }
  model.traverse(function (child) {
    if (child.isMesh) {
      child.material = material;
    }
  });
}

/**
 * uv偏移
 * @param {*} modelMesh ：材质信息
 * @param {*} state ：运动方向 true为正向/false为负向
 */
function updateUvTransform(modelMesh, state) {
  moveState = true;
  let texture = modelMesh.material.map;
  // texture.repeat.set(2, 2);
  let offset = 0;
  window.offset = offset;
  offsetArr.push({
    state: state,
    value: offset,
    texture: texture,
  });
  render(); // 渲染
}

/**
 * 创建光路引导
 * @param {*} pointsArray : 光路点合集
 */
function createLightRoad(pointsArray) {
  // // 光路引导
  // const closedSpline = new THREE.CatmullRomCurve3(pointsArray);
  // closedSpline.type = 'catmullrom';
  // closedSpline.closed = false;
  // closedSpline.tension = 0.5;
  // let distance = 0;
  // for (let index = 0; index < pointsArray.length - 1; index++) {
  //   distance = distance + pointsArray[index].distanceTo(pointsArray[index + 1]);
  // }
  // let repeat = Math.ceil(distance / 300);

  // scene.remove(
  //   scene.children[
  //     scene.children.findIndex((item) => item.name === 'lightRoad')
  //   ],
  // );
  // const geometry = new THREE.TubeGeometry(closedSpline, 1000, 0.5, 2, false);
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // const mesh = new THREE.Mesh(geometry, material);
  // mesh.scale.y = 0;
  // mesh.name = 'lightRoad';
  // mesh.position.y = -10;
  // scene.add(mesh);
  // loadTexture(mesh, '@/assets/images/route/light.png', true, 10);
  // setTimeout(() => {
  //   updateUvTransform(mesh, true);
  //   moveState = true;
  // }, 1000);
  const closedSpline = new THREE.CatmullRomCurve3(pointsArray, false, 'catmullrom', 0.5 );
  const tubeGeometry = new THREE.TubeGeometry(closedSpline, 1000, 0.3, 3, false);
  texture = new THREE.TextureLoader().load(require('@/assets/images/route/light.png'));
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  texture.repeat.set(10, 2);
  // texture.needsUpdate = true;
  // texture.rotation = Math.PI/4;
  // // 控制纹理重复参数
  // texture.repeat.x = 10;
  // texture.repeat.y = 1;
  // 将纹理应用于材质
  const tubeMaterial = new THREE.MeshStandardMaterial({
    // color: 0x156289,
    // color: 0x00ff00,
    emissive: 0x156289,
    transparent: true,
    map: texture,
    side: THREE.DoubleSide,
  });
  const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
  tube.scale.y = 0.1;
  tube.name = 'lightRoad';
  tube.position.y = 1.5;
  scene.add(tube)
}

function render() {
  renderer.render(scene, camera);
}