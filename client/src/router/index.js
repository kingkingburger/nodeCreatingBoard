import { createRouter, createWebHistory } from "vue-router";
import ProductListVue from "@/views/ProductList.vue";
import ProductDetailVue from "@/views/ProductDetail.vue";
import ProductCreateVue from "@/views/ProductCreate.vue";
import SalesListVue from "@/views/SalesList.vue";
import ImageInsertVue from "@/views/ImageInsert.vue";
import ProductUpdateVue from "@/views/ProductUpdate.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: ProductListVue,
  },
  {
    path: "/detail",
    name: "ProductDetailVue",
    component: ProductDetailVue,
  },
  {
    path: "/create",
    name: "ProductCreateVue",
    component: ProductCreateVue,
  },
  {
    path: "/sales",
    name: "SalesList",
    component: SalesListVue,
  },
  {
    path: "/image_insert",
    name: "ImageInsert",
    component: ImageInsertVue,
  },
  {
    path: "/update",
    name: "ProductUpdate",
    component: ProductUpdateVue,
  },

  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
