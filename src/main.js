import Vue from "vue";
import App from "./App.vue";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Vuelidate from "vuelidate";
import PricesTree from "./components/PricesTree.vue";
import PlayerTree from "./components/PlayerTree.vue";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(Vuelidate);
Vue.component("prices-tree", PricesTree);
Vue.component("player-tree", PlayerTree);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
