import { createStore } from 'vuex'
import auth from './modules/auth'
import associacoes from './modules/associacoes'

export default createStore({
  modules: {
    auth,
    associacoes
  }
})