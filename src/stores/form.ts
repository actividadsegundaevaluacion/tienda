import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface TiposEstado {
  productos: Product[];
  size: string;
  uploading: boolean;
  loading: boolean;
  src: string;
  files: any;
  filePath: any;
  error: string | null;
  editar: boolean;
  urlDescarga: any;
  producto: Product;
}

export const almacenForm = defineStore({
  id: "form",
  state: (): TiposEstado => ({
    productos: [],
    size: "16em",
    uploading: false,
    loading: false,
    src: "",
    files: null,
    filePath: null,
    error: null,
    editar: false,
    urlDescarga: {},
    producto: {
      id: "",
      name: "",
      price: 0,
      description: "",
      image: "",
    },
  }),
  actions: {
    async obtenerDatos() {
      try {
        const { data: baul, error } = await supabase
          .from("baul")
          .select("*")
          .order("id");
        if (error) {
          console.log("error", error);
          return;
        }
        // Cuando no devuelve datos
        if (baul === null) {
          this.productos = [];
          return;
        }
        // Cuando devuelve datos
        this.productos = baul;
        console.log("Productos ", this.productos);
      } catch (err) {
        console.error("Error retrieving data from db", err);
      }
    },
    async obtenerDatoId(id: string) {
      try {
        const { data: baul, error } = await supabase
          .from("baul")
          .select("id, name, description, price, image")
          .eq("id", id)
          .single();
        if (error) {
          console.log("error", error);
          return;
        }
        // Cuando no devuelve datos
        if (baul === null) {
          this.productos = [];
        }
        // Cuando devuelve datos
        this.producto = baul;
        console.log("Producto ", this.producto);
      } catch (err) {
        console.error("Error retrieving data from db", err);
      }
    },
    async eliminarDato(id: string) {
      try {
        await supabase.from("baul").delete().eq("id", id);
        console.log("Dato eliminado", id);
      } catch (error) {
        console.error("error", error);
      }
    },
    async agregarDato() {
      this.loading = true;
      try {
        const producto = {
          name: this.producto.name,
          price: this.producto.price,
          description: this.producto.description,
          image: this.urlDescarga,
        };
        const { data, error } = await supabase
          .from("baul")
          .insert(producto)
          .single();
        if (error) {
          alert(error);
          console.error("There was an error inserting", error.message);
          return null;
        }
        console.log("Nuevo producto creado");
        return data;
      } catch (err) {
        alert("Error");
        console.error("Unknown problem inserting to db", err);
        return null;
      } finally {
        this.loading = false;
      }
    },

    async actualizarDato() {
      this.loading = true;
      try {
        const datos = {
          id: this.producto.id,
          name: this.producto.name,
          price: this.producto.price,
          description: this.producto.description,
          image: this.urlDescarga,
        };
        const { error } = await supabase.from("baul").upsert([datos], {
          onConflict: 'id' // Si es necesario manejar conflictos por id
        });
        if (error) throw error;
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert("Unknown error updating data");
        }
      } finally {
        this.loading = false;
      }
    },
    
    async subirArchivoAgregar(event: any) {
      // Selecciona el archivo y lo prepara
      this.files = event.target.files;
      try {
        this.uploading = true;
        if (!this.files || this.files.length === 0) {
          throw new Error("You must select an image to upload.");
        }
        // Datos archivo
        const file = this.files[0];
        const fileExt = file.name.split(".").pop(); // varias ext
        const fileName = `${Math.random()}.${fileExt}`; // nombre random
        this.filePath = `avatars/${fileName}`; // ajustar ruta del archivo
        // Sube el archivo al storage
        console.log("filePath ", this.filePath);
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(this.filePath, file);
        if (uploadError) throw uploadError;
        // Obtén la URL de descarga
        const { publicUrl  } = supabase.storage.from("avatars").getPublicUrl(this.filePath).data;
        this.urlDescarga = publicUrl ;
        console.log("urlDescarga", this.urlDescarga);
        // Descarga la imagen
        this.downloadImage();
        this.agregarDato();
      } catch (error) {
        alert(error);
        console.error('Error uploading file:', error);
      } finally {
        this.uploading = false;
      }
    },
    
    async subirArchivoActualizar(event: any) {
      // Selecciona el archivo y lo prepara
      this.files = event.target.files;
      try {
        this.uploading = true;
        if (!this.files || this.files.length === 0) {
          throw new Error("You must select an image to upload.");
        }
        // Datos archivo
        const file = this.files[0];
        const fileExt = file.name.split(".").pop(); // varias ext
        const fileName = `${Math.random()}.${fileExt}`; // nombre random
        this.filePath = `avatars/${fileName}`; // ajustar ruta del archivo
        // Sube el archivo al storage
        console.log("filePath ", this.filePath);
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(this.filePath, file);
        if (uploadError) throw uploadError;
        // Obtén la URL de descarga
        const { publicUrl  } = supabase.storage.from("avatars").getPublicUrl(this.filePath).data;
        this.urlDescarga = publicUrl ;
        console.log("urlDescarga", this.urlDescarga);
        // Descarga la imagen
        this.downloadImage();
        this.actualizarDato();
      } catch (error) {
        alert(error);
        console.error('Error uploading file:', error);
      } finally {
        this.uploading = false;
      }
    },
    
    async downloadImage() {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(this.filePath);
        console.log("download", this.filePath);
        if (error) throw error;
        this.src = URL.createObjectURL(data as any);
        console.log("src ", this.src);
      } catch (error) {
        console.error("Error downloading image: ", error);
      }
    }, 
  },
});
