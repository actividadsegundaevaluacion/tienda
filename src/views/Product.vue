<script setup lang="ts">

import { computed } from 'vue';
// utils
import { toCurrency } from '../shared/utils';
// components
import Transition from '../components/Transition.vue';
// stores
import { almacenCart } from '../stores/cart';
import { storeProducts } from '../stores/products';
// interfaces
import type { Product } from '../stores/form'
// route
import { useRoute } from 'vue-router';

//Call the funtions to create and configure the store
const cartStore = almacenCart();
const productStore = storeProducts();

//Obtain the instance
const route = useRoute();

//Return the computed propeties => access the productID parameter of the current route
const product = computed<Product>(
  () => productStore.items[route.params.productId as string]
);
</script>

<template>
  <div class="p-4 max-w-4xl mx-auto">
    <!--SHow component transition IF the storage IS NOT LOADED-->
    <div v-if="!productStore.loaded">
      <Transition />
    </div>

    <!--Show product details if are available-->
    <div class="card lg:card-side bordered" v-else-if="product">
      <figure class="px-10 pt-10">
        <img
          :src="product.image"
          alt="Card Image"
          class="object-contain w-full h-64"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-name" v-text="product.name"></h2>
        <p v-text="product.description"></p>
        <p class="mt-4 text-lg">{{ toCurrency(product.price) }}</p>
        <div class="card-actions">
          <button class="btn btn-primary" @click="cartStore.add(product.id)">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    <!-- Error if cannot found the product-->
    <div v-else>
      <h1 class="text-xl text-error">
        No product found with id {{ route.params.productId }}
      </h1>
    </div>
  </div>
</template>