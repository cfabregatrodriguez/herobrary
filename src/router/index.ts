import { createRouter, createWebHistory } from 'vue-router';
import CharacterDetail from '@/views/CharacterDetail.vue';  // Vista de detalle para un personaje
import CharactersMain from '@/views/CharactersMain.vue';  // Vista de listado
import CharactersFight from '@/views/CharactersFight.vue';  // Vista de lucha

const routes = [
  {
    path: '/',  // Ruta para la página principal
    name: 'CharactersMain',
    component: CharactersMain,
  },
  {
    path: '/character/:id',// Ruta dinámica para el detalle del personaje
    name: 'CharacterDetail',
    component: CharacterDetail
  },
  {
    path: '/fight/:id/:vs',// Ruta dinámica para el detalle del personaje
    name: 'CharactersFight',
    component: CharactersFight
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
