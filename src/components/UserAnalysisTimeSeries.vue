<template>
  <div>
    <div class="row">
      <div class="col s6">
        <h5>Analisis del giro {{ giroUsuario }} y tarifa {{ tarifaUsuario }} del usuario seleccionado (sobre todo el conjunto de datos)</h5>
      </div>
      <div class="input-field col offset-s2 s3">
        <select @change="onChangeMethod($event)">
          <option value="median">Mediana</option>
          <option value="mean">Media</option>
        </select>
        <label>Valor</label>
      </div>
      <div v-if="loading" class="col input-field s1">
        <div class="preloader-wrapper small active">
          <div class="spinner-layer spinner-green-only">
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
    </div>
    <div v-if="flagNotUsed">
      <h6>Favor de seleccionar un usuario para continuar.</h6>
    </div>
    <div :id="plotId">
    </div>
  </div>

</template>

<script>
  import Plotly from 'plotly.js/dist/plotly';
  import axios from 'axios';

  export default {
    name: 'UserAnalysisTimeSeries',
    props:{
      plotId: String,
    },
    computed:{
      giroUsuario(){
        if(this.userData != null){
          return this.userData.giro
        }
        return '';
      },
      tarifaUsuario(){
        if(this.userData != null){
          return this.userData.tarifa
        }
        return '';
      }
    },
    data(){
      return {
        flagNotUsed : true,
        layout: {
          legend: {
            orientation: 'h'
          },
          margin: {
            // l: 40 ,
            r: 40,
            // b: 100,
            t: 40,
            autoexpand: true,
          },
          autosize: true,
          xaxis: {
            showgrid: true,
            zeroline: false
          },
          yaxis: {
            title: 'Consumo registrado (kwh)',
            showline: false
          }
        },
        dataAnalysis: null,
        methodAnalysis: 'median',
        userData: null,
        loading: false,
      }
    },
    methods:{
      onChangeMethod(event){
        console.log('Change', event.target.value);
        this.loading = true;
        this.methodAnalysis = event.target.value;
        if(this.userData != null){
          this.updateAnalysis(this.userData);
        }
      },
      updateAnalysis(userInfo){
        this.flagNotUsed = false;
        // console.log('Method fired Analysis', userInfo);
        this.userData = userInfo;
        this.loading = true;

        axios
          .post('http://127.0.0.1:8000/users/analisis/', {
            "tarifa": userInfo.tarifa,
            "giro": userInfo.giro,
            "cluster": "1",
            "type": this.methodAnalysis
          })
          .then((res) => {
            // console.log('Respuesta', res.data);
            // console.log('Respuesta', res.data.filtro_giro);
            // console.log(Object.values(res.data.filtro_giro));
            // console.log(Object.values(res.data.filtro_tarifa));
            // console.log(Object.values(res.data.filtro_ambos));

            const trace_giro = {
              x: Object.keys(res.data.filtro_giro),
              y: Object.values(res.data.filtro_giro),
              type: 'Scatter',
              name: 'Consumo giro'
            };
            const trace_tarifa = {
              x: Object.keys(res.data.filtro_tarifa),
              y: Object.values(res.data.filtro_tarifa),
              type: 'Scatter',
              name: 'Consumo tarifa'
            };
            const trace_ambos = {
              x: Object.keys(res.data.filtro_ambos),
              y: Object.values(res.data.filtro_ambos),
              type: 'Scatter',
              name: 'Consumo por giro y tarifa'
            };

            this.dataAnalysis = [trace_giro, trace_tarifa, trace_ambos ];
            this.loading = false;

            Plotly.newPlot(this.plotId, [trace_tarifa, trace_ambos, trace_giro ] , this.layout, {responsive: true, displaylogo: false});

          })
          .catch((error) => {
            console.log('Error in UserAnalysisTimeSeries: ', error);
            M.toast({
              html: 'Algo salio mal :(, parece no existir conexion con el servidor',
              classes: 'amber lighten-1 rounded',
              displayLength : 6000
            })
          });
      }
    }
  }
</script>

