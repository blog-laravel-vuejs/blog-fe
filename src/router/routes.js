import { createRouter, createWebHistory } from 'vue-router'
import useEventBus from "@/composables/useEventBus";
const { emitEvent } = useEventBus();
import NProgress from "nprogress";

// admin
import AdminMain from "@/components/admin/AdminMain";
import AdminDashboard from "@/components/admin/admin-dashboard/AdminDashboard";
import ManageManager from "@/components/admin/admin-dashboard/manage-manager/ManageManager";
import AdminLogin from "@/components/admin/auth/AdminLogin";

// user
import UserRegister from "@/components/user/auth/UserRegister";
import UserMain from "@/components/user/UserMain";
import AccountSetting from "@/components/user/account-setting/AccountSetting";
import UserResetPassword from "@/components/user/auth/UserResetPassword";
import UserLogin from "@/components/user/auth/UserLogin";



//Other
import CommonNotFound from '@/components/common/CommonNotFound'
// middleware authUser
const authUser = (to, from, next) =>{
    const user = localStorage.getItem('user');
    if (user) next();
    else {
        next({ name: 'UserLogin' });
        emitEvent('eventError', 'You need to login!');
    }
}
// middleware authAdmin
const authAdmin = (to, from, next) => {
    const admin = localStorage.getItem('admin');
    if (admin) next();
    else {
        next({ name: 'AdminLogin' });
        emitEvent('eventError', 'You need to login!');
    }
};
// check user logged 
const loggedUser = (to, from, next) => {
    const user = localStorage.getItem('user');
    if (user) next({ name: 'AccountSetting' });
    else next();
};

// check amdin logged 
const loggedAdmin = (to, from, next) => {
    const admin = localStorage.getItem('admin');
    if (admin) next({ name: 'ManageManager' });
    else next();
};

const routes = [
  {
    path: "/register",
    component: UserRegister,
    name: "UserRegister",
    beforeEnter: loggedUser,
  },
  {
    path: "/login",
    component: UserLogin,
    name: "UserLogin",
    beforeEnter: loggedUser,
  },
  {
    path: "/reset-password",
    component: UserResetPassword,
    name: "UserResetPassword",
    beforeEnter: loggedUser,
  },

  {
    path: "/",
    component: UserMain,
    name: "UserMain",
    beforeEnter: authUser,
    children: [
      {
        path: "account-setting",
        name: "AccountSetting",
        component: AccountSetting,
      },
    ],
  },
  {
    path: "/admin",
    component: AdminMain,
    name: "AdminMain",
    children: [
      {
        path: "login",
        name: "AdminLogin",
        component: AdminLogin,
        beforeEnter: loggedAdmin,
      },
      {
        path: "",
        name: "AdminDashboard",
        component: AdminDashboard,
        beforeEnter: authAdmin,
        children: [
          {
            path: "manage-manager",
            name: "ManageManager",
            component: ManageManager,
          },
        ],
      },
    ],
  },
  {
    path: "/:CommonNotFound(.*)*",
    component: CommonNotFound,
    name: "CommonNotFound",
  },
];

const router = createRouter({
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes: routes,
});

router.beforeResolve((to, from, next) => {
    if (to.name) {
      NProgress.start();
    }
    next()
})

router.afterEach(() => {
  NProgress.done();
});
export default router
