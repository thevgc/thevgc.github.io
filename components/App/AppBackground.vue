<template>
    <div id="app-background">
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'app-background',
    data () {
        return {

        }
    },
    computed: {
      ...mapState({
        camera: state => state.three.camera,
        renderer: state => state.three.renderer,
        scene: state => state.three.scene
      })
    },
    props: {},
    methods: {

    },
    mounted () {
      this.$el.appendChild(this.renderer.domElement)
    }
}
</script>
<style lang="scss">
@import "assets/css/bootstrap/functions";
@import "assets/css/variables";
@import "assets/css/bootstrap/mixins";

#app-background {
    // background-color: $gray-900;
    // background-image: url('~assets/images/abstract-1175050_1920.jpg');
    display: flex;
    align-items: center;
    justify-content: center;
    canvas {
      width: 100%;
      height: 100%;
    }
}
</style>
