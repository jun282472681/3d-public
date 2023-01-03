
import * as THREE from 'three';

/**
 * @description 自定义动画系统
 * @author jwcai
 */
class PIAnimation {
    constructor(model) {
        this.model = model;
        this.action = null;
        this.mixer = null;
    }

    // 设置关键帧轨道集
    setAnimationClip(id, name, startPos = [0, 0, 0], endPos, duration) {
        const [sx, sy, sz] = startPos;
        const [x, y, z] = endPos;
        const times = [0, duration];  // 关键帧时间数组，离散的时间点序列
        const values = [sx, sy, sz, x, y, z]; // 与时间点对应的值组成的数组
        const posTrack = new THREE.VectorKeyframeTrack(name, times, values);
        return new THREE.AnimationClip(id, duration, [posTrack]);
    }

    // 设置动画混合器
    setAnimationMixer(id, name, startPos, endPos, duration, params = { }) {
        this.mixer = new THREE.AnimationMixer(this.model);
        const clip = this.setAnimationClip(id, name, startPos, endPos, duration);
        this.action = this.mixer.clipAction(clip);
        this.action.clampWhenFinished = true;
        this.action.timeScale = params.timeScale || 1; // 动画播放一个周期的时间
        this.action.loop = params.loop || THREE.LoopOnce; // 动作单次播放
        return this.mixer;
    }

    // 播放
    play() {
        this.action.play();
    }

    finished() {
        const _that = this;
        return new Promise((resolve, reject) => {
            _that.mixer.addEventListener('finished',function(e) {
                resolve(e);
            });
        })
    }

    // 释放资源
    dispose() {
        this.action.uncacheRoot(this.model); 
    }

}

export default PIAnimation;