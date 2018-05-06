import {
  AmbientLight,
  Clock,
  Color,
  DirectionalLight,
  Fog,
  Light,
  LineBasicMaterial,
  PerspectiveCamera,
  PlaneBufferGeometry,
  Scene,
  TextureLoader,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  Geometry,
  RepeatWrapping,
  WebGLRenderer
} from "three";
import * as THREE from "three";
let OrbitControls = require("three-orbit-controls")(THREE);
let parameters = {
  rotX: 34, //don't touch - defines rotation of star container to skybox!
  rotY: 32, //don't touch - defines rotation of star container to skybox!
  rotZ: 60, //don't touch - defines rotation of star container to skybox!
  lightDirX: 100,
  lightDirY: 800,
  lightDirZ: 800,

  moonLightDirX: 5000,
  moonLightDirY: 5000,
  moonLightDirZ: 100,

  rotXFloor: 270, //defines rotation of floor to sphereContainer
  rotYFloor: 0, //defines rotation of floor to sphereContainer
  rotZFloor: 0, //defines rotation of floor to sphereContainer
  floorOffset: -10, //defines offset of floor to sphereContainer
  cameraContainerRotX: 0, //defines default rotation of camera
  cameraContainerRotY: 160, //defines default rotation of camera - linked to compass direction
  cameraContainerRotZ: 0, //defines default rotation of camera
  cameraOffset: 0, //set to 0 to hide water, set to 1 to show
  sphereRotX: 0, //defines default rotation of sphere used to point to north and south celestial poles
  sphereRotY: 0, //defines default rotation of sphere used to point to north and south celestial poles - if the camera is added to `sphere` and the Y axis is rotated around the sky will appear to rotate around the north / south points
  sphereRotZ: 0, //defines default rotation of sphere used to point to north and south celestial poles
  sphere2RotX: 0, //defines default rotation of sphere used to point to north and south celestial poles
  sphere2RotY: 0, //defines default rotation of sphere used to point to north and south celestial poles
  sphere2RotZ: 0, //defines default rotation of sphere used to point to north and south celestial poles
  sphereContainerRotX: 0, //defines default rotation of sphereContainer. Controls global orientation of camera
  sphereContainerRotY: 0, //defines default rotation of sphereContainer. Controls global orientation of camera
  sphereContainerRotZ: 0, //defines default rotation of sphereContainer. Controls global orientation of camera

  skyboxContainerRotX: 0,
  skyboxContainerRotY: 0, //adjust Y value to rotate sky around fixed point - linked to time of day
  skyboxContainerRotZ: 0,

  skyboxContainer2RotX: 235, //ajust X value to rotate sky into position according to lat
  skyboxContainer2RotY: 0,
  skyboxContainer2RotZ: 175, //ajust X value to rotate sky into position according to long

  skyboxRotX: 54,
  skyboxRotY: 326,
  skyboxRotZ: 347
};
export default {
  data() {
    return {
      renderer: null,
      scene: null,
      camera: null,
      clock: null,
      container: null,
      controls: null,
      light: null,
      width: 0,
      height: 0,
      dimensions: {
        x: 0,
        y: 0
      },
      loaders: {
        texture: new TextureLoader()
      }
    };
  },
  props: {
    cameraOptions: {
      type: Object,
      default: () => {
        return {
          constructor: {
            fov: 45,
            near: 0.01,
            far: 1000
          }
        };
      }
    }
  },
  mounted() {
    this.container = this.$el;
    if (Modernizr.webgl) {
      this.clock = new Clock();
      this.setDimensions();
      this.setupCamera();
      this.setupScene();
      this.setupRenderer();
      this.setupControls();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      // this.$el.appendChild(this.renderer.domElement);
      this.animate();
      this.pitch.materials.lineBasic = new LineBasicMaterial({
        color: 0xffffff,
        linewidth: 100
      });
      // this.createTexture();
      window.addEventListener("resize", this.onResize, false);
    }
  },
  methods: {
    onResize() {
      let aspect = window.innerWidth / window.innerHeight;
      this.camera.aspect = aspect;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(window.innerWidth / window.innerHeight);
    },
    setDimensions() {
      let x = window.innerWidth,
        y = window.innerHeight;
      this.dimensions = {
        x: x,
        y: y
      };
    },
    setupCamera() {
      try {
        var camera = new PerspectiveCamera(
          this.$props.cameraOptions.fov,
          window.innerWidth / window.innerHeight,
          this.$props.cameraOptions.near,
          this.$props.cameraOptions.far
        );
        camera.position.set(0, 0, 160);
        camera.rotation.x = 0;
        camera.rotation.y = 0;
        camera.rotation.z = 0;
        this.camera = camera;
      } catch (e) {
        console.log(e);
      } finally {
        return this.camera;
      }
    },
    setupControls() {
      try {
        let controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.target.set(0, 350, 0);
        controls.autoRotate = true;
        controls.update();
        this.controls = controls;
        this.camera.lookAt(0, 350, 0);
      } catch (e) {
        console.log(e);
      } finally {
        return this.controls;
      }
    },
    setupLights() {},
    setupRenderer() {
      try {
        let renderer = new WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(this.dimensions.x, this.dimensions.y);
        try {
          renderer.setPixelRatio(window.devicePixelRatio);
        } catch (e) {
          console.log("Could not detect device pixel ratio", e);
        }
        this.renderer = renderer;
      } catch (e) {
        console.log(e);
      } finally {
        this.$el.appendChild(this.renderer.domElement);
      }
    },
    setupScene() {
      try {
        let scene = new Scene();
        // scene.background = new Color(this.$props.background);
        scene.background = new Color(0xcce0ff);
        scene.fog = new Fog(0xcce0ff, 500, 10000);
        this.scene = scene;
      } catch (e) {
        console.log(e);
      } finally {
        return this.scene;
      }
    }
  }
};
