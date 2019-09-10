
export default function ({ $axios, store, redirect }) {

  // $axios.setHeader('Content-Type', 'application/json');
  // $axios.setHeader('Accept', 'application/json');

  $axios.onRequest( (config) => {
    if (store.state.user) {
      config.headers.common['Authorization'] = `Bearer ${store.state.user.token}`
    }
    console.log(`Making request to ${config.url}`);
  })

  $axios.onResponse((response) => {
      console.log('axios response', response)
      if(response && response.status === 401) {  /* jwt expiry response */
        logout(store, redirect);
        store.commit('setError', {msg: 'Please Login to enter', statusCode: 401, remove: true });
      }
      // console.log({response})
      // return response
  });

  $axios.onError(error => {
    console.log('axios error', error.response, !error.response, error.isAxiosError);
    if(!error.response && error.isAxiosError) {
      logout(store, redirect);
      store.commit('setError', {msg: 'Please Login to enter', statusCode: 401, remove: true });
    }
  })
}

function logout(store, redirect) {
  window.$cookies.remove('auth');
  // store.commit('resetUser')
  // redirect('/auth/login')
  // console.log('un-auth')
}
