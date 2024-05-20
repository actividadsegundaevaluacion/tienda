<script setup lang="ts">
import { almacenCart } from '../stores/cart';
import type { Product } from '../stores/products';
import { toCurrency } from '../shared/utils';

const cart = almacenCart();

defineProps<{
  product: Product;
}>();
</script>

<template>
  <div class="card bordered">
    <figure class="px-8 pt-10">
      <img
        :src="product.image"
        alt="Card Image"
        class="object-contain w-full h-64"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-name">
        <router-link class="link link-hover" :to="`/product/${product.id}`">{{
          product.name
        }}</router-link>
      </h2>
      <p>{{ toCurrency(product.price) }}</p>
      <div class="justify-end card-actions">
        <button class="btn btn-primary" @click="cart.add(product.id)">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>
