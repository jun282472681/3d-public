import { Group,CanvasTexture, SpriteMaterial,Sprite} from 'three'
import * as THREE from "three";

/**
 *
 * @param {Array<model>} modelList
 * @param {number} num
 * @param {[number,number,number]} position
 * @param {THREE.Scene} scene
 * @param {Boolean} needOrigin
 */
function cloneGroup(modelList = [], num, position = [0, 0, 0], scene, needOrigin = false) {
    const need = needOrigin ? 1 : 0
    const group = new Group()
    modelList.forEach(model => {
        group.add(model)
    })
    for (let i = need; i <= num; i++) {
        const cloneGroup = group.clone()
        const { x, y, z } = group.position
        cloneGroup.position.set(x + (position[0] * i), y + (position[1] * i), z + (position[2] * i))
        scene.add(cloneGroup)
    }
}

/**
 *
 * @param {model} orginModel
 * @param {number} num
 * @param {[number,number,number]} position
 * @param {THREE.Scene} scene
 */
function cloneModel(orginModel, num, position = [0, 0, 0], scene) {
    for (let i = 1; i <= num; i++) {
        const clone = orginModel.clone()
        const { x, y, z } = orginModel.position
        clone.position.set(x + (position[0] * i), y + (position[1] * i), z + (position[2] * i))
        scene.add(clone)
    }
}

/**
 *
 * @param {model} orginModel
 * @param {Array<[number,number,number]>} config
 * @param {THREE.Scene} scene
 */
function cloneModelByPos(orginModel, config, scene) {
    config.forEach(pos => {
        const clone = orginModel.clone()
        clone.position.set(...pos)
        scene.add(clone)
    })
}




export {
    cloneGroup,
    cloneModel,
    cloneModelByPos
}

