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
    existCart(state) {
      if (state.listProductsCart?.products) {
        return true;
      }
      return false;
    },
    productCartCount(state): number {
      let cartCount = 0;
      if (state.listProductsCart?.products) {
        for (let index = 0; index < state.listProductsCart?.products.length; index++) {
          const product = state.listProductsCart?.products[index];
          cartCount += product.quantity;
        }
      }
      return cartCount;
    },
    productCartExist(state) {
      const products = state.listProductsCart?.products;
      return (productId: string) => {
        if (products) {
          return products.some((product) => product._id === productId);
        }
        return false;
      };
    },
    getCartByProductId: (state) => {
      const products = state.listProductsCart?.products;
      return (productId: string) => {
        if (products) {
          return state.listProductsCart?.products.find((product) => product._id === productId);
        }
        return null;
      };
    },
    getQuantityProduct() {
      return (productId: string) => {
        let quantity = 0;
        const product = this.getCartByProductId(productId);
        if(product) {
          quantity = product.quantity;
        }
        return quantity;
      }
    },

    getTotalPrice(state) {
      let totalPrice = 0;
      const products = state.listProductsCart?.products;
      if (products) {
        for (let index = 0; index < products.length; index++) {
          const product = products[index];
          totalPrice += (product.price - (product.discount || 0)) * product.quantity;
        }
      }
      return totalPrice;
    }
  }
});