import { createRouter, createWebHistory } from "vue-router"

//Views
import LoginView from "../views/LoginView.vue"
import AttendanceView from "../views/AttendanceView.vue"
import EmployeeView from "../views/EmployeeView.vue"
import HomeView from "../views/HomeView.vue"
import LeaveView from "../views/LeaveView.vue"
import PayrollView from '../views/PayrollView.vue'

const routes = [
  { path: "/", name: "login", component: LoginView },
  { path: '/', name: 'home', component: HomeView },
  { path: '/employees', name: 'employees', component: EmployeeView },
  { path: '/payroll', name: 'payroll', component: PayrollView },
  { path: '/leave', name: 'leave', component: LeaveView },
  { path: '/attendance', name: 'attendance', component: AttendanceView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("loggedIn");

  if (to.name !== "login" && !isLoggedIn) {
    next({ name: "login" });
  } else {
    next();
  }
});

