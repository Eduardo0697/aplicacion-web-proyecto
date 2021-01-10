<template>
    <div>
      <h5>{{ graphTitle }}</h5>
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
    name: 'HistogramGraphManzanas',
    props:{
      plotId : String,
      table: String,
      graphTitle: String
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
            l: 40,
            r: 40,
            b: 30,
            t: 20,
            autoexpand: true,
          },
          autosize: true,
        },
        loading: false,
      }
    },
    mounted() {
      axios
        .get(`http://127.0.0.1:8000/anomaly/analysis/continuous/manzanas/${this.table}`)
        .then((res) => {
          console.log('Respuesta C', res.data)
          let trace = {
            x: res.data.map( (row) => row[0]),
            type: 'histogram',
            // cumulative: {enabled: true},
            xbins:{
              start: 0,
              size:3
            }
          };
          Plotly.newPlot(this.plotId, [trace], this.layoutGraph, {responsive: true, displaylogo: false});
        })
        .catch((err) => {
          console.log('Error ', err)
          M.toast({
            html: '<p>Algo salio mal, esto puede ser debido a un error en la solicitud, verificar que exista conexión al servidor</p>',
            classes: 'amber lighten-1 grey-text text-darken-4 rounded',
            displayLength : 6000
          })
        });
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
              type: 'violin',
              name: 'Consumo',
              x: res.data.consumoPro,
              points: 'none',
              marker: {
                outliercolor: "rgb(203,60,67)"
              },
              box: {
                visible: true
              },
              boxpoints: false,
              line: {
                color: 'black'
              },
              fillcolor: 'rgba(30,203,176,0.87)',
              opacity: 0.6,
              meanline: {
                visible: true,
                color: "rgb(61,66,233)"
              },
            }];
            this.loading= false;
            Plotly.newPlot(this.plotId, data, this.layoutGraph, {responsive: true});
          })
          .catch((error) => {
            console.log('Error en Histograma', error);
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
