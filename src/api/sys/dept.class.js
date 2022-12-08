import request from '@/utils/request'
import { PermissionAction, PermissionPrefix } from '@/core/permission/decorator'

@PermissionPrefix('sys:menu:')
class SysDept {
  @PermissionAction()
  list() {
    return request({
      url: 'sys/dept/list',
      method: 'get'
    })
  }
  @PermissionAction()
  add(data) {
    return request({
      url: 'sys/dept/add',
      method: 'post',
      data
    })
  }
  @PermissionAction()
  update(data) {
    return request({
      url: 'sys/dept/list',
      method: 'post',
      data
    })
  }
  @PermissionAction()
  delete(data) {
    return request({
      url: 'sys/dept/delete',
      method: 'post',
      data
    })
  }
}
export default SysDept
