<template>
  <div class="app-wrapper">
    <el-container>
      <el-aside>
        <side-bar />
      </el-aside>
      <el-container>
        <el-header>
          <Navbar />
        </el-header>
        <el-main class="main">
          <app-main />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { SideBar, AppMain, Navbar } from './components'
export default {
  components: { SideBar, AppMain, Navbar }
}
</script>
<style lang="scss">
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.el-aside {
  color: #333;
}
</style>
