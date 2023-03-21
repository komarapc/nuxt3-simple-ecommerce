<template>
  <!-- cart pages -->
  <div class="w-full min-h-screen flex flex-col bg-gray-100 relative">
    <AppBar></AppBar>
    <div
      class="container w-full md:w-10/12 lg:w-6/12 flex flex-col mx-auto p-5 mt-5 mb-40"
    >
      <div class="flex flex-row gap-4">
        <div class="w-96 p-2 flex flex-col">
          <NuxtLink
            to="/"
            class="p-2 bg-neutral-200 hover:bg-neutral-300 rounded-lg"
            >Products</NuxtLink
          >
        </div>
        <div class="flex flex-col gap-10 w-full">
          <div
            v-if="cartStore.items.length > 0"
            v-for="cart in cartStore.items"
            class="flex flex-row gap-10 p-5 bg-white rounded-lg shadow-lg"
          >
            <div class="w-3/12">
              <img
                :src="cart.product?.image"
                alt="product image"
                class="w-full object-cover"
              />
            </div>
            <div class="flex flex-col gap-2 w-full">
              <h1 class="text-2xl text-neutral-600 font-bold">
                {{ cart.product?.title }}
              </h1>
              <span class="text-neutral-500">{{ cart.product?.category }}</span>
              <div class="">
                <p>{{ cart.product?.description?.substring(0, 200) }}...</p>
              </div>
              <div>
                <span class="text-2xl text-neutral-600 font-bold">
                  Price: ${{ cart.product?.price }}
                </span>
              </div>
              <div class="flex flex-col gap-2">
                <div>
                  <input
                    type="number"
                    min="1"
                    v-model="cart.quantity"
                    class="py-2 outline-none border border-neutral-300 rounded-lg text-center"
                  />
                </div>
                <div
                  class="flex flex-row text-xl font-semibold text-neutral-500 gap-2"
                >
                  <span class="">Subtotal : </span>
                  <span class="text-orange-600">
                    ${{ countSubtotal(cart.product?.price, cart.quantity) }}
                  </span>
                </div>
              </div>
              <div>
                <button
                  class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  @click="cartStore.removeItem(String(cart.id))"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>

          <div class="w-full p-5 bg-white rounded shadow-lg">
            <div class="text-2xl font-semibold">
              Total checkout :
              <span class="text-green-600"
                >${{ cartStore.countSubtotalCart().toFixed(2) }}</span
              >
            </div>
            <div class="flex gap-2 my-2" v-if="cartStore.items.length > 0">
              <button
                class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                @click="cartStore.clearCart()"
              >
                Clear cart
              </button>
              <button
                class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                @click=""
              >
                Checkout
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
import AppBar from "~~/src/components/app-bar/AppBar.vue";
import Footer from "~~/src/components/footer/Footer.vue";
import { useCartStore } from "~~/src/store/cart";
import { useAuthStore } from "~~/src/store/auth";
import { useRouter } from "vue-router";
const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();

// setting head
useHead({
  title: "Tokodia | Cart",
});

// Check if user is authenticated
if (!authStore.isAuthenticated) {
  router.push("/login");
}

const countSubtotal = (
  price: number | undefined,
  quantity: number | undefined
) => {
  return price && quantity ? (price * quantity).toFixed(2) : 0;
};

// local store

onMounted(() => {});

// watch
watchEffect(() => {
  if (!authStore.isAuthenticated) {
    router.push("/login");
  }
});
</script>
