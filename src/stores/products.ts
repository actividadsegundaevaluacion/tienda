import { defineStore } from "pinia";
import { supabase } from '@/lib/supabase';

export interface Product{
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

interface ProductState {
    items: Record<string, Product>;
    ids: string[];
    productos: Product[];
}

export const storeProducts = defineStore({
    id: "productos",
    state: (): ProductState => ({
      items: {},
      ids: [],
      productos: [],
    }),
    getters: {
      list(): Product[] {
        return this.ids.map((i) => this.items[i]);
      },
      loaded(): boolean {
        return this.ids.length > 0;
      },
    },

actions:{
        
    async obtenerProductos(){
        try{
            const { data: baul , error } = await supabase
                .from("baul")
                .select("*")
                .order("id");
            if(error) {
                console.log("error, error");
                return
            }
            this.productos = baul;
        console.log("gotcha", this.productos);
        console.log("Here u can see the product array", this.productos);
        const data: Product[] = this.productos;
        this.ids = data.map((product) => {
          this.items[product.id] = product;
          return product.id;
        });
        console.log("This is the ids array", this.ids);
        console.log("Objet items", this.items);
      } catch (err) {
        console.error("Error retrieving data from db", err);
      }
    },
  },
});