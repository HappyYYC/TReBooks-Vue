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
          <Col span="18" style="text-align: right">
            <Menu
              :active-name="$route.name"
              mode="horizontal"
              theme="dark"
              width="auto"
              style="position: absolute; right: 200px;text-align: center;"
            >
              <MenuItem name="Transfer" to="/trans">
                <Icon type="md-send"/>
                Transfer
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
      <keep-alive>
        <Transfer v-if="$route.name === 'Transfer'" ref="transfer" :driverListProps="driversListProps" :cpFilesResProps="cpFilesResProps"></Transfer>
        <Folder_ v-if="$route.name === 'Folder'" ref="folder" :driverListProps="driversListProps" :dirListProps="dirListProps" :tagsListProps="tagsListProps"></Folder_>
        <Record v-if="$route.name === 'Record'" ref="record"></Record>
        <HelloWorld v-if="$route.name === 'HelloWorld'"></HelloWorld>
<!--        <router-view></router-view>-->
      </keep-alive>
    </div>
  </div>
</template>

<script src="@/js/app.js">
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
