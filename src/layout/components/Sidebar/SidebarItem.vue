<template>
  <div v-if="!item.hidden">
    <el-menu-item :index="item.path" v-if="isRoot(item)">
      <span slot="title">{{ title }}</span>
    </el-menu-item>
    <el-submenu :index="item.path" v-else>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
      />
      <span slot="title">{{ item.meta.title }}</span>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    title() {
      if (this.item.children && this.item.children.length === 1) {
        return this.item.children[0].meta.title
      } else {
        return this.item.meta.title
      }
    }
  },
  methods: {
    isRoot(item) {
      if (item.children) {
        return item.children && item.children.length === 1
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
