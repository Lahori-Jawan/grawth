<template>
  <div id="page" class="default">
    <button @click="logout" v-if="$store.state.auth">Logout</button>
    <div class="nav is-flex is-space-e">
      <nuxt-link to="/demo">
        Public Page
      </nuxt-link>
      <nuxt-link to="/">
        Protected Page
      </nuxt-link>
    </div>
    <nuxt />
  </div>
</template>

<script>
export default {
  async beforeMount () {
    const auth = this.$cookies.get('auth');
    if(auth && !this.$store.auth) {
      this.$store.commit('SET_AUTH', auth)
      await this.$apolloHelpers.onLogin(auth.token)
    }
  },
  methods: {
    async logout () {
      this.$cookies.remove('token')
      this.$cookies.remove('auth')
      this.$store.commit('SET_AUTH', null)
      await this.$apolloHelpers.onLogout()
      this.$router.push({ path: '/auth/login'})
    },
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
