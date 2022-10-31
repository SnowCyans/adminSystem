import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  }

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

// 动态路由
export const asyncRoutes = [
  {
    path: '/approvals',
    component: Layout,
    children: [{
      path: '',
      name: 'approvals',
      component: () => import('@/views/approvals/index'),
      meta: { title: '审批', icon: 'tree-table' }
    }],
    meta: {
      name: 'approvals'
    }
  },
  {
    path: '/attendances',
    component: Layout,
    children: [{
      path: '',
      name: 'attendances',
      component: () => import('@/views/attendances/index'),
      meta: { title: '考勤', icon: 'skill' }
    }],
    meta: {
      name: 'attendances'
    }
  },
  {
    path: '/departments',
    component: Layout,
    children: [{
      path: '',
      name: 'departments',
      component: () => import('@/views/departments/index'),
      meta: { title: '组织架构', icon: 'tree' }
    }],
    meta: {
      name: 'departments'
    }
  },
  {
    path: '/employees',
    component: Layout,
    children: [{
      path: '',
      name: 'employees',
      component: () => import('@/views/employees/index'),
      meta: { title: '员工', icon: 'people' }
    }],
    meta: {
      name: 'employees'
    }
  },

  {
    path: '/permission',
    component: Layout,
    children: [{
      path: '',
      name: 'permissions',
      component: () => import('@/views/permission/index'),
      meta: { title: '权限管理', icon: 'lock' }
    }],
    meta: {
      name: 'permissions'
    }
  },
  {
    path: '/salarys',
    component: Layout,
    children: [{
      path: '',
      name: 'salarys',
      component: () => import('@/views/salarys/index'),
      meta: { title: '工资', icon: 'money' }
    }],
    meta: {
      name: 'salarys'
    }
  },
  {
    path: '/setting',
    component: Layout,
    children: [{
      path: '',
      name: 'settings',
      component: () => import('@/views/setting/index'),
      meta: { title: '设置', icon: 'setting' }
    }],
    meta: { name: 'settings' }
  },
  {
    path: '/social',
    component: Layout,
    children: [{
      path: '',
      name: 'social_securitys',
      component: () => import('@/views/social/index'),
      meta: { title: '社保', icon: 'table' }
    }],
    meta: { name: 'social_securitys' }
  },
  {
    path: '/import',
    hidden: true,
    component: Layout,
    children: [{
      path: '',
      name: 'Import',
      component: () => import('@/views/import/index')
    }],
    meta: { name: 'employees' }
  },
  {
    path: '/employees/detail/:id',
    hidden: true,
    component: Layout,
    children: [{
      path: '',
      name: 'Employees/detail',
      component: () => import('@/views/employees/detail.vue'),
      props: true
    }],
    meta: { name: 'employees' }
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  // 只保留静态路由表
  routes: [...constantRoutes]
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
