const expandRowRecord = () => import('@/components/ExpandRowRecord')
export default {
  name: 'Record',
  data () {
    return {
      //
      recordsTableColumns: [
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
              return h(expandRowRecord, {
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
      recordsTableData: [],
      recordsTableDataShow: []
    }
  },
  methods: {
    //
  }
}
