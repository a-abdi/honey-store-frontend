import { createRouter, createWebHistory } from "vue-router";
import AdminDashboard from "@/views/admin/dashboard/Index.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/HomeView.vue"),
      meta: {
        layout: "AppLayoutUser",
        requiresAuthUser: false,
        requiresAuthAdmin: false,
      }
    },
    {
      path: "/about",
      name: "About",
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/admin/login",
      name: "admin/auth/Login",
      component: () => import("@/views/admin/auth/Login.vue"),
      meta: {
        layout: "AppLayoutAdmin",
        requiresAuthUser: false,
        requiresAuthAdmin: false,
      }
    },
    {
      path: "/login",
      name: "user/auth/Login",
      component: () => import("@/views/user/auth/Login.vue"),
      meta: {
        layout: "AppLayoutUser",
        requiresAuthUser: false,
        requiresAuthAdmin: false,
      }
    },
    {
      path: "/signup",
      name: "user/auth/Signup",
      component: () => import("@/views/user/auth/Signup.vue"),
      meta: {
        layout: "AppLayoutUser",
        requiresAuthUser: false,
        requiresAuthAdmin: false,
      }
    },
    {
      path: "/products/:productId",
      name: "product/Show",
      component: () => import("@/views/products/Show.vue"),
      meta: {
        layout: "AppLayoutUser",
        requiresAuthUser: false,
        requiresAuthAdmin: false,
      }
    },
    {
      path: "/cart",
      name: "cart/UserCart",
      component: () => import("@/views/cart/UserCart.vue"),
      meta: {
        layout: "AppLayoutUser",
        requiresAuthUser: false,
        requiresAuthAdmin: false,
      }
    },
    {
      path: "/shipping",
      name: "shipping/UserAddress",
      component: () => import("@/views/shipping/UserAddress.vue"),
      meta: {
        layout: "AppLayoutUser",
        requiresAuthUser: false,
        requiresAuthAdmin: false,
      }
    },
    {
      path: "/payment",
      name: "order/Payment",
      component: () => import("@/views/order/Payment.vue"),
      meta: {
        layout: "AppLayoutUser",
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
          path: "properties",
          name: "admin/dashboard/properties/Index",
          component: () => import("@/views/admin/dashboard/properties/Index.vue"),
          children: [
            {
              path: "",
              name: "admin/dashboard/properties/Home",
              component: () => import("@/views/admin/dashboard/properties/Home.vue"),
            },
  
            {
              path: "create",
              name: "admin/dashboard/properties/Create",
              component: () => import("@/views/admin/dashboard/properties/Create.vue"),
            },
  
            {
              path: `:propertyId/edit`,
              name: "admin/dashboard/properties/Edit",
              component: () => import("@/views/admin/dashboard/properties/Edit.vue"),
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
