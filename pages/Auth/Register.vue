<template>
  <div class="register is-flex-v fullheight">
    <div class="form-container is-flex is-centered fullheight">
      <input type="text" placeholder="Enter username" v-model="credentials.username"> &nbsp;
      <input type="email" placeholder="Enter email" v-model="credentials.email"> &nbsp;
      <input type="password" placeholder="Enter password" v-model="credentials.password"> &nbsp;
      <button @click="signup">Signup</button>
    </div>
      or
    <nuxt-link to="/auth/login">Login</nuxt-link>
  </div>
</template>

<script>
import signup from '@/apollo/mutations/signup';
export default {
  middleware: 'redirect',
  data: () => ({
    credentials: {
      username: '',
      email: '',
      password: ''
    }
  }),
  methods: {
    async signup () {
      if (Object.keys(this.credentials).length < 3) return
      this.$apollo.mutate({
        mutation: signup,
        variables: {
          ...this.credentials
        },
        update: (store, { data: { signup } } ) => {
          let token = signup.token
          const options = { path: '/', maxAge: 60 * 60 * 24 * 3 }
          this.$cookies.set('token', token, options)
          this.$cookies.set('auth', signup, options)
          this.$store.commit('SET_AUTH', signup)
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
