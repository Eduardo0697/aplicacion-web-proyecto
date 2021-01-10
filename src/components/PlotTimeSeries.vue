<template>
  <div id="centroides"></div>
</template>

<script>

import axios from 'axios';
import Plotly from 'plotly.js/dist/plotly';

export default {
  mounted() {
    axios
      .get('http://127.0.0.1:8000/centroids/')
      .then((response) => {
        this.info = response.data;
        // console.log('Info', this.info);
        // console.log('keys', Object.keys(this.info));
        // console.log('Values', this.info.value());
        Object.entries(this.info).forEach((obj) => {
          // console.log('objeto: ', obj[1]);
          this.dataPlot.push({
            name: obj[0],
            y: Object.values(obj[1]),
            type: 'scatter',
          });
        });
        // console.log(this.dataPlot);
        Plotly.newPlot("centroides", this.dataPlot , this.layout, {responsive: true, displaylogo: false});

      })
      .catch((error) => {
        console.log(error);
        M.toast({
          html: '<p>Algo salio mal, esto puede ser debido a un error en la solicitud, verificar que exista conexión al servidor</p>',
          classes: 'amber lighten-1 grey-text text-darken-4 rounded',
          displayLength : 6000
        })
      })
      .finally(() => this.loading = false);
  },
  data() {
    return {
      loading: true,
      info: null,
      dataPlot: [],
      layout: {
        legend: {
          orientation: 'h',
        },
        margin: {
          // l: 40 ,
          r: 40,
          b: 40,
          t: 40,
          autoexpand: true,
        },
        xaxis: {
          zeroline: false
        },
        yaxis: {
          showline: false
        },
        autosize: true,
      },
    };
  },
};
</script>
