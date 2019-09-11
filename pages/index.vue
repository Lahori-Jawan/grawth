<template>
  <div class="home">
    <nuxt-link to="/auth/login">Login</nuxt-link>
    I am {{ hello }}
  </div>
</template>

<script>
import hello from '../apollo/queries/hello.gql';
export default {
  middleware: 'auth',
  async created () {
    // const resp = await this.$axios.get('/token')
    // console.log({resp})
  },
  apollo: {
    hello: {
      // prefetch: true,
      query: hello
    }
  }
}
</script>

<style>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
