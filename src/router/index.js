import Vue from 'vue'
import Router from 'vue-router'
const Transfer = () => import('@/views/Transfer')
const Folder = () => import('@/views/Folder')
const Record = () => import('@/views/Record')
const HelloWorld = () => import('@/components/HelloWorld')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {title: 'TReBooks'}
    },
    {
      path: '/trans',
      name: 'Transfer',
      component: Transfer,
      meta: {title: 'TReBooks'}
    },
    {
      path: '/folder',
      name: 'Folder',
      component: Folder,
      meta: {title: 'TReBooks'}
    },
    {
      path: '/record',
      name: 'Record',
      component: Record,
      meta: {title: 'TReBooks'}
    }
  ]
})
