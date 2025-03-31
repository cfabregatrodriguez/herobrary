import { createTestingPinia } from "@pinia/testing";
import { config } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { createApp } from "vue";
import { vi } from "vitest";

// Crea la aplicación Vue
const app = createApp({});

// Crea instancias de Pinia y Vuetify
const pinia = createTestingPinia();
const vuetify = createVuetify();

// Usa los plugins en la aplicación Vue una sola vez
app.use(pinia);
app.use(vuetify);

// Configura el global de Vue Test Utils para los plugins
config.global.plugins = [pinia, vuetify];
