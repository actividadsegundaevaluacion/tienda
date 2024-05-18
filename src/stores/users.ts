import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";
import type { Provider } from "@supabase/supabase-js";

//Typescript structure ofr an objet with credentials
interface Credentials {
  email?: string;
  password?: string;
  provider?: "bitbucket" | "github" | "gitlab" | "google" ;
}

export const almacenAuth = defineStore({
  id: "user",
  state: () => ({}),
  actions: {
    // LOG IN
    async handleLogin(credentials: Credentials) {
      try {
        if (!credentials.email || !credentials.password) {
          alert("Please enter your email and password");
          return;
        }
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });
        if (error) {
          alert("ERROR with the access: " + error.message);
        }
        // ERROR not detected, user no detected and send a link
        if (!error && !data.user) {
          alert("¡Check your mail and click the link!");
        }
      } catch (error: any) {
        console.error("Error detected:", error.message);
        alert(error.error_description || error.message);
      } 
    },
    // Register a new user and send an email
    async handleSignup(credentials: Credentials) {
      try {
        const { email, password } = credentials;
        // Notify the user if they have not filled out their credentials
        if (!email || !password) {
          alert("Please enter your email and password");
          return;
        }
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
          alert(error.message);
          console.error(error, error.message);
          return;
        }
        alert("Verified registration, an email will be sent for activation");
      } catch (err) {
        alert("Sorry a startup error");
        console.error("Error de singin", err);
      }
    },

    // Recover/updae user's password
    async handlePasswordReset() {
      const email = prompt("email:");
      if (!email) {
        window.alert("need the email");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) {
          alert("Error: " + error.message);
        } else {
          alert("An email will be sent to reset your password");
        }
      }
    },
    // Updatepassword
    async handleUpdateUser(credentials: Credentials) {
      try {
        if (!credentials.email && !credentials.password) {
          alert("Por favor introduce los datos a actualizar.");
          return;
        }
        const { error } = await supabase.auth.updateUser(credentials);
        if (error) {
          alert("Ha ocurrido un error al actualizar la información del usuario: " + error.message);
        } else {
          alert("¡Se ha actualizado la información del usuario!");
          window.location.href = "/";
        }
      } catch (error: any) {
        alert("Ha ocurrido un error actualizando la información del usuario: " + error.message);
      }
    },
    // LOG OUT
    async handleLogout() {
      console.log("Get out");
      try {
        const { error } = await supabase.auth.signOut();

        if (error) {
          alert("An error occurred while logging out");
          console.error("Error", error);
          return;
        }

        alert("Thx 4 leave");
      } catch (error: any) {
        alert("Dunno what happend");
        console.error("Error", error.message);
      }
    },
  },
});
