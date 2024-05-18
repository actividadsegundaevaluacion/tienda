<script setup lang="ts">

import { storeProducts } from './stores/products';
import { usePersistCart } from "@/composables/usePersistCart";
import Nav from "./components/Nav.vue";

const deProductos = storeProducts();
deProductos.obtenerProductos();

usePersistCart();
</script>

<template>
  <Nav />
  <router-view></router-view>
</template>