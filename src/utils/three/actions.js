import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import PRoute from '@/utils/three/route';
import { createSpriteTag1 } from '@/utils/three/createSpriteTag';
import PIPopup from '@/utils/api/popup';
import PIAnimation from '@/utils/api/animation';

let container = null,
    renderer = null,
    camera = null,
    scene = null,
    orbit = null,
    manager = null,
    raycaster = null,
    route = null,
    popup = null;
    // , 'liku', 'lkbh'
const objArray = ['diangui', 'guidao', 'huocha', 'lizhu', 'zaiwutai', 'gtxsx', 'zhixiang'];
const modelList = {};
const modelArray = [];
let mixer = null;
let mixer1 = null;
let mixer2 = null;
let mixer3 = null;
let clock = null;
let hcAnimation = null;
let animationGroup = null;
let selectedObject = null;
let selectedMaterial = null;
let hightLightMaterial = null;
let mouse = new THREE.Vector2();
let boxData = {
  name: '储物箱',
  attrName: '储物箱K1',
  data: {
    数量: 0,
    重量: 0,
    温度: 0,
  },
  position: [0, 0, 0],
  status: 0,
  type: 'boxTag',
  params: {
    bgWidth: 400,
    contentHeight: 180,
    valueLeft: 310,
    scale: 3,
  },
}

let tagCanvas = [{
  spriteName: 'boxTag1',
  thingName: '1#储物箱K1',
  canvas: null,
}]

const units = {
  boxTag: {
    数量: '个',
    重量: 'kg',
    温度: '℃',
  },
};

const data1 = {
  id: 'boxTag1',
  title: '储物柜',
  content: [{
    '数量(个)': '0',
    '重量(kg)': '0',
    '温度(℃)': '0',
  }],
  bgImg: '',
  position: [0, 0, 0],
}

// 初始化渲染器
function initRender() {
  container = document.getElementById('threeView');
  container.innerHTML = '';
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  renderer.domElement.style.outline = 'none';
  clock = new THREE.Clock();
}

// 初始化相机
function initCamera() {
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 12500)
  camera.position.set(10,50,10)
}

// 初始化场景
function initScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.TextureLoader().load(require('../../assets/images/sceneBg.png'))
}

// 初始化灯光
function initLight() {
  scene.add(new THREE.AmbientLight(0x666666));
  scene.add(new THREE.HemisphereLight(0xffffff, 0x000000, 0.8));
}

// 初始化控制器
function initControl() {
  orbit = new OrbitControls(camera, renderer.domElement);
  raycaster = new THREE.Raycaster();
  route = new PRoute(scene, camera, raycaster);
  popup = new PIPopup(scene);
  // orbit.object.position.set(...target[0])
  // orbit.target.set(...target[1])
  // orbit.addEventListener('change', render);
  orbit.update();
  // popup.init(data1);
  // route.drawPath();
}

// 坐标辅助  
function initAxes() {
  let axes = new THREE.AxesHelper(20);
  scene.add(axes);
}

// 加载地网和建筑
function initGLTF() {
  const ktx2Loader = new KTX2Loader().detectSupport(renderer);
  const loader = new GLTFLoader();
  loader.setKTX2Loader(ktx2Loader);
  loader.setMeshoptDecoder(MeshoptDecoder);
  // loader.load('./model/LXWZ_F/LXWZ_F.glb', (gltf) => {
  //     scene.add(gltf.scene);
  // })
  loader.load('./model/SM_diwangge/SM_diwangge.glb', (gltf) => {
      gltf.scene.position.set(0, -10, 0)
      scene.add(gltf.scene);
  })
}

// 加载模型
function initOBJ(model) {
  const loader = new GLTFLoader(manager);
  loader.setMeshoptDecoder(MeshoptDecoder);
  loader.load(`./model/SND_duiduoji/SND_duiduoji_${model}2.glb`, gltf => {
    const obj = gltf.scene;
    obj.name = model;
    modelList[model] = obj;
    modelArray.push(obj);
    // scene.add(obj);
  });
}

// 加载并调整模型
function initObject() {
  manager = new THREE.LoadingManager();
  manager.onLoad = function () {
    window.three = { scene, orbit, renderer };
    // const { diangui, guidao, huocha, lizhu, zaiwutai, gtxsx, zhixiang, liku, lkbh } = modelList;
    const { diangui, guidao, huocha, lizhu, zaiwutai, gtxsx, zhixiang } = modelList;
    diangui.scale.set(0.001, 0.001, 0.001);
    guidao.scale.set(0.001, 0.001, 0.001);
    huocha.scale.set(0.001, 0.001, 0.001);
    lizhu.scale.set(0.001, 0.001, 0.001);
    zaiwutai.scale.set(0.001, 0.001, 0.001);
    gtxsx.scale.set(0.001, 0.001, 0.001);
    zhixiang.scale.set(0.001, 0.001, 0.001);
    // liku.scale.set(0.001, 0.001, 0.001);
    // lkbh.scale.set(0.001, 0.001, 0.001);

    //堆垛机货叉
    const hc = new THREE.Group();
    hc.add(huocha);

    // 堆垛机托盘
    const tp = new THREE.Group();
    tp.add( zaiwutai );
    tp.add( hc );

    // 堆垛机主体
    const ddj = new THREE.Group();
    ddj.add( lizhu );
    ddj.add( diangui );
    ddj.add( tp );
 
    hc.name = 'hc';
    modelList['hc'] = hc;
    tp.name = 'tp';
    modelList['tp'] = tp;
    ddj.name = 'ddj';
    modelList['ddj'] = ddj;

    scene.add(guidao);
    scene.add(ddj);
    scene.add(gtxsx);
    scene.add(zhixiang);
    // scene.add(liku);
    // scene.add(lkbh);
    gtxsx.position.set(69, 0, 13.3);
    zhixiang.position.set(-2.4, 0.85, 1.5);
    tp.position.set(0, -0.15, 0);
    // liku.position.set(70, 0, 13.5);
    // lkbh.position.set(70, 0, 13.5);
    // tp.position.set(0, 5, 0);
    // trackMove();
    // Up();
    flex();

    console.log('加载完毕');
    window.onresize = function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
  initGLTF();
  objArray.forEach(obj => {
    initOBJ(obj);
  })
}

function getClip(pos = [0, 0, 0], duration = 100, id = 'id') {
  const [x, y, z] = pos;
  const times = [0, duration];  // 关键帧时间数组，离散的时间点序列
  const values = [0, 0, 0, x, y, z]; // 与时间点对应的值组成的数组
  const posTrack = new THREE.VectorKeyframeTrack(id, times, values);
  return new THREE.AnimationClip(id, duration, [posTrack]);
};

// 水平移动
function trackMove(x) {
  const { ddj } = modelList;
  // mixer = new THREE.AnimationMixer(ddj);
  // const action = mixer.clipAction(getClip(position, duration, id));
  // action.timeScale = 1; // 动画播放一个周期的时间
  // // action.loop = THREE.LoopPingPong; // 动画循环类型
  // action.loop = THREE.LoopOnce; // 动作单次播放
  // action.play(); // 播放
  const ddjAnimation = new PIAnimation(ddj);
  mixer = ddjAnimation.setAnimationMixer('ddjPosClip', 'ddj.position', [0, 0, 0], [x, 0, 0], 100);
  ddjAnimation.play();
}

// 升降移动
function Up(y) {
  const { tp } = modelList;
  // mixer1 = new THREE.AnimationMixer(tp);
  // const action = mixer1.clipAction(getClip(position, duration, id));
  // action.timeScale = 1; // 动画播放一个周期的时间
  // // action.loop = THREE.LoopPingPong; // 动画循环类型
  // action.loop = THREE.LoopOnce; // 单次播放
  // action.play(); // 播放
  const tpAnimation = new PIAnimation(tp);
  mixer1 = tpAnimation.setAnimationMixer('tpPosClip', 'tp.position', [0, 0, 0], [0, y, 0], 30);
  tpAnimation.play();
}

// 货叉伸出
function flex() {
  const { hc } = modelList;
  // mixer2 = new THREE.AnimationMixer(hc);
  // const action = mixer2.clipAction(getClip(position, duration, id));
  // action.timeScale = 1; // 动画播放一个周期的时间
  // // action.loop = THREE.LoopPingPong; // 动画循环类型
  // action.loop = THREE.LoopOnce;
  // action.play(); // 播放
  // animationGroup = new THREE.AnimationObjectGroup();
  // animationGroup.add(hc);
  hcAnimation = new PIAnimation(hc);
  mixer2 = hcAnimation.setAnimationMixer('hcPosClip', 'hc.position', [0, 0, 0], [0, 0, 1], 15);
  hcAnimation.play();
}

function hcBack() {
  mixer3 = hcAnimation.setAnimationMixer('hcBackClip', 'hc.position', [0, 0, 1], [0, 0, 0], 15);
  hcAnimation.play();
}

// 动画
async function action() {
  const { hc, zhixiang } = modelList;
  const delta = clock.getDelta();
  mixer && mixer.update(delta);
  mixer1 && mixer1.update(delta);
  mixer2 && mixer2.update(delta);
  mixer3 && mixer3.update(delta);

  mixer2 && mixer2.addEventListener('finished', function(e) {
    hc &&　zhixiang && hc.add(zhixiang);
    zhixiang.position.set(-2.4, 0.9, 0);
    hcBack();
  });

  mixer3 && mixer3.addEventListener('finished', function(e) {
    trackMove(50);
  })

  mixer && mixer.addEventListener('finished', function(e) {
    Up(10);
  })

  // setTimeout(() => { 
  //   mixer3 && mixer3.update(delta);
  // }, 15 * 1000);

  // setTimeout(() => {
  //   mixer && mixer.update(delta);
  //   mixer1 && mixer1.update(delta);
  // }, 15 * 2 * 1000);


  // if (hcAnimation) {
  //   await hcAnimation.finished();
  //   hc &&　zhixiang && hc.add(zhixiang);
  //   hcBack();
  //   mixer3 && mixer3.update(delta);
  // }
}

// 点击事件，检测是否点击中物体 
function onDocumentMouseDown(event) {
    //event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(modelArray, true);
    setObjectMaterial(intersects);
}

// 设置选中物体颜色
function setObjectMaterial(intersects) {
  if (intersects.length > 0) {
    let obj = intersects[0].object;
    if (selectedObject != obj) {
      resetMaterial();
      selectedObject = obj;
      selectedMaterial = obj.material;
      selectedObject.material = hightLightMaterial;
    }
  } else {
    resetMaterial();
  }
}

// 重置材质
function resetMaterial() {
  if(selectedMaterial) {
    selectedObject.material = selectedMaterial;
    selectedObject = null;
    selectedMaterial = null;
  }
}

// 事件
function selectEvent() {
  document.addEventListener('mousedown', onDocumentMouseDown, false);
  // document.addEventListener('mousemove', onDocumentMouseMove, false);
  hightLightMaterial = new THREE.MeshBasicMaterial({ color: 'green' });
  // raycaster.setFromCamera(mouse, camera);
  // let intersects = raycaster.intersectObjects(modelArray, true);
  // setObjectMaterial(intersects);
}

// 展示信息详情  
function showInfo() {
  // const { zhixiang } = modelList;
  // const zhixiang = scene.getObjectByName('ddj');
  if (selectedObject) {
    scene.updateMatrixWorld(true);
    let worldPosition = new THREE.Vector3();
    selectedObject.getWorldPosition(worldPosition);
    data1.position = [worldPosition.x, worldPosition.y + 1.5, worldPosition.z];
    popup.init(data1);
    // popup.update(data1);
    // createSpriteTag1(boxData, 1, tagCanvas, scene, units).then((sprite) => {
    //   if (sprite) {
    //     // scene.add(sprite)
    //     console.log(sprite);
    //   }
    // })
  } else {
    popup.dispose();
  }
}

// 渲染
function render() {
  route.render();
  renderer.render(scene, camera);
  window.loopId = requestAnimationFrame(render);
  // 更新动画
  // const delta = clock.getDelta();
  // mixer && mixer.update(delta);
  // mixer1 && mixer1.update(delta);
  // mixer2 && mixer2.update(delta);
  action();
  selectEvent();
  showInfo();
  TWEEN.update();
}

export default function initAction() {
  initRender(); 
  initCamera();
  initScene();
  initLight();
  initControl();
  initAxes();
  initObject();
  render();
}
