import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/HelloWorld'
import LoginPage from '@/components/Login'

Vue.use(Router)

const guest = (to, from, next) => {
  if (!localStorage.getItem("authToken")) {
    return next()
  } else {
    return next("/")
  }
}

const auth = (to, from, next) => {
  if (localStorage.getItem("authToken")) {
    return next()
  } else {
    return next("/login")
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      beforeEnter: auth,
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    }
  ],
  base: process.env.BASE_URL
})
