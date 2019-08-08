<template>
  <Seminar msg='Search Results' :data="data" />
</template>
<script>
import axios from 'axios'
import Seminar from '@/components/resources/Seminar.vue'
export default {
  data () {
    return {
      s: this.$route.params.query,
      data: [],
      err: ''
    }
  },
  components: {
    Seminar
  },
  mounted () {
    axios.get(process.env.VUE_APP_baseSURL + '/search' + '?q=' + this.s)
      .then((resp) => {
        this.data = resp.data
      })
      .catch((err) => {
        this.err = err
      })
  }
}
</script>
