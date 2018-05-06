<template>
  <h1>Blog</h1>
</template>

<script>
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
  mounted () {
    // this.$el.style.backgroundColor = '#1d1d1d'
  }
}
</script>
<style lang="scss"></style>
