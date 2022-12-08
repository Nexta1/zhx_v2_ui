import store from '@/store'

/**
 * 给定sys:dept:add
 * 查找api class decorator
 * @param perms
 * @returns {*|boolean}
 */
export function checkPermission(perms) {
  const permissionList = store.getters.perms
  const pms = perms.split(':')
  let cur = store.$api
  let permissionName = null
  for (let i = 0; i < perms.length; i++) {
    if (i < perms.length - 1) {
      cur = cur[pms[i]]
    } else {
      permissionName = cur._permission[pms[i]]
    }
  }
  if (typeof permissionName !== 'string') {
    return false
  }
  return permissionList.includes(permissionName)
}
