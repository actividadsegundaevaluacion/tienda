<script setup lang="ts">
import { ref } from 'vue'
import { almacenAuth } from '@/stores/users';
import '@/styles/auth-form.scss'; // Importar los estilos

const user = almacenAuth()

const email = ref('')
const password = ref('')
</script>

<template>
  <main class="auth-form-container">
    <div class="auth-form-box">
      <div class="form-control">
        <label>Email</label>
        <input
          type="text"
          class="input input-bordered input-accent"
          placeholder="Your email"
          v-model="email"
        />
      </div>
      <div class="form-control">
        <label>Password</label>
        <input
          type="password"
          class="input input-bordered input-accent"
          placeholder="Your password"
          v-model="password"
        />
      </div>
      <!-- Botón Registrarse, envía un email de validación -->
      <div class="flex flex-col gap-2">
        <a @click="user.handleSignup({ email, password })" 
           href="#" 
           class="btn btn-secondary btn-wide mt-4"
           tabindex="0">
          Sign UP
        </a>
        <!-- Botón Iniciar Sesión (Loguearse) -->
        <a @click="user.handleLogin({ email, password })" 
           href="#" 
           class="btn btn-accent text-white btn-wide mt-1">
          <span v-if="password.length">Enter</span>
          <span v-else>Magic link</span>
        </a>
      </div>
      <!-- Botón Recuperar/Actualizar Contraseña -->
      <div class="mt-2 text-sm leading-5">
        <a @click.prevent="user.handlePasswordReset" href="/" class="text-indigo">
          Forgot password
        </a>
      </div>
      <div class="mt-4">
        <div class="divider">
          <span>O continúa con</span>
        </div>
        <!-- Registro con terceros, Github, Google... -->
        <div class="mt-6">
          <span class="block w-full rounded-md shadow-sm">
            <button
              @click="user.handleOAuthLogin('github')"
              type="button"
              class="btn btn-active btn-wide">
              GitHub
            </button>
          </span>
          <span class="block w-full rounded-md shadow-sm mt-4">
            <button
              @click="user.handleOAuthLogin('google')"
              type="button"
              class="btn btn-outline btn-wide">
              Google
            </button>
          </span>
        </div>
      </div>
    </div>
  </main>
</template>
