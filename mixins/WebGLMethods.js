"use strict";

import {
  AdditiveBlending,
  BackSide,
  CircleGeometry,
  Color,
  CubeGeometry,
  DirectionalLight,
  Fog,
  FrontSide,
  Geometry,
  Light,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  NormalBlending,
  Object3D,
  PerspectiveCamera,
  PlaneBufferGeometry,
  PlaneGeometry,
  RepeatWrapping,
  Scene,
  ShaderLib,
  ShaderMaterial,
  SphereGeometry,
  TextureLoader,
  UniformsUtils,
  Vector3,
  WebGLRenderer
} from "three";

import { Shaders } from "@/helpers/Shaders";
import * as THREE from "three";

let OrbitControls = require("three-orbit-controls")(THREE);
let parameters = {
  rotX: 34, //don't touch - defines rotation of star container to skybox!
  rotY: 32, //don't touch - defines rotation of star container to skybox!
  rotZ: 60, //don't touch - defines rotation of star container to skybox!
  lightDirX: 100,
  lightDirY: 800,
  lightDirZ: 800,

  moonLightDirX: 5000,
  moonLightDirY: 5000,
  moonLightDirZ: 100,

  rotXFloor: 270, //defines rotation of floor to sphereContainer
  rotYFloor: 0, //defines rotation of floor to sphereContainer
  rotZFloor: 0, //defines rotation of floor to sphereContainer
  floorOffset: -10, //defines offset of floor to sphereContainer
  cameraContainerRotX: 0, //defines default rotation of camera
  cameraContainerRotY: 160, //defines default rotation of camera - linked to compass direction
  cameraContainerRotZ: 0, //defines default rotation of camera
  cameraOffset: 0, //set to 0 to hide water, set to 1 to show
  sphereRotX: 0, //defines default rotation of sphere used to point to north and south celestial poles
  sphereRotY: 0, //defines default rotation of sphere used to point to north and south celestial poles - if the camera is added to `sphere` and the Y axis is rotated around the sky will appear to rotate around the north / south points
  sphereRotZ: 0, //defines default rotation of sphere used to point to north and south celestial poles
  sphere2RotX: 0, //defines default rotation of sphere used to point to north and south celestial poles
  sphere2RotY: 0, //defines default rotation of sphere used to point to north and south celestial poles
  sphere2RotZ: 0, //defines default rotation of sphere used to point to north and south celestial poles
  sphereContainerRotX: 0, //defines default rotation of sphereContainer. Controls global orientation of camera
  sphereContainerRotY: 0, //defines default rotation of sphereContainer. Controls global orientation of camera
  sphereContainerRotZ: 0, //defines default rotation of sphereContainer. Controls global orientation of camera

  skyboxContainerRotX: 0,
  skyboxContainerRotY: 0, //adjust Y value to rotate sky around fixed point - linked to time of day
  skyboxContainerRotZ: 0,

  skyboxContainer2RotX: 235, //ajust X value to rotate sky into position according to lat
  skyboxContainer2RotY: 0,
  skyboxContainer2RotZ: 175, //ajust X value to rotate sky into position according to long

  skyboxRotX: 54,
  skyboxRotY: 326,
  skyboxRotZ: 347
};

export default {
  methods: {
    // Store our window dimensions
    setDimensions() {
      let x = window.innerWidth,
          y = window.innerHeight;
      this.dimensions = {
        x: x,
        y: y
      };
    },
    createSky() {

    },
    createMoon() {
      // Add light
      var directionalLight = new DirectionalLight(0xffff55, 0.1);
      directionalLight.position.set(
        parameters.lightDirX,
        parameters.lightDirY,
        parameters.lightDirZ
      );
      let createGround = () => {
        var geometry = new PlaneGeometry(2000, 2000, 15, 15);
        var material = new MeshBasicMaterial({
          color: 0x181818,
          side: FrontSide
        });
        return new Mesh(geometry, material);

      }
      let sphereContainer = new Object3D(),
          geometry = new SphereGeometry(5, 32, 32),
          sphere = new Object3D(),
          sphere2 = new Object3D(),
          moonMaterial = new MeshBasicMaterial({
            color: 0xffffff,
            wireframe: false,
            opacity: 1,
            transparent: false /*, map: moonTexture*/
          }),
          moonLightDebugSphere = new Mesh(geometry, moonMaterial);

      moonLightDebugSphere.position.set(
        parameters.moonLightDirX,
        parameters.moonLightDirY,
        parameters.moonLightDirZ
      );

      let lightDirDebugSphere = new THREE.Mesh(geometry, moonMaterial);

      lightDirDebugSphere.position.set(
        parameters.lightDirX,
        parameters.lightDirY,
        parameters.lightDirZ
      );

      lightDirDebugSphere.rotation.set(0, 180, 0);
      lightDirDebugSphere.scale.set(15, 15, 15);

      this.scene.add(lightDirDebugSphere);

      sphereContainer.add(sphere);
      let aMeshMirror = createGround();
      aMeshMirror.position.z = -2
      this.scene.add(aMeshMirror); //reflections don't work correctly unless aMeshMirror added to scene
      // this.scene.add(cameraContainer);
      aMeshMirror.add(directionalLight); //reflections don't work correctly unless light added to scene
    },
    drawLine(geometry, points, thickness) {
      let geo = new Geometry();
      for (let i = 0; i < points.length; i++) {
        geometry.vertices.push(points[i]);
      }
      let mesh = new Mesh(geo);
      mesh.updateMatrix();
      geometry.merge(geo, mesh.matrix);

      // for (let i = 0; i < thickness * 2; i++) {
      //   // multiplied it by 2 to be more granule pixels
      //   var routerLine1Geometry = new Geometry();
      //   routerLine1Geometry.vertices.push(new Vector3(x1, y1 + i / 4, z1)); //divided it by 4 to be more granule pixels

      //   routerLine1Geometry.vertices.push(new Vector3(x2, y2 + i / 4, z2));
      //   var routerLine1 = new Line(routerLine1Geometry, lineMaterial);
      //   geometry.vertices.push(routerLine1.position);
      // }
      // for (let i = 0; i < thickness * 2; i++) {
      //   var routerLine1Geometry = new Geometry();
      //   routerLine1Geometry.vertices.push(new Vector3(x1, y1 - i / 4, z1)); //
      //   routerLine1Geometry.vertices.push(new Vector3(x2, y2 - i / 4, z2));
      //   var routerLine1 = new Line(routerLine1Geometry, lineMaterial);
      //   geometry.vertices.push(routerLine1.position);
      // }
    },
    createOutline(cb) {
      let lines = new Geometry();
      let points = [
        new Vector3(
          -this.pitch.dimensions.width / 2,
          -this.pitch.dimensions.length / 2,
          0
        ),
        new Vector3(
          -this.pitch.dimensions.width / 2,
          this.pitch.dimensions.length / 2,
          0
        ),
        new Vector3(
          this.pitch.dimensions.width / 2,
          this.pitch.dimensions.length / 2,
          0
        ),
        new Vector3(
          this.pitch.dimensions.width / 2,
          -this.pitch.dimensions.length / 2,
          0
        ),
        new Vector3(
          -this.pitch.dimensions.width / 2,
          -this.pitch.dimensions.length / 2,
          0
        )
      ];
      this.drawLine(lines, points, 5);
      let outlineGeometry = lines;
      let mesh = new Mesh(lines);
      mesh.updateMatrix();
      this.geometries.pitchLines.merge(lines, mesh.matrix);
      if (cb) {
        cb();
      }
    },
    createEarthAtmosphere() {
      // let material = new ShaderMaterial({
      //   ...Shaders.atmosphere,
      //   side: BackSide,
      //   blending: AdditiveBlending,
      //   transparent: true
      // });
      // let mesh = new Mesh(this.geometries.sphere, material);
      // mesh.scale.set(1.1, 1.1, 1.1);
      // mesh.position.z = 60.01;
      // this.scene.add(mesh);
    },
    createSkyBox(cb) {
      let size = 10000;

      let cubemap = ShaderLib.cube;
      this.starfield.forEach(side => {
        let texture = this.loaders.image.load(side);
        this.starTextures.push(texture);
      });
      // for (let i = 0; i < this.starfield.length; i++) {
      //   // geometry.vertices.push(points[i]);
      // }
      cubemap.uniforms.tCube.value = this.starTextures;

      var mat = new ShaderMaterial({
        fragmentShader: cubemap.fragmentShader,

        vertexShader: cubemap.vertexShader,

        uniforms: cubemap.uniforms,

        depthWrite: true,

        side: BackSide
      });

      var geo = new CubeGeometry(size, size, size);

      var mesh = new Mesh(geo, mat);

      this.scene.add(mesh);

      if (cb) {
        cb();
      }
      // return mesh;
    },
    createCenterLine(cb) {
      let lines = new Geometry(),
        points = [
          new Vector3(-this.pitch.dimensions.width / 2, 0, 0),
          new Vector3(this.pitch.dimensions.width / 2, 0, 0)
        ],
        mesh;
      this.drawLine(lines, points, 5);

      mesh = new Mesh(lines);
      mesh.updateMatrix();
      // Merge center line with other pitch lines
      this.geometries.pitchLines.merge(lines, mesh.matrix);

      // If a callback has been passed, run it.
      if (cb) {
        cb();
      }
    },
    showLines() {
      let lines = new Line(
        this.geometries.pitchLines,
        this.pitch.materials.lineBasic
      );
      this.scene.add(lines);
    },
    createBox(points) {
      let geometry = new Geometry();
      let box = new Line(geometry, this.pitch.materials.lineBasic);
      this.drawLine(geometry, points, 5);
      let mesh = new Mesh(geometry);
      mesh.updateMatrix();
      this.scene.add(box);
    },
    createBoxes(cb) {
      let points = {
        home: [
          new Vector3(
            -this.pitch.dimensions.box.width / 2,
            this.pitch.dimensions.length / 2,
            0
          ),
          new Vector3(
            -this.pitch.dimensions.box.width / 2,
            this.pitch.dimensions.length / 2 - this.pitch.dimensions.box.length,
            0
          ),
          new Vector3(
            this.pitch.dimensions.box.width / 2,
            this.pitch.dimensions.length / 2 - this.pitch.dimensions.box.length,
            0
          ),
          new Vector3(
            this.pitch.dimensions.box.width / 2,
            this.pitch.dimensions.length / 2,
            0
          )
        ],
        away: [
          new Vector3(
            -this.pitch.dimensions.box.width / 2,
            -this.pitch.dimensions.length / 2,
            0
          ),
          new Vector3(
            -this.pitch.dimensions.box.width / 2,
            -this.pitch.dimensions.length / 2 +
              this.pitch.dimensions.box.length,
            0
          ),
          new Vector3(
            this.pitch.dimensions.box.width / 2,
            -this.pitch.dimensions.length / 2 +
              this.pitch.dimensions.box.length,
            0
          ),
          new Vector3(
            this.pitch.dimensions.box.width / 2,
            -this.pitch.dimensions.length / 2,
            0
          )
        ]
      };

      let lines = new Geometry(),
        mesh;

      for (var k in points) {
        if (points.hasOwnProperty(k)) {
          this.createBox(points[k]);
        }
      }
      if (cb) {
        cb();
      }
    },
    createDots(cb) {
      let dots = [
        0,
        -this.pitch.dimensions.length / 2 + this.pitch.dimensions.penalty,
        this.pitch.dimensions.length / 2 - this.pitch.dimensions.penalty
      ];
      let geometry = new CircleGeometry(this.pitch.dimensions.dot, 32);
      var material = new MeshBasicMaterial({ color: 0xffffff });
      for (var k in dots) {
        if (dots.hasOwnProperty(k)) {
          var sphere = new Mesh(geometry, material);
          sphere.position.y = dots[k];
          this.scene.add(sphere);
        }
      }
      if (cb) {
        cb();
      }
    },
    createLines() {
      let lines = new Line(
        this.geometries.pitchLines,
        this.pitch.materials.lineBasic
      );
      lines.position.x = -this.pitch.dimensions.width / 2;
      lines.position.y = -this.pitch.dimensions.length / 2;
      this.scene.add(lines);
    },
    createTexture() {
      let loader = new TextureLoader();
      let texture = loader.load("/images/terrain/grasslight-big.jpg");
      let maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();
      let material = new MeshPhongMaterial({ color: 0xffffff, map: texture });

      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.repeat.set(
        -this.pitch.dimensions.width / 80,
        -this.pitch.dimensions.width / 80
      );
      texture.anisotropy = maxAnisotropy;
      let mesh = new Mesh(
        new PlaneBufferGeometry(
          this.pitch.dimensions.width + this.pitch.dimensions.padding,
          this.pitch.dimensions.length + this.pitch.dimensions.padding
        ),
        material
      );
      mesh.position.z = -1;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
    },
    createPitch() {
      return true;
    },
    onWindowResize() {
      this.setDimensions();
      this.camera.aspect = this.dimensions.x / this.dimensions.y;
      this.camera.updateProjectionMatrix();
      // this.camera.position.set(
      //     Math.max(this.dimensions.x, this.dimensions.y) * 1.5,
      //     Math.min(this.dimensions.x, this.dimensions.y) / 1.5,
      //     Math.min(this.dimensions.x, this.dimensions.y) * 2
      // );
      // this.camera.rotation.set();
      // this.camera.lookAt(new Vector3(0, 0, 0));
      // this.camera.position.y = Math.min(this.dimensions.x, this.dimensions.y);
      // this.camera.position.x = Math.min(this.dimensions.x, this.dimensions.y);
      this.renderer.setSize(this.dimensions.x, this.dimensions.y);
    },
    initStage() {
      // this.setupCameras();
      this.setupCamera();
      this.setupScene();
      this.setupRenderer(this.scene, this.camera);
      this.attachRenderer(this.$refs.container, this.renderer.domElement);
    },
    createField() {
      let dimensions = {
        width: window.innerWidth,
        height: window.innerWidth / 27 * 37
      };
      this.loaders.image = this.loaders.image
        ? this.loaders.image
        : new TextureLoader();
      // ground
      let texture = this.loaders.image.load(
        "/images/terrain/grasslight-big.jpg"
      );
      let maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();
      var material = new MeshPhongMaterial({ color: 0xffffff, map: texture });

      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.repeat.set(36, 36);
      texture.anisotropy = maxAnisotropy;
      let mesh = new Mesh(new PlaneBufferGeometry(2000, 2000), material);
      // mesh.position.y = 0;
      // mesh.rotation.x = 0;
      // mesh.rotation.z = 0;
      //mesh.rotation.x = -Math.PI / 2;
      mesh.receiveShadow = true;
      // this.scene.add(mesh);

      // let lmaterial = new LineBasicMaterial({ color: 0x007cba });
      // let geometry = new Geometry();
      // geometry.vertices.push(new THREE.Vector3(- dimensions.height / 2, - dimensions.width / 2, 0));
      // geometry.vertices.push(new THREE.Vector3(- dimensions.height / 2, dimensions.width / 2, 0));
      // geometry.vertices.push(new THREE.Vector3(dimensions.height / 2, dimensions.width / 2, 0));
      // geometry.vertices.push(new THREE.Vector3(dimensions.height / 2, - dimensions.width / 2, 0));
      // geometry.vertices.push(new THREE.Vector3(- dimensions.height / 2, - dimensions.width / 2, 0));
      // geometry.vertices.push(new THREE.Vector3(0, - dimensions.width / 2, 0));
      // geometry.vertices.push(new THREE.Vector3(0, dimensions.width / 2, 0));
      // let line = new THREE.Line(geometry, lmaterial);
      // this.scene.add(line);
    },
    createEarthMesh(urls) {
      if (!urls.earth) throw "No image URL provided for an earth image";
      this.loaders.image = this.loaders.image
        ? this.loaders.image
        : new TextureLoader();
      let shader = Shaders.earth;
      let uniforms = UniformsUtils.clone(shader.uniforms);

      uniforms.texture.value = this.loaders.image.load(urls.earth);
      let material = new ShaderMaterial({
        uniforms: uniforms,
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader
      });

      let mesh = new Mesh(this.geometries.sphere, material);
      mesh.rotation.y = Math.PI;
      var earthMaterial = new MeshPhongMaterial();
      earthMaterial.map = this.loaders.image.load(urls.earth);

      if (urls.bump) {
        earthMaterial.bump = this.loaders.image.load(urls.bump);
        earthMaterial.bumpScale = 0.02;
      }

      if (urls.specular) {
        earthMaterial.specularMap = this.loaders.image.load(urls.specular);
        earthMaterial.specular = new Color("grey");
      }
      return new Mesh(this.geometries.sphere, earthMaterial);
      // return mesh
    },
    createSphere() {
      this.geometries.sphere = new SphereGeometry(50, 64, 64);
    },
    createText() {
      var loader = new THREE.FontLoader();
      loader.load("/fonts/Narkisim_Regular.json", font => {
        var xMid, text;

        var textShape = new THREE.BufferGeometry();

        var color = 0xffffff;

        var matDark = new THREE.LineBasicMaterial({
          color: color,
          side: THREE.DoubleSide
        });

        var matLite = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.8,
          side: THREE.DoubleSide
        });

        var message = "The VGC";

        var shapes = font.generateShapes(message, 70, 0);

        var geometry = new THREE.ShapeGeometry(shapes);

        geometry.computeBoundingBox();

        xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

        geometry.translate(xMid, 0, 0);

        // make shape ( N.B. edge view not visible )

        textShape.fromGeometry(geometry);

        text = new THREE.Mesh(textShape, matLite);
        text.position.z = 50;
        text.position.y = 2;
        text.rotation.x = Math.PI / 2;
        // text.rotation.set(new Vector3(0.5,0.6,0.5));
        this.scene.add(text);

        // make line shape ( N.B. edge view remains visible )

        var holeShapes = [];

        for (var i = 0; i < shapes.length; i++) {
          var shape = shapes[i];

          if (shape.holes && shape.holes.length > 0) {
            for (var j = 0; j < shape.holes.length; j++) {
              var hole = shape.holes[j];
              holeShapes.push(hole);
            }
          }
        }

        shapes.push.apply(shapes, holeShapes);

        var lineText = new THREE.Object3D();

        for (var i = 0; i < shapes.length; i++) {
          var shape = shapes[i];

          var points = shape.getPoints();
          var geometry = new THREE.BufferGeometry().setFromPoints(points);

          geometry.translate(xMid, 0, 0);

          var lineMesh = new THREE.Line(geometry, matDark);
          lineText.add(lineMesh);
        }
        lineText.rotation.x = Math.PI / 2;
        lineText.position.y = -2;
        lineText.position.z = 50;

        this.scene.add(lineText);
      }); //end load function
    },
    createGlobe() {
      this.createSphere();
      this.earth = this.createEarthMesh({
        earth: "/images/world.jpg",
        specular: "/images/world-color.jpg",
        bump: "/images/bump.jpg"
      });
      // console.log(earth)
      this.earth.position.z = 60;
      // this.earth.position.z = 0;
      console.log(this.earth);
      // Add meshes to scene
      this.scene.add(this.earth);
    },
    createAtmosphere() {},
    animate() {
      requestAnimationFrame(this.animate);
      // console.log(this.earth)
      if (this.earth) {
        this.light.options.orbit(
          this.earth.position,
          this.clock.getElapsedTime()
        );
        this.earth.rotation.z += 0.015;
      }
      // if (this.earth && parseFloat(this.earth.rotation.y) % 2 === 0) {
      //   this.scene.remove(this.earth);
      // }
      // if (this.earth && parseFloat(this.earth.rotation.y) % 2 !== 0) {
      //   this.scene.add(this.earth);
      // }
      this.renderer.render(this.scene, this.camera);
    },
    setupScene() {
      try {
        let scene = new Scene();
        // scene.background = new Color(this.$props.background);
        scene.background = new Color(0xf2f7ff);
        scene.fog = new Fog(0xf2f7ff, 1, 25000);
        this.scene = scene;
      } catch (e) {
        console.log(e);
      } finally {
        return this.scene;
      }
    },
    setupCamera() {
      try {
        var camera = new PerspectiveCamera(
          this.$props.cameraOptions.fov,
          window.innerWidth / window.innerHeight,
          this.$props.cameraOptions.near,
          this.$props.cameraOptions.far
        );
        camera.position.set(0, 0, 1000);
        camera.rotation.y = 0;
        // camera.lookAt(new Vector3(0, 0, 0));
        this.camera = camera;
      } catch (e) {
        console.log(e);
      } finally {
        return this.camera;
      }
    },
    setupControls() {
      try {
        var controls = new OrbitControls(this.camera);
        controls.target.set(0, 0, 0);
        controls.update();
        this.controls = controls;
      } catch (e) {
        console.log(e);
      } finally {
        return this.controls;
      }
    },
    setupRenderer() {
      try {
        let renderer = new WebGLRenderer({ antialias: false, alpha: false });
        renderer.setSize(this.dimensions.x, this.dimensions.y);
        try {
          renderer.setPixelRatio(window.devicePixelRatio);
        } catch (e) {
          console.log("Could not detect device pixel ratio", e);
        }
        this.renderer = renderer;
      } catch (e) {
        console.log(e);
      } finally {
        return this.renderer;
      }
      // document.body.appendChild(this.renderer.domElement);
    },
    attachRenderer(container, renderer) {
      container.appendChild(renderer);
    }
  }
};
