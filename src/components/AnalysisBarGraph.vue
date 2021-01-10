<template>
  <div>
    <div class="row">
      <div class="col s6">
        <h5>{{ graphTitle }}</h5>
      </div>
      <div class="input-field col offset-s2 s4">
        <select @change="onChangeShowNumber($event)">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="all">Todos</option>
        </select>
        <label>Mostrar Top</label>
      </div>
    </div>

    <div :id="plotId" />
  </div>

</template>

<script>
  import Plotly from 'plotly.js/dist/plotly';
  import axios from 'axios';
  export default {
    name: 'AnalysisBarGraph',
    props:{
      graphTitle: String,
      plotId : String,
      dataStudy : String,
    },
    data() {
      return {
        numberItemsLoad : 5,
        layout: {
          barmode: 'group',
          legend: {
            orientation: 'h'
          },
          margin: {
            l: 40 ,
            r: 40,
            b: 40,
            t: 40,
            autoexpand: true,
          },
          autosize: true,
          // colorway: ["orange"]
        }
      }
    },
    mounted() {
      this.updateAnalysis(this.numberItemsLoad, this.dataStudy);
    },
    methods:{
      onChangeShowNumber(event){
        console.log('Change', event.target.value);
        this.numberItemsLoad = event.target.value;
        this.updateAnalysis(this.numberItemsLoad, this.dataStudy);
        // this.loading = true;
        // this.methodAnalysis = event.target.value;
        // if(this.userData != null){
        //   this.updateAnalysis(this.userData);
        // }
      },
      updateAnalysis(numberToLoad, dataStudy){
        // console.log('Actualización de grafica', numberToLoad);
        // this.loading = true;
        axios
          .get(`http://127.0.0.1:8000/anomaly/analysis/${dataStudy}/${numberToLoad}`)
          .then((res) => {
            // console.log(dataStudy, res.data)
            let yValues = Object.values(res.data).map( (giro) => giro["0"]);
            let xValues = Object.values(res.data).map( (giro) => {
              return `_${giro["1"]}`
            });
            console.log(dataStudy, xValues, yValues);
            let trace_1 = {
              x: xValues,
              y: yValues,
              name: 'Giros',
              type: 'bar'
            };
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

