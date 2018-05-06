'use strict';

export default {
    props: {
        background: {
            type: Number,
            default () {
                return 0x007CBA;
            }
        },
        cameraOptions: {
            type: Object,
            default: () => {
                return {
                    constructor: {
                        fov: 35,
                        near: 1,
                        far: 25000
                    },
                    clearColor: 0x000000,
                };
            }
        },
        rendererOptions: {
            type: Object,
            default: () => {
                return {
                    constructor: {
                        antialias: true
                    },
                    clearColor: 0x000000,
                };
            }
        }
    }
};