<template>
  <div>
    <table-layout>
      <s-table
        ref="table"
        :data-request="getRoleList"
        show-pagination
        stripe
        row-key="id"
      >
        <el-table-column prop="id" label="#" align="center" width="55" />
        <el-table-column prop="name" label="名称" align="center" width="200" />
        <el-table-column prop="label" label="标识" align="center" width="200" />
        <el-table-column prop="remark" label="备注" align="center" />
        <el-table-column prop="createdAt" label="创建时间" align="center" />
        <el-table-column prop="updatedAt" label="更新时间" align="center" />
      </s-table>
    </table-layout>
  </div>
</template>

<script>
import TableLayout from '@/layout/components/TableLayout.vue'
import STable from '@/components/Table'
export default {
  components: { TableLayout, STable },
  methods: {
    async getRoleList({ page, limit }) {
      const { data } = await this.$api.sys.role.page({ page, limit })
      return { list: data.list, pagination: { total: data.pagination.total } }
    }
  }
}
</script>

<style lang="scss" scoped></style>
