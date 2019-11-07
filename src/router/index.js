import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Login from '@/pages/login'
import Secret from '@/pages/secret'
import Help from '@/pages/help'
import drawlots from '@/pages/drawLots'
import buyer from '@/pages/buyer'
import buyingWithFriend from '@/pages/panicbuyingWithFriend'
import buysuccess from '@/pages/buySuccess'
import autarkyRule from '@/pages/autarkyRule'
import salerKnow from '@/pages/salerKnow'
import shareMyShoese from '@/pages/shareMyShoese'
import aboutUs from '@/pages/aboutUs'
import mytable from '@/pages/mytable'



Vue.use(Router);
export default new Router({
  // mode: 'history',
  // base: '/app/',
  routes: [
    {
      path: '/',
      redirect: '/home',
      hidden: true
    },
    {
      path: '/help/:type?',
      name: '帮助中心',
      component: Help,
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/secret',
      name: '隐私政策',
      component: Secret
    },
    {
      path: '/drawlots',
      name: '中签率说明',
      component: drawlots
    },
    {
      path: '/buyer',
      name: '买家须知',
      component: buyer
    },
    {
      path: '/home',
      name: '首页',
      component: Home
    },
    {
      path: '/panicbuyingWithFriend/:id?',
      name: '朋友帮抢',
      component:buyingWithFriend
    },
    {
      path: '/buysuccess',
      name: '成功分享',
      component:buysuccess
    },
    {
      path: '/autarkyRule',
      name: '自营规则说明',
      component:autarkyRule
    },
    {
      path: '/salerKnow',
      name: '卖家须知',
      component:salerKnow
    },
    {
      path: '/shareMyShoese/:id?',
      name: '仓库分享',
      component:shareMyShoese
    },
    {
      path: '/aboutus',
      name: '关于我们',
      component:aboutUs
    },
    {
      path: '/mytable',
      name: '错误收集',
      component:mytable
    },
    // {
    //   path: '/FAQApp',
    //   name: 'app常见问题',
    //   component: FAQApp
    // },
    // {
    //   path: '/homeApp',
    //   name: 'app关于我们',
    //   component: homeApp
    // }
  ]
})
