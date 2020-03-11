const expandRowTrans = () => import('@/components/ExpandRowTrans')
export default {
  name: 'Transfer',
  data () {
    return {
      webSocket: null,
      webSocketErrorCount: 0,
      isGetDriversInfo: false,
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
                h('span', {
                  style: {
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
          sortable: true
        },
        {
          title: 'File Size',
          key: 'fileSize',
          sortable: true
        },
        {
          title: 'File Location',
          key: 'fileLocation',
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
      transTableData: [],
      transTableDataShow: [],
      transTablePageSize: 6,
      transTablePageSizeList: [6, 12, 18, 50],
      transTablePageCurrent: 1,
      transTableDataCount: 0,
      selectedList: []
    }
  },
  methods: {
    removeFile (index) {
      this.transTableDataShow.splice(index, 1)
    },
    refreshDisk () {
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
        let tempFile = {
          'srcPath': this.selectedList[i]['location'] + this.selectedList[i]['itemName'],
          'destPath': this.kindleVolume + '/documents/' + tempStr + '/' + this.selectedList[i]['itemName']
        }
        actions['cpFilesList'].push(tempFile)
        for (let j in this.transTableDataShow) {
          if (this.selectedList[i]['location'] === this.transTableDataShow[j]['location']) {
            this.transTableDataShow.splice(j, 1)
          }
        }
      }
      this.$parent.webSocketSend(JSON.stringify(actions))
    },
    handleListDriverResponse (jsonData) {
      this.driversList = JSON.parse(JSON.stringify(jsonData['driversList']))
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
          this.handleListDriverResponse(newVal)
        })
      },
      deep: true
    }
  },
  mounted () {
    this.refreshDisk()
  }
}
