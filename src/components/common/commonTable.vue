<template>
  <div>
    <el-table :data="tableData" :stripe="tableColumnObj.stripe?stripe:false" :border="tableColumnObj.border?border:false" v-loading="loading" element-loading-background="transparent" element-loading-text="数据加载中">
      <!-- 是否有选中框 -->
      <el-table-column v-if="tableColumnObj.selection?tableColumnObj.selection.isSelection:false" type="selection" :width="tableColumnObj.selection.width" :align="tableColumnObj.align?tableColumnObj.align:'left'"></el-table-column>
      <!-- 是否显示序号 -->
      <el-table-column v-if="tableColumnObj.index?tableColumnObj.index.isIndex:false" type="index" :index="indexMethod" label="序号" :width="tableColumnObj.index.width" :align="tableColumnObj.align?tableColumnObj.align:'left'"></el-table-column>
      <template v-for="item in tableColumnObj.columnList">
        <el-table-column v-if="item.slot" :key="item.label" :prop="item.prop?item.prop:''" :label="item.label" :width="item.width?item.width:null" :align="tableColumnObj.align?tableColumnObj.align:'left'">
          <!-- 放置操作等插槽 -->
          <template slot-scope="{row}">
            <slot :name="item.slotNanme" :row="row"></slot>
          </template>
        </el-table-column>
        <el-table-column v-else :key="item.label" :prop="item.prop?item.prop:''" :label="item.label" :width="item.width?item.width:null" :align="tableColumnObj.align?tableColumnObj.align:'left'" 
        show-overflow-tooltip>
        </el-table-column>
      </template>
      <slot/>
    </el-table>
    <el-pagination v-if="isShowPagiton" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationData.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="paginationData.pageSize" layout="total, prev, pager, next,sizes" :total="paginationData.total" class="paginationStyle">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'commonTable',
  props: {
    tableData: {
      type: Array,
      // default: []
    },
    tableColumnObj: {
      type: Object,
      // default: {}
    },
    paginationData: {
      type: Object,
    },
    isShowPagiton: {
      type: Boolean,
      default: false
    },
    // slotNames: {
    //   type: Array,
    // },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  created () { },
  methods: {
    // 序号
    indexMethod (index) {
      return (this.paginationData.currentPage - 1) * this.paginationData.pageSize + index + 1
    },
    handleSizeChange (val) {
      this.$emit('tableSizeChange', val)
    },
    handleCurrentChange (val) {
      this.$emit('tableCurrentChange', val)
    }
  },
}
</script>

<style lang="scss" scoped>
// .paginationStyle {
//   float: right;
// }
</style>