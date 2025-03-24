import { createApp } from 'vue';
import App from './App.vue';
import './style.css'
import "@/assets/styles/main.scss";
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Importa los estilos globales de Vuetify

import * as components from 'vuetify/components';  // Importa los componentes
import * as directives from 'vuetify/directives';  // Importa las directivas

const vuetify = createVuetify({
    components,
    directives
});

const app = createApp(App);
app.use(vuetify);
app.mount('#app');
