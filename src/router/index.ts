import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AdminDashboard from "@/views/admin/dashboard/Index.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
      meta: {
        layout: "AppLayoutUser",
        requiresAuthUser: false,
        requiresAuthAdmin: false,
      }
    },
    {
      path: "/about",
      name: "About",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/admin/login",
      name: "Admin/Auth/Login",
      component: () => import("@/views/admin/auth/Login.vue"),
      meta: {
        layout: "AppLayoutAdmin",
        requiresAuthUser: false,
        requiresAuthAdmin: false,
      }
    },
    {
      path: "/admin/dashborad",
      name: "Admin/Dashboard",
      component: () => import("@/views/admin/dashboard/Dashboard.vue"),
      meta: {
        layout: "AppLayoutAdmin",
        requiresAuthUser: false,
        requiresAuthAdmin: false,
      }
    },
    {
      path: "/admin/dashboard",
      name: "Admin/Dashboard",
      component: AdminDashboard,
      meta: {
        layout: "AppLayoutAdmin",
        requiresAuthUser: false,
        requiresAuthAdmin: true,
      },
      children: [
        {
          path: "users",
          name: "Admin/Dashboard/Users/Index",
          component: () => import("@/views/Admin/Dashboard/Users/Index.vue"),
           
          children: [
            {
              path: "",
              name: "Admin/Dashboard/Users/Home",
              component: () => import("@/views/Admin/Dashboard/Users/Home.vue"),
            },
  
            {
              path: ":userId(\\d+)",
              name: "Admin/Dashboard/Users/Show",
              component: () => import("@/views/Admin/Dashboard/Users/Show.vue"),
            },
          ]
          
        },
  
        {
          path: "products",
          name: "Admin/Dashboard/Products/Index",
          component: () => import("@/views/Admin/Dashboard/Products/Index.vue"),
          children: [
            {
              path: "",
              name: "Admin/Dashboard/Products/Home",
              component: () => import("@/views/Admin/Dashboard/Products/Home.vue"),
            },
  
            {
              path: "create",
              name: "Admin/Dashboard/Products/Create",
              component: () => import("@/views/Admin/Dashboard/Products/Create.vue"),
            },
  
            {
              path: ":productId(\\d+)/edit",
              name: "Admin/Dashboard/Products/Edit",
              component: () => import("@/views/Admin/Dashboard/Products/Edit.vue"),
            },
  
            {
              path: ":productId(\\d+)",
              name: "Admin/Dashboard/Products/Show",
              component: () => import("@/views/Admin/Dashboard/Products/Show.vue"),
            },
          ]
        },
  
        {
          path: "categories",
          name: "admin/dashboard/categories/Index",
          component: () => import("@/views/admin/dashboard/categories/Index.vue"),
          children: [
            {
              path: "",
              name: "admin/dashboard/categories/Home",
              component: () => import("@/views/admin/dashboard/categories/Home.vue"),
            },
  
            {
              path: "create",
              name: "Admin/Dashboard/Categories/Create",
              component: () => import("@/views/Admin/Dashboard/Categories/Create.vue"),
            },
  
            {
              path: ":categoryId(\\d+)/edit",
              name: "Admin/Dashboard/Categories/Edit",
              component: () => import("@/views/Admin/Dashboard/Categories/Edit.vue"),
            },
          ]
        },
  
        {
          path: "carts",
          name: "Admin/Dashboard/Carts",
          component: () => import("@/views/Admin/Dashboard/Carts.vue"),
        },
      ]
    },
  ],
});

export default router;
