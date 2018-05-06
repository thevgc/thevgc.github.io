import {
  AmbientLight,
  DirectionalLight
} from "three";

export default {
  data() {
    return {
      container: null,
      controls: null,
      lights: {
        directional: null,
        ambient: null
      }
    };
  },
  mounted() {
    if (Modernizr.webgl) {
      this.createDirectionalLight();
      this.createAmbience(0xeef0ff);
    }
  },
  methods: {
    createAmbience() {
      this.lights.ambient = new AmbientLight(0xeef0ff);
      this.scene.add(this.lights.ambient);
    },
    createDirectionalLight() {
      let light = new DirectionalLight(0xffffff, 1);
      light.position.set(1, 1, 1);
      this.lights.directional = light;
      this.scene.add(this.lights.directional);
    }
  }
};
