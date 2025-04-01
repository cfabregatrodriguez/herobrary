import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
import * as components from "vuetify/components"; // Importa los componentes
import * as directives from "vuetify/directives"; // Importa las directivas
import "vuetify/styles";
import { ThemeDefinition } from "vuetify"; // Importa ThemeDefinition

const primary = "#0f0f10";
const primaryDark = "#0f0f10";
const primaryLight = "#3b3b43";

// Configura Vuetify
const hbTheme: ThemeDefinition = {
	dark: false, // Cambiar a `true` para un tema oscuro
	colors: {
		primary: primary, // Color 'primary'
		secondary: "#ffffff", // Color 'secondary'
		accent: primaryLight, // Color 'accent'
		error: primary, // Color 'error'
		info: primary, // Color 'info'
		success: primary, // Color 'success'
		warning: primary, // Color 'warning'
		background: "#ffffff", // Color 'background'
		surface: primary, // Color 'surface'
		onPrimary: "#ffffff", // Color para el texto o íconos sobre 'primary'
		onSecondary: primary, // Color para el texto o íconos sobre 'secondary'
		onAccent: primary, // Color para el texto o íconos sobre 'accent'
		onError: primary, // Color para el texto o íconos sobre 'error'
		onInfo: primary, // Color para el texto o íconos sobre 'info'
		onSuccess: primary, // Color para el texto o íconos sobre 'success'
		onWarning: primary, // Color para el texto o íconos sobre 'warning'
		onBackground: primary, // Color para el texto o íconos sobre 'background'
		onSurface: primary, // Color para el texto o íconos sobre 'surface'
		text: primary, // Color del texto general
		toolbar: primary, // Color para la barra de herramientas (toolbar)
		drawer: primary, // Color para el cajón lateral (drawer)
		footer: primary, // Color para el pie de página (footer)
		button: primary, // Color para botones
		link: primary, // Color para enlaces (links)
		disabled: primary, // Color para elementos deshabilitados
		divider: primary, // Color para divisores (líneas)

		"surface-bright": primaryLight,
		"surface-light": primaryLight,
		"surface-variant": primary, //tooltips
		"on-surface-variant": "#ffffff",
		"primary-darken-1": primaryDark,
		"secondary-darken-1": primaryDark,
	},
	variables: {
		"border-color": "#000000",
		"border-opacity": 0.12,
		"high-emphasis-opacity": "no",
		"medium-emphasis-opacity": 0.6,
		"disabled-opacity": 0.38,
		"idle-opacity": 0.04,
		"hover-opacity": 0.04,
		"focus-opacity": 0.12,
		"selected-opacity": 0.08,
		"activated-opacity": 0.12,
		"pressed-opacity": 0.12,
		"dragged-opacity": 0.08,
		"theme-kbd": "#212529",
		"theme-on-kbd": "#FFFFFF",
		"theme-code": "#F5F5F5",
		"theme-on-code": "#000000",
	},
};

const vuetify = createVuetify({
	components,
	directives,
	theme: {
		defaultTheme: "hbTheme",
		themes: {
			hbTheme,
		},
	},
});

export default vuetify;
