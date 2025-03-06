import { createStore } from 'vuex'
import races from './modules/races'
import horses from './modules/horses'

export default createStore({
  modules: {
    races,
    horses
  }
})
