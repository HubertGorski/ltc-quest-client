import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import vuetify from "./configs/vuetify";
import i18n from "./configs/i18n";
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(VueApexCharts);
app.use(i18n);

app.mount("#app");
