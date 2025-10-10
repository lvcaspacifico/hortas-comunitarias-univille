// Dependentes module intentionally stubbed/disabled.
// Keeping a small inert module here so removal is non-breaking; remove entirely to fully uninstall.
const state = {
  dependentes: [],
  currentDependente: null,
  loading: false,
  error: null
}

const getters = {
  allDependentes: state => state.dependentes,
  isLoading: state => state.loading
}

const mutations = {
  SET_DEPENDENTES(state, list) {
    state.dependentes = list
  },
  SET_CURRENT_DEPENDENTE(state, item) {
    state.currentDependente = item
  },
  SET_LOADING(state, val) {
    state.loading = val
  },
  SET_ERROR(state, err) {
    state.error = err
  }
}

const actions = {
  // No-op actions to keep existing callers safe until the routine is fully removed.
  async fetchDependentes({ commit }) {
    commit('SET_DEPENDENTES', [])
    return []
  },
  async fetchDependente({ commit }, id) {
    commit('SET_CURRENT_DEPENDENTE', null)
    return null
  },
  async createDependente() {
    return { success: false, message: 'Dependentes routine removed' }
  },
  async updateDependente() {
    return { success: false, message: 'Dependentes routine removed' }
  },
  async deleteDependente() {
    return { success: false, message: 'Dependentes routine removed' }
  }
}

export default { namespaced: true, state, getters, mutations, actions }
