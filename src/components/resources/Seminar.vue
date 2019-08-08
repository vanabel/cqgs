<template>
  <div>
    <h1>{{ msg }}</h1>
    <ol class="list-group">
      <li v-for="item in data" :key="item.key" class="list-group-item border-0 item">
        <table class="table table-borderless">
          <thead>
            <th scope="col" class="twidth"></th>
            <th scope="col"></th>
            <th scope="col"></th>
          </thead>
          <tbody>
            <tr data-toggle="collapse" :data-target="'#accordion'+item.id" class="accordion-toggle">
              <td class="text-left align-bottom">{{ item.date}}</td>
              <td colspan=2 class="text-left title align-top">{{ item.title}}</td>
              <td></td>
            </tr>
            <tr>
              <td rowspan=2 class="align-middle text-left">{{ item.time}}</td>
              <td class="text-left"><span class="strong">Venue: </span>{{ item.venue}}</td>
              <td class="text-left"><span class="strong">Speaker: </span>{{ item.speaker}}</td>
            </tr>
            <tr>
              <td class="text-left"><span class="strong">Affiliation: </span>{{ item.affiliation}}</td>
              <td class="text-left"><span class="strong">Host: </span>{{ item.host}}</td>
            </tr>
            <tr :id="'accordion'+item.id" class="accordian-body collapse">
              <td></td>
              <td colspan="2" class="text-left">
                <div>
                  <span v-html="textToMath(item.abst, 'Abstract')" class="texmath"></span>
                </div>
                <div>
                  <span v-html="autoLinker(textToMath(item.supp, 'Supplementary'))" class="texmath"></span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <hr>
      </li>
    </ol>
    <!-- <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
      <li class="page-item"><a class="page-link" href="#">Previous</a></li>
      <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item"><a class="page-link" href="#">Next</a></li>
      </ul>
      </nav>-->
  </div>
</template>
<script>
import Autolinker from 'autolinker'
import 'katex/dist/katex.min.css'
export default {
  name: 'Seminar',
  props: {
    msg: String,
    data: Array
  },
  methods: {
    autoLinker: function (linkedText) {
      return Autolinker.link(linkedText, { newWindow: true })
    },
    textToMath: function (mathText, headText) {
      let kt = require('katex')
      let tm = require('markdown-it-texmath').use(kt)
      let md = require('markdown-it')().use(tm, {
        delimiters: 'dollars',
        macros: { '\\RR': '\\mathbb{R}' }
      })
      let ht = '**' + headText + '**: '
      return md.render(ht + mathText)
    }
  }
}
</script>
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
