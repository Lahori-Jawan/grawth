// https://github.com/nuxt-community/apollo-module/pull/227
// const HOST = process.env.HOST, PORT = process.env.PORT
// let httpEndpoint = HOST:PORT/ENDPOINT || `http://localhost:${PORT}/graphql`;
//   let wsEndpoint = process.env.WS_ENDPOINT || 'ws://localhost:4000/graphql';
export default function( context ){
  var headers={};
  if(typeof context.ssrContext != 'undefined')
    headers = context.ssrContext.req.headers

  return {
    apollo:{
      ssrMode: true,
      credentials: 'include',
      fetchOptions:{
        credentials: 'include',
      },
    },
    httpEndpoint: 'http://localhost:3000/graphql',
    httpLinkOptions: {
      credentials: 'include',
      fetchOptions:{
        credentials: 'include',
      },
      headers: headers // this is either {} if in-browser or the browser's req if SSR
    },
    wsEndpoint: 'ws://localhost:3000/graphql',

    credentials: 'include',
    // LocalStorage token
    tokenName: 'apollo-token', // optional
    // Enable Automatic Query persisting with Apollo Engine
    persisting: false, // Optional

    // Use websockets for everything (no HTTP)
    // You need to pass a `wsEndpoint` for this to work
    //websocketsOnly: false // Optional
    // causes: Network error: Only subscriptions are allowed over websocket transport
    //websocketsOnly: true // Optional
  }
}
