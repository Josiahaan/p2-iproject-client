<template>
<div class="w-20/24">
    <div class="mx-10 flex flex-col">
      <div class="mt-8 text-white text-3xl font-medium text-left py-6 px-3">
        Product lists
      </div>

      <!-- Product CARDS -->
      <div class="grid grid-cols-4 gap-4">
      <ProductList v-for="product in products" :key="product.product_code"
      :product="product"
      ></ProductList>
      </div>
      </div>
     <Pagination></Pagination>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductList from '../components/productLists/ProductList.vue'
import { mapActions, mapState } from 'vuex'
import Pagination from '../components/productLists/Pagination.vue'

export default {
  name: 'HomeView',
  components: {
    ProductList,
    Pagination,
  },
    methods: {
    ...mapActions(["fetchAllProducts"])
  },
    computed: {
    ...mapState({
      products: "productList"
    })
  },
  created() {
    this.fetchAllProducts();
  }
}
</script>
