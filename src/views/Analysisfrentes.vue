<template>
    <div>
      <h3>Información de los frentes de manzanas</h3>
      <div class="row" style="display: flex; flex-wrap: wrap; ">
        <div class="col s12">
          <general-information></general-information>
        </div>
        <div class="col s12 m6 l4 xl3">
          <div class="card-panel">
            <analysis-manzanas-bar-graph plot-id="PUESAMBUGraph"  graph-title="Presencia de puestos ambulantes" data-study="MZ_FT_PUESAMBU_C" table-db="frentes"/>
          </div>
        </div>

        <div class="col s12 m6 l4 xl3" style="margin-left: 0;">
          <div class="card-panel">
            <analysis-manzanas-proportions-graph plot-id="propPuestosambulates"  graph-title="Proporcion de presencia de puestos ambulantes" data-study="MZ_FT_PUESAMBU_C" table-db="frentes" />
          </div>
        </div>
        <div class="col s12 m6 l4 xl3">
          <div class="card-panel">
            <analysis-manzanas-bar-graph plot-id="PUESSEMIGraph"  graph-title="Presencia de puestos semifijos" data-study="MZ_FT_PUESSEMI_C" table-db="frentes" />
          </div>
        </div>

        <div class="col s12 m6 l4 xl3" style="margin-left: 0;">
          <div class="card-panel">
            <analysis-manzanas-proportions-graph plot-id="propPuestossemif"  graph-title="Proporcion de presencia de puestos semifijos" data-study="MZ_FT_PUESSEMI_C" table-db="frentes" />
          </div>
        </div>
        <div class="col s12 m6 l4 xl3">
          <div class="card-panel">
            <analysis-manzanas-bar-graph plot-id="TIPOVIAraph"  graph-title="Tipo de via" data-study="MZ_FT_TIPOVIA_C" table-db="frentes"/>
          </div>
        </div>

        <div class="col s12 m6 l4 xl3" style="margin-left: 0;">
          <div class="card-panel">
            <analysis-manzanas-proportions-graph plot-id="proptipoviac"  graph-title="Proporcion por tipo de vias" data-study="MZ_FT_TIPOVIA_C" table-db="frentes" />
          </div>
        </div>
        <div class="col s12 m6 l4 xl3">
          <div class="card-panel">
            <analysis-manzanas-bar-graph plot-id="Vialidadraph"  graph-title="Vialidad" data-study="MZ_FT_TIPOVIAL" table-db="frentes" />
          </div>
        </div>
        <div class="col s12 m6 l4 xl3" style="margin-left: 0;">
          <div class="card-panel">
            <analysis-manzanas-proportions-graph plot-id="propTipoVia"  graph-title="Proporcion de vialidades" data-study="MZ_FT_TIPOVIAL" table-db="frentes" />
          </div>
        </div>
        <div class="col s12 m6 l4 xl3">
          <div class="card-panel">
            <analysis-manzanas-bar-graph plot-id="RECUCALLLraph"  graph-title="Pavimento en calles" data-study="MZ_FT_RECUCALL_C" table-db="frentes"/>
          </div>
        </div>
        <div class="col s12 m6 l4 xl3" style="margin-left: 0;">
          <div class="card-panel">
            <analysis-manzanas-proportions-graph plot-id="propRECUCAL"  graph-title="Proporcion de vialidades con pavimento de calles" data-study="MZ_FT_RECUCALL_C" table-db="frentes" />
          </div>
        </div>
        <div class="col s12 m6 l4 xl3">
          <div class="card-panel">
            <analysis-manzanas-bar-graph plot-id="ALUMPUBraph"  graph-title="Alumbrado publico" data-study="MZ_FT_ALUMPUB_C" table-db="frentes"/>
          </div>
        </div>
        <div class="col s12 m6 l4 xl3" style="margin-left: 0;">
          <div class="card-panel">
            <analysis-manzanas-proportions-graph plot-id="propALIMPUB"  graph-title="Proporcion de vialidades con alumbrado publico" data-study="MZ_FT_ALUMPUB_C" table-db="frentes" />
          </div>
        </div>
        <div class="col s12 m6 l4 xl3">
          <div class="card-panel">
            <analysis-manzanas-bar-graph plot-id="ACESOPERraph"  graph-title="Acceso de personas" data-study="MZ_FT_ACESOPER_C" table-db="frentes"/>
          </div>
        </div>
        <div class="col s12 m6 l4 xl3" style="margin-left: 0;">
          <div class="card-panel">
            <analysis-manzanas-proportions-graph plot-id="propACESOPER"  graph-title="Proporcion de acceso de personas" data-study="MZ_FT_ACESOPER_C" table-db="frentes" />
          </div>
        </div>
        <div class="col s12 m6 l4 xl3" style="margin-left: 0;">
          <div class="card-panel">
            <analysis-manzanas-bar-graph plot-id="ACESOAUTraph"  graph-title="Acceso de automoviles" data-study="MZ_FT_ACESOAUT_C" table-db="frentes" />
          </div>
        </div>
        <div class="col s12 m6 l4 xl3" style="margin-left: 0;">
          <div class="card-panel">
            <analysis-manzanas-proportions-graph plot-id="propACESOAUT"  graph-title="Proporcion de acceso de automoviles" data-study="MZ_FT_ACESOAUT_C" table-db="frentes" />
          </div>
        </div>



      </div>
    </div>
</template>

<script>
  import AnalysisManzanasBarGraph from '../components/AnalysisManzanasBarGraph';
  import GeneralInformation from '../components/GeneralInformation';
  import AnalysisManzanasProportionsGraph from '../components/AnalysisManzanasProportionsGraph';

  export default {
    name: 'Analysisfrentes',
    components:{
      AnalysisManzanasBarGraph,
      GeneralInformation,
      AnalysisManzanasProportionsGraph
    },
    mounted() {
      M.AutoInit();
    }
  };
</script>

