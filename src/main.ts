import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import vuetify from "./configs/vuetify";
import i18n from "./configs/i18n";
import VueApexCharts from "vue3-apexcharts";
import '@/assets/styles/hubStyles.scss';
import '@/assets/styles/animations.scss';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.component('VueDatePicker', VueDatePicker);
app.use(VueApexCharts);
app.use(i18n);

app.mount("#app");
