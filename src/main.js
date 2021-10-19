import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueClipboard from "vue-clipboard2";
import store from "./store/index.js";

Vue.use(VueClipboard);
Vue.use(Vuex);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
