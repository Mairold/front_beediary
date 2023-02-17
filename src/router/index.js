import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import ApiaryView from "@/views/ApiaryView.vue";
import HiveView from "@/views/HiveView.vue";
import ProfileView from "@/views/ProfileView.vue";
import NewUserView from "@/views/NewUserView.vue";
import AddApiaryView from "@/views/AddApiaryView.vue";
import TaskView from "@/views/TaskView.vue";
import AddVisitView from "@/views/AddVisitView.vue";

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
    name: 'apiaryRoute',
    component: ApiaryView
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
    path: '/add-apiary',
    name: 'addApiaryRoute',
    component: AddApiaryView
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
  }
]

const router = new VueRouter({
  routes
})

export default router
