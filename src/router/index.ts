import { createRouter, createWebHistory } from 'vue-router';
import CharacterDetail from '@/views/CharacterDetail.vue';  // Vista de detalle para un personaje

const routes = [
  {
    path: '/character/:id',  // Ruta dinámica para el detalle del personaje
    name: 'CharacterDetail',
    component: CharacterDetail,
    props: true,  // Pasar el parámetro de ID como prop a la vista
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
