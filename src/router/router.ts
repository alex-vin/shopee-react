import loadable from '@loadable/component'
import { RouteInterface } from '@/types/route'

// public路径从buildConfig里读取，注入环境变量使用
export const basename = ''

// 路由文件
const Home = loadable(() => import('@/pages/home/home'))
const Login = loadable(() => import('@/pages/login/login'))
const NotFound = loadable(() => import('@/pages/404/404'))

const MinePage = loadable(() => import('@/pages/mine/mine'))
const GoingPage = loadable(() => import('@/pages/mine/going'))

export const routes: RouteInterface[] = [
  {
    path: '/',
    exact: true,
    component: Home,
    name: 'home',
    title: 'home',
    auth: true,
  },
  {
    path: '/login',
    exact: true,
    component: Login,
    name: 'login',
    title: 'login',
    auth: false,
  },
  {
    path: '/home',
    component: Home,
    name: 'home',
    title: 'home',
    auth: true,
    routes: [
      {
        path: '/home/me',
        exact: true,
        component: MinePage,
        name: 'mine',
        title: 'mine',
        auth: true,
      },
      {
        path: '/home/going',
        exact: true,
        component: GoingPage,
        name: 'going',
        title: 'going',
        auth: true,
      },
    ],
  },
  {
    path: '/404',
    exact: true,
    component: NotFound,
    name: '404',
    title: '404',
    auth: false,
  },
  {
    path: '*',
    component: NotFound,
    name: '404',
    title: '404',
  },
]
