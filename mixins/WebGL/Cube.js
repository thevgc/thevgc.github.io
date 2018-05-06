import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
} from "three";
import { Shaders } from "@/helpers/Shaders";
export default {
  data() {
    return {
      box: {
        geometry: null,
        material: null,
        mesh: null
      }
    };
  },
  mounted() {
    this.setupBox();
  },
  methods: {
    setupBox() {
      this.box.geometry = new BoxGeometry(100, 100, 100);
      this.box.material = new MeshBasicMaterial({ color: 0xffffff });
      this.box.mesh = new Mesh(this.box.geometry, this.box.material);
      this.camera.position.z = 300;
      this.box.geometry.name = "Cube Geometry";
      this.box.material.name = "Cube Material";
      this.box.mesh.name = "Cube Mesh";

      this.scene.add(this.box.mesh);
      console.log("Box Added");
    }
  }
};
