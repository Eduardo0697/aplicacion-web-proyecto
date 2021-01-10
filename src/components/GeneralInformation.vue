<template>
  <div class="card-panel grey-text text-darken-2">
    <h4>{{ noUsuarios }} Usuarios analizados</h4>
    <h4>{{ noAnomalias }} anomalias</h4>
    <h2>{{ percentageAnomalias }}%</h2>

  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'GeneralInformation',
    data(){
      return{
        noAnomalias : null,
        noUsuarios: null,
      }
    },
    mounted() {
      axios
        .get('http://127.0.0.1:8000/stats/anomaly/count')
        .then((res) => {
          console.log(res.data);
          this.noAnomalias = res.data.anomalies;
          this.noUsuarios = res.data.total;
        })
        .catch((err) => {
          console.log('Error', err);
          M.toast({
            html: '<p>Algo salio mal, esto puede ser debido a un error en la solicitud, verificar que exista conexión al servidor</p>',
            classes: 'amber lighten-1 grey-text text-darken-4 rounded',
            displayLength : 6000
          })

        });
    },
    computed:{
      percentageAnomalias(){
        return (this.noAnomalias/ this.noUsuarios).toFixed(4)
      }
    }
  };
</script>

<style scoped>

</style>
