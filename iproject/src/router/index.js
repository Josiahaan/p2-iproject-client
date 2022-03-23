import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
  path: "/login",
  name: "Login",
  beforeEnter: (to, from, next) => {
    if (localStorage.getItem("token")) {
      next({ name: "Home" });
    } else {
      next();
    }
  },
  component: () => import("../views/Login.vue"),
},
{
  path: "/register",
  name: "Register",
  beforeEnter: (to, from, next) => {
    if (localStorage.getItem("token")) {
      next({ name: "Home" });
    } else {
      next();
    }
  },
  component: () => import("../views/Register.vue"),
},
]

const router = new VueRouter({
  routes
})

export default router
