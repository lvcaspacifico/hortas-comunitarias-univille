// Dependentes service removed — stub to keep imports safe during cleanup
// If you want the routine restored, replace with real API calls.
const empty = () => Promise.resolve({ data: [] })

export default {
  getAll: (params = {}) => empty(),
  getById: id => Promise.resolve({ data: null }),
  create: data => Promise.resolve({ data }),
  update: (id, data) => Promise.resolve({ data }),
  delete: id => Promise.resolve({})
}
