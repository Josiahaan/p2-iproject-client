<template>
  <button
    class="flex justify-center items-center py-2 w-1/2 rounded-full bg-blue-500 hover:bg-blue-600 font-semi-bold text-white text-xl"
    v-on="$listeners"
  >
  {{ text }}
  </button>
</template>

<script>
export default {
  name: "BlueButton",
  props: ["text"]
};
</script>

<style></style>