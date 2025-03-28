import { createRouter, createWebHistory } from 'vue-router';
import Detail from '@/views/Detail.vue';  // Vista de detalle para un personaje
import List from '@/views/List.vue';  // Vista de listado
import Fight from '@/views/Fight.vue';  // Vista de lucha

const routes = [
  {
    path: '/',  // Ruta para la página principal
    name: 'List',
    component: List,
  },
  {
    path: '/character/:id',// Ruta dinámica para el detalle del personaje
    name: 'Detail',
    component: Detail
  },
  {
    path: '/fight/:id/:vs',// Ruta dinámica para el detalle del personaje
    name: 'Fight',
    component: Fight
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
