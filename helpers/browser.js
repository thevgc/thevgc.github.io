'use strict';

export default {
  isMobile() {
    if (navigator) {
      const a = !!navigator.userAgent.match(/Android/i);
      const bb = !!navigator.userAgent.match(/BlackBerry/i);
      const ios = !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
      const o = !!navigator.userAgent.match(/Opera Mini/i);
      const w = !!navigator.userAgent.match(/IEMobile/i);
      const ff = !!navigator.userAgent.match(/\(Mobile/i);
      const any = (a || bb || ios || o || w || ff);
      return {
        Android: a,
        BlackBerry: bb,
        iOS: ios,
        Opera: o,
        Windows: w,
        FireFox: ff,
        any: any
      };
    }
  },
  isStandalone() {

    // iOS
    if (navigator && navigator.standalone !== undefined)
      return !!navigator.standalone;
    // Windows Mobile
    if (window && window.external && window.external.msIsSiteMode) {
      return !!window.external.msIsSiteMode();
    }
    // Chrome
    if (window && window.matchMedia) {
      return window.matchMedia('(display-mode: standalone)').matches;
    }
  }
};
