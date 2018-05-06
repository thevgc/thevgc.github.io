<template>
    <div id="webgl">
        <slot></slot>
        <div ref="container"></div>
    </div>
</template>
<script>
import { TimelineMax } from 'gsap'
import SkyBox from '@/mixins/SkyBox'
import WebGLData from '@/mixins/WebGLData'
import WebGLMethods from '@/mixins/WebGLMethods'
import WebGLMounted from '@/mixins/WebGLMounted'
import WebGLProps from '@/mixins/WebGLProps'
import { Shaders, SkyShader } from "@/helpers/Shaders";
import {
    AmbientLight,
    Color,
    DirectionalLight,
    Mesh,
    MeshPhongMaterial,
    ShaderMaterial,
    SphereGeometry,
    TextureLoader,
    UniformsUtils,
    LineBasicMaterial,
    Geometry,
    Vector3,
    Line
} from 'three'
export default {
    name: 'webgl',
    mixins: [SkyBox, WebGLData, WebGLProps, WebGLMethods, WebGLMounted],
    data () {
        return {
        }
    },
    watch: {

    },
    mounted () {
        // var material = new LineBasicMaterial( { color: 0xffffff } );
        // var geometry = new Geometry();
        // geometry.vertices.push(new Vector3( -10, 0, 0) );
        // geometry.vertices.push(new Vector3( 0, 10, 0) );
        // geometry.vertices.push(new Vector3( 10, 0, 0) );
        // var line = new Line( geometry, material );
        // this.scene.add(line)
        // let light = new DirectionalLight( 0xdfebff, 1 );
        // light.position.set( 50, window.innerHeight, window.innerHeight );
        // light.position.multiplyScalar( 2 );
        // light.castShadow = true;
        // light.shadow.mapSize.width = 1024;
        // light.shadow.mapSize.height = 1024;
        // var d = 750;
        // light.shadow.camera.left = - d;
        // light.shadow.camera.right = d;
        // light.shadow.camera.top = d;
        // light.shadow.camera.bottom = - d;
        // light.shadow.camera.far = 2;
        // this.scene.add( light );
        this.addAmbient(0xeef0ff)
        var light = new DirectionalLight( 0xffffff, 1 );
        light.position.set( 1, 1, 1 );
        this.scene.add( light );        // this.createGlobe();
        // setTimeout(() => {
        //     this.addAmbient(0x666666)
        // }, 100);
        // this.createField()
        this.setupControls()
    },
    methods: {
        addAmbient(color) {
            this.scene.add(new AmbientLight(color));
        }
    }
}
</script>
