<template>
  <div>
    <h3>Información de las manzanas</h3>
    <div class="row" style="display: flex; flex-wrap: wrap; ">
      <div class="col s12">
        <general-information></general-information>
      </div>
      <div class="col s12 m6 l4 xl3">
        <div class="card-panel">
          <analysis-manzanas-bar-graph plot-id="PUESAMBUGraph"  graph-title="Presencia de puestos ambulantes" data-study="MZ_PUESAMBU_C" table-db="manzanas"/>
        </div>
      </div>

      <div class="col s12 m6 l4 xl3" style="margin-left: 0;">
        <div class="card-panel">
          <analysis-manzanas-proportions-graph plot-id="propPuestosambulatesMZ"  graph-title="Proporcion con presencia de puestos ambulantes" data-study="MZ_PUESAMBU_C" table-db="manzanas" />
        </div>
      </div>

      <div class="col s12 m6 l4 xl3">
        <div class="card-panel">
          <analysis-manzanas-bar-graph plot-id="PUESSEMIGraph"  graph-title="Presencia de puestos semifijos" data-study="MZ_PUESSEMI_C" table-db="manzanas"/>
        </div>
      </div>

      <div class="col s12 m6 l4 xl3" style="margin-left: 0;">
        <div class="card-panel">
          <analysis-manzanas-proportions-graph plot-id="propPuestosaemifijosMZ"  graph-title="Proporcion con presencia de puestos semifijos" data-study="MZ_PUESSEMI_C" table-db="manzanas" />
        </div>
      </div>

      <div class="col s12 m6 l4 xl3">
        <div class="card-panel">
          <analysis-manzanas-bar-graph plot-id="RECUCALLLraph"  graph-title="Pavimento en calles" data-study="MZ_RECUCALL_C" table-db="manzanas"/>
        </div>
      </div>

      <div class="col s12 m6 l4 xl3" style="margin-left: 0;">
        <div class="card-panel">
          <analysis-manzanas-proportions-graph plot-id="proppavimentoCallesMZ"  graph-title="Proporcion con pavimento en calles" data-study="MZ_RECUCALL_C" table-db="manzanas" />
        </div>
      </div>

      <div class="col s12 m6 l4 xl3">
        <div class="card-panel">
          <analysis-manzanas-bar-graph plot-id="ALUMPUBraph"  graph-title="Alumbrado publico" data-study="MZ_ALUMPUB_C" table-db="manzanas"/>
        </div>
      </div>

      <div class="col s12 m6 l4 xl3" style="margin-left: 0;">
        <div class="card-panel">
          <analysis-manzanas-proportions-graph plot-id="propAlbumbradoMZ"  graph-title="Proporcion con alumbrado publico" data-study="MZ_ALUMPUB_C" table-db="manzanas" />
        </div>
      </div>

      <div class="col s12 m6 l4 xl3">
        <div class="card-panel">
          <analysis-manzanas-bar-graph plot-id="ACESOPERraph"  graph-title="Acceso de personas" data-study="MZ_ACESOPER_C" table-db="manzanas"/>
        </div>
      </div>

      <div class="col s12 m6 l4 xl3" style="margin-left: 0;">
        <div class="card-panel">
          <analysis-manzanas-proportions-graph plot-id="propACCESOMZ"  graph-title="Proporcion con acceso de personas" data-study="MZ_ACESOPER_C" table-db="manzanas" />
        </div>
      </div>

      <div class="col s12 m6 l4 xl3">
        <div class="card-panel">
          <analysis-manzanas-bar-graph plot-id="ACESOAUTraph"  graph-title="Acceso de automoviles" data-study="MZ_ACESOAUT_C" table-db="manzanas"/>
        </div>
      </div>

      <div class="col s12 m6 l4 xl3" style="margin-left: 0;">
        <div class="card-panel">
          <analysis-manzanas-proportions-graph plot-id="propACCESAUTOMZ"  graph-title="Proporcion con acceso de automoviles" data-study="MZ_ACESOAUT_C" table-db="manzanas" />
        </div>
      </div>

      <div class="col s12 m6 l4 xl3">
        <div class="card-panel">
          <histogram-graph-manzanas  graph-title="Porcentaje de manzanas con energia electrica" plot-id="histogramaDatosEnergia" table="MZ_P_V_C_ELEC"/>
        </div>
      </div>
      <div class="col s12 m6 l4 xl3">
        <div class="card-panel">
          <histogram-graph-manzanas  graph-title="Porcentaje de manzanas con recubrimiento en piso" plot-id="histogramaDatosPiso" table="MZ_P_V_PISODT"/>
        </div>
      </div>
      <div class="col s12 m6 l4 xl3">
        <div class="card-panel">
          <histogram-graph-manzanas  graph-title="Porcentaje por manzanas con poblacion de 0 a 14 años" plot-id="histogramaPob014" table="MZ_PP0A14A"/>
        </div>
      </div>
      <div class="col s12 m6 l4 xl3">
        <div class="card-panel">
          <histogram-graph-manzanas  graph-title="Porcentaje por manzanas con poblacion de 15 a 29 años" plot-id="histogramaPob1529" table="MZ_PP15A29A"/>
        </div>
      </div>
      <div class="col s12 m6 l4 xl3">
        <div class="card-panel">
          <histogram-graph-manzanas  graph-title="Porcentaje por manzanas con poblacion de 30 a 59 años" plot-id="histogramaPob3059" table="MZ_PP30A59A"/>
        </div>
      </div>
      <div class="col s12 m6 l4 xl3">
        <div class="card-panel">
          <histogram-graph-manzanas  graph-title="Porcentaje por manzanas con poblacion de 60 y mas años" plot-id="histogramaPob60" table="MZ_PP_60YMAS"/>
        </div>
      </div>
      <div class="col s12 m6 l4 xl3" style="margin-left: 0;">
        <div class="card-panel">
          <histogram-graph-manzanas  graph-title="Porcentaje de manzanas con mas de 3 ocupantes por cuarto" plot-id="histogramaOcupantesPorCuarto" table="MZ_P_3MASOCUP"/>
        </div>
      </div>
      <div class="col s12 m6 l4 xl3" style="margin-left: 0;">
        <div class="card-panel">
          <histogram-graph-manzanas  graph-title="Promedio de escolaridad por manzana" plot-id="histogramaGRAPROES" table="MZ_GRAPROES"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import AnalysisManzanasBarGraph from '../components/AnalysisManzanasBarGraph';
  import GeneralInformation from '../components/GeneralInformation';
  import HistogramGraphManzanas from '../components/HistogramGraphManzanas';
  import AnalysisManzanasProportionsGraph from '../components/AnalysisManzanasProportionsGraph';

  export default {
    name: 'AnalysisManzanas',
    components:{
      AnalysisManzanasBarGraph,
      GeneralInformation,
      HistogramGraphManzanas,
      AnalysisManzanasProportionsGraph
    },
    mounted() {
      M.AutoInit();
    }
  };
</script>

<style scoped>

</style>
