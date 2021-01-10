<template>
  <div>
    <div v-if="loading" style="display: flex;justify-content: center;align-items: center;">
      <div  class="preloader-wrapper active" >
        <div class="spinner-layer spinner-blue-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div>
          <div class="gap-patch">
            <div class="circle"></div>
          </div>
          <div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="flagNotUsed">
      <h6>Favor de seleccionar un usuario para continuar.</h6>
    </div>
    <div :id="plotId"></div>
  </div>

</template>

<script>
  import Plotly from 'plotly.js/dist/plotly';
  import axios from "axios";

  export default {
    name: 'UserHistory',
    props:{
      plotId : String,
    },
    data() {
      return {
        flagNotUsed : true,
        loading: false,
        info: null,
        dataPlot: [],
        layout: {
          legend: {
            orientation: 'h',
          },
          margin: {
            // l: 40 ,
            r: 40,
            b: 40,
            t: 40,
            autoexpand: true,
          },
          xaxis: {
            zeroline: false
          },
          yaxis: {
            title: 'Consumo mensual (kwh)',
            showline: false
          },
          autosize: true,
        },
      };
    },
    methods:{
      updateTimeSeries(data,zdata, centroid){
        console.log('Method fired updateTimeSeries');
        Plotly.newPlot(this.plotId, [ data, zdata, centroid ] , this.layout, {responsive: true, displaylogo: false});
      },
      updateHistorico(userInformation){
        this.flagNotUsed = false;
        this.loading = true;
        console.log('Actualizare el historico');
        let dataTS = null;
        let dataZ = null;
        let dates = null;
        axios
          .get(`http://127.0.0.1:8000/users/timeseries/${userInformation.rpu}`)
          .then((response) => {
            dates = response.data.df.map( (user) => {return new Date(user["mesconsumo"])});
            let consumos = response.data.df.map( (user) => user["kwh"]);
            dataTS = {
              x: dates,
              y: consumos,
              type: 'scatter',
              name: 'Historico'
            };
            dataZ = {
              x: dates,
              y: response.data.zconsumos,
              type: 'scatter',
              name: 'Historico Normalizado'
            };
            return axios.get(`http://127.0.0.1:8000/centroids/${userInformation.timeseries}`)
          })
          .then((res) => {
            console.log('Res Centroid', res.data);
            let centroid = {
              x: dates,
              y: res.data,
              type: 'scatter',
              name: 'Comportamiento asociado'
            };
            this.updateTimeSeries(dataTS, dataZ, centroid);
            this.loading = false;
          })
          .catch((err) => {
            console.log('Error', err);
            M.toast({
              html: '<p>Algo salio mal, esto puede ser debido a un error en la solicitud, verificar que exista conexión al servidor</p>',
              classes: 'amber lighten-1 grey-text text-darken-4 rounded',
              displayLength : 6000
            })
          });
      }
    }

  };
</script>

<style scoped>

</style>
