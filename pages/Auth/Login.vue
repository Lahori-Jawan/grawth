<template>
  <div class="login-form is-flex is-center-h is-center-v fullheight">
    <input type="email" v-model="credentials.email" placeholder="email">
    <input type="password" v-model="credentials.password" placeholder="password">
    <button type="submit" @click="login">
      Login
    </button>
  </div>
</template>

<script>
import login from '@/apollo/mutations/login'
export default {
  middleware: 'redirect',
  data: () => ({
    credentials: {
      email: 'virgo@mail.com',
      password: '123'
    }
  }),
  methods: {
    async login () {
      this.$apollo.mutate({
        mutation: login,
        variables: {
          ...this.credentials
        },
        update: (store, { data: { login } } ) => {
          let token = login.token
          this.$cookies.set('token', token)
          this.$cookies.set('auth', login)
          this.$store.commit('SET_AUTH', login)
          this.$router.push({ path: '/'})
        }
      })
    },
    async onLogout () {
      await this.$apolloHelpers.onLogout()
    },
  }
}
</script>

<style>

</style>
