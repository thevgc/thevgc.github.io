'use strict';

import {
  nrand
} from '@/helpers/gmath';
import {
  Vec2,
  Vec3,
  Color
} from '@/helpers/vec';
import {
  simplex
} from '@/helpers/simplex';
import * as bufferset from './bufferset';
import * as THREE from 'three';
const BLADE_SEGS = 4; // # of blade segments
const BLADE_VERTS = (BLADE_SEGS + 1) * 2; // # of vertices per blade (1 side)
const BLADE_INDICES = BLADE_SEGS * 12;
const BLADE_WIDTH = 0.15;
const BLADE_HEIGHT_MIN = 2.25;
const BLADE_HEIGHT_MAX = 3.0;

/**
 * Creates a patch of grass mesh.
 */
export function createMesh(opts) {
  // Buffers to use for instances of blade mesh
  const buffers = {
    // Tells the shader which vertex of the blade its working on.
    // Rather than supplying positions, they are computed from this vindex.
    vindex: new Float32Array(BLADE_VERTS * 2 * 1),
    // Shape properties of all blades
    shape: new Float32Array(4 * opts.numBlades),
    // Positon & rotation of all blades
    offset: new Float32Array(4 * opts.numBlades),
    // Indices for a blade
    index: new Uint16Array(BLADE_INDICES)
  };

  initBladeIndices(buffers.index, 0, BLADE_VERTS, 0);
  initBladeOffsetVerts(buffers.offset, opts.numBlades, opts.radius);
  initBladeShapeVerts(buffers.shape, opts.numBlades, buffers.offset);
  initBladeIndexVerts(buffers.vindex);

  const geo = new THREE.InstancedBufferGeometry();
  // Because there are no position vertices, we must create our own bounding sphere.
  // (Not used because we disable frustum culling)
  geo.boundingSphere = new THREE.Sphere(
    new THREE.Vector3(0, 0, 0), Math.sqrt(opts.radius * opts.radius * 2.0) * 10000.0
  );
  geo.addAttribute('vindex', new THREE.BufferAttribute(buffers.vindex, 1));
  geo.addAttribute('shape', new THREE.InstancedBufferAttribute(buffers.shape, 4));
  geo.addAttribute('offset', new THREE.InstancedBufferAttribute(buffers.offset, 4));
  geo.setIndex(new THREE.BufferAttribute(buffers.index, 1));

  const tex = opts.texture;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  const htex = opts.heightMap;
  htex.wrapS = htex.wrapT = THREE.RepeatWrapping;
  const hscale = opts.heightMapScale;

  const lightDir = Vec3.clone(opts.lightDir);
  lightDir.z *= 0.5;
  Vec3.normalize(lightDir, lightDir);

  // Fill in some constants that never change between draw calls
  const vertScript = opts.vertScript.replace(
    '%%BLADE_HEIGHT_TALL%%', (BLADE_HEIGHT_MAX * 1.5).toFixed(1)
  ).replace(
    '%%BLADE_SEGS%%', BLADE_SEGS.toFixed(1)
  ).replace(
    '%%PATCH_SIZE%%', (opts.radius * 2.0).toFixed(1)
  ).replace(
    '%%TRANSITION_LOW%%', opts.transitionLow.toString()
  ).replace(
    '%%TRANSITION_HIGH%%', opts.transitionHigh.toString()
  );

  // Setup shader
  const mat = new THREE.RawShaderMaterial({
    uniforms: {
      lightDir: {
        type: '3f',
        value: Vec3.toArray(lightDir)
      },
      time: {
        type: 'f',
        value: 0.0
      },
      map: {
        type: 't',
        value: tex
      },
      heightMap: {
        type: 't',
        value: htex
      },
      heightMapScale: {
        type: '3f',
        value: [hscale.x, hscale.y, hscale.z]
      },
      camDir: {
        type: '3f',
        value: [1.0, 0.0, 0.0]
      },
      drawPos: {
        type: '2f',
        value: [100.0, 0.0]
      },
      fogColor: {
        type: '3f',
        value: Color.toArray(opts.fogColor)
      },
      fogNear: {
        type: 'f',
        value: 1.0
      },
      fogFar: {
        type: 'f',
        value: opts.fogFar
      },
      grassColor: {
        type: '3f',
        value: Color.toArray(opts.grassColor)
      },
      grassFogFar: {
        type: 'f',
        value: opts.grassFogFar
      },
      windIntensity: {
        type: 'f',
        value: opts.windIntensity
      }
    },
    vertexShader: vertScript,
    fragmentShader: opts.fragScript,
    transparent: true
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false; // always draw, never cull
  return mesh;
}

/**
 * Sets up indices for single blade mesh.
 * @param id array of indices
 * @param vc1 vertex start offset for front side of blade
 * @param vc2 vertex start offset for back side of blade
 * @param i index offset
 */
function initBladeIndices(id, vc1, vc2, i) {
  let seg;
  // blade front side
  for (seg = 0; seg < BLADE_SEGS; ++seg) {
    id[i++] = vc1 + 0; // tri 1
    id[i++] = vc1 + 1;
    id[i++] = vc1 + 2;
    id[i++] = vc1 + 2; // tri 2
    id[i++] = vc1 + 1;
    id[i++] = vc1 + 3;
    vc1 += 2;
  }
  // blade back side
  for (seg = 0; seg < BLADE_SEGS; ++seg) {
    id[i++] = vc2 + 2; // tri 1
    id[i++] = vc2 + 1;
    id[i++] = vc2 + 0;
    id[i++] = vc2 + 3; // tri 2
    id[i++] = vc2 + 1;
    id[i++] = vc2 + 2;
    vc2 += 2;
  }
}

/** Set up shape variations for each blade of grass */
function initBladeShapeVerts(shape, numBlades, offset) {
  let noise = 0;
  for (let i = 0; i < numBlades; ++i) {
    noise = Math.abs(simplex(offset[i * 4 + 0] * 0.03, offset[i * 4 + 1] * 0.03));
    noise = noise * noise * noise;
    noise *= 5.0;
    shape[i * 4 + 0] = BLADE_WIDTH + Math.random() * BLADE_WIDTH * 0.5; // width
    shape[i * 4 + 1] = BLADE_HEIGHT_MIN + Math.pow(Math.random(), 4.0) * (BLADE_HEIGHT_MAX - BLADE_HEIGHT_MIN) + // height
      noise;
    shape[i * 4 + 2] = 0.0 + Math.random() * 0.3; // lean
    shape[i * 4 + 3] = 0.05 + Math.random() * 0.3; // curve
  }
}

/** Set up positons & rotation for each blade of grass */
function initBladeOffsetVerts(offset, numBlades, patchRadius) {
  for (let i = 0; i < numBlades; ++i) {
    offset[i * 4 + 0] = nrand() * patchRadius; // x
    offset[i * 4 + 1] = nrand() * patchRadius; // y
    offset[i * 4 + 2] = 0.0; // z
    offset[i * 4 + 3] = Math.PI * 2.0 * Math.random(); // rot
  }
}

/** Set up indices for 1 blade */
function initBladeIndexVerts(vindex) {
  for (let i = 0; i < vindex.length; ++i) {
    vindex[i] = i;
  }
}

/**
 * Call each frame to animate grass blades.
 * @param mesh The patch of grass mesh returned from createMesh
 * @param time Time in seconds
 * @param x X coordinate of centre position to draw at
 * @param y Y coord
 */
export function update(
  mesh, time,
  camPos, camDir, drawPos
) {
  const mat = mesh.material;
  mat.uniforms.time.value = time;
  let p = mat.uniforms.camDir.value;
  p[0] = camDir.x;
  p[1] = camDir.y;
  p[2] = camDir.z;
  p = mat.uniforms.drawPos.value;
  p[0] = drawPos.x;
  p[1] = drawPos.y;
}
