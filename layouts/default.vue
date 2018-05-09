<template>
  <div id="app-layout" :style="{ minHeight: height + 'px', height: height + 'px', maxHeight: height + 'px' }">
    <app-background></app-background>
    <div id="app-foreground">
      <app-stage>
        <nuxt/>
      </app-stage>
      <app-drawer>
      </app-drawer>
    </div>
  </div>
</template>
<script>
const AppBackground = () => import('@/components/App/AppBackground')
const AppDrawer = () => import('@/components/App/AppDrawer')
const AppStage = () => import('@/components/App/AppStage')
const AppNavigation = () => import("./../components/App/AppNavigation.vue");
import { mapGetters, mapActions, mapMutations, mapState } from "vuex"
import {
  BackSide,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  TextureLoader,
  RepeatWrapping
} from 'three'
export default {
  components: {
    AppBackground,
    AppDrawer,
    AppStage,
    AppNavigation
  },
  data () {
    return {
      loader: null,
      height: 0,
      width: 0
    }
  },
  computed: {
      ...mapState({
        camera: state => state.three.camera,
        // renderer: state => state.three.renderer,
        scene: state => state.three.scene
      })
  },
  mounted () {
    this.loader = new TextureLoader();
    this.height = window.innerHeight;
    // this.createRenderer({ antialias: true, alpha: true, clearColor: 0xFFFFFF, clearAlpha: 1 })
    // this.rendererSetSize({ x: window.innerWidth, y: window.innerHeight });
    this.createCamera( 45, window.innerWidth / window.innerHeight, 0.1, 2000)
    this.createScene();
    // this.createSkydome();
    // this.animateRenderer();
  },
  methods: {
    ...mapMutations({
      createCamera: 'three/createCamera',
      createRenderer: 'three/createRenderer',
      rendererSetSize: 'three/rendererSetSize',
      createScene: 'three/createScene',
      addMeshToScene: 'three/addMeshToScene',
      animate: 'three/animate'
    }),
    animateRenderer() {
      requestAnimationFrame( this.animateRenderer );
      // this.box.mesh.rotation.x += 0.1
      // this.box.mesh.rotation.y += 0.1
      if(this.renderer) {
        this.animate( this.scene, this.camera );
      }
    },
    createSkydome() {
      let scope = this;
      this.loader.load(require('@/assets/images/skydome.jpg'), function(texture) {
        texture.wrapS = texture.wrapT = RepeatWrapping;
        let geometry = new SphereGeometry(20000 * 0.95, 32, 16, 0, Math.PI * 2.0, 0, Math.PI / 2.0
    ).rotateX(Math.PI / 2.0).rotateZ(Math.PI)
        let material = new MeshBasicMaterial({
          color: 0xFFFFFF, side: BackSide, map: texture, fog: false
        });
        let mesh = new Mesh(
          geometry, material
        )
        console.log(mesh)
        scope.addMeshToScene(mesh);
      })
    }

  }
}
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
<style lang="scss">
@import "assets/css/bootstrap/functions";
@import "assets/css/variables";
@import "assets/css/bootstrap/mixins";
#app-layout {
  height: 100%;
  height: 100vh;
  position: relative;
  #app-background, #app-foreground {
    width: 100%;
    width: 100vw;
    height: 100%;
    height: 100vh;
    overflow: hidden;
  }
  #app-background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  #app-foreground {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    #app-drawer, #app-stage {
      width: 100%;
    }
    #app-drawer {
      // flex-grow: 3;
    }
    #app-stage {
      flex-grow: 7;
    }
  }
}
</style>
