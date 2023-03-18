import { defineStore } from "pinia";
import { sendRequest } from "@/common/helpers";
import type { AxiosRequestConfig } from 'axios';
import type { CartData, ListProductsCart, ProductCart } from "@/common/typings/cart.typings";

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      cartData: null as CartData | null,
      listProductsCart: null as ListProductsCart | null,
    }
  },

  actions: {
    async getCart(config: AxiosRequestConfig) {
      this.cartData = await sendRequest(config);
    },
    setListProductCart(productCart: ProductCart) {
      if( this.listProductsCart?.products ) {
        this.listProductsCart.products.push(productCart);
      } else {
        this.listProductsCart = {
          products: [productCart],
        };
      }
    },
    setCartLocalStorage() {
      localStorage.setItem('carts', JSON.stringify(this.listProductsCart));
    }
  },

  getters: {
    productCartCount(): number | undefined {
      return this.listProductsCart?.products.length;
    }
  }
});