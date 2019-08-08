<template>
  <div>
    <h1>Edit a topic</h1>
    <form class='update' @submit.prevent='update'>
      <div class="form-group row">
        <label for='title' class="col-sm-2 col-form-label">Title:</label>
        <div class="col-sm-8">
          <input id="title" type="text" class="form-control" v-model="data.title">
        </div>
      </div>
      <div class="form-group row">
        <label for="date" class="col-sm-2 col-form-label">Date:</label>
        <div class="col-sm-8">
          <input id="date" type="date" class="form-control" min="2019-01-01" max="2029-01-01" v-model="data.date">
        </div>
      </div>
      <div class="form-group row">
        <label for="time" class="col-sm-2 col-form-label">Time:</label>
        <div class="col-sm-8">
          <input id="time" type="time" class="form-control" v-model="data.time">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label" for="venue">Venue:</label>
        <div class="col-sm-8">
          <input id="venue" type="text" class="form-control" v-model="data.venue">
        </div>
      </div>
      <div class="form-group row">
        <label for='speaker' class="col-sm-2 col-form-label">Speaker:</label>
        <div class="col-sm-8">
          <input id="speaker" type="text" class="form-control" v-model="data.speaker">
        </div>
      </div>
      <div class="form-group row">
        <label for='affiliation' class="col-sm-2 col-form-label">Affiliation:</label>
        <div class="col-sm-8">
          <input id="affiliation" type="text" class="form-control" v-model="data.affiliation">
        </div>
      </div>
      <div class="form-group row"><label class="col-sm-2 col-form-label" for="host">Host:</label>
        <div class="col-sm-8">
          <input id="host" class="form-control" type="text" v-model="data.host">
        </div>
      </div>
      <div class="form-group row">
        <label for='abst' class="col-sm-2 col-form-label">Abstract:</label>
        <div class="col-sm-8">
          <textarea id="abst" class="form-control" rows="5" type="textarea" v-model="data.abst"></textarea>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label" for="supp">Supplementary: </label>
        <div class="col-sm-8">
          <textarea id="supp" class="form-control" rows="3" type="textarea" v-model="data.supp"></textarea>
        </div>
      </div>
      <button class="btn btn-primary" type="submit">Submit</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      'id': this.$route.params.id,
      data: {}
    }
  },
  mounted () {
    axios({
      url: process.env.VUE_APP_baseSURL + '/edit',
      data: {
        id: this.id
      },
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      // console.log(resp.data)
      this.data = resp.data
    })
  },
  methods: {
    update: function () {
      axios({
        url: process.env.VUE_APP_baseSURL + '/update',
        data: {
          data: this.data
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((resp) => {
        // console.log(resp.status)
        this.$router.push({ name: 'dashboard', params: { id: this.data.userid } })
      })
    }
  }
}
</script>
