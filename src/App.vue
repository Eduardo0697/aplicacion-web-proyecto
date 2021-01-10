<template>
  <div id="app">
    <div id="nav">
      <navbar-component>
        <template #main>
          <li><router-link to="/">Analisis por manzanas</router-link> </li>
          <li><router-link to="/vialidades">Analisis por vialidades</router-link> </li>
          <li><router-link to="/anomalias/usuarios">Analisis anomalias</router-link></li>
        </template>
        <template #submain>
          <li class="tab"><router-link class="active" to="/anomalias/usuarios">Usuarios</router-link></li>
          <li class="tab"><router-link to="/anomalias/manzanas">Manzanas</router-link></li>
          <li class="tab"><router-link to="/anomalias/frentes">Frentes de Manzanas</router-link></li>
        </template>
      </navbar-component>
      <side-nav-bar/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import SideNavBar from './components/SideNavBar.vue';

export default {
  name: 'App',
  components: {
    NavbarComponent,
    SideNavBar,
  },
};
</script>
