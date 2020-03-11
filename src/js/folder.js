const expandRow = () => import('@/components/ExpandRow')
export default {
  name: 'Folder',
  data () {
    return {
      webSocket: null,
      webSocketErrorCount: 0,
      addCategoriesDialog: false,
      addCategoriesBatchDialog: false,
      folderList: [],
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
          sortable: true,
          sortType: 'asc'
        },
        {
          title: 'File Size',
          key: 'fileSize',
          sortable: true
        },
        {
          title: 'Operation',
          key: 'operation',
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
      filesTableData: [],
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
    queryFolderFiles (data) {
      let actions = {
        'CMD': 'listDirRequest',
        'CMDCode': 10,
        'folderPath': data + '*'
      }
      this.$parent.webSocketSend(JSON.stringify(actions))
    },
    clickFolder (data) {
      this.queryFolderFiles(data.folderPath)
      this.currentFolder = data.folderPath
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
    addTag (index) {
      if (this.selectedTagsList.indexOf(this.tagsList[index]) === -1) {
        this.selectedTagsList.push(this.tagsList[index])
      }
    },
    getTags () {
      if (this.$parent.tagsListProps != null) {
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
    },
    addFilesToConvey () {
      this.selectedList = this.$refs.selectFiles.getSelection()
      if (this.selectedList.length === 0) {
        this.$Message.info('Please select items first.')
        return
      }
      for (let i in this.selectedList) {
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
      let tempStr = tempFolderList[0] + '/'
      this.currentDisk = tempFolderList[0]
      for (let i in tempFolderList) {
        if (parseInt(i) === 0 || tempFolderList[i] === '') {
          continue
        }
        tempStr = tempStr + tempFolderList[i] + '/'
        this.folderList.push({
          folderName: tempFolderList[i],
          folderPath: tempStr
        })
      }
    },
    handleListDirResponse (jsonData) {
      this.currentFolder = jsonData['folderPath'].replace(/\*$/, '')
      this.currentFolderChange(this.currentFolder)
      this.filesTableData = []
      this.filesList = JSON.parse(JSON.stringify(jsonData['foldersData']))
      let tempStr
      for (let i in this.filesList) {
        let tempFileData = this.filesList[i]
        if (this.filesList[i]['itemAttribute'] === 'hiddenFile' || this.filesList[i]['itemAttribute'] === 'hiddenDirectory') {
          continue
        } else if (tempFileData['itemAttribute'] === 'file') {
          tempStr = tempFileData['itemName']
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
          if (/.*\..*$/.test(tempStr)) {
            tempFileData['fileType'] = tempStr.match(/.*\.(.*)$/)[1]
          } else {
            tempFileData['fileType'] = '-'
          }
        } else {
          tempFileData['fileType'] = '-'
          tempFileData['fileSize'] = '-'
        }
        this.filesTableData.push(tempFileData)
      }
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
    }
  },
  props: ['driversListProps', 'dirListProps', 'tagsListProps'],
  watch: {
    dirListProps: {
      handler (newVal, oldVal) {
        this.handleListDirResponse(newVal)
      },
      deep: true
    },
    driversListProps: {
      handler (newVal, oldVal) {
        this.handleListDriverResponse(newVal)
      },
      deep: true
    },
    tagsListProps: {
      handler (newVal, oldVal) {
        this.tagsList = newVal['tagsList']
      },
      deep: true
    }
  },
  mounted () {
    this.refreshDisk()
    this.getDefaultDir()
    this.getTags()
  }
}
