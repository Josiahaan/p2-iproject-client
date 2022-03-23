<template>
  <div class="h-40 mt-10 mb-2 flex flex-col items-center">
    <div
      class="h-20 w-20 rounded-full overflow-hidden flex justify-center items-center"
    >
      <img
        src="https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top"
        alt="Profile Picture"
        class="object-cover h-20"
      />
    </div>
    <p class="text-white font-sans my-4">Hi, {{ user }}</p>
  </div>
</template>

<script>
export default {
  name: "ProfileBar",
  computed: {
    user() {
      return localStorage.getItem("username")
    }
  }
};
</script>

<style></style>