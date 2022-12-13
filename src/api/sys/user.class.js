import request from '@/utils/request'
import { PermissionAction, PermissionPrefix } from '@/core/permission/decorator'

@PermissionPrefix('sys:user:')
class SysUser {
  @PermissionAction()
  page(data) {
    return request({
      url: 'sys/user/page',
      method: 'post',
      data
    })
  }
  @PermissionAction()
  add(data) {
    return request({
      url: 'sys/user/add',
      method: 'post',
      data
    })
  }
  @PermissionAction()
  update(data) {
    return request({
      url: 'sys/user/list',
      method: 'post',
      data
    })
  }
  @PermissionAction()
  delete(data) {
    return request({
      url: 'sys/user/delete',
      method: 'post',
      data
    })
  }
}
export default SysUser
