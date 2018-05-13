'use strict';

import {
  roundFrac
} from '@/helpers/gmath';

const PRECISION = 5;

/**
 * Fades element from o0 opacity to o1 opacity in dur milliseconds.
 * Invokes complete callback when done.
 */
export function fade(el, o0, o1, dur, complete) {
  const startT = Date.now();
  let prevO = roundFrac(o0, PRECISION).toString();
  el.style.opacity = prevO;

  function fadeLoop() {
    const t = Date.now() - startT;
    if (t >= dur) {
      el.style.opacity = roundFrac(o1, PRECISION).toString();
      if (complete) complete();
    } else {
      // round off so style value isn't too weird
      const o = roundFrac(o0 + t / dur * (o1 - o0), PRECISION).toString();
      if (o !== prevO) {
        // only update style if value has changed
        el.style.opacity = o;
        prevO = o;
      }
      requestAnimationFrame(fadeLoop);
    }
  }
  requestAnimationFrame(fadeLoop);
}

/**
 * Go from 0 opacity to 1 in dur milliseconds.
 * @param el Element to fade
 * @param dur Fade duration in ms
 * @param complete Callback on complete
 */
export function fadeIn(el, dur, complete) {
  fade(el, 0, 1, dur, complete);
}

/**
 * Go from 1 opacity to 0 in dur milliseconds.
 * @param el Element to fade
 * @param dur Fade duration in ms
 * @param complete Callback on complete
 */
export function fadeOut(el, dur, complete) {
  fade(el, 1, 0, dur, complete);
}
