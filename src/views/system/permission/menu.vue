<template>
  <div>
    <table-layout>
      <s-table
        ref="table"
        :data-request="getMenuList"
        stripe
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column
          prop="router"
          label="节点路由"
          align="center"
          width="240"
        />
      </s-table>
    </table-layout>
  </div>
</template>

<script>
import TableLayout from '@/layout/components/TableLayout.vue'
import STable from '@/components/Table'
import PermissionMixin from '@/core/mixins/permission'
export default {
  components: { TableLayout, STable },
  data() {
    return {
      menuTree: []
    }
  },
  mixins: [PermissionMixin],
  methods: {
    async getMenuList() {
      const { data } = await this.$api.sys.menu.list()
      // clean
      if (this.menutree && this.menutree.length > 0) {
        this.menutree = []
      }
      // 同时缓存树形菜单
      const parentNode = { id: -1, label: '一级菜单' }
      parentNode.children = this.filterMenuToTree(data, null)
      this.menutree.push(parentNode)
      return { list: this.filterMenuToTable(data, null) }
    }
  }
}
</script>

<style lang="scss" scoped></style>
