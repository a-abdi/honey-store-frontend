import { defineStore } from "pinia";
import { sendRequest } from "@/common/helpers";
import type { AxiosRequestConfig } from 'axios';
import type { CartData, ListProductsCart, ProductCart } from "@/common/typings/cart.typings";
import { SetToken } from "@/common/typings/common.typings";

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      cartData: null as CartData | null,
      listProductsCart: null as ListProductsCart | null,
    }
  },

  actions: {
    async getCart(config: AxiosRequestConfig) {
      this.cartData = await sendRequest(config, SetToken.User);
      this.listProductsCart = this.cartData?.data!;
    },

    async addToCart(config: AxiosRequestConfig) {
      await sendRequest(config, SetToken.User);
    },

    async updateCart(config: AxiosRequestConfig) {
      await sendRequest(config, SetToken.User);
    },

    async removeFromCart(config: AxiosRequestConfig) {
      await sendRequest(config, SetToken.User);
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
    },

    clearProductCart() {
      this.listProductsCart = null;
      localStorage.removeItem('carts');
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
      const productsCart = state.listProductsCart?.products;
      return (productId: string) => {
        if (productsCart) {
          return productsCart.some((productCart) => productCart.product._id === productId);
        }
        return false;
      };
    },
    getCartByProductId: (state) => {
      const products = state.listProductsCart?.products;
      return (productId: string) => {
        if (products) {
          return state.listProductsCart?.products.find((cartProduct) => cartProduct.product._id === productId);
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
      const productsCart = state.listProductsCart?.products;
      if (productsCart) {
        for (let index = 0; index < productsCart.length; index++) {
          const { product } = productsCart[index];
          totalPrice += (product.price - (product.discount || 0)) * productsCart[index].quantity;
        }
      }
      return totalPrice;
    },

    getSumAllPrice(state) {
      let price = 0;
      const productsCart = state.listProductsCart?.products;
      if (productsCart) {
        for (let index = 0; index < productsCart.length; index++) {
          const { product } = productsCart[index];
          price += product.price * productsCart[index].quantity;
        }
      }
      return price;
    },

    getSumAllDiscount(state) {
      let discount = 0;
      const productsCart = state.listProductsCart?.products;
      if (productsCart) {
        for (let index = 0; index < productsCart.length; index++) {
          const { product } = productsCart[index];
          discount += (product.discount || 0) * productsCart[index].quantity;
        }
      }
      return discount;
    },

    getPercentage() {
      const percentage: number = Math.round(((this.getSumAllDiscount || 0) / (this.getSumAllPrice || 1)) * 1000) / 10;
      return percentage
    }
  }
});