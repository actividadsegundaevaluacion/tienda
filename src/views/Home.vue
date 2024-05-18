<script setup lang="ts">

import { computed } from "vue";
// All the components i need to use
import PasswordReset from "@/components/PasswordReset.vue";
import Auth from "@/components/Auth.vue";
import ProductCardTransition from "../components/ProductCardTransition.vue"
import ProductCard from "../components/ProductCard.vue";
// supabase imports
import { getParameterByName } from "@/lib/helpers";
import { userSession } from "@/lib/useAuth";
// stores for user and products
import { almacenAuth } from "@/stores/users";
import { storeProducts } from "../stores/products";

const deProductos = storeProducts();
const user = almacenAuth();

// How in case u need to reset ur password, Copied from an old project of mine
const showPasswordReset = computed(() => {
  const requestType = getParameterByName("type", location.href);
  return requestType === "recovery";
});

const products = computed(() => deProductos.list);
</script>

<template>
  <!--ResetPassword interface-->
  <div
    v-if="showPasswordReset"
    class="w-full h-full flex flex-col justify-center items-center p-4"
  >
  <!--call the component passwordreset-->
    <PasswordReset />
  </div>

  <!--Auth interface-->
  <div
    v-else-if="userSession === null"
    class="w-full h-full flex flex-col justify-center items-center p-4"
  >
    <Auth />
  </div>

  <!--MAIN interface-->
  <div v-else class="p-4 max-w-7xl mx-auto">
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      
      <ProductCardTransition
        v-show="!deProductos.loaded"
        v-for="n in 15"
        :key="n"
      />
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div >
    <div class="flex justify-center">
    <button class="input input-bordered input-accent bg-white w-full max-w-xl" @click="user.handleLogout">
      Exit
    </button></div>
  </div>
</template>