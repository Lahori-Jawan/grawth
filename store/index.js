
export const state = () => ({
  user: null
})

export const mutations = {
  SET_USER (state, user) {
    state.user = user
  }
}
