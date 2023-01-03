import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { Sky } from 'three/examples/jsm/objects/Sky';

/**
 * 添加天空
 * @param {*} renderer 
 * @returns 天空模型
 */
function createSky(renderer) {
  const sky = new Sky();
  sky.scale.setScalar(45000);
  const sun = new THREE.Vector3();

  const effectController = {
    turbidity: 1.3,
    rayleigh: 0.208,
    mieCoefficient: 0.032,
    mieDirectionalG: 0.16,
    elevation: 4,
    azimuth: 60,
    exposure: 0.193
  };

  function guiChanged() {
    const uniforms = sky.material.uniforms;
    uniforms[ 'turbidity' ].value = effectController.turbidity;
    uniforms[ 'rayleigh' ].value = effectController.rayleigh;
    uniforms[ 'mieCoefficient' ].value = effectController.mieCoefficient;
    uniforms[ 'mieDirectionalG' ].value = effectController.mieDirectionalG;

    const phi = THREE.MathUtils.degToRad( 90 - effectController.elevation );
    const theta = THREE.MathUtils.degToRad( effectController.azimuth );

    sun.setFromSphericalCoords( 1, phi, theta );

    uniforms[ 'sunPosition' ].value.copy( sun );

    renderer.toneMappingExposure = effectController.exposure;

  }
  guiChanged();

  return sky;
}

/**
 * 视角切换
 * @param {*} orbit
 * @param {*} entranceWay 坐标
 */
function rotationAngle(orbit, entranceWay) {
  const { px, py, pz, vx, vy, vz } = entranceWay;
  let tweenA = new TWEEN.Tween(orbit.object.position)
    .to(
      {
        x: px,
        y: py,
        z: pz,
      },
      1000,
    )
    .onUpdate(() => {})
    .easing(TWEEN.Easing.Linear.None)
    .start();
  let tweenB = new TWEEN.Tween(orbit.target)
    .to(new THREE.Vector3(vx, vy, vz), 2000)
    .onUpdate(() => {
      orbit.object.lookAt(orbit.target.clone());
    })
    .easing(TWEEN.Easing.Linear.None)
    .start()
    .onComplete(() => {
      TWEEN.remove(tweenA);
      TWEEN.remove(tweenB);
    });
}

export {
  createSky,
  rotationAngle
}