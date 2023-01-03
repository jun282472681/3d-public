import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import store from "@/store";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import PRoute from '@/utils/three/route';
import PIPopup from '@/utils/api/popup';
import { dispose } from 'echarts';

let container = null,
    renderer = null,
    camera = null,
    scene = null,
    orbit = null,
    manager = null,
    raycaster = null,
    route = null,
    popup = null;

let objArray = ['liku_jia', 'lkbh1', 'zhixiang'];
const modelList = [];
let selectedObject = null;
let selectedMaterial = null;
let hightLightMaterial = null;
let mouse = new THREE.Vector2();
let modelArray = [];
let data1 = {
    id: 'boxTag1',
    title: '储物柜',
    content: [],
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
}

// 初始化相机
function initCamera() {
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 12500)
  camera.position.set(0,100,500)
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
  popup = new PIPopup(scene, 100);
  orbit.target.copy(new THREE.Vector3(20, 61, -16));
  orbit.update();
//   route.drawPath();
}

// 坐标辅助  
function initAxes() {
  let axes = new THREE.AxesHelper(20);
  scene.add(axes);
}

// 点击事件，检测是否点击中物体 
function onDocumentMouseDown(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    // console.log(modelArray);
    let intersects = raycaster.intersectObjects(modelArray, true);
    console.log(orbit);
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
    hightLightMaterial = new THREE.MeshBasicMaterial({ color: 'green' });
}

// 展示信息详情  
function showInfo() {
    // popup.dispose();
    document.getElementById('boxInfoPanel').style.transform = `translateX(0px) translateY(0px)`;
    if (selectedObject) {
      console.log(selectedObject);
      scene.updateMatrixWorld(true);
      let worldPosition = new THREE.Vector3();
      selectedObject.getWorldPosition(worldPosition);
    //   data1.position = [worldPosition.x, 155, worldPosition.z + 30];

      const info = selectedObject.parent.info;
      const positionArray = info.positionNo.split('-');
    //   data1.title = `货架${positionArray[0]}-层${positionArray[1]}-格${positionArray[1]}`;
    //   data1.content = [{
    //     '物料编码': info.materialNo,
    //     '物料名称': info.materialName,
    //     '库存数量': info.stackAmount,
    //     '托盘号'  : info.trayNo,
    //     // '质检状态': info.qualityInspectionSt === 1 ? '正常' : '不正常',
    //   }]
    //   popup.init(data1);
        const boxInfo = {
            title: `货架${Number(positionArray[0])}-层${positionArray[2]}-格${positionArray[1]}`,
            materialNo: info.materialNo,
            materialName: info.materialName,
            stackAmount: info.stackAmount,
            trayNo: info.trayNo,
            sourceBillNo: info.sourceBillNo,
            unit: info.unit,
            qualityInspectionSt: info.qualityInspectionSt === 1 ? '正常' : '不正常',
        };
        store.commit('app/setBoxInfo', boxInfo);
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const screenPosition = worldPosition.clone();
        const standardVec = screenPosition.project(camera);

        const screenX = Math.round(centerX * standardVec.x + centerX);
        const screenY = Math.round(-centerY * standardVec.y + centerY);
        // console.log(screenX, screenY);
        document.getElementById('boxInfoPanel').style.transform = `translateX(${screenX}px) translateY(${screenY}px)`;
    }
  }

// 加载地网和建筑
function initGLTF() {
  const ktx2Loader = new KTX2Loader().detectSupport(renderer);
  const loader = new GLTFLoader();
  loader.setKTX2Loader(ktx2Loader);
  loader.setMeshoptDecoder(MeshoptDecoder);
  loader.load('./model/SM_diwangge/SM_diwangge.glb', (gltf) => {
      gltf.scene.position.set(0, -10, 0)
      scene.add(gltf.scene);
  })
}

// 加载模型
function initOBJ(model, i) {
  const loader = new GLTFLoader(manager);
  loader.setMeshoptDecoder(MeshoptDecoder);
  loader.load(`./model/SND_huojia/SND_${model}.glb`, gltf => {
    const obj = gltf.scene;
    const name = i === 1 ? 'lkbh' : model;
    modelList[name] = obj;
    obj.name = name;
    // scene.add(obj);
    // modelArray.push(obj);
  });
}

function getX(d) {
    const a = d < 5 ? -279.5 : -278.9;
    const b = d < 5 ? 11.5 : 10.85;
    if (d < 1) {
        return -290.5;
    } else if(d % 2 === 1){
       const i = Math.floor(d/2);
       return a + 9.9 * i + b * i;
    } else {
        const j = d / 2;
        return a + 9.9 * j + b * (j - 1);
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
    const y = 6.5 + 16.5 *(Number(positionArray[2]) - 1);

    zx.position.set(x, y, 0);
    scene.add(zx);
    modelArray.push(zx);
}

// 加载并调整模型  
function initObject(data, id) {
  console.log(data);
  modelArray = [];
  manager = new THREE.LoadingManager();
  manager.onLoad = function () {
    window.three = { scene, orbit, renderer };
    const { liku_jia1, lkbh, zhixiang } = modelList;
    liku_jia1.position.set(0, 70, 0);
    lkbh.position.set(-296.5, 70, 0);
    scene.add(liku_jia1);
    scene.add(lkbh);

    data.forEach(t => {
        setBoxPosition(t);
    })
    // zhixiang.scale.set(0.01, 0.01, 0.01);
    // zhixiang.position.set(-290.5, 6.5, 0);
    // scene.add(zhixiang);
    // // 竖16.5    6.5 23 ...          122
    // // 横20.85 -290.5  -279.5 -269.5  -263.5 -253.5     -243  -233    -222.3  -212.3.....    282 014
    // //                        10   11.5            10.5    10    10.7       10
    // const zx2 = zhixiang.clone();
    // zx2.scale.set(0.01, 0.01, 0.01);
    // zx2.position.set(-279.5, 6.5, 0);
    // scene.add(zx2);
    // modelArray.push(zx2);

    // const zx1 = zhixiang.clone();
    // zx1.scale.set(0.01, 0.01, 0.01);
    // zx1.position.set(-269.5, 6.5, 0);
    // scene.add(zx1);
    // modelArray.push(zx1);

    // const zx3 = zhixiang.clone();
    // zx3.scale.set(0.01, 0.01, 0.01);
    // zx3.position.set(-212.3, 6.5, 0);
    // scene.add(zx3);
    // modelArray.push(zx3);

    // const zx5 = zhixiang.clone();
    // zx5.scale.set(0.01, 0.01, 0.01);
    // zx5.position.set(-201.6, 6.5, 0);
    // scene.add(zx5);
    // modelArray.push(zx5);

    // const zx6 = zhixiang.clone();
    // zx6.scale.set(0.01, 0.01, 0.01);
    // zx6.position.set(-191.6, 6.5, 0);
    // scene.add(zx6);
    // modelArray.push(zx6);

    console.log('加载完毕');
    selectEvent();

    window.onresize = function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
  initGLTF();
  ['liku_jia1', `lkbh${Number(id)}`, 'zhixiang'].forEach((obj, i) => {
    initOBJ(obj, i);
  })
}

// 渲染
function render() {
  route.render();
  renderer.render(scene, camera);
  window.loopId = requestAnimationFrame(render);
  showInfo();
  TWEEN.update();
}

// function dispose() {
//     raycaster = null;
//     DOM.removeEventListener("mousedown", onDocumentMouseDown);
// }

export default function initStorageRack(data, id) {
  initRender(); 
  initCamera();
  initScene();
  initLight();
  initControl();
  initAxes();
  initObject(data, id);
  render();
}
