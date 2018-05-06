"use strict";
import { Vector3 } from "three";
export default {
  data() {
    return {
      camera: null, // Instance of THREE.PerspectiveCamera()
      cameras: null, // Instance of THREE.PerspectiveCamera()
      container: null, // WebGL Container (this.$refs.container)
      renderer: null, // Instance of THREE.WebGLRenderer()
      scene: null, // Instance of THREE.Scene()
      dimensions: {
        x: null,
        y: null
      },
      earth: null,
      loaders: {},
      clock: null,
      lines: {},
      directional: null,
      meshMirror: null,
      pitch: {
        dimensions: {
          width: 540,
          length: 740,
          box: {
            width: 300,
            length: 160
          },
          penalty: 120,
          dot: 4,
          line: 2,
          padding: 60
        },
        materials: {}
      },
      geometries: [],
      lineGroup: null,
      light: {
        object: null,
        options: {
          speed: 0.1,
          distance: 1000,
          position: new Vector3(0, 0, 0),
          orbit: function(center, time) {
            this.position.x =
              (center.x + this.distance) * Math.sin(time * -this.speed);

            this.position.z =
              (center.z + this.distance) * Math.cos(time * this.speed);
          }
        }
      }
    };
  }
};
