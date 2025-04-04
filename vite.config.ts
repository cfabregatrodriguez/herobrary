import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			template: {
				compilerOptions: {
					// Solo aplicar la lógica de isCustomElement en los tests
					isCustomElement:
						process.env.NODE_ENV === "test"
							? (tag) => tag.startsWith("v-") // Ignorar los componentes que comienzan con 'v-'
							: () => false, // No ignorar nada en otros entornos
				},
			},
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	test: {
		globals: true,
		environment: "happy-dom",
		setupFiles: "./tests/setup.ts",
		server: {
			deps: {
				inline: ["vuetify"],
			},
		},
	},
	server: {
		port: 3000, // Change the development server port to 3000
	},
});
