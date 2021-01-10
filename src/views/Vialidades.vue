<template>
  <div class="grey lighten-5" >
    <div class="row">
      <div class="col s12 m9">
        <div class="row">
          <div class="col s12">
            <div class="card-panel hoverable">
              <h5>Concentracion de usuarios por vialidad</h5>
              <plot-choroplet-vialidades v-on:frente-selected="updateUsersMap($event)" />
            </div>
          </div>
          <div class="col s12 l6">
            <div class="card-panel">
              <scatter-users-filtered selected-from="frente" v-on:user-selected="updateUserInfo($event)" ref="mapaUsuarios"/>
            </div>
          </div>
          <div class="col s12 l6">
            <div class="card-panel">
              <h5>Historico de consumo electrico del usuario</h5>
              <user-history ref="userTIMESERIES" plot-id="UH"/>

            </div>
          </div>
          <div class="col s12 l12">
            <div class="card-panel">
              <user-analysis-time-series ref="userAnalysis"  plot-id="UA"/>
            </div>
          </div>
          <div class="col s12 l12">
            <div class="card-panel">
              <div class="row">
                <div class="col s11">
                  <h4>Analisis del cluster mas cercano a la anomalia </h4>
                </div>
                <div v-if="loadingClusterAnalysis" class="col s1" style="display: flex; justify-content: center; align-content: center;">
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

            </div>
          </div>
          <div class="col s12 l12">
            <div class="card-panel">
              <h5>Distribucion del consumo promedio</h5>
              <box-plot-graph ref="clusterDistribution"  plot-id="clusterDist" />
            </div>
          </div>
          <div class="col s12 l6">
            <div class="card-panel">
              <analysis-cluster-bar-graph  ref="clusterTopGiros"  data-study="giro" plot-id="historicoClusterTop" graph-title="Top giros del cluster"/>
            </div>
          </div>
          <div class="col s12 l6">
            <div class="card-panel">
              <analysis-cluster-bar-graph  ref="clusterTopdiivision"  data-study="divisiongiro" plot-id="divisionGiroClusterTop" graph-title="Top Division Giro del cluster"/>
            </div>
          </div>

          <div class="col s12 l6">
            <div class="card-panel">
              <analysis-cluster-bar-graph  ref="clusterTopTarifas"  data-study="tarifa" plot-id="tarifaClusterTop" graph-title="Top tarifas del cluster"/>
            </div>
          </div>
          <div class="col s12 l6">
            <div class="card-panel">
              <analysis-cluster-bar-graph  ref="clusterTopTipoTarifas"  data-study="tipotarifa" plot-id="tipotarifaClusterTop" graph-title="Top Tipo tarifa del cluster"/>
            </div>
          </div>
          <div class="col s12 l6">
            <div class="card-panel">
              <analysis-cluster-bar-graph  ref="clusterTopHilos"  data-study="hilos" plot-id="hilosClusterTop" graph-title="Top Fases contradas del cluster"/>
            </div>
          </div>
          <div class="col s12 l6">
            <div class="card-panel">
              <analysis-cluster-bar-graph  ref="clusterTipoSuministro"  data-study="tiposumini" plot-id="tipoSuministroClusterTop" graph-title="Top tipo de suministro del cluster"/>
            </div>
          </div>
          <div class="col s12 l6">
            <div class="card-panel">
              <analysis-cluster-bar-graph  ref="clusterTimeSeries"  data-study="timeseries" plot-id="timeseriesClusterTop" graph-title="Top tipo de comportamientos del historico de consumos del cluster"/>
            </div>
          </div>
          <div class="col s12 l12">
            <div class="card-panel">
              <h5>Diferentes comportamientos caracteristicos encontrados en todo el conjunto de historico de consumos</h5>
              <PlotTimeSeries/>
            </div>
          </div>
        </div>
      </div>
      <div class="col s12 m3">
        <div style="position:fixed;">
          <information-analysis tab-manzana="Frente" information-method="frentes" :user-information="userInfo" ref="manzanaInformationRef"/>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import PlotTimeSeries from '@/components/PlotTimeSeries.vue';
  import ScatterUsersFiltered from '@/components/ScatterUsersFiltered';
  import UserHistory from '@/components/UserHistory';
  import UserAnalysisTimeSeries from '@/components/UserAnalysisTimeSeries';
  import DistributionGraph from '../components/DistributionGraph';
  import AnalysisClusterBarGraph from '../components/AnalysisClusterBarGraph';
  import InformationAnalysis from '../components/InformationAnalysis';
  import PlotChoropletVialidades from '../components/PlotChoropletVialidades';
  import BoxPlotGraph from '../components/BoxPlotGraph';

  import axios from 'axios';

  export default {
    name: 'Vialidades',
    components: {
      BoxPlotGraph,
      PlotTimeSeries,
      PlotChoropletVialidades,
      ScatterUsersFiltered,
      UserHistory,
      UserAnalysisTimeSeries,
      AnalysisClusterBarGraph,
      InformationAnalysis
    },
    data() {
      return{
        userInfo: null,
        userTimeSeries :{
          dateConsumo: null,
          consumo: null,
        },
        userNearestClusterSelected : null,
        loadingClusterAnalysis : false,
      }
    },
    mounted() {
      M.AutoInit();
    },
    methods:{
      updateUsersMap(data){
        console.log('Actualiza el mapa de usuarios', data);
        this.$refs.mapaUsuarios.updateUsersMap(data.OID);
        this.$refs.manzanaInformationRef.updateFrenteInformation(data.OID);
      },
      updateUserInfo(data){
        console.log('Event Fired, Updating Graphs and Info', data);
        axios
          .get(`http://127.0.0.1:8000/users/${data}`)
          .then((response) => {
            console.log('Response Data', response);
            this.userInfo = response.data.features[0].properties;
            this.$refs.userTIMESERIES.updateHistorico(this.userInfo);
            this.$refs.userAnalysis.updateAnalysis(this.userInfo);
            this.loadingClusterAnalysis = true;
            return axios.get(`http://127.0.0.1:8000/anomaly/analysis/similar/${this.userInfo.rpu}`)
          })
          .then((res) => {
            console.log('Consiguiendo cluster mas cercano', res.data.cluster);
            this.userNearestClusterSelected = res.data.cluster;
            this.$refs.clusterDistribution.updateGraph(this.userNearestClusterSelected);
            this.$refs.clusterTopGiros.updateGraph(this.userNearestClusterSelected);
            this.$refs.clusterTopTarifas.updateGraph(this.userNearestClusterSelected);
            this.$refs.clusterTopHilos.updateGraph(this.userNearestClusterSelected);
            this.$refs.clusterTopdiivision.updateGraph(this.userNearestClusterSelected);
            this.$refs.clusterTipoSuministro.updateGraph(this.userNearestClusterSelected);
            this.$refs.clusterTopTipoTarifas.updateGraph(this.userNearestClusterSelected);
            this.$refs.clusterTimeSeries.updateGraph(this.userNearestClusterSelected);
            this.loadingClusterAnalysis = false;
          })
          .catch((error) => {
            console.log(error);
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

