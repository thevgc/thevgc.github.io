<template>
  <section class="container">
    <div>
      <h1 class="title">
        VGC
      </h1>
      <h2 class="subtitle">
        Virtual Gaming Community
      </h2>
      <div class="links">
        <a
          href="#"
          class="button--green">Login</a>
        <a
          href="#"
          class="button--grey">Register</a>
      </div>
    </div>
  </section>
</template>

<script>
const AppLogo = () => import('~/components/AppLogo.vue')

export default {
  head () {
    return {
      title: 'Welcome to The Virtual Gaming Community',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
        }
      ]
    }
  },
  components: {
    AppLogo
  }
}
</script>

<style lang="scss">
.container {
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
