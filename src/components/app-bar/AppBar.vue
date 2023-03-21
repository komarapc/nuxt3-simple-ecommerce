<template>
  <div
    class="w-full h-16 bg-green-600 text-white flex items-center justify-between px-5"
  >
    <div>
      <NuxtLink to="/"
        ><h1 class="text-4xl font-semibold">Tokodia</h1></NuxtLink
      >
    </div>
    <div class="flex items-center gap-4">
      <div>
        {{ authStore.user?.email }}
      </div>
      <div class="flex items-center gap-4">
        <!-- cart -->
        <div class="relative">
          <NuxtLink
            to="/cart"
            class="px-4 py-2 text-green-200 hover:text-green-50 bg-green-700 font-semibold rounded-lg"
          >
            Cart
          </NuxtLink>
          <div
            class="absolute top-0 right-0 -mt-2 -mr-2 w-5 h-5 flex items-center justify-center bg-red-500 rounded-full text-white text-xs"
          >
            {{ cartStore.items.length }}
          </div>
        </div>
        <!-- end cart -->

        <!-- auth -->
        <NuxtLink
          v-if="!authStore.isAuthenticated"
          to="/login"
          class="px-4 py-2 text-green-200 hover:text-green-50 bg-green-700 font-semibold rounded-lg"
        >
          Login
        </NuxtLink>
        <button
          v-else
          class="px-4 py-2 text-green-200 hover:text-green-50 bg-green-700 font-semibold rounded-lg"
          @click="authStore.logout"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/src/store/auth";
import { useCartStore } from "@/src/store/cart";
const authStore = useAuthStore();
const cartStore = useCartStore();
</script>
