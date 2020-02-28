export default {
  name: 'Folder',
  data () {
    return {
      folderList: [
        {
          folderName: 'Kindle',
          folderPath: 'G:/Kindle/'
        },
        {
          folderName: 'Magazine',
          folderPath: 'G:/Kindle/Magazine/'
        },
        {
          folderName: 'The Economist',
          folderPath: 'G:/Kindle/Magazine/The Economist/'
        }
      ],
      localDiskList: ['C:', 'D:', 'E:', 'F:', 'G:'],
      currentDisk: 'G:',
      currentFolder: 'G:/Kindle/Magazine/The Economist/',
      filesList: [
        '[#Magazine#English]-The Economist-20200215.pdf',
        '[#Magazine#English]-The Economist-20200208.azw3',
        '[#Magazine#English]-The Economist-20200118.mobi',
        '[#Magazine#English]-The Economist-20200104.epub'
      ],
      folderForm: {
      },
      folderFormRule: {
      },
      filesTableColumns: [
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
        },
        {
          title: 'Operation',
          key: 'operation',
          width: 150,
          align: 'center',
          render: (h, params) => {
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
      ],
      filesTableData: [
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
      filesTableDataShow: [],
      filesTablePageSize: 10,
      filesTablePageCurrent: 1,
      filesTableDataCount: 0,
      addCategoriesDialog: false
    }
  },
  methods: {
    handlePageChange () {
      this.filesTableDataCount = this.filesTableData.length
      if (this.filesTableDataCount < this.filesTablePageSize) {
        this.filesTableDataShow = this.filesTableData
      } else {
        this.filesTableDataShow = this.filesTableData.slice(0, this.filesTablePageSize)
      }
    },
    changeFilesTablePageSize (page) {
      // console.log(page)
      this.filesTablePageSize = page
      this.changeFilesTablePage(this.filesTablePageCurrent)
    },
    changeFilesTablePage (index) {
      // console.log(index)
      this.filesTablePageCurrent = index
      var _start = (index - 1) * this.filesTablePageSize
      var _end = index * this.filesTablePageSize
      this.filesTableDataShow = this.filesTableData.slice(_start, _end)
    },
    queryFolderFiles () {
      this.$Message.warning('This is a queryFolderFiles')
      this.handlePageChange()
    },
    clickFolder () {
      this.queryFolderFiles()
      this.$Message.warning('This is a warning tip')
    },
    localDiskChange () {
      this.$Message.error('This is a error tip')
    },
    addCategories () {
      this.$Message.warning('This is addCategories')
      this.addCategoriesDialog = true
    },
    addCategoriesDialogOK () {
      this.$Message.info('This is addCategoriesDialogOK')
    }
  },
  mounted () {
    this.queryFolderFiles()
  }
}
