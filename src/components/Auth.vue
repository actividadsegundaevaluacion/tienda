<script setup lang="ts">
import { ref } from 'vue'
import { almacenAuth } from '@/stores/users';

const user = almacenAuth()

const email = ref('')
const password = ref('')
</script>

<template>
  <main class="w-full flex justify-center sm:w-1/2 xl:w-1/3">
    <div class="border-orange-500 p-8 border-t-12 mb-6 rounded-lg shadow-lg bg-yellow-100">
      <div class="form-control w-full max-w-xl">
        <label class="font-bold text-red-600 block mb-2">Email</label>
        <input
          type="text"
          class="input input-bordered input-accent flex justify-center w-full max-w-xl"
          placeholder="Your email"
          v-model="email"
        />
      </div>
      <div class="form-control w-full max-w-xl">
        <label class="font-bold text-red-600 block mb-2">Password</label>
        <input
          type="password"
          class="input input-bordered input-accent w-full max-w-xl"
          placeholder="Your password"
          v-model="password"
        />
      </div>
      <!-- Sign Up -->
      <div class="flex flex-col gap-2">
        <a @click="user.handleSignup({ email, password })" 
           href="#" 
           class="btn btn-sm btn-warning btn-wide max-w-xl mt-4"
           tabindex="0">
          Sign UP
        </a>
        <!-- Log -->
        <a @click="user.handleLogin({ email, password })" 
           href="#" 
           class="btn btn-sm btn-secondary text-white btn-wide max-w-xs mt-1">
          <span v-if="password.length">Enter</span>
          <span v-else>Magic link</span>
        </a>
      </div>
      <!-- Recover -->
      <div class="mt-2 text-sm leading-5">
        <a
          @click.prevent="user.handlePasswordReset"
          href="/"
          class="font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:underline transition ease-in-out duration-150"
        > 
          Forgot password
        </a>
      </div>
      <div class="mt-4">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-orange-300"></div>
          </div>
          <div class="relative flex justify-center text-sm leading-5">
            <span class="px-2 bg-yellow-100 text-orange-600">O continúa con</span>
          </div>
        </div>
        <!-- Google/Git -->
        <div class="mt-6">
          <div class="mt-6">
            <span class="block w-full rounded-md shadow-sm">
              <button
                @click="user.handleOAuthLogin('github')"
                type="button"
                class="btn btn-active btn-warning btn-wide max-w-xs"
              >
                GitHub
              </button>
            </span>
          </div>
          <div class="mt-6">
            <span class="block w-full rounded-md shadow-sm">
              <button
                @click="user.handleOAuthLogin('google')"
                type="button"
                class="btn btn-outline btn-warning btn-wide max-w-xs"
              >
                Google
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


