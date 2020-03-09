// import expandRow from '@/components/ExpandRow'
const expandRow = () => import('@/components/ExpandRow')
export default {
  name: 'Folder',
  data () {
    return {
      webSocket: null,
      webSocketErrorCount: 0,
      addCategoriesDialog: false,
      addCategoriesBatchDialog: false,
      folderList: [
        // {
        //   folderName: 'Kindle',
        //   folderPath: 'G:/Kindle/'
        // },
        // {
        //   folderName: 'Magazine',
        //   folderPath: 'G:/Kindle/Magazine/'
        // },
        // {
        //   folderName: 'The Economist',
        //   folderPath: 'G:/Kindle/Magazine/The Economist/'
        // }
      ],
      localDiskList: ['C:', 'D:', 'E:', 'F:', 'G:', 'H:', 'I:', 'J:',
        'K:', 'L:', 'M:', 'N:', 'O:', 'P:', 'Q:', 'R:', 'S:', 'T:', 'U:',
        'V:', 'W:', 'X:', 'Y:', 'Z:', 'A:', 'B:'],
      currentDisk: '',
      currentFolder: '',
      filesList: [],
      driversList: [],
      tagsList: [],
      filesTableColumns: [
        {
          type: 'selection',
          width: 55,
          align: 'center'
        },
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            if (params.row.itemAttribute === 'file' || params.row.itemAttribute === 'hiddenFile') {
              return h(expandRow, {
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
          // width: 500,
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
                  },
                  on: {
                    click: () => {
                      this.queryFolderFiles(this.currentFolder + params.row.itemName + '/')
                    }
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
          // width: 110,
          sortable: true,
          sortType: 'asc'
        },
        {
          title: 'File Size',
          key: 'fileSize',
          // width: 130,
          sortable: true
        },
        {
          title: 'Operation',
          key: 'operation',
          // fixed: 'right',
          // width: 100,
          align: 'center',
          render: (h, params) => {
            if (params.row.itemAttribute === 'directory' || params.row.itemAttribute === 'hiddenDirectory') {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    disabled: true
                  }
                }, '#Category')])
            } else {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.addCategories(params.index)
                    }
                  }
                }, '#Category')])
            }
          }
        }
      ],
      filesTableData: [
        // {
        //   itemName: 'Happy',
        //   category: '#Philosophy',
        //   fileType: 'mobi',
        //   fileSize: '18.3 MB'
        // }
      ],
      filesTableDataShow: [],
      filesTablePageSize: 10,
      filesTablePageCurrent: 1,
      filesTableDataCount: 0,
      selectedList: [],
      selectedTagsList: [],
      addCategoriesSelectedRow: 0
    }
  },
  methods: {
    // handlePageChange () {
    //   this.filesTableDataCount = this.filesTableData.length
    //   if (this.filesTableDataCount < this.filesTablePageSize) {
    //     this.filesTableDataShow = this.filesTableData
    //   } else {
    //     this.filesTableDataShow = this.filesTableData.slice(0, this.filesTablePageSize)
    //   }
    // },
    // changeFilesTablePageSize (page) {
    //   // console.log(page)
    //   this.filesTablePageSize = page
    //   this.changeFilesTablePage(this.filesTablePageCurrent)
    // },
    // changeFilesTablePage (index) {
    //   // console.log(index)
    //   this.filesTablePageCurrent = index
    //   var _start = (index - 1) * this.filesTablePageSize
    //   var _end = index * this.filesTablePageSize
    //   this.filesTableDataShow = this.filesTableData.slice(_start, _end)
    // },
    // initWebSocket () {
    //   const wsUrl = 'ws://127.0.0.1:52666'
    //   this.webSocket = new WebSocket(wsUrl)
    //   this.webSocket.onopen = this.webSocketOnOpen
    //   this.webSocket.onerror = this.webSocketOnError
    //   this.webSocket.onclose = this.webSocketClose
    //   this.webSocket.onmessage = this.webSocketOnMessage
    // },
    // webSocketOnOpen () {
    //   console.log('/folder webSocketOnOpen')
    //   let actions = {
    //     'CMD': 'listDriverRequest',
    //     'CMDCode': 20
    //   }
    //   this.webSocketSend(JSON.stringify(actions))
    //   actions = {
    //     'CMD': 'listDefaultFolderRequest',
    //     'CMDCode': 30
    //   }
    //   this.webSocketSend(JSON.stringify(actions))
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
    //     // console.log('jsonMessage', jsonMessage)
    //     this.cmdData(jsonMessage)
    //   } catch (e) {
    //     console.log(e)
    //   }
    // },
    // webSocketSend (data) {
    //   console.log('/folder webSocketSend', data)
    //   this.webSocket.send(data)
    // },
    // webSocketClose (e) {
    //   // console.log('websocket close: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
    //   console.log('/folder closing connection', e)
    // },
    queryFolderFiles (data) {
      let actions = {
        'CMD': 'listDirRequest',
        'CMDCode': 10,
        'folderPath': data + '*'
      }
      // this.webSocketSend(JSON.stringify(actions))
      this.$parent.webSocketSend(JSON.stringify(actions))
    },
    clickFolder (data) {
      // this.$Message.info('Querying ...')
      this.queryFolderFiles(data.folderPath)
      this.currentFolder = data.folderPath
    },
    refreshDisk () {
      // let actions = {
      //   'CMD': 'listDriverRequest',
      //   'CMDCode': 20
      // }
      // this.$parent.webSocketSend(JSON.stringify(actions))
      // console.log('/folder refreshDisk this.$parent.driversListProps', this.$parent.driversListProps)
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
    addTag (index) {
      if (this.selectedTagsList.indexOf(this.tagsList[index]) === -1) {
        this.selectedTagsList.push(this.tagsList[index])
      }
    },
    getTags () {
      if (this.$parent.tagsListProps != null) {
        // this.handleListTagsResponse(this.$parent.driversListProps)
        this.tagsList = this.$parent.tagsListProps['tagsList']
      } else {
        this.$parent.getDefaultTagsData()
      }
    },
    getDefaultDir () {
      if (this.$parent.dirListProps != null) {
        this.handleListDirResponse(this.$parent.dirListProps)
      } else {
        this.$parent.getDefaultDirData()
      }
    },
    localDiskChange () {
      this.$Message.info('Querying ...')
      this.queryFolderFiles(this.currentDisk + '/')
      // let actions = {
      //   'CMD': 'listDirRequest',
      //   'folderPath': this.currentDisk + '/*'
      // }
      // this.webSocketSend(JSON.stringify(actions))
    },
    // handleRowChange (selectRow) {
    //   this.selectedList = selectRow
    //   // console.log(selectRow)
    //   // Table -> @on-select="handleRowChange"
    // },
    addFilesToConvey () {
      this.selectedList = this.$refs.selectFiles.getSelection()
      if (this.selectedList.length === 0) {
        this.$Message.info('Please select items first.')
        return
      }
      for (let i in this.selectedList) {
        // if (this.selectedList[i]['itemAttribute'] === 'directory' || this.selectedList[i]['itemAttribute'] === 'hiddenDirectory') {
        //   this.selectedList[i]['location'] = this.currentFolder + this.selectedList[i]['itemName'] + '/'
        // } else {
        //   this.selectedList[i]['location'] = this.currentFolder + this.selectedList[i]['itemName']
        // }
        this.selectedList[i]['location'] = this.currentFolder
      }
      window.localStorage.setItem('addedFiles', JSON.stringify(this.selectedList))
      this.$router.push({path: '/trans'})
    },
    addCategories (index) {
      this.addCategoriesDialog = true
      this.addCategoriesSelectedRow = index
    },
    addCategoriesBatch () {
      this.selectedList = this.$refs.selectFiles.getSelection()
      if (this.selectedList.length === 0) {
        this.$Message.info('Please select items of table first.')
        return
      }
      this.addCategoriesBatchDialog = true
    },
    clickTagClose (index) {
      this.selectedTagsList.splice(index, 1)
    },
    addCategoriesDialogOK () {
      if (this.selectedTagsList.length === 0) {
        this.$Message.info('Please select categories first.')
        this.addCategoriesDialog = true
        return
      }
      let actions = {
        'CMD': 'mvFilesRequest',
        'CMDCode': 40,
        'mvFilesList': []
      }
      let tempStr
      let newFileItemName
      tempStr = this.filesTableDataShow[this.addCategoriesSelectedRow]['itemName']
      if (/^\[#.*\]-/.test(tempStr)) {
        newFileItemName = this.selectedTagsList[0] + '/['
        for (let j in this.selectedTagsList) {
          newFileItemName = newFileItemName + '#' + this.selectedTagsList[j]
        }
        newFileItemName = newFileItemName + ']-' + this.filesTableDataShow[this.addCategoriesSelectedRow]['itemName'].match(/^\[#.*\]-(.*)$/)[1]
      } else {
        newFileItemName = this.selectedTagsList[0] + '/['
        for (let j in this.selectedTagsList) {
          newFileItemName = newFileItemName + '#' + this.selectedTagsList[j]
        }
        newFileItemName = newFileItemName + ']-' + this.filesTableDataShow[this.addCategoriesSelectedRow]['itemName']
      }
      let tempFile = {
        'prePath': this.currentFolder + this.filesTableDataShow[this.addCategoriesSelectedRow]['itemName'],
        'newPath': this.currentFolder + newFileItemName
      }
      actions['mvFilesList'].push(tempFile)
      this.$parent.webSocketSend(JSON.stringify(actions))
      this.queryFolderFiles(this.currentFolder)
    },
    addCategoriesBatchDialogOK () {
      if (this.selectedTagsList.length === 0) {
        this.$Message.info('Please select categories first.')
        this.addCategoriesDialog = true
        return
      }
      this.selectedList = this.$refs.selectFiles.getSelection()
      // if (this.selectedList.length === 0) {
      //   this.$Message.info('Please select items of table first.')
      //   return
      // }
      let actions = {
        'CMD': 'mvFilesRequest',
        'CMDCode': 40,
        'mvFilesList': []
      }
      let tempStr
      let newFileItemName
      for (let i in this.selectedList) {
        tempStr = this.selectedList[i]['itemName']
        if (/^\[#.*\]-/.test(tempStr)) {
          newFileItemName = this.selectedTagsList[0] + '/['
          for (let j in this.selectedTagsList) {
            newFileItemName = newFileItemName + '#' + this.selectedTagsList[j]
          }
          newFileItemName = newFileItemName + ']-' + this.selectedList[i]['itemName'].match(/^\[#.*\]-(.*)$/)[1]
        } else {
          newFileItemName = this.selectedTagsList[0] + '/['
          for (let j in this.selectedTagsList) {
            newFileItemName = newFileItemName + '#' + this.selectedTagsList[j]
          }
          newFileItemName = newFileItemName + ']-' + this.selectedList[i]['itemName']
        }
        let tempFile = {
          'prePath': this.currentFolder + this.selectedList[i]['itemName'],
          'newPath': this.currentFolder + newFileItemName
        }
        actions['mvFilesList'].push(tempFile)
      }
      this.$parent.webSocketSend(JSON.stringify(actions))
      this.queryFolderFiles(this.currentFolder)
    },
    currentFolderChange (data) {
      this.folderList = []
      let tempFolderList = data.split('/')
      // console.log(tempFolderList)
      // let tempStr = ''
      let tempStr = tempFolderList[0] + '/'
      this.currentDisk = tempFolderList[0]
      for (let i in tempFolderList) {
        if (parseInt(i) === 0 || tempFolderList[i] === '') {
          continue
        }
        // if (tempFolderList[i] === '') {
        //   continue
        // }
        tempStr = tempStr + tempFolderList[i] + '/'
        this.folderList.push({
          folderName: tempFolderList[i],
          folderPath: tempStr
        })
      }
    },
    // cmdData (jsonData) {
    //   if (jsonData['CMD'] === 'listDirResponse') {
    //     this.currentFolder = jsonData['folderPath'].replace(/\*$/, '')
    //     this.currentFolderChange(this.currentFolder)
    //     this.filesTableData = []
    //     this.filesList = JSON.parse(JSON.stringify(jsonData['foldersData']))
    //     let tempStr
    //     // var tempStrList
    //     for (let i in this.filesList) {
    //       // var tempFileData = JSON.parse(JSON.stringify(this.filesList[i]))
    //       let tempFileData = this.filesList[i]
    //       // console.log('tempFileData', tempFileData)
    //       if (this.filesList[i]['itemAttribute'] === 'hiddenFile' || this.filesList[i]['itemAttribute'] === 'hiddenDirectory') {
    //         continue
    //       } else if (tempFileData['itemAttribute'] === 'file') {
    //         tempStr = tempFileData['itemName']
    //         tempFileData['fileType'] = tempStr.split('.').pop()
    //         // if (parseInt(tempFileData['itemSize-Byte']) === 0) {
    //         //   tempFileData['fileSize'] = '0'
    //         // } else
    //         if (tempFileData['itemSize-Byte'] / 1048576 > 1) {
    //           tempFileData['fileSize'] = (tempFileData['itemSize-Byte'] / 1048576).toFixed(2).toString() + ' MB'
    //         } else if (tempFileData['itemSize-Byte'] / 1024 > 1) {
    //           tempFileData['fileSize'] = (tempFileData['itemSize-Byte'] / 1024).toFixed(2).toString() + ' KB'
    //         } else {
    //           tempFileData['fileSize'] = tempFileData['itemSize-Byte'].toFixed(2).toString() + ' B'
    //         }
    //         if (/\[#.*?\]-/.test(tempStr)) {
    //           tempFileData['category'] = tempStr.match(/\[(#.*?)\]-/)[1]
    //         } else {
    //           tempFileData['category'] = '#Unknown'
    //         }
    //       } else {
    //         tempFileData['fileType'] = '-'
    //         tempFileData['fileSize'] = '-'
    //       }
    //       this.filesTableData.push(tempFileData)
    //     }
    //     // console.log('this.filesTableData', this.filesTableData)
    //     // this.handlePageChange()
    //     this.filesTableDataShow = this.filesTableData
    //   } else if (jsonData['CMD'] === 'listDriverResponse') {
    //     this.driversList = JSON.parse(JSON.stringify(jsonData['driversList']))
    //     let tempDriver
    //     this.localDiskList = []
    //     for (let j in this.driversList) {
    //       tempDriver = this.driversList[j]
    //       this.localDiskList.push(tempDriver['driverLetter'].replace('\\', ''))
    //     }
    //     window.localStorage.setItem('driversList', JSON.stringify(this.driversList))
    //     window.localStorage.setItem('isGetDriversInfo', false)
    //     // if (/^C:/.test(this.localDiskList[0]) || this.localDiskList.length() > 1) {
    //     //   this.currentDisk = this.localDiskList[1]
    //     // } else {
    //     //   this.currentDisk = this.localDiskList[0]
    //     // }
    //     // this.localDiskChange()
    //   }
    // },
    handleListDirResponse (jsonData) {
      this.currentFolder = jsonData['folderPath'].replace(/\*$/, '')
      this.currentFolderChange(this.currentFolder)
      this.filesTableData = []
      this.filesList = JSON.parse(JSON.stringify(jsonData['foldersData']))
      let tempStr
      // var tempStrList
      for (let i in this.filesList) {
        // var tempFileData = JSON.parse(JSON.stringify(this.filesList[i]))
        let tempFileData = this.filesList[i]
        // console.log('tempFileData', tempFileData)
        if (this.filesList[i]['itemAttribute'] === 'hiddenFile' || this.filesList[i]['itemAttribute'] === 'hiddenDirectory') {
          continue
        } else if (tempFileData['itemAttribute'] === 'file') {
          tempStr = tempFileData['itemName']
          tempFileData['fileType'] = tempStr.split('.').pop()
          // if (parseInt(tempFileData['itemSize-Byte']) === 0) {
          //   tempFileData['fileSize'] = '0'
          // } else
          if (tempFileData['itemSize-Byte'] / 1048576 > 1) {
            tempFileData['fileSize'] = (tempFileData['itemSize-Byte'] / 1048576).toFixed(2).toString() + ' MB'
          } else if (tempFileData['itemSize-Byte'] / 1024 > 1) {
            tempFileData['fileSize'] = (tempFileData['itemSize-Byte'] / 1024).toFixed(2).toString() + ' KB'
          } else {
            tempFileData['fileSize'] = tempFileData['itemSize-Byte'].toFixed(2).toString() + ' B'
          }
          if (/\[#.*?\]-/.test(tempStr)) {
            tempFileData['category'] = tempStr.match(/\[(#.*?)\]-/)[1]
          } else {
            tempFileData['category'] = '#Unknown'
          }
        } else {
          tempFileData['fileType'] = '-'
          tempFileData['fileSize'] = '-'
        }
        this.filesTableData.push(tempFileData)
      }
      // console.log('this.filesTableData', this.filesTableData)
      // this.handlePageChange()
      this.filesTableDataShow = this.filesTableData
    },
    handleListDriverResponse (jsonData) {
      this.driversList = JSON.parse(JSON.stringify(jsonData['driversList']))
      let tempDriver
      this.localDiskList = []
      for (let j in this.driversList) {
        tempDriver = this.driversList[j]
        this.localDiskList.push(tempDriver['driverLetter'].replace('\\', ''))
      }
      // window.localStorage.setItem('driversList', JSON.stringify(this.driversList))
      // window.localStorage.setItem('isGetDriversInfo', false)
      // if (/^C:/.test(this.localDiskList[0]) || this.localDiskList.length() > 1) {
      //   this.currentDisk = this.localDiskList[1]
      // } else {
      //   this.currentDisk = this.localDiskList[0]
      // }
      // this.localDiskChange()
    }
    // handleListTagsResponse (jsonData) {
    //
    // }
  },
  props: ['driversListProps', 'dirListProps', 'tagsListProps'],
  watch: {
    dirListProps: {
      handler (newVal, oldVal) {
        // console.log('/folder watch dirProps', newVal)
        this.handleListDirResponse(newVal)
      },
      // immediate: true,
      deep: true
    },
    driversListProps: {
      handler (newVal, oldVal) {
        // console.log('/folder watch driversProps', newVal)
        this.handleListDriverResponse(newVal)
      },
      // immediate: true,
      deep: true
    },
    tagsListProps: {
      handler (newVal, oldVal) {
        // console.log('/folder watch driversProps', newVal)
        this.tagsList = newVal['tagsList']
      },
      // immediate: true,
      deep: true
    }
  },
  mounted () {
    // this.queryFolderFiles()
    // this.handlePageChange()
    // this.handleListDriverResponse(this.driversListProps)
    this.refreshDisk()
    this.getDefaultDir()
    this.getTags()
  },
  created () {
    // this.initWebSocket()
  },
  destroyed () {
    // this.webSocket.close()
  }
}
