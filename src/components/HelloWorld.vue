<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Plotly :data="data"
            :layout="layout"
            :mapbox-acces-token="config.mapboxAccesToken"
            :display-mode-bar="true"
            :scroll-zoom="true" />
  </div>
</template>

<script>

import { Plotly } from 'vue-plotly';

export default {
  components: {
    Plotly,
  },
  name: 'HelloWorld',
  props: {
    msg: String,
    chart: String,
  },
  data() {
    return {
      data: [{
        type: 'scattergeo',
        lat: [40.7127, 51.5072],
        lon: [-74.0059, 0.1275],
        mode: 'lines',
        line: {
          width: 2,
          color: 'blue',
        },
      }],
      layout: {
        width: 800,
        height: 550,
        title: 'London to NYC Great Circle',
        showlegend: false,
        geo: {
          resolution: 100,
          showland: true,
          showlakes: true,
          landcolor: 'rgb(204, 204, 204)',
          countrycolor: 'rgb(204, 204, 204)',
          lakecolor: 'rgb(255, 255, 255)',
          projection: {
            type: 'equirectangular',
          },
          coastlinewidth: 2,
          lataxis: {
            range: [0, 60],
            showgrid: true,
            tickmode: 'linear',
            dtick: 5,
          },
          lonaxis: {
            range: [-100, 40],
            showgrid: true,
            tickmode: 'linear',
            dtick: 20,
          },
        },
      },
      config: {
        mapboxAccesToken: 'pk.eyJ1IjoiZWR1YXJkbzA2OTciLCJhIjoiY2tmZm10MHViMGRpbDJzcGllMzNnbmw5MCJ9.Q3z7EDZiGsl2kUBuDSr_4g',
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
