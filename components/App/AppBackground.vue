<template>
    <div id="app-background">
    </div>
</template>
<script>
import { AmbientLight, Color, DirectionalLight, Geometry, Line, LineBasicMaterial, Mesh, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three'
import { mapState } from 'vuex';
import { AnimationBus } from '@/helpers/animation-bus.js';
import { $e, $i, detectWebGL } from '@/helpers/util.js';
import { Loader } from '@/helpers/loader';
import browser from '@/helpers/browser';
import CONFIGS from '@/helpers/configs';
import * as logger from '@/helpers/logger';
import * as input from '@/helpers/input';
import * as heightfield from '@/helpers/heightfield'
import { defaults } from '@/helpers/defaults';
import {
  Vec2,
  Vec3
} from '@/helpers/color';

const VIEW_DEPTH = 2000.0
const MAX_TIMESTEP = 67 // max 67 ms/frame
const HEIGHTFIELD_SIZE = 3072.0
const HEIGHTFIELD_HEIGHT = 180.0
const WATER_LEVEL = HEIGHTFIELD_HEIGHT * 0.305556 // 55.0
const BEACH_TRANSITION_LOW = 0.31
const BEACH_TRANSITION_HIGH = 0.36
const LIGHT_DIR = new Vector3(.0, 1.0, -1.0).normalize()
const FOG_COLOR = new Color(0.74, 0.77, 0.91)
const GRASS_COLOR = new Color(0.45, 0.46, 0.19)
const WATER_COLOR = new Color(0.6, 0.7, 0.85)
const WIND_DEFAULT = 1.5
const WIND_MAX = 3.0
const MAX_GLARE = 0.25 // max glare effect amount
const GLARE_RANGE = 1.1 // angular range of effect
const GLARE_YAW = Math.PI * 1.5 // yaw angle when looking directly at sun
const GLARE_PITCH = 0.2 // pitch angle looking at sun
const GLARE_COLOR = new Color(1.0, 0.8, 0.4)
const INTRO_FADE_DUR = 2000

export default {
    name: 'app-background',
    data () {
        return {
          assets: null,
          camera: null,
          cameras: {},
          renderer: null,
          scene: null,
          textures: {},
          geometries: {},
          materials: {},
          meshes: {},
          width: 640,
          height: 480,
          options: defaults
        }
    },
    props: {},
    computed: {
    },
    methods: {
        addAmbient(color) {
            this.scene.add(new AmbientLight(color));
        },

      createLine() {
        let material = new LineBasicMaterial( { color: 0xFFFFFF } ),
            geometry = new Geometry(),
            line = new Line( geometry, material );

        geometry.vertices.push(new Vector3( -10, 0, 0) );
        geometry.vertices.push(new Vector3( 0, 10, 0) );
        geometry.vertices.push(new Vector3( 10, 0, 0) );
        this.scene.add(line)
        console.log('Line added')
      },
      detectWebGL() {
        try {
          const canvas = document.createElement('canvas')
          return (
            !!canvas.getContext('webgl') || !!canvas.getContext('experimental-webgl')
          )
        }
        catch (e) {
          return null
        }
      },
      animate() {
        // this.box.mesh.rotation.x += 0.1
        // this.box.mesh.rotation.y += 0.1
        this.renderer.render( this.scene, this.camera );
        requestAnimationFrame( this.animate );

      },
      loadAssets() {
        const loader = Loader()
        loader.load(
          {
            text: [
              {name: 'grass.vert', url: require('@/assets/shaders/grass.vert.glsl')},
              {name: 'grass.frag', url: require('@/assets/shaders/grass.frag.glsl')},
              {name: 'terrain.vert', url: require('@/assets/shaders/terrain.vert.glsl')},
              {name: 'terrain.frag', url: require('@/assets/shaders/terrain.frag.glsl')},
              {name: 'water.vert', url: require('@/assets/shaders/water.vert.glsl')},
              {name: 'water.frag', url: require('@/assets/shaders/water.frag.glsl')}
            ],
            images: [
              {name: 'heightmap', url: require('@/assets/data/heightmap.jpg')},
              {name: 'noise', url: require('@/assets/data/noise.jpg')}
            ],
            textures: [
              {name: 'grass', url: require('@/assets/data/grass.jpg')},
              {name: 'terrain1', url: require('@/assets/data/terrain1.jpg')},
              {name: 'terrain2', url: require('@/assets/data/terrain2.jpg')},
              {name: 'skydome', url: require('@/assets/data/skydome.jpg')},
              {name: 'skyenv', url: require('@/assets/data/skyenv.jpg')}
            ]
          }
        )
        this.assets = loader.getAssets();
        // console.log(this.assets.getAssets())
        // Select a config roughly based on device type
		    const cfgId = browser.isMobile.any ? 'mobile' : 'desktop'
		    const cfg = CONFIGS[cfgId]
        console.log(cfg)

      },
      resize() {
        this.setDimensions();
        this.renderer.setSize(this.width, this.height)
        this.camera.aspect = this.width / this.height
        this.camera.updateProjectionMatrix()
      },
      setDimensions(cb) {
        this.width = this.$el.clientWidth || window.innerWidth
        this.height = this.$el.clientHeight || window.innerHeight
        if (cb) {
          cb()
        }
      },
      addListeners() {
        window.addEventListener('resize', this.resize)
        this.animationBusListeners()
      },
      animationBusListeners() {

      }
    },
    mounted () {
      this.setDimensions();
        /* Create Scene */
        let scene = new Scene();
        this.scene = scene;

        /* Create Perspective Camera */
        let camera = new PerspectiveCamera(45, this.width / this.height, 1, VIEW_DEPTH);
        camera.position.set(0,0,100);
        camera.lookAt(new Vector3(0,0,0));
        this.camera = camera;

        /* Create WebGL Renderer */
        let renderer = new WebGLRenderer();
        renderer.setSize(this.width, this.height);
        this.renderer = renderer;


        /* Start Animating */

        this.addListeners();
        this.createLine();
        this.addAmbient(0xeef0ff)
        var light = new DirectionalLight( 0xffffff, 1 );
        /* Attach renderer to container */
        light.position.set( 1, 1, 1 );
        this.scene.add( light );        // this.createGlobe();
        this.$el.appendChild(this.renderer.domElement)
        this.renderer.render(this.scene, this.camera)
        this.animate()
        this.loadAssets()
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
