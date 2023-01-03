import * as THREE from 'three';
import _ from 'lodash';

/**
 * @description 自定义路径漫游
 * @author jwcai
 */
export default class PRoute {
  constructor(scene, camera, raycaster, controls, context) {
    this._scene = scene;  // 场景
    this._camera = camera; // 相机
    this._raycaster = raycaster; // 光线投射
    this._controls = controls || null; // PointerLockControls控制器  自由视角漫游
    this.pointsArray = []; // 点击 点数组
    this.lineArray = []; // 绘制线数组
    this.pointsMaterialArray = []; // 绘制点数组
    this.window_mouse = true; // 鼠标事件
    this.setRoam = false;  // 是否启动绘制
    this.path = null;  // 漫游路径
    this.pathFlag = false; // 是否漫游
    this.speed = 1;  // 漫游速度
    this.height = 1; // 漫游高度
    this.progress = 0; // 进度
    this.cruiseSpeed = 0.0001; // 速度控制(路线长度基准100)
    this.moveState = false;
    this.texture = null;
    this.groupIndex = 0;   //运行的组合路由下表
    this.groupRouteList = [], //组合路由
    this.groupRouteFlag = false,
    this.groupLines = [], //组合路由发光路线
    this.context = context,
    this.angleList = [],
    this.routeNames = []    //发光路线
  }

  // 获取射线与平面的交点
  getIntersects(event) {
    let mouse = new THREE.Vector2();
    let normal = new THREE.Vector3(0, 50, 0);
    let planeGround = new THREE.Plane(normal, 0);
    let res = new THREE.Vector3(0, 0, 0);

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this._raycaster.setFromCamera(mouse, this._camera);
    let intersects = this._raycaster.ray.intersectPlane(planeGround, res);

    if (intersects) {
      intersects.y = 1.5
    }
    return intersects;
  }

  // 鼠标按下事件
  onMouseDown(event, that) {
    // 获取相机发出的射线与 Plane 相交点
    let intersects = that.getIntersects(event);
    // 鼠标左键按下时，创建点和线段
    if (event.button === 0 && that.setRoam) {

      // 依据 windwo_mouse 标识避免事件的重复添加
      if (!that.window_mouse){
        window.onmousemove = (event) => { that.onMouseMove(event, that) }
        // window.addEventListener('mousemove', that.onMouseMove, false);
        that.window_mouse = true;
      }

      // 若交点此时在平面之内则创建点（Points）
      let pointsGeometry = new THREE.BufferGeometry();
      pointsGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( intersects, 3 ) );
      let pointsMaterial = new THREE.PointsMaterial({color:0xff0000, size: 0.5});
      let points = new THREE.Points(pointsGeometry, pointsMaterial);
      points.name = `point_${that.pointsMaterialArray.length}`;

      that.pointsMaterialArray.push({ name: points.name, position: intersects });
      that.pointsArray.push(intersects);

      // 创建线段
      let lineGeometry = new THREE.BufferGeometry();
      let lineMaterial = new THREE.LineBasicMaterial({color: 0x00ff00});

      if (that.pointsArray.length >= 2) {
        lineGeometry.setFromPoints(that.pointsArray);
        let line = new THREE.Line(lineGeometry, lineMaterial);
        line.name = `line_${that.lineArray.length}`

        that.lineArray.push({ name: line.name, position: _.cloneDeep(that.pointsArray) });
        line.castShadow = true;
        that.pointsArray.shift();
        that._scene.add(line);
      }

      that._scene.add(points);
      this.context.$store.commit('app/setTempLineInfo', _.cloneDeep(this.lineArray));
    }

    // 鼠标右键按下时 回退到上一步的点，并中断绘制
    if (event.button === 2 && that.setRoam) {
      that.setRoam = false;

      // 移除事件之后，要设置为 false 为了避免事件的重复添加
      that.window_mouse = false;
      // 鼠标左键未点击时线段的移动状态
      if (that._scene.getObjectByName('line_move')) {
        that._scene.remove(that._scene.getObjectByName('line_move'));
        // 删除数组中的元素，否则的话再次重绘会链接之前的点接着重绘
        that.pointsArray.shift();
      }
    }
  }

  // 鼠标移动事件
  onMouseMove(event, that) {
    if (that.setRoam) {
      let intersects = that.getIntersects(event);
      // 鼠标左键未点击时线段的移动状态
      if (that._scene.getObjectByName('line_move')) {
        that._scene.remove(that._scene.getObjectByName('line_move'));
      }
      // 创建线段
      let lineGeometry = new THREE.BufferGeometry();
      let lineMaterial = new THREE.LineBasicMaterial({color: 0x00ff00});
    
      if (that.pointsArray.length > 0) {
        let mouseVector3 = new THREE.Vector3(intersects.x, 1.5, intersects.z);
        lineGeometry.setFromPoints([that.pointsArray[0], mouseVector3]);
    
        let line = new THREE.Line(lineGeometry, lineMaterial);
        line.name = 'line_move';
    
        that._scene.add(line);
      }
    }
  }

  // 是否展示路径
  setOpacity(isShowPath) {
    this.lineArray.forEach(line => {
      const findLine = this._scene.getObjectByName(line.name)
      if (findLine) {
        let material = findLine.material;
        material.transparent = isShowPath ? false : true;
        material.opacity = isShowPath ? 1 : 0;
        material.alphaTest = isShowPath ? 0 : 0.8;
      }
    })
    this.pointsMaterialArray.forEach(point => {
      const findPointer = this._scene.getObjectByName(point.name)
      if (findPointer) {
        let material = findPointer.material;
        material.transparent = isShowPath ? false : true;
        material.opacity = isShowPath ? 1 : 0;
        material.alphaTest = isShowPath ? 0 : 0.8;
      }
    })
  }

  // 创建光路引导
  createLightRoad(pointsArray) {
    const roadName = `lightRoad${this.routeNames.length}`
    this.routeNames.push(roadName)
    const closedSpline = new THREE.CatmullRomCurve3(pointsArray, false, 'catmullrom', 0.1 );
    const tubeGeometry = new THREE.TubeGeometry(closedSpline, 1000, 0.3, 3, false);
    this.texture = new THREE.TextureLoader().load(require('@/assets/images/route/light.png'));
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.wrapT = THREE.RepeatWrapping;
    // this.texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    this.texture.repeat.set(10, 2);
    // 将纹理应用于材质
    const tubeMaterial = new THREE.MeshStandardMaterial({
      // color: 0x156289,
      // color: 0x00ff00,
      // emissive: 0x156289,
      transparent: true,
      map: this.texture,
      side: THREE.DoubleSide,
    });
    const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
    tube.scale.y = 0.1;
    tube.name = roadName;
    tube.position.y = 1.5;
    this._scene.add(tube)
  }

  // 是否开启绘制路径
  drawPath() {
    this.dispose()
    window.onmousedown = (event) => { this.onMouseDown(event, this) }
    window.onmousemove = (event) => { this.onMouseMove(event, this) }
    // window.addEventListener('mousedown', event => this.onMouseDown(event, this), false);
    // window.addEventListener('mousemove', event => this.onMouseMove(event, this), false);
    this.setRoam = true;
  }

  //启动组合漫游
  startGroupRoute(list) {
    this.removeRoad()
    this.groupIndex = 0;
    this.groupLines = []
    this.groupRouteFlag = true;
    this.groupRouteList = list
    this.runGroupRoute()
  }

  runGroupRoute() {
    if (this.groupRouteList && this.groupRouteList.length > 0 && this.groupRouteFlag){
      const route = this.groupRouteList[this.groupIndex]
      this.lineArray = _.cloneDeep(route.lineArray)
      this.pointsMaterialArray = _.cloneDeep(route.pointsMaterialArray)
      this.start(route.form)
      this.groupIndex++;
      this.groupIndex == this.groupRouteList.length && (this.groupRouteFlag = false)
    }
  }

  //保存漫游信息
  saveRout(form) {
    let param = {
      form,
      lineArray: _.cloneDeep(this.lineArray),
      pointsMaterialArray: _.cloneDeep(this.pointsMaterialArray)
    }
    this.context.$store.commit('app/pushRouteList', param);
  }

  // 漫游渲染
  render() {
    if (this.groupLines.length > 0) {
      this.groupLines.forEach(line => line.offset.x -= 0.01)
    }else if (this.texture) {
      this.texture.offset.x -= 0.01;
    }
    if (this.path && this.pathFlag) {
      if (this.progress <= 1) {
        const point = this.path.getPointAt(this.progress);
        const pointBox = this.path.getPointAt(this.progress + 0.004 * 20 < 1 ? this.progress + 0.004 * 20 : 1);
        
        const findAngle = this.angleList.find(item => {
          return point.x >= item.minX && point.x <= item.maxX &&
          point.y >= item.minY && point.y <= item.maxY &&
          point.z >= item.minZ && point.z <= item.maxZ
        })
        
        let lookAt = new THREE.Vector3();
        lookAt.copy(pointBox).sub(point).applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI * (findAngle.angle / 180)).add(point);

        this._camera.position.set(point.x, point.y + this.height, point.z);
        this._camera.lookAt(lookAt.x, 2 + this.height, lookAt.z);
        this.progress += (100 / this.path.getLength()) * this.cruiseSpeed * this.speed;
      } else {
        this.pathFlag = false;
        this.progress = 0;
        // const point = this.path.getPointAt(this.progress);
        // this._camera.lookAt(point.x, 2 + this.height, point.z);
        this._camera.position.set(90, 20, -20);
        this._camera.lookAt(53.96756421594237, 1.5, -14.817409093336444);
        this.runGroupRoute()
      }
    }
  }

  singleStart(option) {
    this.removeRoad()
    this.start(option)
  }

  // 开始漫游 [[x, y, z], [x, y, z]]
  start(option) {
    if (this.lineArray.length > 0 && option) {
      let lineVec = this.pointsMaterialArray.map(t => t.position);
      this.path = new THREE.CatmullRomCurve3(lineVec, false, 'catmullrom', 0);
      this.pathFlag = true;
      this.speed = option.speed;
      this.height = option.height;
      this.angleList = option.routeLineList
      // 是否展示路径
      this.setOpacity(false);
      if (option.isShowPath) {
        if (this.groupRouteFlag){
          this.createLightRoad(lineVec);
          this.groupLines.push(this.texture)
        }else if (!this.texture){
          this.createLightRoad(lineVec);
        }
      } else if(!option.isShowPath) {
        this._scene.remove(this._scene.getObjectByName('lightRoad'));
        this.texture = null;
      }
      
      // 是否自由视角
      if (option.isFreeAngle && this._controls) {
        this._controls.lock();
      }
    }
  }

  // 暂停继续 1:暂停；2:继续；3:结束
  end(flag) {
    if (flag === 1) {
      this.pathFlag = !this.pathFlag;
    } else if(flag === 2) {
      this.pathFlag = true;
    } else {
      this.progress = 0
      this.path = null;
      this.pathFlag = false;
    }
  }

  // 释放资源
  dispose() {
    this.lineArray.forEach(line => {
      this._scene.remove(this._scene.getObjectByName(line.name));
    })
    this.pointsMaterialArray.forEach(point => {
      this._scene.remove(this._scene.getObjectByName(point.name));
    })
    this.removeRoad()
    // this._scene.remove(this._scene.getObjectByName('lightRoad'));
    
    window.onmousedown = (event) => null
    window.onmousemove = (event) => null
    // window.removeEventListener('mousedown', this.onMouseDown, false);
    // window.removeEventListener('mousemove', this.onMouseMove, false);
    
    this.setRoam = false;
    this.lineArray = [];
    this.pointsMaterialArray = [];
    this.pointsArray = [];
    this.path = null;
    this.pathFlag = false;
    this.speed = 1;
    this.height = 1;
    this.texture = null;
    
    this.context.$store.commit('app/setTempLineInfo', []);
  }

  removeRoad() {
    this.texture = null;
    this.routeNames.forEach(name => {
      this._scene.remove(this._scene.getObjectByName(name));
    })
    this.routeNames = []
  }
}