<template>
  <div>
    <div v-if="flagNotUsed">
      <h6>Favor de seleccionar un usuario para continuar.</h6>
    </div>
    <div v-if="loading" style="display: flex;justify-content: center;align-items: center;">
      <div  class="preloader-wrapper big active" >
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
    <div :id="plotId"></div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Plotly from 'plotly.js';

  export default {
    name: 'BoxPlotGraph',
    props:{
      plotId : String
    },
    data(){
      return{
        layoutGraph : {
          xaxis: {
            zeroline: false
          },
          legend: {
            orientation: 'h'
          },
          margin: {
            l: 0,
            r: 40,
            b: 40,
            t: 40,
            autoexpand: true,
          },
          xaxis: {
            title: 'Consumo (kwh)',
            showgrid: true,
            zeroline: false
          },
          yaxis:{
            showticklabels : false
          },
          autosize: true,
        },
        flagNotUsed : true,
        loading: false,
      }
    },
    methods:{
      updateGraph(cluster){
        this.loading=true;
        this.flagNotUsed = false;
        console.log('ME ACTUALIZARE :O!', cluster);

        axios
          .get(`http://127.0.0.1:8000/anomaly/analysis/cluster/${cluster}`)
          .then((res) => {
            console.log('Segunda respuesta', res.data);
            let data = [{
              type: 'box',
              boxpoints: 'all',
              pointpos: 1.8,
              jitter: 0.3,
              name: 'Consumo',
              x: res.data.consumoPro,
              points: 'none',
              marker: {
                outliercolor: "rgb(203,60,67)"
              },
              box: {
                visible: true
              },
              // boxpoints: false,
              line: {
                color: 'black'
              },
              fillcolor: 'rgba(30,203,176,0.87)',
              opacity: 0.6,
              boxmean: true,
              meanline: {
                visible: true,
                color: "rgb(61,66,233)"
              },
            }];
            this.loading= false;
            Plotly.newPlot(this.plotId, data, this.layoutGraph, {responsive: true, displaylogo: false});
          })
          .catch((error) => {
            console.log('Error en BoxPlotGraph', error);
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
