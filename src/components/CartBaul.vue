<script setup lang="ts">
import { almacenCart } from '../stores/cart';
import type { CartPreview } from '../stores/cart'
import { toCurrency } from '../shared/utils'

//Funtion almacencart
const cart = almacenCart();

//get property form cartPreview
defineProps<{
    cartProduct: CartPreview
}>();
</script>

<template>
  <div class="card md:card-side bordered">
    <figure class="p-8">
      <img
        :src="cartProduct.image"
        alt="Card Image"
        class="object-contain w-full h-48"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-name">
        <router-link
          class="link link-hover"
          :to="`/product/${cartProduct.id}`"
          >{{ cartProduct.name }}</router-link
        >
      </h2>
      <p>{{ toCurrency(cartProduct.cost) }}</p>
      <div class="card-actions">
        <div class="btn-group">
          <button
            class="btn btn-primary"
            @click="cart.remove(cartProduct.id)"
          >
            -
          </button>
          <button class="btn btn-ghost no-animation">
            {{ cartProduct.quantity }}
          </button>
          <button
            class="btn btn-primary"
            @click="cart.add(cartProduct.id)"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
