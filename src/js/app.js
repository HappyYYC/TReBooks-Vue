const Transfer = () => import('@/views/Transfer')
const Folder_ = () => import('@/views/Folder')
const Record = () => import('@/views/Record')
const HelloWorld = () => import('@/components/HelloWorld')
export default {
  name: 'App',
  data () {
    return {
      webSocket: null,
      webSocketErrorCount: 0,
      driversListProps: null,
      dirListProps: null,
      tagsListProps: null,
      cpFilesResProps: null
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
      // console.log('/app webSocketOnOpen')
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
      actions = {
        'CMD': 'listDefaultTagsRequest',
        'CMDCode': 80
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
      try {
        let jsonMessage = JSON.parse(e.data)
        this.cmdData(jsonMessage)
      } catch (e) {
        console.log(e)
      }
    },
    webSocketSend (data) {
      this.webSocket.send(data)
    },
    webSocketClose (e) {
      console.log('/app closing connection', e)
      if (this.webSocketErrorCount >= 10) {
        this.$Notice.error({
          title: 'WebSocket Closed',
          desc: 'Please go to the homepage and refresh OR close this page and restart TReBooks.exe.',
          duration: 0
        })
      }
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
    getDefaultTagsData () {
      let actions = {
        'CMD': 'listDefaultTagsRequest',
        'CMDCode': 80
      }
      this.webSocketSend(JSON.stringify(actions))
    },
    cmdData (jsonData) {
      if (jsonData['CMD'] === 'listDirResponse') {
        this.dirListProps = jsonData
      } else if (jsonData['CMD'] === 'listDriverResponse') {
        this.driversListProps = jsonData
      } else if (jsonData['CMD'] === 'listTagsResponse') {
        this.tagsListProps = jsonData
      } else if (jsonData['CMD'] === 'cpFilesResponse') {
        if (jsonData['status'] === 'OK') {
          // console.log(jsonData)
          this.cpFilesResProps = true
        } else {
          this.cpFilesResProps = false
        }
      }
    }
  },
  // mounted () {
  //   // console.log('/app mounted')
  // },
  created () {
    this.initWebSocket()
  },
  destroyed () {
    this.webSocket.close()
  }
}
