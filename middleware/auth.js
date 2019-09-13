export default function ({ store, redirect }) {

  !store.state.auth && redirect('/auth/login')

}
