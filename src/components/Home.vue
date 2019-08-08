<template>
  <Seminar msg='Welcome to Geometric Seminar in Chongqing' :data="data" />
</template>
<script>
import { mapState } from 'vuex'
import Seminar from '@/components/resources/Seminar.vue'
const moment = require('moment')
export default {
  name: 'Home',
  props: {
    msg: String
  },
  components: {
    Seminar
  },
  computed: mapState(['data']),
  created () {
    let dateb = moment().startOf('week').format('YYYY-MM-DD')
    let datee = moment().add(1, 'weeks').endOf('week').format('YYYY-MM-DD')
    this.$store.dispatch('get', { dateb, datee })
      .then(() => this.$router.push('/'))
      .catch(err => console.log(err))
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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
.title {
  font-size: 1.5rem;
}
.item {
  border: 1px #eee solid;
  padding: 0;
  margin: 1rem;
  :hover {
    background: #eee;
  }
}
.strong {
  font-weight: bold;
}
.twidth {
  min-width: 8rem;
}
</style>
