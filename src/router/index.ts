import { createRouter, createWebHistory } from "vue-router";
import AdminDashboard from "@/views/admin/dashboard/Index.vue";
import { authUserGurd } from "@/middlewares/beforeEachAuthUser";
import { authAdminrGurd } from "@/middlewares/beforeEachAuthAdmin";
import {guestUser}  from "@/middlewares/beforeEnterGuestUser";
import { guestAdmin } from "@/middlewares/beforeEnterGuestAdmin";
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
      path: "/category/:name",
      name: "Category",
      component: () => import("@/views/category/categoryIndex.vue"),
      meta: {
        layout: "AppLayoutUser",
        requiresAuthUser: false,
        requiresAuthAdmin: false,
      }
    },
    {
      path: "/admin/login",
      name: "admin/auth/Login",
      component: () => import("@/views/admin/auth/Login.vue"),
      meta: {
        layout: "AppLayoutAdmin",
        requiresAuthUser: false,
        requiresAuthAdmin: false,
      },
      beforeEnter: guestAdmin()
    },
    {
      path: "/login",
      name: "user/auth/Login",
      component: () => import("@/views/user/auth/Login.vue"),
      meta: {
        layout: "AppLayoutDefault",
        requiresAuthUser: false,
        requiresAuthAdmin: false,
      },
      beforeEnter: guestUser()
    },
    {
      path: "/signup",
      name: "user/auth/Signup",
      component: () => import("@/views/user/auth/Signup.vue"),
      meta: {
        layout: "AppLayoutDefault",
        requiresAuthUser: false,
        requiresAuthAdmin: false,
      },
      beforeEnter: guestUser()
    },
    {
      path: "/products/:productId/:productName",
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
      path: "/payment",
      name: "order/Payment",
      component: () => import("@/views/order/Payment.vue"),
      meta: {
        layout: "AppLayoutUser",
        requiresAuthUser: true,
        requiresAuthAdmin: false,
      }
    },

    {
      path: "/profile",
      name: "Profile",
      component: () => import("@/views/profile/ProfileIndex.vue"),
      meta: {
        layout: "AppLayoutUser",
        requiresAuthUser: true,
        requiresAuthAdmin: false,
      },
      children: [
        {
          path: "",
          name: "profile/personal-info/PersonalInfoIndex",
          component: () => import("@/views/profile/personal-info/PersonalInfoIndex.vue"),
        },
        {
          path: "address",
          name: "profile/address/AddressIndex",
          component: () => import("@/views/profile/address/AddressIndex.vue"),
        },
        {
          path: "orders",
          name: "profile/order/OrderIndex",
          component: () => import("@/views/profile/order/OrderIndex.vue"),
          children: [
            {
              path: "current",
              name: "profile/order/CurrentOrder",
              component: () => import("@/views/profile/order/CurrentOrder.vue"),
            },
            {
              path: "delivered",
              name: "profile/order/DeliveredOrder",
              component: () => import("@/views/profile/order/DeliveredOrder.vue"),
            },
            {
              path: "canceled",
              name: "profile/order/CanceledOrder",
              component: () => import("@/views/profile/order/CanceledOrder.vue"),
            },
            {
              path: "returned",
              name: "profile/order/ReturnedOrder",
              component: () => import("@/views/profile/order/ReturnedOrder.vue"),
            }
          ]
        },
      ]
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
          path: "orders",
          name: "admin/dashboard/orders/Index",
          component: () => import("@/views/admin/dashboard/orders/Index.vue"),
          children: [
            {
              path: "",
              name: "admin/dashboard/orders/Home",
              component: () => import("@/views/admin/dashboard/orders/Home.vue"),
            },
  
            {
              path: "create",
              name: "admin/dashboard/orders/Create",
              component: () => import("@/views/admin/dashboard/orders/Create.vue"),
            },
  
            {
              path: `:orsers/edit`,
              name: "admin/dashboard/orders/Edit",
              component: () => import("@/views/admin/dashboard/orders/Edit.vue"),
            },
          ]
        },
        {
          path: "comment",
          name: "admin/dashboard/comment/Index",
          component: () => import("@/views/admin/dashboard/comment/Index.vue"),
          children: [
            {
              path: "",
              name: "admin/dashboard/comment/Home",
              component: () => import("@/views/admin/dashboard/comment/Home.vue"),
            },
          ]
        },
      ]
    },
  ],
});

authUserGurd(router);
authAdminrGurd(router);
export default router;
