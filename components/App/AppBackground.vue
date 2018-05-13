<template>
    <div id="app-background" ref="container">
      <canvas id="app-canvas"></canvas>
    </div>
</template>
<script>
import { Loader } from "@/helpers/loader";
import { $e, $i, detectWebGL } from "@/helpers/util.js";
import browser from "@/helpers/browser";
import CONFIGS from "@/helpers/configs";
import * as input from "@/helpers/input";
import { World } from "@/helpers/world";

export default {
  name: "app-background",
  data() {
    return {
      assets: null,
      canvas: null,
      cfg: null,
      cfgId: null,
      errors: [],
      loading: 0,
      loaded: false,
      world: null,
      numGrassBlades: 10000,
      grassPatchRadius: 40,
      width: 640,
      height: 480,
      antialias: false
    };
  },
  props: {},
  computed: {},
  methods: {
    setupCameras() {},
    addAmbient(color) {},
    createLine() {},
    detectWebGL() {
      try {
        const canvas = document.createElement("canvas");
        return (
          !!canvas.getContext("webgl") ||
          !!canvas.getContext("experimental-webgl")
        );
      } catch (e) {
        return null;
      }
    },
    animate() {},
    loadAssets() {
      const loader = Loader();
      loader.load(
        {
          text: [
            {
              name: "grass.vert",
              url: "/shaders/grass.vert.glsl"
            },
            {
              name: "grass.frag",
              url: "/shaders/grass.frag.glsl"
            },
            {
              name: "terrain.vert",
              url: "/shaders/terrain.vert.glsl"
            },
            {
              name: "terrain.frag",
              url: "/shaders/terrain.frag.glsl"
            },
            {
              name: "water.vert",
              url: "/shaders/water.vert.glsl"
            },
            {
              name: "water.frag",
              url: "/shaders/water.frag.glsl"
            }
          ],
          images: [
            { name: "heightmap", url: "/data/heightmap.jpg" },
            { name: "noise", url: "/data/noise.jpg" }
          ],
          textures: [
            { name: "grass", url: "/data/grass.jpg" },
            { name: "terrain1", url: "/data/terrain1.jpg" },
            { name: "terrain2", url: "/data/terrain2.jpg" },
            { name: "skydome", url: "/data/skydome.jpg" },
            { name: "skyenv", url: "/data/skyenv.jpg" }
          ]
        },
        this.onAssetsLoaded,
        this.onAssetsProgress,
        this.onAssetsError
      );
      this.assets = loader.getAssets();
      // console.log(this.assets.getAssets())
      // Select a config roughly based on device type
      this.cfgId = browser.isMobile.any ? "mobile" : "desktop";
      this.cfg = CONFIGS[this.cfgId];
      console.log(this.cfgId, this.cfg);
    },
    onAssetsLoaded(a) {
      let assets = a;
      this.loaded = true;
      // $e('loading_bar').style.width = '100%'
      // $e('loading_text').innerHTML = "&nbsp;"
      setTimeout(() => {
        this.start();
        // $e('loading_bar_outer').style.visibility = 'hidden'
        // $e('config_block').style.visibility = 'visible'
        // $e('btn_start').onclick = () => {
        //   anim.fadeOut($e('loading_block'), 80, () => {
        //     $e('loading_block').style.display = 'none'
        //     if (!isFullscreen) {
        //       $e('title_bar').style.display = 'block'
        //     }
        //     $e('btn_fullscreen').onclick = () => {
        //       fullscreen.toggle($e('app_container'))
        //     }
        //     $e('btn_restart').onclick = () => {
        //       document.location.reload()
        //     }
        //   })
        // }
      }, 10);
    },
    onAssetsProgress(p) {
      const pct = Math.floor(p * 100);
      this.loading = pct;
    },
    onAssetsError(e) {
      this.errors.push(e);
    },
    setDimensions(cb) {},
    addListeners() {},
    animationBusListeners() {},
    resize() {
      this.width = this.$refs.container.clientWidth;
      this.height = this.$refs.container.clientHeight;
      if (this.world !== null) {
        this.world.resize(this.width, this.height);
      } else {
        const canvas = $e("app-canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        this.canvas = canvas;
      }

      // Seems to be a good place to check for fullscreen toggle.
      // const fs = fullscreen.is();
      // if (fs !== isFullscreen) {
      //   // Show/hide the UI when switching windowed/FS mode.
      //   $e("title_bar").style.display = fs ? "none" : "block";
      //   isFullscreen = fs;
      // }
    },
    start() {
      // Get detail settings from UI inputs
      // const numGrassBlades = +$i("inp_blades").value;
      // const grassPatchRadius = +$i("inp_depth").value;
      // const antialias = !!$i("chk_antialias").checked;
      // Create an instance of the world
      this.world = World(
        this.assets,
        this.numGrassBlades,
        this.grassPatchRadius,
        this.width,
        this.height,
        this.antialias
      );
      // Start our animation loop
      this.doFrame();
    },
    doFrame() {
      this.world.doFrame();
      requestAnimationFrame(this.doFrame);
    }
  },
  mounted() {
    this.resize();
    window.addEventListener("resize", this.resize, false);
    window.addEventListener("orientationchange", this.resize, false);
    this.loadAssets();
    input.init();

    return true;
  }
};
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
