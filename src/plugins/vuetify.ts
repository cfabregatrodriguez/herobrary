import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import * as components from 'vuetify/components';  // Importa los componentes
import * as directives from 'vuetify/directives';  // Importa las directivas

// Configura Vuetify
const vuetify = createVuetify({
  components,
  directives
});

export default vuetify;