<template>
  <div class="hello">
    <div id="gd"></div>
  </div>
</template>

<script>
import Plotly from 'plotly.js/dist/plotly';

export default {

  mounted() {
    Plotly.setPlotConfig({
      mapboxAccessToken: this.config.mapboxAccesToken,
      responsive: true,
      displayModeBar: true,
    });

    Plotly.newPlot('gd', this.data, this.layout);
  },
  data() {
    return {
      data: [
        {
          type: 'scattermapbox',
          lat: ['45.5017', '46.6017'],
          lon: ['-73.5673', '-79.5676'],
          mode: 'markers',
          marker: {
            size: 14,
          },
          text: ['Montreal'],
        },
        {
          type: 'scattermapbox',
          lat: ['46.5017', '46.6017'],
          lon: ['-73.5673', '-78.5676'],
          mode: 'markers',
          marker: {
            size: 14,
          },
          text: ['Montreal 2'],
        },
      ],
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
            lat: 45,
            lon: -73,
          },
          pitch: 0,
          zoom: 4,
          style: 'light',
        },
      },
      config: {
        displaylogo: false,
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
