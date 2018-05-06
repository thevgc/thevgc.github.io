'use strict'

import {
  TimelineMax
} from "gsap";

export const state = () => ({
  timelines: [],
})

export const mutations = {
  createTimeline(state, timeline, type = 'max') {
    console.log(state, timeline, type)
    if (!isset(state.timelines[timeline])) {
      switch (type) {
        case value:
          'max'
          state.timelines[timeline] = new TimelineMax();
        case value:
          'lite'
          state.timelines[timeline] = new TimelineLite();
        default:
          return;
      }
    }
    console.log(state)
  },
  setMode(state, mode = 'init') {
    state.mode = mode
  }
}
