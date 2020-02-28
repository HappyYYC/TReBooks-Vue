<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <a href="/#/trans">Enjoy</a>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to TReBooks Web App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  margin: 60px 0 0 0;
}
h1 {
  font-size: 36px;
}
h1, h2 {
  font-weight: normal;
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
  font-size: 26px;
}
</style>
