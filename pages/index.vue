<template>
  <div class="home">
    I am {{ hello }}
  </div>
</template>

<script>
import hello from '../apollo/queries/hello.gql';
export default {
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
