<template>
  <div id="navigation-wrapper">
      <navigation></navigation>
  </div>
</template>
<script>
const Navigation = () => import("./Navigation.vue");
export default {
  name: 'navigation-wrapper',
  components: {
      Navigation
  },
  data () {
      return {

      }
  },
  mounted () {
      return true;
  },
  created () {
      return true;
  },
  methods: {

  },
  props: {

  }
}
</script>
<style lang="scss">
@import "assets/css/bootstrap/functions";
@import "assets/css/variables";
@import "assets/css/bootstrap/mixins";

#navigation-wrapper {
    background-color: $gray-900;
}
</style>
