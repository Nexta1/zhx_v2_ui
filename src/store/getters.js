const getters = {
  perms: (state) => state.user.perms,
  token: (state) => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  permissionRoutes: (state) => state.permission.addRoutes,
  routes: (state) => state.permission.routes
}
export default getters
