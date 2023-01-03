import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { createSky } from '../index';
import TWEEN from '@tweenjs/tween.js';

let container, camera, scene, raycaster, renderer, orbit, control;
let mouse = new THREE.Vector2();
let intersectsObjs = [], modelMap = {}, keyboard = {};

// 楼栋名称标签
const nameTags = [
  {name: '货仓', position: [0, 25, 18]},
];

// 巡检状态
let factoryFlag = false,
    a2PdfToKyjFlag = false;

// 巡检进度
let progress = 0;
// 整体园区巡检点
const factoryCruisePoints = [
  new THREE.Vector3(83.02352574284431, 25.698188971979675, -131.2730747595007),
  new THREE.Vector3(230.3710706272119, 31.436759567960312, -103.69809467757473),
  new THREE.Vector3(234.5774099389375, 48.15599763279526, 56.65439236223489),
  new THREE.Vector3(-219.89437078242386, 39.527932940214605, 127.436863582549),
  new THREE.Vector3(-236.50924719058295, 45.848269499828575, -107.18792144479892),
  new THREE.Vector3(83.02352574284431, 25.698188971979675, -131.2730747595007),
  new THREE.Vector3(83.02352574284431, -0.45357703505179003, -88),
  new THREE.Vector3(83.02352574284431, -0.45357703505179003, -68),
  new THREE.Vector3(83.02352574284431, -0.45357703505179003, -48),
  new THREE.Vector3(83.02352574284431, -0.45357703505179003, -28),
  new THREE.Vector3(83.02352574284431, -0.45357703505179003, -8),
  new THREE.Vector3(83.02352574284431, -0.45357703505179003, 12),
  new THREE.Vector3(83.02352574284431, -0.45357703505179003, 24),
  new THREE.Vector3(98, -0.45357703505179003, 26),
];
// 园区到A1冰机房巡检点
const to1FBjfCruisePoints = [
  new THREE.Vector3(85.86299173951487, 25.698188971979675, -131.2730747595007),
  new THREE.Vector3(85.86299173951487, 1, -74),
  new THREE.Vector3(85.86299173951487, 1, -49),
  new THREE.Vector3(85.86299173951487, 1, -24),
  new THREE.Vector3(85.86299173951487, 1, 1),
  new THREE.Vector3(88, 0.8, 26.2803626317473),
  new THREE.Vector3(100.81409457934791, 1, 26.2803626317473),
];
// A2配电房到空压房巡检点
const a2PdfToKyjCruisePoints = [
  new THREE.Vector3(190, 2, -56.09935728399172),
  new THREE.Vector3(194.84723326161244, 50, -7.11411971930738),
  new THREE.Vector3(120, 18.49020499345147, -36.62250019756084),
  new THREE.Vector3(144.01968427169146, 18.49020499345147, -36.62250019756084),
];
let factoryCurve = null, // 整体园区巡检曲线
  to1FBjfCurve = null, // 到A1冰机房巡检路线
  a2PdfToKyjCurve = null; // A2配电房到空压机路线

export function initFactory() {
  container = document.getElementById('threeView');
  container.innerHTML = '';
  
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
  
  scene = new THREE.Scene();

  // const axes = new THREE.AxesHelper(40);
  // scene.add(axes);
  // const box = new THREE.Mesh(
  //   new THREE.BoxBufferGeometry(2, 2, 2),
  //   new THREE.MeshBasicMaterial({color: 'red'})
  // );
  // box.position.set(83.02352574284431, -0.45357703505179003, 20);
  // scene.add(box);
  // intersectsObjs.push(box);


  const ambientLight = new THREE.AmbientLight(0x666666);
  scene.add(ambientLight);
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.6);
  scene.add(hemiLight);

  raycaster = new THREE.Raycaster();
  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  orbit = new OrbitControls(camera, renderer.domElement);
  orbit.addEventListener('change', render);
  orbit.object.position.set(-137.8347503871091, 86.24344894766767, -239.26751477127303);
  orbit.target.set(0, 0, 0);
  orbit.minDistance = 0.01;
  orbit.maxDistance = 1000;
  // orbit.maxPolarAngle = Math.PI / 2;
  orbit.minPolarAngle = 0; // radians
  orbit.maxPolarAngle = (Math.PI / 180) * 90; // radians
  orbit.minAzimuthAngle = -Infinity; // radians
  orbit.maxAzimuthAngle = Infinity; // radians
  orbit.update();

  control = new TransformControls(camera, renderer.domElement);
  control.addEventListener('change', render);
  control.addEventListener('mouseDown', (ele) => {
    console.log(
      ele.target.object.position.x +
        ', ' +
        ele.target.object.position.y +
        ', ' +
        ele.target.object.position.z,
    );
  });
  control.addEventListener('dragging-changed', function (event) {
    orbit.enabled = !event.value;
  });
  scene.add(control);

  const sky = createSky(renderer);
  scene.add(sky);

  document.addEventListener("click", onDocumentMouseDown, false);
  window.addEventListener('resize', onWindowResize, false);

  const manager = new THREE.LoadingManager();
  manager.onLoad = function () {
    window.three = {
      scene,
      orbit,
      renderer
    };

    // 创建巡检路线
    createCruiseLine();

    // 楼栋标签
    nameTags.forEach(tag => {
      createBuildNameSpriteTag(tag);
    });

    modelMap['SND_yuanqu'].scale.set(0.001, 0.001, 0.001);
  };

  const glbArray = [
    'SND_yuanqu'
  ];

  glbArray.forEach(glb => {
    const ktx2Loader = new KTX2Loader().setTranscoderPath().detectSupport(renderer);
    new GLTFLoader(manager)
      .setPath(`./model/${glb}/`)
      .setKTX2Loader(ktx2Loader)
      .setMeshoptDecoder(MeshoptDecoder)
      .load(`${glb}.glb`, gltf => {
        const obj = gltf.scene;
        //放射光颜色与放射光贴图 不设置可能导致黑模
        // obj.traverse( function ( child ) {
        //   if ( child.isMesh ) {
        //     child.material.emissive =  child.material.color;
        //     child.material.emissiveIntensity = 1;
        //     child.material.emissiveMap = child.material.map ;
        //   }
        // });
        modelMap[glb] = obj;
        obj.name = glb;
        scene.add(obj);
      })
  });
}

export function animateFactory() {
  window.loopId = requestAnimationFrame(animateFactory);
  TWEEN.update();
  render();
}

function render() {
  renderer.render(scene, camera);
}

function onDocumentMouseDown(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(intersectsObjs, true);
  if (intersects.length > 0) {
    const selectedDevice = findTarget(intersects[0].object);
    control.attach(selectedDevice);
  }

  function findTarget(obj) {
    if (obj.parent === scene || !obj.parent) {
      return obj;
    } else {
      return findTarget(obj.parent);
    }
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// 创建巡检路线
function createCruiseLine() {
  console.log('创建园区巡检路线');

  factoryCurve = new THREE.CatmullRomCurve3(factoryCruisePoints);
  const geo = new THREE.BufferGeometry().setFromPoints(factoryCurve.getSpacedPoints(1000));
  const mat = new THREE.LineBasicMaterial({color: 'red'});
  const line = new THREE.Line(geo, mat);
  // scene.add(line);

  to1FBjfCurve = new THREE.CatmullRomCurve3(to1FBjfCruisePoints);
  const geo2 = new THREE.BufferGeometry().setFromPoints(to1FBjfCurve.getSpacedPoints(1000));
  const line2 = new THREE.Line(geo2, mat);
  // scene.add(line2);

  a2PdfToKyjCurve = new THREE.CatmullRomCurve3(a2PdfToKyjCruisePoints);
  const geo3 = new THREE.BufferGeometry().setFromPoints(a2PdfToKyjCurve.getSpacedPoints(1000));
  const line3 = new THREE.Line(geo3, mat);
  // scene.add(line3);
}

// 整体园区开始巡检
export function startCruiseFactory() {
  factoryFlag = true;
}

// 整体园区暂停巡检
export function pauseCruiseFactory() {
  factoryFlag = false;
}

export function startA2PdfToKyj() {
  progress = 0;
  a2PdfToKyjFlag = true;
}

/**
 * 创建楼栋名称标签
 * @param {*} tag 标签数据
 */
function createBuildNameSpriteTag(tag) {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 300;
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 绘制背景
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    // 绘制楼栋名称
    ctx.font = '60px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText(tag.name, 160, 100);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({map: texture});
    const sprite = new THREE.Sprite(material);
    sprite.material.transparent = true;
    sprite.material.depthWrite = false;
    sprite.position.set(...tag.position);
    sprite.scale.set(20, 20, 1);
    scene.add(sprite);
  };
  img.src = require('@/assets/images/build_tag.png');
}