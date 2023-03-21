<template>
  <div class="w-full min-h-screen bg-neutral-100 flex flex-col relative">
    <AppBar />

    <div class="w-full mb-36">
      <div class="container mx-auto flex flex-wrap p-5">
        <!-- show loading while products is fetching -->
        <div
          v-if="state.loadingProducts"
          class="w-full h-full flex items-center justify-center"
        >
          loading...
        </div>
        <!-- product card -->
        <div
          v-else
          v-for="product in products"
          :key="product.id"
          class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
        >
          <div
            class="w-full h-full flex flex-col bg-white rounded-lg shadow-md p-4"
          >
            <div class="w-full h-48">
              <img
                :src="product.image"
                alt="product image"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="w-full h-auto mt-4">
              <NuxtLink :to="`products/${product.id}`">
                <h3 class="text-lg font-semibold text-gray-700">
                  {{ product.title.substring(0, 50) }}...
                </h3>
              </NuxtLink>
              <p class="text-gray-500 mt-1">{{ product.category }}</p>
            </div>
            <div class="w-full h-12 mt-4">
              <p class="text-gray-500 text-sm">
                {{ product.description.substring(0, 50) }}...
              </p>
            </div>
            <div
              class="w-full bottom-0 mt-4 flex items-center justify-between self-end"
            >
              <p class="text-gray-700 font-semibold text-lg">
                ${{ product.price }}
              </p>
              <button
                class="bg-blue-500 text-white px-4 py-2 rounded-lg"
                @click="addToCart(product)"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/src/store/cart";
import { useAuthStore } from "~~/src/store/auth";
import AppBar from "@/src/components/app-bar/AppBar.vue";
import Footer from "@/src/components/footer/Footer.vue";
import { nanoid } from "nanoid";
import axios from "axios";
import { useRouter } from "vue-router";
import type { ProductProps as Product } from "@/src/interface/products";
import { slugify } from "~~/src/utils/slugify";

const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();

const state = reactive({
  counter: 0,
  loadingProducts: true,
});
const products = await axios
  .get("https://fakestoreapi.com/products")
  .then((res) => {
    state.loadingProducts = false;
    return res.data;
  })
  .catch((err) => console.log(err.message));
onMounted(() => {
  console.log(products);
});

useHead({
  title: "Tokodia | Home",
});

// function

const addToCart = (product: Product) => {
  if (!authStore.isAuthenticated) {
    router.push("/login");
  }
  cartStore.addItem({
    id: nanoid(),
    product: product,
    quantity: 1,
    user: authStore.user,
  });
};
</script>
