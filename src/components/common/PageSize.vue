<template>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="size"
      :page-size="PageSize"
      layout="total, sizes, prev, pager, next"
      :total="total"
      class="pisx-pagination-size">
    </el-pagination>
</template>
<script>
export default {
    props: {
        total: {//总条数
            type: Number,
            default: 400
        },
        size: {//每页多少条
            type: Array,
            default:  ()=>{
                return [20, 30, 40, 50]
            }
        }
    },
    data () {
        return {
            page: 1,
            PageSize: 10,
        }
    },
    methods: {
        handleSizeChange (val) {//每页多少条
            this.$emit('PageChange',val)
        },
        handleCurrentChange (val) {//多少页
            this.$emit('PageSize',val)
        }
    }
}
</script>
<style lang="scss">
.pisx-pagination-size{
    .el-pagination__sizes{
        float: right;
    }
}
</style>