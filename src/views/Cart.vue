<script setup lang="ts">

import { computed } from "vue";

import { toCurrency } from "../shared/utils";
// components
import Transition from "../components/Transition.vue";
import CartBaul from "../components/CartBaul.vue";
// stores
import { almacenCart } from "../stores/cart";
import { storeProducts } from "../stores/products";

//Ini the stores from the import
const cart = almacenCart();
const deProductos = storeProducts();

//Obtain cart.formatted value with a computed property
const formattedCart = computed(() => cart.formattedCart);
</script>

<template>
  <div class="p-4 max-w-4xl mx-auto">
  <!-- Verify the products are loaded-->
    <div v-if="!deProductos.loaded" class="space-y-4">
      <!--Loop to show "cards" in this case 10 and each has a single key, the limit is 10-->
      <Transition v-for="n in 10" :key="n" />
    </div>
    <!--Condition if the cart is empty-->
    <div v-else-if="!formattedCart.length">5
      <h1 class="text-xl">Cart is empty.</h1>
    </div>
    <div v-else class="space-y-4">
      <!--Call component CartBaul, access to each element with cartProduct and index 
      key is working as "unique key???" NOT SURE
      v-for show elements inside Array-->
      <CartBaul
        v-for="(cartProduct, index) in formattedCart"
        :key="index"
        :cartProduct="cartProduct"
      />
      <div class="text-right text-2xl md:text-4xl">
        Total: {{ toCurrency(cart.total) }}
      </div>
    </div>
  </div>
</template>
