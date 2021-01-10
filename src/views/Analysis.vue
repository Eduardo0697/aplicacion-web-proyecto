<template>
  <div class="about ">
    <h4>Analisis de los usuarios con comportamiento atipicos</h4>
    <div class="row" style="display: flex; flex-wrap: wrap; ">
      <div class="col s12">
        <general-information></general-information>
      </div>
      <div class="col s12">
        <div class="card-panel">
          <h5>Distribucion del consumo promedio diario</h5>
          <box-plot-graph ref="clusterAnomaliesDistribution"  plot-id="clusterDist" />
        </div>
      </div>
      <div class="col s12 m6 l4 xl3">
        <div class="card-panel">
          <analysis-bar-graph plot-id="girosGraph"  graph-title="Top giros" data-study="giro"/>
        </div>
      </div>
      <div class="col s12 m6 l4 xl3">
        <div class="card-panel">
          <analysis-bar-graph plot-id="divisionGirosGraph" graph-title="Division del giro" data-study="divisiongiro"/>
        </div>
      </div>
      <div class="col s12 m6 l4 xl3">
        <div class="card-panel">
          <analysis-bar-graph plot-id="tarifasGraph" graph-title="Top tarifas" data-study="tarifa"/>
        </div>
      </div>
      <div class="col s12 m6 l4 xl3">
        <div class="card-panel">
          <analysis-bar-graph plot-id="tipoTarifaGraph" graph-title="Top tipo de tarifas" data-study="tipotarifa"/>
        </div>
      </div>
      <div class="col s12 m6 l4 xl3" style="margin-left: 0;">
        <div class="card-panel">
          <analysis-bar-graph plot-id="hilosTopGraph" graph-title="Top fases contratadas" data-study="hilos"/>
        </div>
      </div>
      <div class="col s12 m6 l4 xl3" style="margin-left: 0;">
        <div class="card-panel">
          <analysis-bar-graph plot-id="agenciaTopGraph" graph-title="Top agencias" data-study="agencia"/>
        </div>
      </div>
      <div class="col s12 m6 l4 xl3" style="margin-left: 0;">
        <div class="card-panel">
          <analysis-bar-graph plot-id="cicloTopGraph" graph-title="Top ciclos" data-study="ciclo"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import AnalysisBarGraph from '@/components/AnalysisBarGraph';
  import GeneralInformation from '@/components/GeneralInformation';
  import BoxPlotGraph from '../components/BoxPlotGraph';
  export default {
    name: 'Analysis',
    components:{
      AnalysisBarGraph,
      GeneralInformation,
      BoxPlotGraph
    },
    mounted() {
      this.$refs.clusterAnomaliesDistribution.updateGraph(-1);
      M.AutoInit();
    }
  }
</script>
