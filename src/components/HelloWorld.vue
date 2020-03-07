<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Button type="text" icon="md-return-right" to="/trans" @click="readyDefaultPage">Enjoy</Button>
    <div style="text-align: center;margin-top: 50px">
      <Button to="//github.com/HappyYYC/TReBooks-Vue" target="_blank" icon="logo-github"></Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to TReBooks Web App'
      // webSocket: null,
      // webSocketErrorCount: 0
    }
  },
  methods: {
    readyDefaultPage () {
      // let actions = {
      //   'CMD': 'listDriverRequest',
      //   'CMDCode': 20
      // }
      // this.$parent.webSocketSend(JSON.stringify(actions))
      // actions = {
      //   'CMD': 'listDefaultFolderRequest',
      //   'CMDCode': 30
      // }
      // this.$parent.webSocketSend(JSON.stringify(actions))
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
