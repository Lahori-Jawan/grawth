
export const state = () => ({
  auth: null
})

export const mutations = {
  SET_AUTH (state, auth) {
    state.auth = auth
  }
}

export const actions = {
  async nuxtServerInit ({ commit }, { req }) {
    const auth = req.cookies.auth
    if (auth) {
      commit('SET_AUTH', auth)
    }
  }
}
