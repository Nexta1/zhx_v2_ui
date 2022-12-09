<template>
  <div class="app-main">
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__slideInRight"
      mode="out-in"
    >
      <router-view :key="$route.fullPath" />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {}
}
</script>

<style scoped>
.app-main {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
