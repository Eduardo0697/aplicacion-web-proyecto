<template>
    <div :id="idMap"></div>
</template>

<script>

  import Plotly from 'plotly.js/dist/plotly';

  export default {
    name: 'ScaterMapboxProps',
    props: {
      dataScatter: Array,
      layout: Object,
      config: Object,
      idMap: String,
    },
    mounted() {
      console.log('Data:', this.dataScatter);
      console.log('Layout', this.layout);

      // Plotly.setPlotConfig({
      //   mapboxAccesToken: 'pk.eyJ1IjoiZWR1YXJkbzA2OTciLCJhIjoiY2tmZm10MHViMGRpbDJzcGllMzNnbmw5MCJ9.Q3z7EDZiGsl2kUBuDSr_4g',
      //   responsive: true,
      //   displayModeBar: true,
      // });

      const config = {
        mapboxAccesToken: 'pk.eyJ1IjoiZWR1YXJkbzA2OTciLCJhIjoiY2tmZm10MHViMGRpbDJzcGllMzNnbmw5MCJ9.Q3z7EDZiGsl2kUBuDSr_4g',
        responsive: true,
        displayModeBar: true,
      };

      Plotly.newPlot(this.idMap, this.dataScatter, this.layout, config);

    }
  };
</script>

<style scoped>

</style>
