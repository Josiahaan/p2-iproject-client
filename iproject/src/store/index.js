import Vue from 'vue'
import Vuex from 'vuex'
import Swal from "sweetalert2";
import axios from "axios"
let url = "https://hacktivstore.herokuapp.com"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogged: false,
    productList: [],
    cartList: [],
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
    FETCH_CART(state, payload) {
      state.cartList = payload;
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
        // console.log(response)
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("name", response.data.payload.fullname);
        localStorage.setItem("email", response.data.payload.email);
        // localStorage.setItem("id", response.data.payload.id);
        // localStorage.setItem("username", response.data.payload.username);

        commit("CHANGE_ISLOGGED", true);
        Swal.fire({
          icon: "success",
          title: "Login",
          text: `Welcome to HackStore :D`,
        });
      } catch (err) {
        // console.log(err);
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
          phoneNumber: payload.phoneNumber,
          address: payload.address,
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
        // console.log(response.data.length, state.perPage);
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
          text: "err",
        });
      }
      finally {
        // console.log("masuk finally");
       if(errorStatus === false) {
         commit("FETCH_PRODUCT", data)
        // console.log(data);
       }
      }
    },
    async addCartHandler(_, payload) {
      // console.log(payload, "<<<<<<<<<<<<");
      try {
        await axios.post(`${url}/cartitem`, {
          quantity: payload.quantity,
          cart: payload.product
        }, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        Swal.fire({
          icon: "success",
          title: "Add Item",
          text: `sucess add item to cart`,
        });
      } catch(err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.message,
        });
      }
    },
    async fetchAllCarts({ commit }) {
      try {
        const response = await axios.get(`${url}/cartitem`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        // console.log(response.data,"penanda")
        let data = [];
        response.data.forEach(e => {
          // console.log(e,"hasil map");
          // console.log(e.cart,"ouput cart");
          e.cart.id = e.id
          data.push(e.cart)
          // console.log(e,"nyaari id");
        })
        commit("FETCH_CART", data);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.message,
        });
      }
    },
    payment(context, payload) {
      // console.log("click payment", payload);
      axios.post(`${url}/payment`, payload, {
        headers : {
          access_token: localStorage.access_token
        }
      })
      .then(resp => {
        // console.log(resp);
        window.snap.pay(resp.data.token, {
          onSuccess: () => {
            /* You may add your own implementation here */
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "payment success!",
              showConfirmButton: false,
              timer: 1500,
            });
            axios.delete(`${url}/cartitem/${payload.id}`, {
              headers: {
                access_token: localStorage.access_token
              }, data: payload,
            })
            // this.fetchAllCarts()
            .then(() => {
              context.dispatch('fetchAllCarts')
            })
          },
          onPending: () => {
            /* You may add your own implementation here */
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "wating your payment!",
              showConfirmButton: false,
              timer: 1500,
            });
          },
          onError: () => {
            /* You may add your own implementation here */
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "payment failed!",
            })
          },
          onClose: () => {
            /* You may add your own implementation here */
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "you closed the popup without finishing the payment",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      })
      .catch(err => {
        console.log(err);
      })
    },
    async cancel(context, payload) {
      // console.log(payload);
      try {
        await axios.delete(`${url}/cartitem/${payload.id}`, {
          headers: {
            access_token: localStorage.access_token
          }
        })
      } catch(err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.message,
        });
      }
    },
    async loginGoogleHandler({ commit }, token) {
      try {
        const response = await axios.post(`/login-google`, { token });
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("id", response.data.id);
        
        commit("CHANGE_ISLOGGED", true);
        Swal.fire({
          icon: "success",
          title: "Success!!",
          text: `Welcome to HactivStore :D`,
        });
        return true;
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response.data.message,
        });
      }
    },

  },
  modules: {
  }
})
