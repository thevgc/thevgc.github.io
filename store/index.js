'use strict';
export const strict = false;
export const state = () => ({
  mode: "init",
  animation: "loading"
});

export const mutations = {
  setContainer(state, container) {
    state.container = container;
  },
  setAnimation(state, animation = "loading") {
    state.animation = animation;
  },
  setMode(state, mode = "init") {
    state.mode = mode;
  },
  setGlobe(state, globe) {
    state.globe = globe;
  },
  init(state) {
    state.globe.init();
  },
  addBlock(state, pos) {
    state.globe.addBlock(pos);
  },
  addLevitatingBlock(state, data) {
    state.globe.addLevitatingBlock(data);
  },
  center(state, data) {
    state.globe.center(data);
  },
  centerImmediate(state, data) {
    state.globe.centerImmediate(data);
  },
  zoomImmediatelyTo(state, altitude) {
    state.globe.zoomImmediatelyTo(altitude);
  },
  zoomRelative(state, delta) {
    state.globe.zoomRelative(delta);
  },
  zoomTo(state, altitude) {
    state.globe.zoomTo(altitude);
  },
  removeAllBlocks(state) {
    state.globe.removeAllBlocks();
  }
};

export const actions = {
    // nuxtServerInit(state, r) {
    //     state.dispatch("user/setAuthUser", r);
    // }
};
