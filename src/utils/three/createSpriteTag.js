import * as THREE from 'three';

/**
 * 创建有名称、参数和状态的sprite标签
 * @param {*} tag 标签数据
 * @param {*} index 标签的索引
 * @param {*} tagCanvas 保存sprite标签的canvas的数组
 * @param {*} scene 场景
 * @param {*} units 参数的单位
 * @returns
 */
export function createSpriteTag1(tag, index, tagCanvas, scene, units) {
  return new Promise((resolve, reject) => {
    createSpriteMaterial1(tag, index, tagCanvas, units, scene).then((m) => {
      let sprite;
      if (scene.getObjectByName(`${tag.type}${index}`)) {
        // 如果sprite标签已经存在
        sprite = scene.getObjectByName(`${tag.type}${index}`);
        sprite.material = m;
        sprite.material.transparent = true;
        sprite.material.depthWrite = false;
        sprite.material.needsUpdate = true;
        sprite.position.set(...tag.position);
        resolve();
      } else {
        // sprite标签不存在
        sprite = new THREE.Sprite(m);
        sprite.name = `${tag.type}${index}`;
        sprite.material.transparent = true;
        sprite.material.depthWrite = false;
        sprite.position.set(...tag.position);
        sprite.scale.set(tag.params.scale, tag.params.scale, 1);
        scene.add(sprite);
        resolve(sprite);
      }
    });
  });
}

function createSpriteMaterial1(tag, index, tagCanvas, units, scene) {
  let canvas, width, height;
  if (scene.getObjectByName(`${tag.type}${index}`)) {
    // 如果sprite标签已经存在
    tagCanvas.forEach((item) => {
      if (item.spriteName == `${tag.type}${index}`) {
        // 找到标签对应的canvas
        canvas = item.canvas;
      }
    });
  } else {
    // sprite标签不存在
    // canvas默认宽高是500*500
    canvas = document.createElement('canvas');
    canvas.width = tag.params.width || 500;
    canvas.height = tag.params.height || 500;
    tagCanvas.forEach((item) => {
      if (item.spriteName == `${tag.type}${index}`) {
        // 将该标签的canvas保存起来
        item.canvas = canvas;
      }
    });
  }
  const ctx = canvas.getContext('2d');
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (tag.status == 0) {
      img.src = require('@/assets/images/tags/kyj1_run.png');
    } else {
      img.src = require(`@/assets/images/tags/kyj1_${tag.status}.png`);
    }
    img.onload = function () {
      // 清除画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      resolve(drawText1(ctx, img, canvas, tag, units));
    };
  });
}

function drawText1(ctx, img, canvas, tag, units) {
  const offsetLeft = (canvas.width - tag.params.bgWidth) / 2;
  // 绘制背景
  ctx.drawImage(img, 0, 0, 306, 44, offsetLeft, 0, tag.params.bgWidth, 90);
  ctx.drawImage(
    img,
    0,
    44,
    306,
    150,
    offsetLeft,
    90,
    tag.params.bgWidth,
    tag.params.contentHeight,
  );
  ctx.drawImage(
    img,
    0,
    194,
    306,
    6,
    offsetLeft,
    90 + tag.params.contentHeight,
    tag.params.bgWidth,
    10,
  );

  // 标题
  ctx.font = '40px TRENDS';
  ctx.fillStyle = '#fff';
  ctx.fillText(tag.name, 40 + offsetLeft, 70);

  let pixel = 90;
  for (let key in tag.data) {
    pixel += 50;
    ctx.font = '30px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText(key, 40 + offsetLeft, pixel);

    ctx.font = '24px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText(
      `(${units[tag.type][key]})`,
      ctx.measureText(key).width + 80 + offsetLeft,
      pixel,
    );

    ctx.font = '34px TRENDS';
    ctx.fillStyle = '#fff';
    ctx.fillText(tag.data[key], tag.params.valueLeft, pixel);
  }

  let texture = new THREE.CanvasTexture(canvas);
  return new THREE.SpriteMaterial({ map: texture });
}

/**
 * 创建有名称、状态的sprite标签
 * @param {*} tag 标签数据
 * @param {*} index 索引
 * @param {*} tagCanvas 保存sprite标签的canvas的数组
 * @param {*} scene 场景
 */
export function createSpriteTag2(tag, index, tagCanvas, scene) {
  return new Promise((resolve, reject) => {
    createSpriteMaterial2(tag, index, tagCanvas, scene).then((m) => {
      let sprite;
      if (scene.getObjectByName(`${tag.type}${index}`)) {
        sprite = scene.getObjectByName(`${tag.type}${index}`);
        sprite.material = m;
        sprite.material.transparent = true;
        sprite.material.depthWrite = false;
        sprite.material.needsUpdate = true;
        resolve();
      } else {
        sprite = new THREE.Sprite(m);
        sprite.name = `${tag.type}${index}`;
        sprite.material.transparent = true;
        sprite.material.depthWrite = false;
        sprite.position.set(
          tag.position[0],
          tag.position[1] + 1.2,
          tag.position[2],
        );
        sprite.scale.set(tag.params.scale, tag.params.scale, 1);
        scene.add(sprite);
        resolve(sprite);
      }
    });
  });
}

function createSpriteMaterial2(tag, index, tagCanvas, scene) {
  let canvas;
  if (scene.getObjectByName(`${tag.type}${index}`)) {
    tagCanvas.forEach((item) => {
      if (item.spriteName == `${tag.type}${index}`) {
        canvas = item.canvas;
      }
    });
  } else {
    canvas = document.createElement('canvas');
    canvas.width = tag.params.width;
    canvas.height = tag.params.height;
    tagCanvas.forEach((item) => {
      if (item.spriteName == `${tag.type}${index}`) {
        item.canvas = canvas;
      }
    });
  }
  const ctx = canvas.getContext('2d');
  //添加背景图片，进行异步操作
  return new Promise((resolve, reject) => {
    let img = new Image();
    if (tag.status == 0) {
      img.src = require('@/assets/images/tags/kyj1_run.png');
    } else {
      img.src = require(`@/assets/images/tags/kyj1_${tag.status}.png`);
    }

    //图片加载之后的方法
    img.onload = () => {
      //将画布处理为透明
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      //   绘制背景图片
      ctx.drawImage(img, 0, 0, 306, 44, 0, 0, canvas.width, 80);
      resolve(drawText2(ctx, canvas, tag));
    };
    //图片加载失败的方法
    img.onerror = (e) => {
      reject(e);
    };
  });
}

function drawText2(ctx, canvas, tag) {
  ctx.font = '40px TRENDS';
  ctx.fillStyle = '#fff';
  ctx.fillText(tag.name, tag.params.left, 62);

  let texture = new THREE.CanvasTexture(canvas);
  return new THREE.SpriteMaterial({ map: texture });
}

/**
 * 创建有参数的sprite标签
 * @param {*} tag 标签数据
 * @param {*} index 索引
 * @param {*} tagCanvas 保存sprite标签的canvas的数组
 * @param {*} scene 场景
 * @param {*} units 单位
 */
export function createSpriteTag3(tag, index, tagCanvas, scene, units) {
  createSpriteMaterial3(tag, index, tagCanvas, units, scene).then((m) => {
    let sprite;
    if (scene.getObjectByName(`${tag.type}${index}`)) {
      sprite = scene.getObjectByName(`${tag.type}${index}`);
      sprite.material = m;
      sprite.material.transparent = true;
      sprite.material.depthWrite = false;
      sprite.material.needsUpdate = true;
    } else {
      sprite = new THREE.Sprite(m);
      sprite.name = `${tag.type}${index}`;
      sprite.material.transparent = true;
      sprite.material.depthWrite = false;
      sprite.position.set(...tag.position);
      sprite.scale.set(tag.params.scale, tag.params.scale, 1);
      scene.add(sprite);
    }
  });
}

function createSpriteMaterial3(tag, index, tagCanvas, units, scene) {
  let canvas;
  if (scene.getObjectByName(`${tag.type}${index}`)) {
    tagCanvas.forEach((item) => {
      if (item.spriteName == `${tag.type}${index}`) {
        canvas = item.canvas;
      }
    });
  } else {
    canvas = document.createElement('canvas');
    canvas.width = tag.params.width;
    canvas.height = tag.params.height;
    tagCanvas.forEach((item) => {
      if (item.spriteName == `${tag.type}${index}`) {
        item.canvas = canvas;
      }
    });
  }

  const ctx = canvas.getContext('2d');
  //添加背景图片，进行异步操作
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = require('@/assets/images/tags/bjgy2.png');

    //图片加载之后的方法
    img.onload = () => {
      // 将画布处理为透明
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      //绘画图片
      ctx.drawImage(img, 0, 0, 216, 150, 30, 0, 240, tag.params.contentHeight);

      resolve(drawText3(ctx, canvas, tag, units));
    };
    //图片加载失败的方法
    img.onerror = (e) => {
      reject(e);
    };
  });
}

function drawText3(ctx, canvas, tag, units) {
  let pixel = 10;
  for (let key in tag.data) {
    pixel += 45;
    ctx.font = '36px TRENDS';
    ctx.fillStyle = '#fff';
    if (tag.params.left) {
      ctx.fillText(tag.data[key], tag.params.left, pixel);
    } else {
      ctx.fillText(tag.data[key], 80, pixel);
    }

    ctx.font = '26px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    if (tag.params.left) {
      ctx.fillText(
        units[tag.type][key],
        ctx.measureText(tag.data[key]).width + tag.params.left + 40,
        pixel,
      );
    } else {
      ctx.fillText(
        units[tag.type][key],
        ctx.measureText(tag.data[key]).width + 120,
        pixel,
      );
    }
  }

  let texture = new THREE.CanvasTexture(canvas);
  return new THREE.SpriteMaterial({ map: texture });
}
