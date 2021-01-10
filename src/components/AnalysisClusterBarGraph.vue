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
    <div :id="plotId" />
  </div>

</template>

<script>
  import Plotly from "plotly.js";
  import axios from "axios";
  export default {
    name: 'AnalysisClusterBarGraph',
    props:{
      graphTitle: String,
      plotId : String,
      dataStudy : String,
      cluster: String,
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
          yaxis:{
            title: 'Numero de usuarios',
          },
          autosize: true,
          // colorway: ["orange"]
        },
        flagNotUsed: true,
        userCluster: null,
        loading: false,
      }
    },
    mounted() {
      // this.updateAnalysis();
    },
    methods:{
      onChangeShowNumber(event){
        console.log('Change', event.target.value);
        this.numberItemsLoad = event.target.value;

        this.loading = true;
        this.updateGraph(this.userCluster);
        // this.methodAnalysis = event.target.value;
        // if(this.userData != null){
        //   this.updateAnalysis(this.userData);
        // }
      },
      updateGraph(cluster){
        this.loading=true;
        this.flagNotUsed = false;
        this.userCluster = cluster;
        axios
          .get(`http://127.0.0.1:8000/anomaly/analysis/cluster/table/`,{
            params:{
              topNumber: this.numberItemsLoad.toString(),
              table: this.dataStudy,
              cluster: this.userCluster.toString()
            }
          })
          .then((res) => {
            console.log(res.data);
            let yValues = Object.values(res.data).map( (row) => row["0"]);
            let xValues = Object.values(res.data).map( (row) => {
              return `_${row["1"]}`
            });

            let trace_1 = {
              x: xValues,
              y: yValues,
              name: 'Giros',
              type: 'bar'
            };
            this.loading= false;
            Plotly.newPlot(this.plotId, [trace_1], this.layout,  {responsive: true, displaylogo: false});

          })
          .catch((err) => {
            console.log('Error: ', err);
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
