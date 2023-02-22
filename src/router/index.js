import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import HiveView from "@/views/HiveView.vue";
import ProfileView from "@/views/ProfileView.vue";
import NewUserView from "@/views/NewUserView.vue";
import TaskView from "@/views/TaskView.vue";
import AddVisitView from "@/views/AddVisitView.vue";
import ForgotPasswordView from "@/views/ForgotPasswordView.vue";
import ApiaryHivesView from "@/views/ApiaryHivesView.vue";
import ApiariesView from "@/views/ApiariesView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homeRoute',
    component: HomeView
  },
  {
    path: '/login',
    name: 'loginRoute',
    component: LoginView
  },
  {
    path: '/apiary',
    name: 'apiaryHivesRoute',
    component: ApiaryHivesView
  },{
    path: '/hive',
    name: 'hiveRoute',
    component: HiveView
  },
  {
    path: '/profile',
    name: 'profileRoute',
    component: ProfileView
  },
  {
    path: '/new-user',
    name: 'newUserRoute',
    component: NewUserView
  },
  {
    path: '/task',
    name: 'taskRoute',
    component: TaskView
  },
  {
    path: '/add-visit',
    name: 'addVisitRoute',
    component: AddVisitView
  },
  {
    path: '/forgot-password',
    name: 'forgotPasswordRoute',
    component: ForgotPasswordView
  },
  {
    path: '/apiaries',
    name: 'apiariesRoute',
    component: ApiariesView
  }
]

const router = new VueRouter({
  routes
})

export default router
