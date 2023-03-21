<template>
  <!-- login page -->
  <div class="w-full h-screen flex flex-col items-center justify-center">
    <!-- login form -->
    <div
      class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex flex-col items-center justify-center p-5 md:p-0"
    >
      <div class="w-full h-auto flex flex-col items-center justify-center">
        <h1 class="text-3xl font-semibold text-gray-700">Login</h1>
        <p class="text-gray-500 mt-1">Login to your account</p>
      </div>
      <div class="w-full h-auto mt-4">
        <form
          class="w-full h-auto flex flex-col items-center justify-center"
          @submit.prevent
        >
          <div class="w-full h-auto flex flex-col items-center justify-center">
            <label for="email" class="text-gray-700 text-sm">Email</label>
            <input
              v-model="state.email"
              type="email"
              id="email"
              class="w-full h-12 mt-2 px-4 border rounded-lg focus:outline-none focus:border-blue-500"
              :class="state.errorEmail ? 'border-red-500' : 'border-gray-300'"
              autocomplete="off"
            />
          </div>
          <div
            class="w-full h-auto mt-4 flex flex-col items-center justify-center"
          >
            <label for="password" class="text-gray-700 text-sm">Password</label>
            <input
              v-model="state.password"
              type="password"
              id="password"
              autocomplete="off"
              class="w-full h-12 mt-2 px-4 border rounded-lg focus:outline-none focus:border-blue-500"
              :class="
                state.errorPassword ? 'border-red-500' : 'border-gray-300'
              "
            />
          </div>
          <div class="w-full h-auto mt-4 flex items-center justify-between">
            <div class="flex items-center justify-start">
              <input
                type="checkbox"
                id="remember"
                class="w-4 h-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <label for="remember" class="text-gray-500 ml-2 text-sm">
                Remember me
              </label>
            </div>
            <div class="flex items-center justify-end">
              <a href="#" class="text-blue-500 text-sm">Forgot password?</a>
            </div>
          </div>
          <div class="w-full h-auto mt-4 flex items-center justify-center">
            <button
              class="bg-blue-500 text-white px-4 py-2 rounded-lg"
              @click="login"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <div class="w-full h-auto mt-4 flex items-center justify-center">
        <p class="text-gray-500 text-sm">
          Don't have an account? <a href="#" class="text-blue-500">Register</a>
        </p>
      </div>
      <div
        class="my-10 border border-orange-500 rounded-lg text-orange-500 p-2"
      >
        <p class="text-sm flex flex-col">
          <span class="font-semibold">Note:</span>
          <span
            >This is a demo app, so you can use any email and password to
            login.</span
          >
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "~~/src/store/auth";
import { nanoid } from "nanoid";
const authStore = useAuthStore();
const router = useRouter();

useHead({
  title: "Login",
});

const state = reactive({
  email: "",
  password: "",
  errorEmail: false,
  errorPassword: false,
});
const login = () => {
  console.log("login");
  !state.email ? (state.errorEmail = true) : (state.errorEmail = false);
  !state.password
    ? (state.errorPassword = true)
    : (state.errorPassword = false);

  if (state.email && state.password) {
    authStore.login({ id: nanoid(), email: state.email });
    router.back();
  }
};
</script>
