'use strict'

import {
  Color,
  Fog,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  WebGLRenderer
} from 'three';

const FOG_COLOR = new Color(0.74, 0.77, 0.91);
const GRASS_COLOR = new Color(0.45, 0.46, 0.19);
let grassPatchRadius = 20;
const fogDist = grassPatchRadius * 20.0;
const grassFogDist = grassPatchRadius * 2.0;

export const state = () => ({
  renderer: null,
  camera: null,
  scene: null,
  textures: [],
  loaders: {
    texture: new TextureLoader()
  }
});

export const mutations = {
  animate(state) {
    state.renderer.render(state.scene, state.camera);
  },
  createCamera(state, opts) {
    state.camera = new PerspectiveCamera(opts);
  },
  createRenderer(state, opts) {
    if (typeof opts === 'object') {
      state.renderer = new WebGLRenderer(opts);
    } else {
      state.renderer = new WebGLRenderer();
    }
  },
  rendererSetSize(state, d) {
    console.log(d.x, d.y)
    state.renderer.setSize(d.x, d.y);
    state.renderer.setPixelRatio(d.x / d.y);
  },
  createScene(state) {
    let scene = new Scene();
    scene.fog = new Fog(FOG_COLOR, 0.1, fogDist);
    state.scene = scene;
  },
  addMeshToScene(state, mesh) {
    state.scene.add(mesh);
  }

}

export const actions = {
  createRenderer({
    commit
  }, opts) {
    commit("createRenderer", opts);
  }
};

