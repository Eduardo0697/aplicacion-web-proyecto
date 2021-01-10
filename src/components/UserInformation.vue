<template>

    <div class="card-panel hoverable" >
      <div class="card-content grey-text text-darken-3">
        <span class="card-title"><b>Informacion del usuario</b></span>
<!--        <p>{{ userInformation }}</p>-->
        <div v-if="showInformation">
          <p><b>RPU:</b> {{ userInformation.rpu }}</p>
          <p><b>Nombre:</b> {{ userInformation.nombreusua }}</p>
          <p><b>Consumo promedio diario:</b> {{ userInformation.consumopro }}</p>
          <p><b>Giro comercial:</b> {{ userInformation.giro }}</p>
          <p><b>División del giro:</b> {{ userInformation.divisiongiro }}</p>
          <p><b>Tarifa:</b> {{ userInformation.tarifa }}</p>
          <p><b>Tipo de tarifa:</b> {{ userInformation.tipotarifa }}</p>
          <p><b>Fases contradas:</b> {{ userInformation.hilos }}</p>
          <p><b>Tipo de suministro:</b> {{ userInformation.tiposumini }}</p>
          <p><b>Agencia:</b> {{ userInformation.agencia }}</p>
          <p><b>Ciclo:</b> {{ userInformation.ciclo }}</p>
        </div>
        <div v-else>
          <p>Selecciona un usuario para mostrar información</p>
        </div>

      </div>
    </div>

</template>

<script>
  export default {
    name: 'UserInformation',
    props:{
      userInformation: Object,
    },
    data(){
      return{
        showCard: true,
      }
    },
    mounted() {

    },
    computed:{
      showInformation(){
        return this.userInformation != null;
      }
    }

  };
</script>

<style scoped>

</style>
