<template>
  <div class="h-12 w-full flex flex-row justify-center gap-x-2 mb-4">
    <button
      class="h-12 w-12 rounded-lg bg-blue-600 flex justify-center items-center"
      @click.prevent="toFirst"
    >
      <svg
        class="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
      <svg
        class="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
      <i class="fa-solid fa-angles-left -mt-4"></i>
    </button>
    <button
      class="h-12 w-12 rounded-lg bg-blue-600 flex justify-center items-center"
      @click.prevent="previous"
    >
      <svg
        class="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
      <i class="fa-solid fa-angle-left -mt-4"></i>
    </button>
    <div
      class="
        h-12
        px-4
        rounded-lg
        bg-blue-600
        flex
        justify-center
        items-center
        text-white
      "
    >
      {{ page }}
    </div>
    <button
      class="h-12 w-12 rounded-lg bg-blue-600 flex justify-center items-center"
      @click.prevent="next"
    >
      <svg
        class="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
      <i class="fa-solid fa-angle-right -mt-4"></i>
    </button>
    <button
      class="h-12 w-12 rounded-lg bg-blue-600 flex justify-center items-center"
      @click.prevent="toLast"
    >
      <svg
        class="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
      <svg
        class="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
      <i class="fa-solid fa-angles-right -mt-4"></i>
    </button>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "PagiNation",
  methods: {
    ...mapMutations([
      "TO_LASTPAGE",
      "TO_FIRSTPAGE",
      "NEXT_PAGE",
      "PREVIOUS_PAGE",
    ]),
    ...mapActions(["fetchAllProducts"]),
    toFirst() {
      this.TO_FIRSTPAGE();
      this.fetchAllProducts();
    },
    next() {
      this.NEXT_PAGE();
      this.fetchAllProducts();
    },
    previous() {
      this.PREVIOUS_PAGE();
      this.fetchAllProducts();
    },
    toLast() {
      this.TO_LASTPAGE();
      this.fetchAllProducts();
    },
  },
  computed: {
    ...mapState(["pageNumber", "maxPageNumber"]),
    page() {
      // console.log(this.maxPageNumber);
      return `${this.pageNumber} of ${this.maxPageNumber}`;
    },
  },
};
</script>

<style></style>