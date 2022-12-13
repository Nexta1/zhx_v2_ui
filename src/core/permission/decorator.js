import { isString } from 'lodash'

/**
 * class decorator
 * sys/user/
 * @param prefix
 * @returns {(function(*): void)|*}
 * @constructor
 */
export function PermissionPrefix(prefix = '') {
  return function (constructor) {
    if (!isString(prefix)) {
      throw new Error('Unsupport permission prefix type')
    }
    constructor.prototype.$permissionPrefix = prefix
  }
}

/**
 * prototype
 * @returns {(function(*, *, *): void)|*}
 * @constructor
 */
export function PermissionAction(action = '') {
  return async function (target, name, _) {
    if (!target._permission) {
      target._permission = {}
    }
    // 等待class完成
    await target
    const realAction = action || name
    target._permission[name] = `${target.$permissionPrefix}${realAction}`
  }
}
