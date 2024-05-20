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

    //Docs for actions ==> actions = methods in components
    //https://pinia.vuejs.org/core-concepts/actions.html
actions:{
        // define the action with async
    async obtainProducts(){
        try{
          //Call all"(*)" the db oredered
            const { data: baul , error } = await supabase
                .from("baul")
                .select("*")
                .order("id");
          //Error Management 
            if(error) {
                console.log("error, error");
                return
            }
          //assign the info
            this.productos = baul;
        //console info    
        console.log("gotcha", this.productos);
        console.log("Here u can see the product array", this.productos);
        //Map and tranform the info productos => Producto[]
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