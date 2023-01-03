<template>
    <div id="app" class="app">
        <Drag
            style="width: 200px"
            :list="list1"
            :config="config1"
        >
            <template v-slot="{ item }">
                <div class="item">
                    {{ item.name }}
                </div>
            </template>
        </Drag>

        <Drag
            style="width: 200px"
            :list="list2"
            :config="config2"
        >
            <template v-slot="{ item }">
                <div class="item">
                    {{ item.name }}
                </div>
            </template>
        </Drag>
        <div draggable="true">123333333</div>
    </div>
</template>

<script>
import Drag from '@/components/drag.vue';

export default {
    name: 'App',

    components: {
        Drag,
    },

    data() {
        return {
            list1: new Array(10).fill(0).map((_, i) => ({
                name: `列表1 - ${i + 1}`,
                draggable: true,
            })),

            config1: {
                name: 'test',
                push: true,
                pull: true,
                exchange: true,
            },

            list2: new Array(10).fill(0).map((_, i) => ({
                name: `列表2 - ${i + 1}`,
                draggable: true,
            })),

            config2: {
                name: 'test',
                push: true,
                pull: true,
                exchange: true,
            },
        };
    },
};
</script>

<style lang="scss" scoped>
.app {
    display: flex;

    justify-content: center;
}
.item {
    border: 1px solid #ccc;
    width: 200px;
    height: 30px;

    text-align: center;
}

</style>