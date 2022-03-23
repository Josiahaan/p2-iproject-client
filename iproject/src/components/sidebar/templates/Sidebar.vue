<template>
  <div
    class="w-4/24 min-h-screen bg-slate-900 opacity-75 flex flex-col items-center"
  >
    <button class="text-white text-3xl font-bold mt-8"
    @click.prevent="$router.push({ name: 'Home' })">CareerPortal</button>

    <ProfileBar v-if="isLogged"></ProfileBar>
    <BlueButton
      v-if="!isLogged"
      class="mt-10 mb-8"
      :text="'Login'"
      @click.prevent="toLoginPage"
    ></BlueButton>
    <BlueButton
      v-if="isLogged"
      class="mb-8"
      :text="'Logout'"
      @click.prevent="logoutHandler"
    ></BlueButton>
    <Navbar></Navbar>
  </div>
</template>

<script>
import Navbar from "../organisms/Navbar.vue";
import ProfileBar from "../organisms/Profile.vue";
import BlueButton from "../../buttons/BlueButton.vue";
import Swal from "sweetalert2";
import { mapMutations, mapState } from "vuex";
export default {
  name: "SideBar",
  components: {
    Navbar,
    ProfileBar,
    BlueButton,
  },
  methods: {
    ...mapMutations(["CHANGE_ISLOGGED"]),
    logoutHandler() {
      // console.log("Logout");
      let username = localStorage.getItem("username");
      localStorage.clear();
      this.CHANGE_ISLOGGED(false);
      Swal.fire({
        icon: "success",
        title: "Logout",
        text: `babay :( ${username}!`,
      });
    },
    toLoginPage() {
      this.$router.push({
        name: "Login"
      })
    }
  },
  computed: {
    ...mapState(["isLogged"]),
  },
};
</script>

<style></style>