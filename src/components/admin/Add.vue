<template>
  <div id="add">
    <h1>Add new seminar topic</h1>
    <form class='add' @submit.prevent='add'>
      <div class="form-group row">
        <label for='title' class="col-sm-2 col-form-label">Title:</label>
        <div class="col-sm-8">
          <input id="title" type="text" class="form-control" v-model="title" placeholder="The spherical theorem on product manifold ">
        </div>
      </div>
      <div class="form-group row">
        <label for="date" class="col-sm-2 col-form-label">Date:</label>
        <div class="col-sm-8">
          <input id="date" type="date" class="form-control" min="2019-01-01" max="2029-01-01" v-model="date" placeholder="2019-11-06">
        </div>
      </div>
      <div class="form-group row">
        <label for="time" class="col-sm-2 col-form-label">Time:</label>
        <div class="col-sm-8">
          <input id="time" type="time" class="form-control" v-model="time" placeholder="15:00--17:00">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label" for="venue">Venue:</label>
        <div class="col-sm-8">
          <input id="venue" type="text" class="form-control" v-model="venue" placeholder="25-1416, SWU">
        </div>
      </div>
      <div class="form-group row">
        <label for='speaker' class="col-sm-2 col-form-label">Speaker:</label>
        <div class="col-sm-8">
          <input id="speaker" type="text" class="form-control" v-model="speaker" placeholder="Van, Abel">
        </div>
      </div>
      <div class="form-group row">
        <label for='affiliation' class="col-sm-2 col-form-label">Affiliation:</label>
        <div class="col-sm-8">
          <input id="affiliation" type="text" class="form-control" v-model="affiliation" placeholder="USTC">
        </div>
      </div>
      <div class="form-group row"><label class="col-sm-2 col-form-label" for="host">Host:</label>
        <div class="col-sm-8">
          <input id="host" class="form-control" type="text" v-model="host" placeholder="Wanjun, Ai">
        </div>
      </div>
      <div class="form-group row">
        <label for='abst' class="col-sm-2 col-form-label">Abstract:</label>
        <div class="col-sm-8">
          <textarea id="abst" class="form-control" rows="5" type="textarea" v-model="abst" placeholder="We prove ..."></textarea>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label" for="supp">Supplementary: </label>
        <div class="col-sm-8">
          <textarea id="supp" class="form-control" rows="3" type="textarea" v-model="supp"></textarea>
        </div>
      </div>
      <button class="btn btn-primary" type="submit">Submit</button>
    </form>
  </div>
</template>
<style lang="less">
h1{
  font-variant: small-caps
}
</style>
<script>
export default {
  data () {
    return {
      'userid': this.$route.params.id,
      'title': 'The sphere theorem in Riemannian geometry',
      'date': '2019-09-11',
      'time': '15:00 -- 17:00',
      'venue': '25102',
      'speaker': 'Thomas, Yu',
      'affiliation': 'University of Chicago',
      'host': 'Wanjun, Ai',
      'abst': 'We will give a proof of the sphere theorem in Riemannian Geometry, which states that if $M$ is a complete, simply-connected n-dimensional manifold with sectional curvature $K_M$ such that $1/4< K_M\\leq 1$, then $M$ is homeomorphic to the n-sphere $S^n$.',
      'supp': 'http://math.uchicago.edu/~may/REU2013/REUPapers/Yu.pdf'
    }
  },
  methods: {
    add: function () {
      let userid = this.userid
      let title = this.title
      let date = this.date
      let time = this.time
      let venue = this.venue
      let speaker = this.speaker
      let affiliation = this.affiliation
      let host = this.host
      let abst = this.abst
      let supp = this.supp
      this.$store.dispatch('add', { userid, title, date, time, speaker, affiliation, venue, host, abst, supp })
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    }
  }
}
</script>
