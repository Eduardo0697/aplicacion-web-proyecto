import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/vialidades',
    name: 'vialidades',
    component: () => import(/* webpackChunkName: "about" */ '../views/Vialidades.vue'),
  },
  {
    path: '/anomalias',
    name: 'Analysis',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Analysis.vue'),
  },
  {
    path: '/anomalias/usuarios',
    name: 'Analysis',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Analysis.vue'),
  },
  {
    path: '/anomalias/frentes',
    name: 'Analysisfrentes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Analysisfrentes.vue'),
  },
  {
    path: '/anomalias/manzanas',
    name: 'AnalysisManzanas',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AnalysisManzanas.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
