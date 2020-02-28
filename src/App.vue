<template>
  <div id="app">
    <div class="header">
      <Header>
        <Row>
          <Col span="6">
            <div class="nav-left">
              <router-link to='/'>
                <h1 style="color: white;">TReBooks</h1>
              </router-link>
            </div>
          </Col>
          <Col span="18">
            <Menu
              :active-name="$route.name"
              mode="horizontal"
              theme="dark"
              width="auto"
              style="position: absolute; right: 200px; text-align: center;"
            >
              <MenuItem name="Transmit" to="/trans">
                <Icon type="md-send"/>
                Transmit
              </MenuItem>
              <MenuItem name="Folder" to="/folder">
                <Icon type="ios-folder" />
                Folder
              </MenuItem>
              <MenuItem name="Record" to="/record">
                <Icon type="ios-book"/>
                Records
              </MenuItem>
            </Menu>
          </Col>
        </Row>
      </Header>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
</style>
