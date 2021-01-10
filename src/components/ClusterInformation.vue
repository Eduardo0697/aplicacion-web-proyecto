<template>
  <div>
    <div v-if="numberUsers != null">
      <h6>El número de usuarios en el cluster mas cercano es {{ numberUsers }}</h6>
    </div>
  </div>

</template>

<script>
  import axios from "axios";
  export default {
    name: 'ClusterInformation',
    data() {
      return{
        numberUsers : null,
      }
    },
    methods:{
      getClusterInformation(cluster){
        axios
          .get(`http://127.0.0.1:8000/cluster/analysis/${cluster}` )
          .then((res) => {
            console.log('Numero de usuarios en el cluster', res.data["0"].no_users);
            this.numberUsers = res.data["0"].no_users;
          })
          .catch((error) => {
            console.log('Error', error);
          });
      }
    }
  };
</script>
