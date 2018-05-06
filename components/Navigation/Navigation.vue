<template>
  <div id="navigation" class="nav">
      <ul>
            <li><i class="fa fa-home"></i></li>
            <li>Leagues</li>
            <li>Store</li>
            <li>Blog</li>
            <li>Login</li>
            <li>Register</li>
      </ul>
  </div>
</template>
<script>
export default {
  name: 'navigation',
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

#navigation {
    ul > li {
        color: $gray-100;
    }
}
</style>
