export default {
  name: 'Transmit',
  data () {
    return {
      webSocket: null,
      // volumeList: ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C'],
      volumeList: ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C'],
      transForm: {
      },
      transFormRule: {
      },
      transTableColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: 'Book Name',
          key: 'bookName'
        },
        {
          title: 'Category',
          key: 'category'
        },
        {
          title: 'File Type',
          key: 'fileType',
          width: 120,
          sortable: true
        }
      ],
      transTableData: [
        {
          bookName: 'Happy',
          category: '#Philosophy',
          fileType: 'mobi',
          date: '2016-10-03'
        },
        {
          bookName: 'She',
          category: '#Novel',
          fileType: 'azw3',
          date: '2016-10-01'
        },
        {
          bookName: 'The Economist',
          category: '#Magazine',
          fileType: 'epub',
          date: '2016-10-02'
        }
      ],
      transTableDataShow: [],
      transTablePageSize: 6,
      transTablePageSizeList: [6, 12, 18, 50],
      transTablePageCurrent: 1,
      transTableDataCount: 0,
      selectFilesDialog: false,
      selectFilesDialogTableColumns: [],
      selectFilesDialogTableData: [],
      selectFilesDialogPath: ''
    }
  },
  created () {
    this.initWebSocket()
  },
  destroyed () {
    this.webSocket.close() // 离开路由之后断开websocket连接
  },
  methods: {
    handlePageChange () {
      this.transTableDataCount = this.transTableData.length
      if (this.transTableDataCount < this.transTablePageSize) {
        this.transTableDataShow = this.transTableData
      } else {
        this.transTableDataShow = this.transTableData.slice(0, this.transTablePageSize)
      }
    },
    changeTransTablePageSize (page) {
      // console.log(page)
      this.transTablePageSize = page
      this.changeTransTablePage(this.transTablePageCurrent)
    },
    changeTransTablePage (index) {
      // console.log(index)
      this.transTablePageCurrent = index
      var _start = (index - 1) * this.transTablePageSize
      var _end = index * this.transTablePageSize
      this.transTableDataShow = this.transTableData.slice(_start, _end)
    },
    clickSelectFiles () {
      this.$Message.info('Please select files')
      this.selectFilesDialog = true
    },
    changeFilesTablePage (index) {
      this.pageCurrent = index
      var _start = (index - 1) * this.pageSize
      var _end = index * this.pageSize
      this.transTableDataShow = this.filesTableData.slice(_start, _end)
    },
    changeFilesTablePageSize (page) {
      this.transTablePageSize = page
      this.changePage(this.pageCurrent)
    },
    selectFilesDialogOK () {},
    conveySelectedFiles () {},
    initWebSocket () { // 初始化weosocket
      const wsUrl = 'ws://127.0.0.1:52666'
      this.webSocket = new WebSocket(wsUrl)
      this.webSocket.onmessage = this.webSocketOnMessage
      this.webSocket.onopen = this.webSocketOnOpen
      this.webSocket.onerror = this.webSocketOnError
      this.webSocket.onclose = this.webSocketClose
    },
    webSocketOnOpen () { // 连接建立之后执行send方法发送数据
      let actions = {'test': '12345'}
      this.webSocketSend(JSON.stringify(actions))
    },
    webSocketOnError () { // 连接建立失败重连
      this.initWebSocket()
    },
    webSocketOnMessage (e) { // 数据接收
      const responseData = JSON.parse(e.data)
      this.$Message.info(responseData)
    },
    webSocketSend (Data) { // 数据发送
      this.webSocket.send(Data)
    },
    webSocketClose (e) { // 关闭
      console.log('断开连接', e)
    }
  },
  mounted () {
    this.handlePageChange()
  }
}
