<template>
  <div class="login-form">
    <input type="email">
    <input type="password">
    <button type="submit" @click="login">
      Login
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    async login () {
      try {
        const {data, status} = await this.$axios.post('/auth/login', {
          // ...this.credentials
          id: 999
        })
        console.log({data, status})
        // this.setUser({...data, statusCode: status});
        this.$cookies.set('auth', data[0]);
        // this.resetError();
        // this.$router.push('/');
      } catch (error) {
        // this.setError({
        //   msg: 'Username or Password is incorrect',
        //   statusCode: 401,
        //   remove: true
        // });
      }
    },
  }
}
</script>

<style>

</style>
