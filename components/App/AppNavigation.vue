<template>
  <div id="app-navigation">
    <b-navbar toggleable="md" type="dark">
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
import { AnimationBus } from '@/helpers/animation-bus.js'

export default {
  name: 'app-navigation',
  mounted() {
    AnimationBus.$emit('add-to-scene', 'From Navigation')
  }
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
  background-color: rgba($gray-400, 0.25);
  nav {
    background: linear-gradient(
      to bottom,
      rgba(0,0,0,0.7),
      rgba(0,0,0,0.3),
      rgba(0,0,0,0.3),
      rgba(0,0,0,0.7)
    );
    li {
      padding: $navbar-nav-item-padding-y $navbar-nav-item-padding-x;
      a {
        transform: translateX(0px) scale(1);
        transition: 0.12s all;
        text-transform: uppercase;
        // box-shadow: 0px 2px 7px $gray-100;
        z-index:1000;
        // padding: 0;
        padding: $navbar-nav-link-padding-y $navbar-nav-item-padding-x;
        color: $gray-100;
        &.active {
          transform: translateX(-3px) scale(1.2);
        }
      }
      &:hover {
        a {
          transform: translateX(-3px) scale(1.2);
          // box-shadow: 0px 2px 7px $gray-100;
          z-index:1000;
          &.active {
            transform: translateX(-3px) scale(1.2);
          }
        }
      }
    }
  }
}
</style>
