// import { createStore } from "vuex";
// import Vuex from "vuex";
// import Vue from 'vue'

// Vue.use(Vuex)

// const store = createStore({
//   state() {
//     return {
//       count: 0,
//     };
//   },
//   mutations: {
//     increment(state) {
//       state.count++;
//     },
//   },
// });

// export default store

// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.vueApp.use(store);
//   // Install the store instance as a plugin

// });


export const state = () => ({
  count: 0,
  price: 0
})