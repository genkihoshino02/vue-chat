import Vue from 'vue'
import VueRouter from 'vue-router'
// import UserList from '../views/UserList.vue'
import RoomList from '../views/RoomList.vue'
import ChatBoard from '../views/ChatBoard.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'RoomList',
    component: RoomList,
    meta: {requiresAuth: true}
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/chat',
    name: 'ChatBoard',
    component: ChatBoard
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    const user = sessionStorage.getItem('user')
    console.log(JSON.parse(user))
    if (!user) {
      next({
          path: '/login',
          query: {redirect: to.fullPath}
      })
  } else {
      next()
  }

  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (!user) {
  //         next({
  //             path: '/login',
  //             query: {redirect: to.fullPath}
  //         })
  //     } else {
  //         next()
  //     }
  //   })
  } else {
      next() 
  }
})

export default router
