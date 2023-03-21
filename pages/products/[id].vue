<template>
  <div class="w-full min-h-screen flex flex-col bg-neutral-100">
    <AppBar />
    <div class="container mx-auto my-10">
      <div class="flex flex-row gap-10 p-5 bg-white rounded-lg shadow-lg">
        <div class="w-3/12">
          <img
            :src="product?.image"
            alt="product image"
            class="w-full object-cover"
          />
        </div>
        <div class="flex flex-col gap-2 w-full">
          <h1 class="text-2xl text-neutral-600 font-bold">
            {{ product?.title }}
          </h1>
          <span class="text-neutral-500">{{ product?.category }}</span>
          <div class="">
            <p>{{ product?.description }}...</p>
          </div>
          <div class="flex flex-col gap-4">
            <span class="text-2xl text-neutral-600 font-bold">
              Price: ${{ product?.price }}
            </span>
            <span class="text-2xl text-neutral-600 font-bold">
              Rating: {{ product?.rating.rate }}
            </span>
          </div>
          <div>
            <button
              class="px-4 py-2 bg-green-600 text-white rounded-lg"
              @click="addToCart(product)"
            >
              Add cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useCartStore } from "~~/src/store/cart";
import { useAuthStore } from "~~/src/store/auth";
import axios from "axios";
import { nanoid } from "nanoid";
import AppBar from "~~/src/components/app-bar/AppBar.vue";
import { ProductProps } from "~~/src/interface/products";
const router = useRouter();
const cartStore = useCartStore();
const authStore = useAuthStore();
const { id } = router.currentRoute.value.params;
const product = await axios
  .get(`https://fakestoreapi.com/products/${id}`)
  .then((res) => res.data)
  .catch((err) => console.log(err.message));
// props

// state

// computed

// methods

// watch

// lifecycle
if (!authStore.isAuthenticated) {
  router.push("/login");
}
const addToCart = (product: ProductProps) => {
  alert("Added to cart");
  cartStore.addItem({
    id: nanoid(),
    product: product,
    quantity: 1,
  });
};
onMounted(() => {
  console.log(id);
  console.log(product);
});
</script>
