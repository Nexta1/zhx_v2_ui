import request from '@/utils/request'
import { PermissionAction, PermissionPrefix } from '@/core/permission/decorator'

@PermissionPrefix('sys:role:')
class SysRole {
  @PermissionAction()
  page(data) {
    return request({
      url: 'sys/role/page',
      method: 'post',
      data
    })
  }
  @PermissionAction()
  add(data) {
    return request({
      url: 'sys/role/add',
      method: 'post',
      data
    })
  }
  @PermissionAction()
  update(data) {
    return request({
      url: 'sys/role/update',
      method: 'post',
      data
    })
  }
  @PermissionAction()
  delete(data) {
    return request({
      url: 'sys/role/delete',
      method: 'post',
      data
    })
  }
}
export default SysRole
