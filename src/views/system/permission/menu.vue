<template>
  <div>
    <el-table
      :data="tableData"
      row-key="id"
      border
      size="small"
      stripe
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="icon" label="图标" sortable width="180">
      </el-table-column>
      <el-table-column prop="router" label="节点路由" />
      <el-table-column prop="keepalive" label="路由缓存" />
      <el-table-column prop="viewPath" label="文件路径" />
      <el-table-column prop="perms" label="权限" />
      <el-table-column prop="orderNum" label="排序" />
      <el-table-column prop="updateTime" label="更新时间" />
    </el-table>
  </div>
</template>

<script>
import { concat } from 'lodash'

export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      const { data } = await this.$api.sys.menu.list()
      this.tableData = concat(
        this.tableData,
        data.filter((item) => {
          item.children = data.filter((e) => {
            return item.id === e.parentId
          })
          return !item.parentId
        })
      )
    }
  }
}
</script>

<style lang="scss" scoped></style>
