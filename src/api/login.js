import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getImageCaptcha() {
  return request({
    url: '/get_captcha',
    method: 'get'
  })
}
