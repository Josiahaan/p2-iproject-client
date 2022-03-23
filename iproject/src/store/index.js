import Vue from 'vue'
import Vuex from 'vuex'
import Swal from "sweetalert2";
import axios from "axios"
let url = "http://localhost:3000"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogged: false,
    productList: [],
    pageNumber: 1,
    maxPageNumber: null,
    perPage: 8,
  },
  getters: {
  },
  mutations: {
    CHANGE_ISLOGGED(state, payload) {
      state.isLogged = payload;
    },
    FETCH_PRODUCT(state, payload) {
      state.productList = payload;
    },
    TO_LASTPAGE(state) {
      state.pageNumber = state.maxPageNumber;
    },
    TO_FIRSTPAGE(state) {
      state.pageNumber = 1;
    },
    NEXT_PAGE(state) {
      if (state.pageNumber !== state.maxPageNumber) {
        state.pageNumber++;
      }
    },
    PREVIOUS_PAGE(state) {
      if (state.pageNumber !== 1) {
        state.pageNumber--;
      }
    },
    SET_PERPAGE(state, payload) {
      state.perPage = payload;
    },
    SET_MAXPAGENUMBER(state, payload) {
      state.maxPageNumber = payload;
    },
  },
  actions: {
    async loginHandler({ commit }, payload) {
      try {
        const response = await axios.post(`${url}/login`, {
          email: payload.email,
          password: payload.password,
        });
        console.log(response)
        // localStorage.setItem("access_token", response.data.access_token);
        // localStorage.setItem("email", response.data.payload.email);
        // localStorage.setItem("id", response.data.payload.id);
        // localStorage.setItem("username", response.data.payload.username);

        commit("CHANGE_ISLOGGED", true);
        Swal.fire({
          icon: "success",
          title: "Login",
          text: `Welcome to HackStore :D`,
        });
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.message,
        });
      }
    },
    async registerHandler(context, payload) {
      try {
        // console.log(payload)
        await axios.post(`${url}/register`, {
          fullname: payload.fullname,
          email: payload.email,
          password: payload.password,
        });
        Swal.fire({
          icon: "success",
          title: "Register",
          text: "Register Success!!",
        });
        return true
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.message,
        });
      }
    },
    async fetchAllProducts({ state, commit }) {
      // console.log("sebelum");
      let errorStatus = false;
      let data = [];
      try {
        // console.log("sesudah");
        // console.log(url);
        const response = await axios.get(`${url}/pulsa`, {
          // headers: {
          //   token: localStorage.getItem("token"),
          // },
        });
        console.log(response.data.length, state.perPage);
        const maxPageNumber = Math.ceil(response.data.length / state.perPage);
        // console.log(maxPageNumber);
        data = response.data
        commit("SET_MAXPAGENUMBER", maxPageNumber);
        // commit("FETCH_PRODUCT", response.data);
        // console.log("axios sudah selesai");
      } catch (err) {
        // console.log(err);
        errorStatus = true;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.message,
        });
      }
      finally {
        // console.log("masuk finally");
       if(errorStatus === false) {
         commit("FETCH_PRODUCT", data)
        console.log(data);
       }
      }
    },
  },
  modules: {
  }
})
