<script setup lang="ts">

import { storeProducts } from './stores/products';
import { usePersistCart } from "@/composables/usePersistCart";
import Nav from "./components/Nav.vue";

//Obtain Objet from storeProducts
const deProductos = storeProducts();
deProductos.obtainProducts();

//Import Cart to show
usePersistCart();
</script>

<!--Show navbar and the routes-->
<template>
  <Nav />
  <router-view></router-view>
</template>