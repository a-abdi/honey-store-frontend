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
        layout: "AppLayoutAdmin",
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
          name: "admin/dashboard/products/Index",
          component: () => import("@/views/admin/dashboard/products/Index.vue"),
          children: [
            {
              path: "",
              name: "admin/dashboard/products/Home",
              component: () => import("@/views/admin/dashboard/products/Home.vue"),
            },
  
            {
              path: "create",
              name: "admin/dashboard/products/Create",
              component: () => import("@/views/admin/dashboard/products/Create.vue"),
            },
  
            {
              path: ":productId/edit",
              name: "admin/dashboard/products/Edit",
              component: () => import("@/views/admin/dashboard/products/Edit.vue"),
            },
  
            {
              path: ":productId",
              name: "admin/dashboard/products/Show",
              component: () => import("@/views/admin/dashboard/products/Show.vue"),
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
              name: "admin/dashboard/categories/Create",
              component: () => import("@/views/admin/dashboard/categories/Create.vue"),
            },
  
            {
              path: `:categoryId/edit`,
              name: "admin/dashboard/categories/Edit",
              component: () => import("@/views/admin/dashboard/categories/Edit.vue"),
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
