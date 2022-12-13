<template>
  <div class="user">
    <table-layout class="tree">
      <template #aside>
        <span>组织架构</span>
        <span>
          <i class="el-icon-edit"></i>
          <i class="el-icon-plus"></i>
        </span>
        <el-tree
          :data="treeData"
          ref="tree"
          node-key="id"
          highlight-current
          :expand-on-click-node="false"
          @node-click="getTableIds"
        >
          <span class="custom-tree-node" slot-scope="{ data }">
            <span>{{ data.name }}</span>
            <span><i class="el-icon-edit-outline"></i></span>
            <span><i class="el-icon-delete"></i></span>
          </span>
        </el-tree>
      </template>
      <template #header>
        <div class="user-title">用户管理</div>
      </template>
      <div class="block">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="id" />
          <el-table-column prop="name" label="姓名" width="180" />
          <el-table-column prop="phone" label="手机" />
          <el-table-column prop="email" label="邮箱" />
          <el-table-column prop="remark" label="备注" />
          <el-table-column prop="status" label="状态" />
          <el-table-column label="角色"
            ><template slot-scope="scope">
              <el-tag
                v-for="item in scope.row.roleNames"
                :key="item"
                type="success"
                size="small"
                >{{ item }}</el-tag
              >
            </template>
          </el-table-column>
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
    </table-layout>
    <dept-form-dialog />
  </div>
</template>
<script>
import { flattenDeep, isEmpty } from 'lodash'
import TableLayout from '@/layout/components/TableLayout.vue'
import DeptFormDialog from '@/views/system/permission/components/dept-form-dialog.vue'

export default {
  components: { DeptFormDialog, TableLayout },
  data() {
    return {
      treeData: [],
      tableData: [],
      currentTree: {},
      currentPage: 1,
      pageSize: 10,
      total: 1
    }
  },
  created() {
    this.loadTreeData()
    this.loadTableData()
  },
  watch: {
    currentTree: function () {
      this.loadTableData()
    }
  },
  methods: {
    async loadTreeData() {
      const { data } = await this.$api.sys.dept.list()
      this.treeData = data.filter((item) => {
        item.children = data.filter((i) => {
          return i.parentId === item.id
        })
        return !item.parentId
      })
    },
    async loadTableData() {
      const {
        data: { list }
      } = await this.$api.sys.user.page({
        page: this.currentPage,
        limit: this.pageSize,
        departmentIds: this.getTableIds(this.currentTree)
      })
      this.tableData = list
    },
    getTableIds(val) {
      this.currentTree = val
      if (isEmpty(val)) {
        return []
      }
      const find = (data) => {
        const ids = []
        ids.push(data.id)
        if (data.children && data.children.length > 0) {
          data.children.forEach((i) => {
            ids.push(find(i))
          })
        }
        return ids
      }
      return flattenDeep(find(val))
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

<style scoped lang="scss"></style>
