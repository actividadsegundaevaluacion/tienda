<script setup lang="ts">
import { onMounted } from 'vue';
import BaseInput from '../components/form/BaseInput.vue';
import { almacenForm } from '../stores/form';

// Call to the function 
const form = almacenForm();

onMounted(() => {
  form.obtainInfo();
});
</script>

<template>
  <div class="form-container">
    <form class="form">
      <div>
        <img
          v-if="form.src"
          :src="form.src"
          class="avatar"
          :style="{ height: form.size, width: form.size }"
        />
        <div
          v-else
          class="avatar bg-gray-500"
          :style="{ height: form.size, width: form.size }"
        ></div>
        <div :style="{ width: form.size }">
          <!-- Save -->
          <label
            v-if="!form.editar"
            class="flex content-center btn btn-wide btn-accent"
            for="single"
          >
            {{ form.uploading ? 'Saving...' : 'Save' }}
            <input
              style="visibility: hidden; position: absolute"
              type="file"
              id="single"
              accept="image/*"
              @change="form.subirArchivoAgregar"
              :disabled="form.uploading"
            />
          </label>
          <!-- Update -->
          <label
            v-else
            class="flex content-center btn btn-accent"
            for="single"
          >
            {{ form.uploading ? 'Updating...' : 'Update' }}
            <input
              style="visibility: hidden; position: absolute"
              type="file"
              id="single"
              accept="image/*"
              @change="form.subirArchivoActualizar"
              :disabled="form.uploading"
            />
          </label>
        </div>
      </div>
      <BaseInput v-model="form.producto.name" type="text" label="Name" />
      <BaseInput v-model="form.producto.price" type="text" label="Price" />
      <BaseInput
        v-model="form.producto.description"
        type="text"
        label="Descripción"
      />
    </form>
    <!-- TABLE -->
    <table class="table">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">name</th>
          <th scope="col">Price</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in form.productos" :key="index">
          <th scope="row">{{ index }}</th>
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>
            <button
              @click.prevent="
                form.obtenerDatoId(item.id);
                form.editar = !form.editar;
              "
              class="btn btn-primary"
            >
              Edit
            </button>
          </td>
          <td>
            <button @click="form.eliminarDato(item.id)" class="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
