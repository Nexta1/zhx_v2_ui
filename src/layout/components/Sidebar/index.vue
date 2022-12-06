<template>
  <div>
    <el-menu router>
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
      />
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  name: 'SideBar',
  components: { SidebarItem },
  computed: {
    ...mapGetters(['routes'])
  }
}
</script>

<style lang="scss" scoped></style>
