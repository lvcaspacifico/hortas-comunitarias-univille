import { createStore } from 'vuex'
import auth from './modules/auth'
import associacoes from './modules/associacoes'
import hortas from './modules/hortas'
import canteiros from './modules/canteiros'
import carteiristas from './modules/carteiristas'
import pagamentos from './modules/pagamentos'
import dependentes from './modules/dependentes'
import notificacoes from './modules/notificacoes'

export default createStore({
  modules: {
    auth,
    associacoes,
    hortas,
    canteiros,
    carteiristas,
    pagamentos,
    dependentes,
    notificacoes
  }
})
