import { defineStore } from "pinia";
import { CART_STORAGE } from "../composables/usePersistCart";
import { storeProducts } from "./products";

// type of data
export interface Purchase {
  productId: string;
  quantity: number;
}
// type of data
interface CartState {
  contents: Record<string, Purchase>;
}
// type of data
export interface CartPreview {
  id: string;
  image: string;
  name: string;
  quantity: number;
  cost: number;
}

export const almacenCart = defineStore({
  id: "cart",

  state: (): CartState => ({
    contents: JSON.parse(localStorage.getItem(CART_STORAGE) as string) ?? {},
  }),

  getters: {
    count(): number {
      // count
      return Object.keys(this.contents).reduce((acc, id) => {
        return acc + this.contents[id].quantity;
      }, 0);
    },

    total(): number {
      const products = storeProducts();
      return Object.keys(this.contents).reduce((acc, id) => {
        return acc + products.items[id].price * this.contents[id].quantity;
      }, 0);
    },

    //Call the funtion storeProducts
    formattedCart(): CartPreview[] {
      const products = storeProducts();
      
      //verify if loaded
      if (!products.loaded) return [];

      //Array this.contents where this.contents represent the content of each productid
      return Object.keys(this.contents).map((productId) => {
        //Obtain the info of productid
        const purchase = this.contents[productId];

        return {
          id: purchase.productId,
          image: products.items[purchase.productId].image,
          name: products.items[purchase.productId].name,
          quantity: purchase.quantity,
          cost: purchase.quantity * products.items[purchase.productId].price,
        };
      });
    },
  },

  actions: {
    add(productId: string) {
      if (this.contents[productId]) {
        this.contents[productId].quantity += 1;
      } else {
        this.contents[productId] = {
          productId,
          quantity: 1,
        };
      }
    },
    remove(productId: string) {
      if (!this.contents[productId]) {
        return;
      }

      this.contents[productId].quantity -= 1;

      if (this.contents[productId].quantity === 0) {
        delete this.contents[productId];
      }
    },
  },
});
