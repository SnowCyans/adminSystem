import request from '@/utils/request'

// 请求登录接口
export function login (data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 *  获取用户的基本资料
 *
 * **/
export function getInfo () {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

/** *
 *
 * 获取用户的基本信息  现在写它 完全是为了显示头像
 * **/
export function getUserDetailById (id) {
  return request({
    method: 'GET',
    url: `/sys/user/${id}`

  })
}

// 获取简单列表
export const getSimpleUserList = () => {
  return request({
    url: '/sys/user/simple'
  })
}
