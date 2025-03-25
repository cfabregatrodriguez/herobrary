import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import "@/assets/styles/main.scss";
import router from './router';
import vuetify from './plugins/vuetify.ts';
import { createPinia } from 'pinia';  // Importar Pinia


// Crea la aplicación Vue
const app = createApp(App);

// Usa Vue Router y Vuetify en la aplicación
app.use(router);  // Asegúrate de usar el router
app.use(vuetify);
app.use(createPinia()); 

app.mount('#app');