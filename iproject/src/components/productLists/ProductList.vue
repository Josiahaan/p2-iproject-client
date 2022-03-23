<template>
<div :product="product" class="max-w-sm bg-slate-900 rounded px-4 py-2 overflow-hidden shadow-lg">
  <!-- <div
    class="mt-12 mb-8 w-full min-h-screen grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 vsm:grid-cols-1 gap-y-8 lg:gap-x-4 md:gap-x-2 sm:gap-x-2 gap-x-2"
  >
  <button class="h-112 w-4/5 flex flex-col justify-center items-center"
    @click.prevent="goToDetail"
  >
    <div        v-for="product in products" :key="product.product_code"
      :product="product" class="h-5/6 bg-black static flex flex-col items-center">
  <img
    alt="Poster"
    class="object-cover h-full w-full relative relativez-0 -mt-6 inset-x-0 top-0"
  />
    </div>
  </button>
  </div> -->
    <div>
  <img class="w-full" :src="product.icon_url" alt="https://cf.shopee.co.id/file/dfa0887bc02eafff139392f8cf3326f4">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">{{product.product_description}}</div>
    <p class="text-gray-700 text-base">
      {{product.product_nominal}}
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Rp.{{product.product_price}},00</span>
    <span class="inline-block bg-green-400 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">{{product.status}}</span>
    <form v-if="$route.path === '/'" class="" @submit.prevent="clickAdd()">
      <input type="number" v-model="quantity">
    <button class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Add To Cart</button>
    </form>
    <button  @click.prevent="checkout" v-if="$route.path === '/cartitem'" class="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"> checkout </button>
  </div>
</div>
</div>
</template>

<script>
export default {
  name: "ProductList",
  data() {
    return {
      quantity: 0,
    }
  },
  components: {
  },
  props: ['product'],
  methods: {
    clickAdd(){
      console.log("clicked");
      this.$store.dispatch('addCartHandler', {quantity: this.quantity, product: this.product})
    },
    checkout() {
      this.$store.dispatch('payment', {id: this.product.id,name: localStorage.name, email: localStorage.email, price: this.product.product_price, itemName: this.product.product_description})
    }
  },
  created(){
    console.log(this.product);
  }
};
</script>

<style></style>