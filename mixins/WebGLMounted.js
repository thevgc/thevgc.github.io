"use strict";
import { Clock, Geometry, Light, LineBasicMaterial } from "three";
export default {
  mounted() {
    // this.setDimensions();
    // this.initStage();
    // this.animate();
    this.setDimensions();
    this.initStage();
    this.light.object = new Light();
    this.animate();
    this.pitch.materials.lineBasic = new LineBasicMaterial({
      color: 0xffffff,
      linewidth: 100
    });
    // this.geometries.pitchLines = new Geometry();
    // this.createOutline();
    // this.createCenterLine();
    // this.createDots();
    // this.createBoxes();
    this.createTexture();
    // this.showLines();
    // this.createGlobe();
    // this.createEarthAtmosphere();
    // this.createText();
    // this.createSkyBox();
    // this.createMoon();
    // this.createSky();
    window.addEventListener("resize", this.onWindowResize, false);
  }
};
