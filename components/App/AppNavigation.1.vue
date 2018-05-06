<template>
  <div id="app-navigation">
    <b-navbar toggleable="md" type="light" variant="light">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-container>
        <b-collapse is-nav id="nav_collapse" style="width: 100%">
          <b-navbar-nav fill style="width: 100%">
            <b-nav-item :to="{ path: '/' }" exact>Home</b-nav-item>
            <b-nav-item :to="{ path: '/blog' }">Blog</b-nav-item>
            <b-nav-item :to="{ path: '/leagues' }">Leagues</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: 'app-navigation'
}
</script>
<style lang="scss">
@import "assets/css/bootstrap/functions";
@import "assets/css/variables";
@import "assets/css/bootstrap/mixins";
body {
  overflow: hidden;
}
#app-navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  nav {
    background-color: rgba($blue, 1.0);
    li:hover {
      a {
        transform: translateX(-3px) scale(1.25);
        // box-shadow: 0px 2px 7px $gray-100;
        z-index:1000;

      }
    }
      a.active {
        transform: translateX(-3px) scale(1.2);
        // box-shadow: 0px 2px 7px $gray-100;
        z-index:1000;
      }
  }
  // background-color: rgba($gray-400, 0.6);
  // height: $nav-link-height + ($navbar-brand-padding-y * 2);
}
</style>
