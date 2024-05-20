<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeProducts } from '../stores/products';

//Ini StoreProducts to take a list of objets and his state, void string
const productStore = storeProducts();
const router = useRouter();
const input = ref('');

const searchResults = computed(() => {
  if (!input.value || input.value.length < 2) return [];

  return productStore.list.filter((item) => {   // Valor en minúsculas
    return item.name.toLowerCase().includes(input.value.toLowerCase());
  });
});

//clear the input value and with router u can loock for an id
const navigate = (id: string) => {
  input.value = '';
  router.push(`/product/${id}`);
};
</script>

<template>
  <div class="dropdown dropdown-end">
    <div class="form-control">
      <input
        type="text"
        placeholder="Search..."
        class="input input-ghost bg-gray-800 text-gray-200 border-gray-600 focus:border-orange-300"
        :disabled="!productStore.loaded"
        v-model="input"
      />
    </div>
    <ul
      class="shadow menu dropdown-content bg-gray-800 rounded-box w-64 text-gray-200 overflow-y-scroll"
      style="max-height: 50vh"
    >
      <li v-for="product in searchResults" :key="product.id">
        <a
          href="#"
          @click.prevent="navigate(product.id)"
          class="hover:bg-gray-700 hover:text-orange-300"
          v-text="product.name"
        ></a>
      </li>
    </ul>
  </div>
</template>