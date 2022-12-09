<template>
  <div class="block">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="id" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="label" label="标识"> </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
      <el-table-column prop="userId" label="创建者"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 1,
      tableData: []
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      const { data } = await this.$api.sys.role.page({
        page: this.currentPage,
        limit: this.pageSize
      })
      this.tableData = data.list
      this.total = data.pagination.total
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    }
  }
}
</script>

<style lang="scss" scoped></style>
