import * as THREE from 'three';
import { Loading } from 'element-ui';
import TWEEN from '@tweenjs/tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import PRoute from '@/utils/three/route';

let container = null,
    renderer = null,
    camera = null,
    scene = null,
    orbit = null,
    manager = null,
    raycaster = null,
    route = null,
    loadingInstance = null;

const objArray = ['liku', 'weilan', 'MCADID', 'S', 'SA', 'SB', 'SC', 'SQ', 'gtxsx', 'zhixiang', 'ruku', 'tsj', 'chuku', 'duiduoji_diangui', 'duiduoji_lizhu', 'duiduoji_guidao', 'duiduoji_huocha', 'duiduoji_zaiwutai'];
const modelList = [];
let modelArray = [];

// 初始化渲染器
function initRender() {
  // loadingInstance = Loading.service({ fullscreen: true });
  container = document.getElementById('threeView');
  container.innerHTML = '';
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  renderer.domElement.style.outline = 'none';
}

// 初始化相机
function initCamera() {
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 12500);
  camera.position.set(-672, 370, 266);
  // camera.lookAt(0, 0, 0);
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
  // orbit.object.position.set(...target[0]); 
  // orbit.target.set(...target[1]);
  // orbit.addEventListener('change', render); 
  // orbit.target.copy(new THREE.Vector3(9, -5, 23));
  orbit.update();
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
      gltf.scene.position.set(0, -10, 0);
      scene.add(gltf.scene);
  })
}

// 加载模型
function initOBJ(model) {
  const loader = new GLTFLoader(manager);
  loader.setMeshoptDecoder(MeshoptDecoder);
  loader.load(`./model/SND_kufang/SND_${model}.glb`, gltf => {
    const obj = gltf.scene;
    modelList[model] = obj;
    obj.name = model;
    model !== 'zhixiang' && scene.add(obj);
  });
}

// 计算箱子x位置
function getX(d) {
  const a = d < 5 ? -245.5 : -244.9;
  const b = d < 5 ? 11.5 : 10.85;
  if (d < 1) {
      return -256.5;
  } else if(d % 2 === 1){
     const i = Math.floor(d/2);
     return a + 9.9 * i + b * i;
  } else {
      const j = d / 2;
      return a + 9.9 * j + b * (j - 1);
  }
}

// 计算箱子z位置
function getZ(d) {
  const i = Math.floor(d/2);
  const j = Math.ceil(d/4);
  const k = Math.ceil((d-2)/4);
  if (d < 1) {
    return 133;
  } else {
    return 133 - (i * 14 + (j - 1) * 17 + k * 28);
  }
}

// 放置箱子
function setBoxPosition(params) {
  const { zhixiang } = modelList;
  const zx = zhixiang.clone();
  zx.name = params.id;
  zx.info = params;
  zx.scale.set(0.01, 0.01, 0.01);

  const positionArray = params.positionNo.split('-');
  const x = getX(Number(positionArray[1]) - 1);
  const y = 8.2 + 16.5 *(Number(positionArray[2]) - 1);
  const z = getZ(Number(positionArray[0]))

  zx.position.set(x, y, z);
  scene.add(zx);
  modelArray.push(zx);
}

// 加载并调整模型
function initObject(data) {
  manager = new THREE.LoadingManager();
  manager.onLoad = function () {
    window.three = { scene, orbit, renderer };
    const { liku, weilan, MCADID, S, SA, SB, SC, SQ, gtxsx, zhixiang, ruku, tsj, chuku, duiduoji_diangui, duiduoji_guidao, duiduoji_lizhu, duiduoji_huocha, duiduoji_zaiwutai } = modelList;

    gtxsx.scale.set(0.01, 0.01, 0.01);
    gtxsx.position.set(456, 0, 238);

    SA.position.set(-4, -0.5, 0);

    // 入库 提升机
    ruku.position.set(-32, 0, 0);
    tsj.position.set(-3.5, 0, 0);

    // 出库提升机
    const tsj1 = tsj.clone();
    chuku.position.set(24, 0, 0);
    tsj1.position.set(25, 0, 0);
    scene.add(tsj1);

    SB.position.set(-3, 0, 0);

    // 堆垛机轨道1
    duiduoji_guidao.scale.set(0.01, 0.01, 0.01);
    duiduoji_guidao.position.set(-240, 0, 105);

    //堆垛机货叉
    const hc = new THREE.Group();
    hc.add(duiduoji_huocha);
    hc.name = 'hc';
    modelList['hc'] = hc;

    // 堆垛机托盘
    const tp = new THREE.Group();
    tp.add( duiduoji_zaiwutai );
    tp.add( hc );
    tp.name = 'tp';
    modelList['tp'] = tp;

    // 堆垛机主体
    const ddj = new THREE.Group();
    ddj.add( duiduoji_lizhu );
    ddj.add( duiduoji_diangui );
    ddj.add( tp );
    ddj.name = 'ddj1';
    modelList['ddj1'] = ddj;
    ddj.scale.set(0.01, 0.01, 0.01);
    ddj.position.set(-233, 0, 105);
    scene.add(ddj);

    // 堆垛机2
    let ddj2 = ddj.clone();
    ddj2.position.set(-233, 0, 32);
    scene.add(ddj2);

    // 堆垛机轨道2
    let dg2 = duiduoji_guidao.clone();
    dg2.position.set(-240, 0, 32);
    scene.add(dg2);

    let ddj3 = ddj.clone();
    ddj3.position.set(-233, 0, -40.5);
    scene.add(ddj3);

    let dg3 = duiduoji_guidao.clone();
    dg3.position.set(-240, 0, -40.5);
    scene.add(dg3);

    let ddj4 = ddj.clone();
    ddj4.position.set(-233, 0, -113);
    scene.add(ddj4);

    let dg4 = duiduoji_guidao.clone();
    dg4.position.set(-240, 0, -113);
    scene.add(dg4);

    

    // data.forEach(t => {
    //   setBoxPosition(t);
    // })

    // zhixiang.scale.set(0.01, 0.01, 0.01);
    // zhixiang.position.set(-256.5, 8.2, 133);
    // scene.add(zhixiang);

    // duiduoji.scale.set(0.001, 0.001, 0.001);  133  119   91  77   60
    // duiduoji.position.set(-25, 0, 17);            14   28   14  17

    console.log('加载完毕');
    // loadingInstance.close();

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

// 渲染
function render() {
  route.render();
  // console.log(camera);
  renderer.render(scene, camera);
  window.loopId = requestAnimationFrame(render);
  TWEEN.update();
}

export default function initSndHouse(data) {
  initRender(); 
  initCamera();
  initScene();
  initLight();
  initControl();
  initAxes();
  initObject(data);
  render();
}
