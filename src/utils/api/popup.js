import * as THREE from 'three';

/**
 * @description 自定义弹出框
 * @author jwcai
 */
class PIPopup {
    constructor(scene, scale, width, height) {
        this.scale = scale || 1;
        this.width = width || 500;
        this.height = height || 500;
        this.scene = scene;
        this.url = '@/assets/images/tags/kyj1_run.png';
        this.material = null;
        this.id = '';
        this.canvas = null;
    }

    // 加载图片
    async loadImg() {
        const _that = this;
        return new Promise((resolve, reject) => {
            const img = new Image();
            console.log(_that.url);
            img.src = require('@/assets/images/tags/kyj1_run.png');
            img.onload = function() {
                resolve(img);
            };
        });
    }

    // 初始化材质
    async initMaterial(params) {
        let canvas = document.createElement('canvas');
        canvas.width = this.width || 500;
        canvas.height = this.height || 500;

        const ctx = canvas.getContext('2d');
        const img = await this.loadImg();
        const imgW = img.width;
        const imgH = img.height;
        // ctx.drawImage(img, 0, 0, 306, 44, 50, 0, 400, 90);
        // ctx.drawImage(img, 0, 44, 306, 150, 50, 0, 400, 90);
        // ctx.drawImage(img, 0, 194, 306, 6, 50, 270, 400, 10);
        ctx.drawImage(img, 0, 0, 500, imgH*500/imgW);
        // 标题
        ctx.font = '40px TRENDS';
        ctx.fillStyle = '#fff';
        ctx.fillText(params.title, 90, 70);

        let pixel = 90;
        params.content.forEach(t => {
            Object.keys(t).forEach(key => {
                pixel += 50;
                ctx.font = '30px Arial';
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.fillText(key, 40 + 50, pixel);
            
                // ctx.font = '24px Arial';
                // ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                // ctx.fillText(
                //   `(${units[tag.type][key]})`,
                //   ctx.measureText(key).width + 80 + offsetLeft,
                //   pixel,
                // );
            
                ctx.font = '34px TRENDS';
                ctx.fillStyle = '#fff';
                ctx.fillText(t[key], 310, pixel);
            })
        })
        let texture = new THREE.CanvasTexture(canvas);
        this.material = new THREE.SpriteMaterial({ map: texture }); 
    }

    /**
     *  初始化sprite
     *  { id: '', title: '储物柜', content: [{ }, ...], bgImg: '', position: [] }
     * @param {*} params 
     */
    async init(params) {
        let sprite = this.scene.getObjectByName(params.id);
        if (sprite) {
            return this.update(params, sprite);
        }
        this.url = params.bgImg || this.url;
        this.id = params.id;
        await this.initMaterial(params);
        sprite = new THREE.Sprite(this.material);
        sprite.name = params.id;
        sprite.material.transparent = true;
        sprite.material.depthWrite = false;
        sprite.position.set(...params.position);
        sprite.scale.set(this.scale, this.scale, 1);
        this.scene.add(sprite);
    }

    // 修改sprite
    update(params, sprite) {
        sprite.material = this.material;
        sprite.material.transparent = true;
        sprite.material.depthWrite = false;
        sprite.material.needsUpdate = true;
        sprite.position.set(...params.position);
    }
    
    // 释放资源
    dispose() {
        let sprite = this.scene.getObjectByName(this.id);
        sprite && this.scene.remove(sprite);
    }
}

export default PIPopup;