'use strict';
import {
  Vec3,
  Color
} from './vec';
import * as THREE from 'three';

let _time = 0

export function createMesh(opts) {
  opts.envMap.wrapS = opts.envMap.wrapT = THREE.RepeatWrapping
  opts.envMap.minFilter = opts.envMap.magFilter = THREE.LinearFilter
  opts.envMap.generateMipmaps = false
  const mat = new THREE.RawShaderMaterial({
    uniforms: {
      time: {
        type: '1f',
        value: 0.0
      },
      viewPos: {
        type: '3f',
        value: [0.0, 0.0, 10.0]
      },
      map: {
        type: 't',
        value: opts.envMap
      },
      waterLevel: {
        type: '1f',
        value: opts.waterLevel
      },
      waterColor: {
        type: '3f',
        value: Color.toArray(opts.waterColor)
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
        value: opts.fogFar * 1.5
      },
    },
    vertexShader: opts.vertScript,
    fragmentShader: opts.fragScript
  })
  const mesh = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2000.0, 2000.0),
    mat
  )
  mesh.frustumCulled = false
  _time = Date.now()
  return mesh
}

export function update(mesh, viewPos) {
  mesh.position.x = viewPos.x
  mesh.position.y = viewPos.y
  const mat = mesh.material
  const vp = mat.uniforms['viewPos'].value
  vp[0] = viewPos.x
  vp[1] = viewPos.y
  vp[2] = viewPos.z

  mat.uniforms['time'].value = (Date.now() - _time) / 250.0
}
