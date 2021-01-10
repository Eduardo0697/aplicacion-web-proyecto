<template>
  <div style="height: 500px">
<!--    <div v-if="loading" style="display: flex;justify-content: center;align-items: center;">-->
<!--      <div  class="preloader-wrapper big active" >-->
<!--        <div class="spinner-layer spinner-blue-only">-->
<!--          <div class="circle-clipper left">-->
<!--            <div class="circle"></div>-->
<!--          </div>-->
<!--          <div class="gap-patch">-->
<!--            <div class="circle"></div>-->
<!--          </div>-->
<!--          <div class="circle-clipper right">-->
<!--            <div class="circle"></div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <div class="map" id="vialidades-cloropeta"></div>
  </div>
</template>

<script>
  import { loadModules } from 'esri-loader';

  export default {
    name: 'PlotChoropletVialidades',
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
        }
      };
    },
    mounted() {

      let self = this;
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      loadModules([
        'esri/Map',
        'esri/views/MapView',
        "esri/layers/GeoJSONLayer",
        "esri/widgets/Legend" ],{ css: true })
        .then(([ArcGISMap, MapView, GeoJSONLayer, Legend]) => {

          let colors = [ "#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2" ];
          colors = colors.reverse();
          const rendererVialidades = {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
              type: "simple-line", // autocasts as new SimpleFillSymbol()
              // size: 6,
              // color: "black",
              width: "2px",
            },
            visualVariables: [
              {
                type: "color",
                field: "numero_usuarios",
                stops: [
                  { value: 1, color: colors[0] },
                  { value: 2, color: colors[1] },
                  { value: 3, color: colors[2] },
                  { value: 4, color: colors[3] },
                  { value: 6, color: colors[4] },
                  { value: 9, color: colors[5] },
                  { value: 12, color: colors[6] },
                  { value: 16, color: colors[7] },
                  { value: 22, color: colors[8] },
                  { value: 30, color: colors[9] },
                ]
              }
            ]
          };

          let popupFrenteManzana = {
            "title": "Informacion Frente de manzana",
            "content": "<b>Numero de usuarios:</b> {numero_usuarios}<br><b>ID:</b>{OID}"
          };
          let featureLayer = new GeoJSONLayer({
            url: 'http://127.0.0.1:8000/cloropeth/vialidades',
            outFields: ["*"],
            popupTemplate: popupFrenteManzana,
            renderer: rendererVialidades
          });

          const map = new ArcGISMap({
            basemap: 'dark-gray-vector',
            layers: [featureLayer]
          });

          let view = new MapView({
            container: 'vialidades-cloropeta',
            map: map,
            center: [266.9, 16.75],
            zoom: 11,
            highlightOptions: {
              color: "orange"
            }
          });

          view.on("click", function(event){
            queryFeatureLayerView(event.mapPoint, 5, "intersects")
          });


          function queryFeatureLayerView(point, distance, spatialRelationship) {
            // if (!map.findLayerById(featureLayer.id)) {
            //   featureLayer.outFields = ["*"];
            //   map.add(featureLayer,0);
            // }
            let query = {
              geometry: point,
              distance: distance* view.resolution,
              spatialRelationship: spatialRelationship,
              outFields: ["*"],
              returnGeometry: true
            };
            // Wait for the layerview to be ready and then query features
            view.whenLayerView(featureLayer)
              .then((featureLayerView) => {
                featureLayerView
                  .queryFeatures(query)
                  .then((result) => {
                    // recoverObjects(result);
                    console.log('Result', result.features);
                    if(result.features.length !== 0){
                      let frente = result.features.map((feature) => {
                        console.log('Feature', feature.attributes);
                        return feature.attributes
                      });
                      self.$emit('frente-selected', frente[0]);
                    }

                  });
              });
          }
        });
      // axios
      //   .get('http://127.0.0.1:8000/cloropeth/vialidades')
      //   .then((response) => {
      //     this.info = response.data;
      //     const listLocations = this.info.features.map((frente) => frente.id);
      //     const listWeight = this.info.features.map((frente) => frente.properties.numero_usuarios);
      //     const listCVE = this.info.features.map((frente) => frente.properties.mz_ft_oid);
      //     const maxValue = Math.max(...this.info.features.map( (no) => no.properties.numero_usuarios));
      //     console.log('NAX', maxValue)
      //   })
      //   .catch((error) => {
      //     console.log('Algo salio mal :( 2', error);
      //     M.toast({
      //       html: '<p>Algo salio mal, esto puede ser debido a un error en la solicitud, verificar que exista conexión al servidor</p>',
      //       classes: 'amber lighten-1 grey-text text-darken-4 rounded',
      //       displayLength : 6000
      //     })
      //   })

    }
    ,
    beforeDestroy() {
      // destroy the map view
      if (this.view) {
        this.view.destroy();
      }
    }
  };
</script>

<style scoped>
  .map {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }
</style>
