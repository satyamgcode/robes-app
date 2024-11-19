import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import PrimeVue from "primevue/config";
import ToastService from 'primevue/toastservice';
import router from './router';


createApp(App)
  .use(router)
  .use(ToastService) // Register ToastService
  .use(PrimeVue)
  .mount('#app');
