'use strict';

module.exports = (function() {
    if(document) {
        var c = document.createElement('canvas');
        try {
            return !!window.WebGLRenderingContext && (!!c.getContext('experimental-webgl') || !!c.getContext('webgl'));
        } catch (e) {
            return null;
        }
        
    } else {
        return true;
    }
}());