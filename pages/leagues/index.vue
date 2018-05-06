<template>
  <div class="container">
    <h1>Leagues</h1>
    <animation></animation>
  </div>
</template>

<script>
const Animation = () => import('@/components/WebGL')

export default {
  layout: 'app',
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
    Animation
  },
  mounted () {
    // this.$el.style.backgroundColor = '#1d1d1d'
  }
}
</script>
<style lang="scss"></style>
