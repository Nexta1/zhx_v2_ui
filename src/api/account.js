import request from '@/utils/request'
export function getInfo() {
  return request({
    url: '/account/info',
    method: 'get'
  })
}
export function getPerms() {
  return request({
    url: '/account/perms',
    method: 'get'
  })
}
export function logout() {
  return request({
    url: 'account/logout',
    method: 'post'
  })
}
