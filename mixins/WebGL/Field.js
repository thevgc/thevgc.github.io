import {
  BoxBufferGeometry,
  CircleGeometry,
  DoubleSide,
  Geometry,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhongMaterial,
  ParametricGeometry,
  PlaneBufferGeometry,
  RepeatWrapping,
  TextureLoader,
  Vector3
} from "three";
import GrassTufts from 'C:/Users/djalx/Desktop/three_grass_tufts/src/index.js';

export default {
  data() {
    return {
      cloth: {
        material: null,
        texture: null,
        geometries: null,
        mesh: null,
        restDistance: 25,
        xSegs: 10,
        ySegs: 10,
        width: 200,
        height: 200,
        wind: true,
        ball: true,
        geometry: null,
        joins: [],
        pins: []
      },
      pitch: {
        dimensions: {
          width: 640,
          length: 1000,
          box: {
            width: 403,
            length: 165
          },
          goal: {
            width: 73.2,
            height: 24.4
          },
          penalty: 110,
          dot: 2,
          line: 2,
          padding: 200
        },
        materials: {
          lineBasic: null
        }
      },
      field: {
        width: 640,
        height: 1000,
        padding: 200,
        geometries: {
          lines: []
        },
        textures: {
          grass: null,
          line: null
        },
        mesh: null,
        meshes: {
          grass: null
        },
        material: null,
        materials: {
          grass: null,
          line: null
        }
      }
    };
  },
  mounted() {
    this.createGrass();
    this.pitch.materials.lineBasic = new LineBasicMaterial({
      color: 0xffffff,
      linewidth: 100,
      side: DoubleSide
    });
    this.field.geometries.lines = new Geometry();
    // this.createLines();
    // this.createDots();
    this.createPoles();
  },
  methods: {
    createGrass() {
      let loader = new TextureLoader(),
        maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();

      // Load grass texture
      this.field.textures.grass = loader.load(
        "/images/terrain/fp-texture.jpg"
      );

      // Create material with grass texture
      this.field.material = new MeshPhongMaterial({
        color: 0xffffff,
        map: this.field.textures.grass
      });

      this.field.textures.grass.wrapS = this.field.textures.grass.wrapT = RepeatWrapping;

      // this.field.textures.grass.repeat.set(
      //   (this.pitch.dimensions.width + this.pitch.dimensions.padding) / 250,
      //   (this.pitch.dimensions.length + this.pitch.dimensions.padding) / 350
      // );

      this.field.textures.grass.repeat.set(
        1,1
      );

      this.field.textures.grass.anisotropy = 16;
      this.field.mesh = new Mesh(
        new PlaneBufferGeometry(
          this.pitch.dimensions.length,
          this.pitch.dimensions.width
        ),
        this.field.material
      );
      this.field.mesh.position.z = 0;
      // this.field.mesh.rotation.z = 1.65;
      this.field.mesh.receiveShadow = true;
      this.scene.add(this.field.mesh);
      let grassTufts = new GrassTufts();
      let textureLoader = new TextureLoader();
      this.field.textures.grassBlade = loader.load("/images/grass01.png");
      console.log(this.field.textures)
      let tufts = grassTufts.createGrassTufts(this.field.textures.grassBlade);
      this.scene.add(tufts)
    },
    drawLine(geometry, points, thickness) {
      let geo = new Geometry();
      for (let i = 0; i < points.length; i++) {
        geometry.vertices.push(points[i]);
      }
      let mesh = new Mesh(geo);
      mesh.updateMatrix();
      geometry.merge(geo, mesh.matrix);
    },
    showLines() {
      let lines = new Line(
        this.field.geometries.lines,
        this.pitch.materials.lineBasic
      );
      // console.log(lines);
      lines.position.z = 1;
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
    createPoles() {
      // console.log("Create Poles");
      // poles
      var poleGeo = new BoxBufferGeometry(2, 2, 24);
      var poleMat = new MeshLambertMaterial({ color: 0xffffff });
      var mesh = new Mesh(poleGeo, poleMat);
      mesh.position.x = -35;
      mesh.position.y = this.pitch.dimensions.length / 2;
      mesh.position.z = 11;
      // mesh.rotation.x = Math.PI / 2;
      mesh.receiveShadow = true;
      mesh.castShadow = true;
      this.scene.add(mesh);
      var mesh = new Mesh(poleGeo, poleMat);
      mesh.position.x = 35;
      mesh.position.y = this.pitch.dimensions.length / 2;
      mesh.position.z = 11;
      mesh.receiveShadow = true;
      mesh.castShadow = true;
      this.scene.add(mesh);
      var mesh = new Mesh(poleGeo, poleMat);
      mesh.position.x = -35;
      mesh.position.y = -this.pitch.dimensions.length / 2;
      mesh.position.z = 11;
      mesh.receiveShadow = true;
      mesh.castShadow = true;
      // console.log(mesh);
      this.scene.add(mesh);
      var mesh = new Mesh(poleGeo, poleMat);
      mesh.position.x = 35;
      mesh.position.y = -this.pitch.dimensions.length / 2;
      mesh.position.z = 11;
      mesh.receiveShadow = true;
      mesh.castShadow = true;
      this.scene.add(mesh);

      let topBarGeometry = new BoxBufferGeometry(72, 2, 2);
      var mesh = new Mesh(topBarGeometry, poleMat);
      mesh.position.y = this.pitch.dimensions.length / 2;
      mesh.position.z = 24;
      mesh.receiveShadow = true;
      mesh.castShadow = true;
      this.scene.add(mesh);
      var mesh = new Mesh(topBarGeometry, poleMat);
      mesh.position.y = -this.pitch.dimensions.length / 2;
      mesh.position.z = 24;
      mesh.receiveShadow = true;
      mesh.castShadow = true;
      this.scene.add(mesh);
    },
    createDots() {
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
          sphere.position.z = 1;
          this.scene.add(sphere);
        }
      }
    },
    createBoxes() {
      let points = {
        home: [
          new Vector3(
            -this.pitch.dimensions.box.width / 2,
            this.pitch.dimensions.length / 2,
            1
          ),
          new Vector3(
            -this.pitch.dimensions.box.width / 2,
            this.pitch.dimensions.length / 2 - this.pitch.dimensions.box.length,
            1
          ),
          new Vector3(
            this.pitch.dimensions.box.width / 2,
            this.pitch.dimensions.length / 2 - this.pitch.dimensions.box.length,
            1
          ),
          new Vector3(
            this.pitch.dimensions.box.width / 2,
            this.pitch.dimensions.length / 2,
            1
          )
        ],
        away: [
          new Vector3(
            -this.pitch.dimensions.box.width / 2,
            -this.pitch.dimensions.length / 2,
            1
          ),
          new Vector3(
            -this.pitch.dimensions.box.width / 2,
            -this.pitch.dimensions.length / 2 +
              this.pitch.dimensions.box.length,
            1
          ),
          new Vector3(
            this.pitch.dimensions.box.width / 2,
            -this.pitch.dimensions.length / 2 +
              this.pitch.dimensions.box.length,
            1
          ),
          new Vector3(
            this.pitch.dimensions.box.width / 2,
            -this.pitch.dimensions.length / 2,
            1
          )
        ]
      };
      for (var k in points) {
        if (points.hasOwnProperty(k)) {
          this.createBox(points[k]);
        }
      }

      let lines = new Geometry(),
        mesh;
      this.drawLine(lines, points, 5);
      mesh = new Mesh(lines);
      mesh.updateMatrix();
      // Merge center line with other pitch lines
      this.field.geometries.lines.merge(lines, mesh.matrix);
    },
    createLines() {
      this.createOutline();
      this.createCenterLine();
      this.createBoxes();
      this.showLines();
    },
    createCenterLine() {
      let lines = new Geometry(),
        points = [
          new Vector3(-this.field.width / 2, 0, 0),
          new Vector3(this.field.width / 2, 0, 0)
        ],
        mesh;
      this.drawLine(lines, points, 5);

      mesh = new Mesh(lines);
      mesh.updateMatrix();
      // Merge center line with other pitch lines
      this.field.geometries.lines.merge(lines, mesh.matrix);
    },
    createOutline() {
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
      // let outlineGeometry = lines;
      let mesh = new Mesh(lines);
      mesh.updateMatrix();
      this.field.geometries.lines.merge(lines, mesh.matrix);
    }
  }
};
