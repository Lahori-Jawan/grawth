<template>
  <div class="home is-flex is-centered">
    <nuxt-link to="/auth/login" v-if="!$store.state.auth">Login</nuxt-link>
    I am {{ hello }}
    <div class="content">
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.username }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import hello from '../apollo/queries/hello.gql';
import userCreated from '@/apollo/subscriptions/userCreated.gql'
export default {
  middleware: 'auth',
  data: () => ({
    users: []
  }),
  apollo: {
    hello: {
      // prefetch: true,
      query: hello
    },
    // Subscription
    $subscribe: {
    // When a user is created
      userCreated: {
        query: userCreated,
        // Don't forget to destructure `data`
        result ({ data: { userCreated } }) {
          const {id, username} = userCreated.user
          this.users.push({id, username})
        },
      },
    },
  }
}
</script>

<style>
</style>
