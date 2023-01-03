<template>
    <el-checkbox-group v-model="checkList" @change="handleChange" class="pisx-area-checkout">
        <el-menu class="pisx-menu-meter" background-color="transparent" text-color="#fff">
            <span v-for="item in list" :key="item.id">
                <el-submenu :index="item.id + ''">
                    <template slot="title">
                        <img src="@/assets/icon/common/menu.png" style="width:20px;height:20px;margin-right:10px"/>
                        <span>{{ item.code }}</span>
                    </template>
                    <el-menu-item-group v-if="item.children">
                        <menu-tree :list="item.children"></menu-tree>
                    </el-menu-item-group>
                    <span v-else>
                        <el-menu-item class="pisx-active-bg-color" v-for="num in item.children" :key="num.id">
                            <el-checkbox :label="num.id" class="pisx-checkbox-meter">{{num.code}}</el-checkbox>
                        </el-menu-item>
                    </span>
                </el-submenu>
            </span>
        </el-menu>
    </el-checkbox-group>
</template>
<script>
import MenuTree from './MenuTree.vue';
export default {
    props: {
        list: {
            type: Array,
            default: ()=> []
        }
    },
    components: {
        MenuTree
    },
    data () {
        return {
            checkList:[]
        }
    },
    methods: {
        handleChange (val) {
            this.$emit('change',val)
            this.dealWith(val)
        },
        dealWith (info) {
            let list = [];
            info.forEach(item=>{
                list.push(this.findNameList(this.list,item))
            })
            this.$emit('result',list)
        },
        findNameList (list,id,path = []) {
            for (let i = 0; i < list.length; i++) {
                let TempPath = [...path]
                TempPath.push(list[i].code)
                if (list[i].id == id) {
                    return TempPath
                }
                if (list[i].children) {
                    const reuslt = this.findNameList(list[i].children, id, TempPath)
                    if (reuslt) {
                        return reuslt
                    }
                }
            }
        }

    }
}
</script>
<style lang="scss" scoped>
.pisx-area-checkout{
    background: rgba(0,0,0,0.2);
    border-radius: 4px;
    height: calc(100% - 50px);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(204,204,204,0.2000);
    overflow-y: auto;
    overflow-x: hidden;
}
</style>