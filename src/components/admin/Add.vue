<template>
  <div id="add">
    <h1>Add new seminar topic</h1>
    <form>
      <div>
        <label for='title'>Title:</label>
        <input id="title" type="text" v-model="title" placeholde="The spherical theorem on product manifold ">
      </div>
      <div>
        <label for='author'>Author:</label>
        <input id="author" type="text" v-model="author" placeholde="Van, Abel">
      </div>
      <div>
        <label for='abst'>Abstract:</label>
        <input id="abst" type="textarea" v-model="abst" placeholde="We prove ...">
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      'title': '',
      'author': '',
      'abst': ''
    }
  },
  methods: {
    add: function () {
      let title = this.title
      let author = this.author
      let abst = this.abst
      this.$store.dispatch('add', { title, author, abst })
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    }
  }
}
</script>
