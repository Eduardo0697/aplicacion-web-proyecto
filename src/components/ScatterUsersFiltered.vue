<template>
<div>
  <div class="row">
    <div class="col s6">
      <h5>Mapa de usuarios anomalos</h5>
    </div>
    <div class="input-field col  s6">
      <select @change="onChangeMethod($event)">
        <option value="tarifa">Tarifa</option>
        <option value="tipotarifa">Tipo de tarifa</option>
        <option value="giro">Giro</option>
        <option value="divisiongiro">Division del giro</option>
        <option value="hilos">Numero de fases contratadas</option>
        <option value="tiposumini">Tipo de suministro</option>
      </select>
      <label>Categorizar por: </label>
    </div>
  </div>
  <div v-if="flagNotUsed">
    <h6>Favor de seleccionar una manzana para continuar.</h6>
  </div>
  <div id="UsersScatter"></div>
</div>
</template>

<script>
  import Plotly from 'plotly.js/dist/plotly';
  import axios from 'axios';

  export default {
    name: 'ScatterUsersFiltered',
    props: {
      selectedFrom: String,
    },
    data() {
      return {
        filtroManzanas : "tarifa",
        manzanaSelected : null,
        flagNotUsed : true,
        layout: {
          showlegend: true,
          legend: {
            orientation: 'h',
          },
          margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 40,
            autoexpand: true,
          },
          autosize: true,
          hovermode: 'closest',
          mapbox: {
            bearing: 0,
            center: {
              lon: 266.9,
              lat: 16.75,
            },
            pitch: 0,
            zoom: 10,
            style: 'light',
          },
        },
        config: {
          displaylogo: false,
          mapboxAccessToken: 'pk.eyJ1IjoiZWR1YXJkbzA2OTciLCJhIjoiY2tmZm10MHViMGRpbDJzcGllMzNnbmw5MCJ9.Q3z7EDZiGsl2kUBuDSr_4g',
          responsive: true,
          displayModeBar: true,
        },
      }
    },

    methods: {
      onChangeMethod(event){
        this.filtroManzanas = event.target.value;
        this.updateUsersMap(this.manzanaSelected);
        // console.log('Change', event.target.value);
        // this.loading = true;
        // this.methodAnalysis = event.target.value;
        // if(this.userData != null){
        //   this.updateAnalysis(this.userData);
        // }
      },
      updateUsersMap(manzana){
        this.flagNotUsed = false;
        this.manzanaSelected = manzana;
        console.log('Actualizare el mapa de la manzana: ', manzana);
        axios
          .get(`http://127.0.0.1:8000/users/${this.selectedFrom}/${manzana}`)
          .then( (response) =>{
            console.log('Recuperado de:', manzana);
            console.log('Manzana, ', response.data);


            let filtro = this.filtroManzanas;

            let filterValues =  response.data.features.map( (user) => user.properties[filtro]);
            let uniqueValues = [...new Set(filterValues)];

            let dataTraces = uniqueValues.map( (value) => {
              let usersFilter = response.data.features.filter( (user) => {
                return (user.properties[filtro] === value)
              });
              return {
                type: 'scattermapbox',
                name: value,
                lat: usersFilter.map( (user) =>  user.geometry.coordinates[1]),
                lon: usersFilter.map( (user) =>  user.geometry.coordinates[0]),
                mode: 'markers',
                hovertemplate: 'Longitud:%{lon:.2f}<br>Longitud:%{lat:.2f}<br><b>RPU: %{text}</b><extra></extra>',
                marker: {
                  size: 10,
                },
                text: usersFilter.map( (user) => user.properties.rpu),
              }
            });
            console.log('Traces: ', dataTraces);


            Plotly.newPlot('UsersScatter', dataTraces , this.layout, this.config);
            let self = this;
            document.getElementById('UsersScatter').on('plotly_click', function(data){
              console.log('rpu selected: ', data.points[0].text);
              console.log('INFO RPU', data);
              self.$emit('user-selected', data.points[0].text);
            });

          })
          .catch((error) => {
            console.log('Algo salio mal :( 1', error);
            M.toast({
              html: 'Algo salio mal :(',
              classes: 'amber lighten-1 rounded',
              displayLength : 10000
            })

          });

      }
    }
  };
</script>
