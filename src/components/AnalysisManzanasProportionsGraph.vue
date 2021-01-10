<template>
  <div>
    <div class="row">
      <div class="col s10">
        <h5>{{ graphTitle }}</h5>
      </div>
      <div class="input-field col s2">
        <select @change="onChangeShowNumber($event)">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="all">Todos</option>
        </select>
        <label>Mostrar</label>
      </div>
    </div>
    <div v-if="loading">
      <div class="preloader-wrapper active">
        <div class="spinner-layer spinner-red-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
        </div>
      </div>
    </div>

    <div :id="plotId" />
  </div>
</template>

<script>
  import Plotly from 'plotly.js/dist/plotly';
  import axios from 'axios';

  export default {
    name: 'AnalysisManzanasProportionsGraph',
    props:{
      graphTitle: String,
      plotId : String,
      dataStudy : String,
      tableDb: String,
    },
    data() {
      return {
        loading: false,
        tipoViaValores:{
          "1": "Calle, avenida o calzada",
          "2": "Calle peatonal (andador)",
          "3": "Carretera",
          "4": "Rasgo",
          "7": "Conjunto habitacional",
          "9": "No especficado",
        },
        numberItemsLoad : 5,
        layout: {
          barmode: 'group',
          legend: {
            orientation: 'h'
          },
          margin: {
            // l: 40 ,
            // r: 40,
            b: 80,
            t: 10,
            autoexpand: true,
          },
          autosize: true,
          yaxis: {
            title: 'Proporcion',
          }
          // colorway: ["blue"]
        }
      }
    },
    mounted() {
      this.updateAnalysis(this.numberItemsLoad, this.dataStudy, this.tableDb);
    },
    methods:{
      onChangeShowNumber(event){
        console.log('Change', event.target.value);
        this.numberItemsLoad = event.target.value;
        this.updateAnalysis(this.numberItemsLoad, this.dataStudy, this.tableDb);
        // this.loading = true;
        // this.methodAnalysis = event.target.value;
        // if(this.userData != null){
        //   this.updateAnalysis(this.userData);
        // }
      },
      updateAnalysis(numberToLoad, dataStudy, tableDB){
        // console.log('Actualización de grafica', numberToLoad);
        this.loading = true;
        axios
          .get(`http://127.0.0.1:8000/anomaly/analysis/2/${tableDB}/${dataStudy}/${numberToLoad}`)
          .then((res) => {
            // console.log(dataStudy, res.data)
            let yValues = Object.values(res.data).map( (giro) => giro["0"]);
            let xValues = Object.values(res.data).map( (giro) => {
              if(dataStudy === 'MZ_FT_TIPOVIA_C'){
                return this.tipoViaValores[giro["1"]]
              }
              return `_${giro["1"]}`
            });
            console.log(dataStudy, xValues, yValues);
            let trace_1 = {
              x: xValues,
              y: yValues,
              name: 'Giros',
              type: 'bar'
            };
            this.loading = false;
            Plotly.newPlot(this.plotId, [trace_1], this.layout,  {responsive: true, displaylogo: false});
          })
          .catch((err) => {
            console.log('Error GirosBarGraph: ', err);
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

