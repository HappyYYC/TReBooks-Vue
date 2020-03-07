import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isGetDriversInfo: false,
    driversInfo: [
      {
        driverLetter: '',
        driversName: '',
        driversType: '',
        freeSpace: ''
      }
    ],
    selectFiles: [
      {
        itemAttribute: '',
        itemName: '',
        category: '',
        fileType: '',
        fileSize: '',
        location: ''
      }
    ]
  },
  getters: {
    getDriversInfo (state) {
      return state.driversInfo
    },
    getSelectFiles (state) {
      return state.selectFiles
    },
    getIsGetDriversInfo (state) {
      return state.isGetDriversInfo
    },
    getState (state) {
      return state
    }
  },
  mutations: {
    setDriversInfo (state, driversInfo) {
      state.driversInfo = driversInfo
    },
    setSelectFiles (state, selectFiles) {
      state.selectFiles = selectFiles
    },
    setIsGetDriversInfo (state, isGetDriversInfo) {
      state.isGetDriversInfo = isGetDriversInfo
    },
    setState (state, newState) {
      state = newState
    }
  }
})

export default store
