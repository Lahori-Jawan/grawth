<template>
  <div class="home">
    <nuxt-link to="/auth/login">Login</nuxt-link>
    I am {{ hello }}
  </div>
</template>

<script>
import hello from '../apollo/queries/hello.gql';
import userCreated from '@/apollo/subscriptions/userCreated.gql'
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
    },
    // Subscription
    $subscribe: {
    // When a tag is added
      userCreated: {
        query: userCreated,
        // Don't forget to destructure `data`
        result ({ data }) {
          console.log('subuscription:user-created', data)
        },
      },
    },
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
