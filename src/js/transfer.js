// import expandRowTrans from '@/components/ExpandRowTrans'
const expandRowTrans = () => import('@/components/ExpandRowTrans')
export default {
  name: 'Transfer',
  data () {
    return {
      webSocket: null,
      webSocketErrorCount: 0,
      isGetDriversInfo: false,
      // localDiskList: ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C'],
      localDiskList: ['D:', 'E:', 'F:', 'G:', 'H:', 'I:', 'J:',
        'K:', 'L:', 'M:', 'N:', 'O:', 'P:', 'Q:', 'R:', 'S:', 'T:', 'U:',
        'V:', 'W:', 'X:', 'Y:', 'Z:', 'A:', 'B:', 'C:'],
      kindleVolume: 'H:',
      driversList: [],
      transTableColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            if (params.row.itemAttribute === 'file' || params.row.itemAttribute === 'hiddenFile') {
              return h(expandRowTrans, {
                props: {
                  row: params.row
                }
              })
            }
          }
        },
        {
          title: 'Name',
          key: 'itemName',
          sortable: true,
          resizable: true,
          minWidth: 320,
          render: (h, params) => {
            if (params.row.itemAttribute === 'directory' || params.row.itemAttribute === 'hiddenDirectory') {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'ios-folder-open',
                    size: 'small'
                  }
                }),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  }
                }, params.row.itemName)])
            } else {
              return h('div', [
                // h('Icon', {
                //   props: {
                //     type: 'ios-book',
                //     size: 'small'
                //   }
                // }),
                h('span', {
                  style: {
                    // display: 'inline-block',
                    // width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  },
                  domProps: {
                    title: params.row.itemName
                  }
                }, params.row.itemName)])
            }
          }
        },
        {
          title: 'Category',
          key: 'category',
          // width: 220,
          sortable: true,
          render: (h, params) => {
            if (params.row.itemAttribute === 'file' || params.row.itemAttribute === 'hiddenFile') {
              return h('div', [
                h('span', {
                  style: {
                    display: 'inline-block',
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  },
                  domProps: {
                    title: params.row.category
                  }
                }, params.row.category)])
            }
          }
        },
        {
          title: 'File Type',
          key: 'fileType',
          // width: 100,
          sortable: true
        },
        {
          title: 'File Size',
          key: 'fileSize',
          // width: 100,
          sortable: true
        },
        {
          title: 'File Location',
          key: 'fileLocation',
          // width: 360,
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  display: 'inline-block',
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                },
                domProps: {
                  title: params.row.location
                }
              }, params.row.location)])
          }
        },
        {
          title: 'Operation',
          key: 'operation',
          // width: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.removeFile(params.index)
                  }
                }
              }, 'Remove')])
          }
        }
      ],
      transTableData: [
        // {
        //   itemAttribute: 'file',
        //   itemName: 'Happy',
        //   category: '#Philosophy',
        //   fileType: 'mobi',
        //   fileSize: '2.11 MB',
        //   date: '2016-10-03',
        //   location: 'G:/Kindle/Happy.mobi'
        // }
      ],
      transTableDataShow: [],
      transTablePageSize: 6,
      transTablePageSizeList: [6, 12, 18, 50],
      transTablePageCurrent: 1,
      transTableDataCount: 0,
      selectedList: []
    }
  },
  methods: {
    // handlePageChange () {
    //   this.transTableDataCount = this.transTableData.length
    //   if (this.transTableDataCount < this.transTablePageSize) {
    //     this.transTableDataShow = this.transTableData
    //   } else {
    //     this.transTableDataShow = this.transTableData.slice(0, this.transTablePageSize)
    //   }
    // },
    // changeTransTablePageSize (page) {
    //   // console.log(page)
    //   this.transTablePageSize = page
    //   this.changeTransTablePage(this.transTablePageCurrent)
    // },
    // changeTransTablePage (index) {
    //   // console.log(index)
    //   this.transTablePageCurrent = index
    //   var _start = (index - 1) * this.transTablePageSize
    //   var _end = index * this.transTablePageSize
    //   this.transTableDataShow = this.transTableData.slice(_start, _end)
    // },
    // initWebSocket () {
    //   const wsUrl = 'ws://127.0.0.1:52666'
    //   this.webSocket = new WebSocket(wsUrl)
    //   this.webSocket.onmessage = this.webSocketOnMessage
    //   this.webSocket.onopen = this.webSocketOnOpen
    //   this.webSocket.onerror = this.webSocketOnError
    //   this.webSocket.onclose = this.webSocketClose
    // },
    // webSocketOnOpen () {
    //   console.log('/trans webSocketOnOpen')
    // },
    // webSocketOnError (e) {
    //   this.webSocketErrorCount++
    //   console.log('webSocketOnError', e)
    //   if (this.webSocketErrorCount < 10) {
    //     this.initWebSocket()
    //   }
    // },
    // webSocketOnMessage (e) {
    //   // console.log(e.data)
    //   try {
    //     // var jsonMessage = JSON.parse(JSON.stringify(e.data))
    //     let jsonMessage = JSON.parse(e.data)
    //     console.log('/trans jsonMessage', jsonMessage)
    //     // this.cmdData(jsonMessage)
    //   } catch (e) {
    //     console.log(e)
    //   }
    // },
    // webSocketSend (data) {
    //   console.log('/trans webSocketSend', data)
    //   this.webSocket.send(data)
    // },
    // webSocketClose (e) {
    //   console.log('/trans closing connection', e)
    // },
    removeFile (index) {
      this.transTableDataShow.splice(index, 1)
    },
    refreshDisk () {
      // let actions = {
      //   'CMD': 'listDriverRequest',
      //   'CMDCode': 20
      // }
      // this.$parent.webSocketSend(JSON.stringify(actions))
      if (this.$parent.driversListProps != null) {
        this.handleListDriverResponse(this.$parent.driversListProps)
      } else {
        let actions = {
          'CMD': 'listDriverRequest',
          'CMDCode': 20
        }
        this.$parent.webSocketSend(JSON.stringify(actions))
      }
    },
    conveySelectedFiles () {
      this.selectedList = this.$refs.selectFiles.getSelection()
      if (this.selectedList.length === 0) {
        this.$Message.info('Please select items first.')
        return
      }
      if (this.localDiskList.indexOf(this.kindleVolume) === -1) {
        this.$Message.info('Please select kindle volume first.')
        return
      }
      let actions = {
        'CMD': 'cpFilesRequest',
        'CMDCode': 50,
        'cpFilesList': []
      }
      let tempStr
      for (let i in this.selectedList) {
        tempStr = this.selectedList[i]['category'].match(/^#([^#]+)#?/)[1]
        // console.log(this.selectedList[i]['category'].match(/^#([^#]+)#?/))
        let tempFile = {
          'srcPath': this.selectedList[i]['location'],
          'destPath': this.kindleVolume + '/document/' + tempStr + '/' + this.selectedList[i]['itemName']
        }
        actions['cpFilesList'].push(tempFile)
        for (let j in this.transTableDataShow) {
          if (this.selectedList[i]['location'] === this.transTableDataShow[j]['location']) {
            this.transTableDataShow.splice(j, 1)
          }
        }
      }
      // console.log(actions)
      // this.webSocketSend(JSON.stringify(actions))
      this.$parent.webSocketSend(JSON.stringify(actions))
    },
    handleListDriverResponse (jsonData) {
      // console.log('/trans handleListDriverResponse', jsonData)
      this.driversList = JSON.parse(JSON.stringify(jsonData['driversList']))
      // window.localStorage.setItem('isGetDriversInfo', true)
      // console.log(this.driversList)
      this.localDiskList = []
      let tempDriver
      for (let i in this.driversList) {
        tempDriver = this.driversList[i]
        this.localDiskList.push(tempDriver['driverLetter'].replace('\\', ''))
        if (tempDriver['driverFreeBytes-MB'] / 1024 > 1) {
          this.driversList[i]['freeSize'] = (tempDriver['driverFreeBytes-MB'] / 1024).toFixed(2).toString() + ' GB'
        } else {
          this.driversList[i]['freeSize'] = this.driversList[i]['driverFreeBytes-MB'].toString().toFixed(2).toString() + ' MB'
        }
        if (/[kK]indle/.test(tempDriver['driverName'])) {
          this.kindleVolume = tempDriver['driverLetter'].replace('\\', '')
        }
      }
    }
  },
  activated () {
    // if (window.localStorage.getItem('isGetDriversInfo') === 'false') {
    //   this.driversList = JSON.parse(window.localStorage.getItem('driversList'))
    //   window.localStorage.setItem('isGetDriversInfo', true)
    //   // console.log(this.driversList)
    //   this.localDiskList = []
    //   let tempDriver
    //   for (let i in this.driversList) {
    //     tempDriver = this.driversList[i]
    //     this.localDiskList.push(tempDriver['driverLetter'].replace('\\', ''))
    //     if (tempDriver['driverFreeBytes-MB'] / 1024 > 1) {
    //       this.driversList[i]['freeSize'] = (tempDriver['driverFreeBytes-MB'] / 1024).toFixed(2).toString() + ' GB'
    //     } else {
    //       this.driversList[i]['freeSize'] = this.driversList[i]['driverFreeBytes-MB'].toString().toFixed(2).toString() + ' MB'
    //     }
    //     if (/[kK]indle/.test(tempDriver['driverName'])) {
    //       this.kindleVolume = tempDriver['driverLetter'].replace('\\', '')
    //     }
    //   }
    // }
    let addedFiles = window.localStorage.getItem('addedFiles')
    if (addedFiles) {
      let multiFlag = false
      let tempAddedFiles = JSON.parse(addedFiles)
      for (let j in tempAddedFiles) {
        for (let k in this.transTableData) {
          if (this.transTableData[k]['location'] === tempAddedFiles[j]['location']) {
            multiFlag = true
            break
          }
        }
        if (multiFlag) {
          multiFlag = false
          continue
        } else {
          this.transTableData.push(tempAddedFiles[j])
        }
      }
      window.localStorage.removeItem('addedFiles')
      this.transTableDataShow = this.transTableData
    }
  },
  props: ['driversListProps'],
  watch: {
    driversListProps: {
      handler (newVal, oldVal) {
        this.$nextTick(() => {
          // console.log('/trans watch driversProps', newVal)
          this.handleListDriverResponse(newVal)
        })
      },
      // immediate: true,
      deep: true
    }
  },
  mounted () {
    // this.handlePageChange()
    // this.transTableDataShow = this.transTableData
    // this.$nextTick(() => {
    //   console.log('/trans mounted this.driversListProps', this.driversListProps)
    //   this.handleListDriverResponse(this.driversListProps)
    // })
    this.refreshDisk()
  },
  created () {
    // this.initWebSocket()
  },
  destroyed () {
    // this.webSocket.close()
  }
}
