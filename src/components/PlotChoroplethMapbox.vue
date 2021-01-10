<template>
  <div>
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
    <div id="CM"></div>
  </div>
</template>

<script>

import Plotly from 'plotly.js/dist/plotly';
import axios from 'axios';


export default {
  components:{
  },
  data() {
    return {
      info: null,
      loading: true,
      layout: {
        margin: {
          l: 0,
          r: 0,
          b: 0,
          t: 40,
          autoexpand: true,
        },
        height: 600,
        mapbox: {
          center: {
            lon: 266.9,
            lat: 16.75,
          },
          zoom: 11,
          style: 'light',
        },
      },
      config: {
        mapboxAccessToken: 'pk.eyJ1IjoiZWR1YXJkbzA2OTciLCJhIjoiY2tmZm10MHViMGRpbDJzcGllMzNnbmw5MCJ9.Q3z7EDZiGsl2kUBuDSr_4g',
        responsive: true,
        displayModeBar: true,
        displaylogo: false
      }
    };
  },
  mounted() {
    axios
      .get('http://127.0.0.1:8000/cloropeth_manzanas/')
      // eslint-disable-next-line no-return-assign
      .then((response) => {
        this.info = response.data;
        this.geoData = response.data;
        const listLocations = this.info.features.map((manzana) => manzana.id);
        const listWeight = this.info.features.map((manzana) => manzana.properties.numero_usuarios);
        const listCVE = this.info.features.map((manzana) => manzana.properties.mz_cvegeo);
        this.dataPlot = [
          {
            type: 'choroplethmapbox',
            locations: listLocations,
            hovertext: listCVE,
            hoverinfo: 'text + z',
            showLegend: true,
            z: listWeight,
            geojson: response.data,
            colorscale: 'Portland',
            colorbar: {
              title: {
                y: 0,
                yanchor: 'bottom',
                text: 'Numero de usuarios',
                side: 'right',
              },
            },
          },
        ];

        this.loading = false;

        Plotly.newPlot(document.getElementById('CM'), this.dataPlot, this.layout, this.config);

        let self = this;
        document.getElementById('CM').on('plotly_click', function(data){
          console.log('Manzana Seleccionada: ', data.points[0].hovertext);
          self.$emit('manzana-selected', data.points[0].hovertext);
        });


      })
      .catch((error) => {
        console.log('Algo salio mal :( 2', error);
        M.toast({
          html: '<p>Algo salio mal, esto puede ser debido a un error en la solicitud, verificar que exista conexión al servidor</p>',
          classes: 'amber lighten-1 grey-text text-darken-4 rounded',
          displayLength : 6000
        })
      })

  },

};
</script>
