<template>
    <div id="app-drawer">
        <app-navigation>

        </app-navigation>
        <slot></slot>
    </div>
</template>
<script>
import AppNavigation from '@/components/App/AppNavigation'
export default {
    name: 'app-drawer',
    components: {
        AppNavigation
    }
}
</script>
<style lang="scss">
@import "assets/css/bootstrap/functions";
@import "assets/css/variables";
@import "assets/css/bootstrap/mixins";
#app-drawer {
    color: $gray-100;
}
</style>
