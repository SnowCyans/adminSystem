import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

// 白名单
const whiteList = ['/login', '/404']

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const token = store.state.user.token
  if (token) {
    if (to.path === '/login') {
      NProgress.done()
      next('/')
    } else {
      // 当用户手里面有token并且访问的不是登录页面 那就应该请求个人资料
      if (!store.state.user.userInfo.id) {
        const userInfo = await store.dispatch('user/getInfo')
        console.log(userInfo.roles.menus)
        const newRoutes = await store.dispatch('permission/filter', userInfo.roles.menus)
        router.addRoutes([...newRoutes, { path: '*', redirect: '/404', hidden: true }])
        next(to.path)
      }
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
