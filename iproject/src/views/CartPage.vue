<template>
  <div class="w-20/24">
    <div class="mx-10 flex flex-col">
      <div class="mt-8 text-white text-3xl font-medium text-left">
        My Cart
      </div>
      <!-- CART CARDS -->
      <div class="grid grid-cols-4 gap-4">
      <ProductList
      v-for="(product, i) in cartList"
      :product="product" :key="i">
      </ProductList>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ProductList from '../components/productLists/ProductList.vue'
export default {
  name: "CartPage",
  components: {
    ProductList
  },
  methods: {
    ...mapActions(["fetchAllCarts"]),
  },
  computed: {
    ...mapState(["cartList"])
  },
  created() {
    this.fetchAllCarts();
  }
};
</script>

<style></style>