<template>
  <nav class="nav-extended">
    <div class="nav-wrapper teal darken-2">
      <a href="#" data-target="slide-out" class="sidenav-trigger">
        <i class="material-icons">menuu</i>
      </a>
      <a href="#" class="brand-logo right">Sistema de consulta</a>
      <ul id="nav-mobile" class="left hide-on-med-and-down">
        <slot name="main">
        </slot>
      </ul>
    </div>
    <div v-if="showExtendedNavbar" class="nav-content teal darken-2">
      <ul class="tabs tabs-transparent">
        <slot name="submain">
        </slot>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Navbar',
  data(){
    return{
      current: null,
      showExtendedNavbar : false
    }
  },
  mounted() {
    let p = this.$router.currentRoute.path;
    this.showExtendedNavbar = !!(p === '/anomalias/usuarios' | p === '/anomalias/frentes' | p === '/anomalias/manzanas');
  },
  watch:{
    $route(to, from){
      // console.log(to, from);
      this.current = to.path;
      this.showExtendedNavbar = !!(to.path === '/anomalias/usuarios' | to.path === '/anomalias/frentes' | to.path === '/anomalias/manzanas');
    }
  }
};
</script>
