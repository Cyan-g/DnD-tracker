import Vue from "vue";
import App from "./App.vue";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Link from "./components/Link.vue"
import TimelineNote from "./components/TimelineNote.vue"
import Character from "./components/Character.vue"
import Map from "./components/Map.vue"
import Location from "./components/Location.vue"
import Vuelidate from "vuelidate";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(Vuelidate);

Vue.component("Link", Link)
Vue.component("TimelineNote", TimelineNote)
Vue.component("Character", Character)
Vue.component("Map", Map)
Vue.component("Location", Location)

new Vue({
  render: (h) => h(App),
}).$mount("#app");
