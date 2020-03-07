import Transfer from '@/views/Transfer'
import Folder_ from '@/views/Folder'
import Record from '@/views/Record'
import HelloWorld from '@/components/HelloWorld'
export default {
  name: 'App',
  data () {
    return {
      webSocket: null,
      webSocketErrorCount: 0,
      driversListProps: null,
      dirListProps: null
    }
  },
  components: {
    Transfer,
    Folder_,
    Record,
    HelloWorld
  },
  methods: {
    initWebSocket () {
      const wsUrl = 'ws://127.0.0.1:52666'
      this.webSocket = new WebSocket(wsUrl)
      this.webSocket.onopen = this.webSocketOnOpen
      this.webSocket.onerror = this.webSocketOnError
      this.webSocket.onclose = this.webSocketClose
      this.webSocket.onmessage = this.webSocketOnMessage
    },
    webSocketOnOpen () {
      console.log('/app webSocketOnOpen')
      let actions = {
        'CMD': 'listDriverRequest',
        'CMDCode': 20
      }
      this.webSocketSend(JSON.stringify(actions))
      actions = {
        'CMD': 'listDefaultFolderRequest',
        'CMDCode': 30
      }
      this.webSocketSend(JSON.stringify(actions))
    },
    webSocketOnError (e) {
      this.webSocketErrorCount++
      console.log('webSocketOnError', e)
      if (this.webSocketErrorCount < 10) {
        this.initWebSocket()
      }
    },
    webSocketOnMessage (e) {
      // console.log(e.data)
      try {
        // var jsonMessage = JSON.parse(JSON.stringify(e.data))
        let jsonMessage = JSON.parse(e.data)
        console.log('/app jsonMessage', jsonMessage)
        this.cmdData(jsonMessage)
      } catch (e) {
        console.log(e)
      }
    },
    webSocketSend (data) {
      // console.log('webSocketSend', data)
      this.webSocket.send(data)
    },
    webSocketClose (e) {
      // console.log('websocket close: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
      console.log('/app closing connection', e)
    },
    refreshDriver () {
      let actions = {
        'CMD': 'listDriverRequest',
        'CMDCode': 20
      }
      this.webSocketSend(JSON.stringify(actions))
    },
    getDefaultDirData () {
      let actions = {
        'CMD': 'listDefaultFolderRequest',
        'CMDCode': 30
      }
      this.webSocketSend(JSON.stringify(actions))
    },
    cmdData (jsonData) {
      // console.log('this.$refs', this.$refs)
      if (jsonData['CMD'] === 'listDirResponse') {
        // this.$refs.folder.handleListDirResponse(jsonData)
        console.log('/app listDirResponse', jsonData)
        this.dirListProps = jsonData
      } else if (jsonData['CMD'] === 'listDriverResponse') {
        // this.$refs.folder.handleListDriverResponse(jsonData)
        // this.$refs.transfer.handleListDriverResponse(jsonData)
        console.log('/app listDriverResponse', jsonData)
        this.driversListProps = jsonData
      }
    }
  },
  mounted () {
    // console.log('mounted this.$refs', this.$refs)
    console.log('/app mounted')
  },
  created () {
    this.initWebSocket()
  },
  destroyed () {
    this.webSocket.close()
  }
}
