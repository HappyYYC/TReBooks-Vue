import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Transmit from '@/views/Transmit'
import Folder from '@/views/Folder'
import Record from '@/views/Record'

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
      name: 'Transmit',
      component: Transmit,
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
