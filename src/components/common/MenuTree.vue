<template>
    <span>
        <template  v-for="item in list">
            <el-submenu :index="item.id+ ''" :key="item.id" v-if="item.children">
                <template slot="title">
                    <img src="@/assets/icon/common/menu.png" style="width:20px;height:20px;margin-right:10px"/>
                    <span>{{ item.code }}</span>
                </template>
                <el-menu-item-group v-if="item.children">
                    <menu-tree :list="item.children"></menu-tree>
                </el-menu-item-group>
            </el-submenu>
           <el-menu-item  :key="item.id" v-else>
                <el-checkbox :label="item.id" class="pisx-checkbox-meter">{{ item.code}}</el-checkbox>
            </el-menu-item>
        </template>
    </span>
</template>
<script>
export default {
    name: 'MenuTree',
    props: {
        list: {
            type: Array,
            default: ()=> []
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
}
</style>