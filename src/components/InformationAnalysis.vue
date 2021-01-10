<template>
  <div class="card-panel ">
    <div class="row">
      <div class="col s12">
        <ul class="tabs">
          <li class="tab col s6"><a href="#TabManzana">{{ tabManzana }}</a></li>
          <li class="tab col s6"><a href="#TabUsuario">Usuario</a></li>
        </ul>
      </div>
      <div id="TabManzana" class="col s12">
        <div v-if="informationManzana && informationMethod==='manzanas'" style="margin-top: 2rem">
          <div class="row">
            <div class="col s6"><b>Cve Geografica: </b> </div>
            <div class="col s6">  {{ informationManzana.CVEGEO }}  </div>
          </div>
          <div class="row">
            <div class="col s6"><b>Acceso autos: </b></div>
            <div class="col s6">{{ informationManzana.MZ_ACESOAUT_C }}</div>
          </div>
          <div class="row">
            <div class="col s6"><b>Acceso personas: </b></div>
            <div class="col s6">{{ informationManzana.MZ_ACESOPER_C }}</div>
          </div>
          <div class="row">
            <div class="col s6"><b>Alumbrado público: </b></div>
            <div class="col s6">{{ informationManzana.MZ_ALUMPUB_C }}</div>
          </div>
          <div class="row">
            <div class="col s6"><b>Presencia de comercio semifijo: </b></div>
            <div class="col s6">{{ informationManzana.MZ_PUESSEMI_C }}</div>
          </div>
          <div class="row">
            <div class="col s6"><b>Presencia de comercio ambulante: </b></div>
            <div class="col s6">{{ informationManzana.MZ_PUESAMBU_C }}</div>
          </div>
          <div class="row">
            <div class="col s6"><b>Pavimento de calles: </b></div>
            <div class="col s6">{{ informationManzana.MZ_RECUCALL_C }}</div>
          </div>
        </div>
        <div v-if="informationManzana === null && informationMethod==='manzanas'">
          <p>Selecciona una manzana para mostrar informacion</p>
        </div>
        <div v-if="informationFrente && informationMethod==='frentes'">
          <div class="row">
            <div class="col s6"><b>Frente: </b></div>
            <div class="col s6">{{ informationFrente.MZ_FT_OID }}</div>
          </div>
          <div class="row">
            <div class="col s6"><b>Tipo vialidad: </b></div>
            <div class="col s6">{{ informationFrente.MZ_FT_TIPOVIAL }}</div>
          </div>
          <div class="row">
            <div class="col s6"><b>Nombre vialidad: </b></div>
            <div class="col s6">{{ informationFrente.MZ_FT_NOMVIAL }}</div>
          </div>
          <div class="row">
            <div class="col s6"><b>Acceso autos: </b></div>
            <div class="col s6">{{ informationFrente.MZ_FT_ACESOAUT_C }}</div>
          </div>
          <div class="row">
            <div class="col s6"><b>Acceso personas: </b></div>
            <div class="col s6">{{ informationFrente.MZ_FT_ACESOPER_C }}</div>
          </div>
          <div class="row">
            <div class="col s6"><b>Pavimento en calles: </b></div>
            <div class="col s6">{{ informationFrente.MZ_FT_RECUCALL_C }}</div>
          </div>
          <div class="row">
            <div class="col s6"><b>Alumbrado público: </b></div>
            <div class="col s6">{{ informationFrente.MZ_FT_ALUMPUB_C }}</div>
          </div>
          <div class="row">
            <div class="col s6"><b>Presencia de comercio semifijo: </b></div>
            <div class="col s6">{{ informationFrente.MZ_FT_PUESSEMI_C }}</div>
          </div>
          <div class="row">
            <div class="col s6"><b>Presencia de comercio ambulante: </b></div>
            <div class="col s6">{{ informationFrente.MZ_FT_PUESAMBU_C }}</div>
          </div>
        </div>
        <div v-if="informationFrente === null && informationMethod==='frentes'">
          <p>Selecciona un frente de  manzana para mostrar informacion</p>
        </div>
      </div>
      <div id="TabUsuario" class="col s12">
        <div v-if="showInformation" style="margin-top: 2rem">
          <div class="row">
            <div class="col s6"><b>RPU:</b></div>
            <div class="col s6">{{ userInformation.rpu }}</div>
          </div>
          <div class="row">
            <div class="col s6"><b>Nombre:</b></div>
            <div class="col s6">{{ userInformation.nombreusua }}</div>
          </div>
          <div class="row">
            <div class="col s6"><b>Consumo promedio diario:</b></div>
            <div class="col s6">{{ userInformation.consumopro }}</div>
          </div>
          <div class="row">
            <div class="col s6"><b>Giro comercial:</b></div>
            <div class="col s6">{{ userInformation.giro }}</div>
          </div>
          <div class="row">
            <div class="col s6"><b>División del giro:</b></div>
            <div class="col s6">{{ userInformation.divisiongiro }}</div>
          </div>
          <div class="row">
            <div class="col s6"><b>Tarifa:</b></div>
            <div class="col s6">{{ userInformation.tarifa }}</div>
          </div>
          <div class="row">
            <div class="col s6"><b>Tipo de tarifa:</b></div>
            <div class="col s6">{{ userInformation.tipotarifa }}</div>
          </div>
          <div class="row">
            <div class="col s6"><b>Fases contradas:</b></div>
            <div class="col s6">{{ userInformation.hilos }}</div>
          </div>
          <div class="row">
            <div class="col s6"><b>Tipo de suministro:</b></div>
            <div class="col s6">{{ userInformation.tiposumini }}</div>
          </div>
          <div class="row">
            <div class="col s6"><b>Agencia:</b></div>
            <div class="col s6">{{ userInformation.agencia }}</div>
          </div>
          <div class="row">
            <div class="col s6"><b>Ciclo:</b></div>
            <div class="col s6">{{ userInformation.ciclo }}</div>
          </div>
          <div class="row">
            <div class="col s6"><b>Comportamiento caractetistico del historico de consumos:</b></div>
            <div class="col s6">{{ userInformation.timeseries }}</div>
          </div>
        </div>
        <div v-else>
          <p>Selecciona un usuario para mostrar información</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    name: 'InformationAnalysis',
    props: {
      manzanaInformation: Object,
      userInformation: Object,
      informationMethod: String,
      tabManzana: String
    },
    data(){
      return{
        informationManzana : null,
        informationFrente: null,
      }
    },
    computed:{
      showInformation(){
        return this.userInformation != null;
      },
    },
    methods: {
      updateManzanaInformation(manzana){
        console.log('Update manzana info component', manzana);
        axios
          .get(`http://127.0.0.1:8000/manzanas/${manzana}`)
          .then((res) => {
            console.log("Respuesta info manzana: ", res.data.features[0].properties);
            this.informationManzana =  res.data.features[0].properties;
          })
          .catch((error) => {
            console.log('Error generado en componente de información de manzana', error);
            M.toast({
              html: '<p>Algo salio mal, esto puede ser debido a un error en la solicitud, verificar que exista conexión al servidor</p>',
              classes: 'amber lighten-1 grey-text text-darken-4 rounded',
              displayLength : 6000
            })
          });
      },
      updateFrenteInformation(frente){
        console.log('Update informationAnalysis info component', frente);
        axios
          .get(`http://127.0.0.1:8000/frente/${frente}`)
          .then((res) => {
            console.log("Respuesta info frente manzana: ", res.data.features[0].properties);
            this.informationFrente = res.data.features[0].properties;
            this.informationManzana =  null;
          })
          .catch((error) => {
            console.log('Error generado en componente de información de frente de manzana', error);
            M.toast({
              html: '<p>Algo salio mal, esto puede ser debido a un error en la solicitud, verificar que exista conexión al servidor</p>',
              classes: 'amber lighten-1 grey-text text-darken-4 rounded',
              displayLength : 6000
            })
          });
      },

    }
  };
</script>
<style>
  .tabs .tab a{
    color: #009688;
  }
  .tabs .tab a:hover,.tabs .tab a.active {
    background-color:transparent;
    color: #00796b;
  }
  .tabs .indicator {
    background-color: #00796b;
  }
</style>
