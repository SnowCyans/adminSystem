import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

// 白名单
const whiteList = ['/login', '/404']

router.beforeEach((to, from, next) => {
  console.log(to.path)
  NProgress.start()
  const token = store.state.user.token
  if (token) {
    if (to.path === '/login') {
      NProgress.done()
      next('/')
    } else {
      // 当用户手里面有token并且访问的不是登录页面 那就应该请求个人资料
      if (!store.state.user.userInfo.id) {
        store.dispatch('user/getInfo')
      }
      console.log(store.state.user.userInfo.id)
      // store.dispatch('user/getInfo')
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      NProgress.done()
      next('/login')
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
