'use strict';

export const POSITION = 0x01;
export const NORMAL = 0x02;
export const COLOR = 0x04;
export const UV = 0x08;
//export const INDEX    = 0x10
export const ALL = POSITION | NORMAL | COLOR | UV; // | INDEX

/**
 * Creates a buffer set
 * @param numVtx Number of vertices
 * @param numId Number of indices
 * @param b Types of buffers to create (bit flags)
 */
export function create(numVtx, numId, b) {
  b = (typeof b === 'number') ? b & ALL : ALL;
  return {
    position: (b & POSITION) ? new Float32Array(numVtx * 3) : undefined,
    normal: (b & NORMAL) ? new Float32Array(numVtx * 3) : undefined,
    color: (b & COLOR) ? new Float32Array(numVtx * 4) : undefined,
    uv: (b & UV) ? new Float32Array(numVtx * 2) : undefined,
    index: new Uint16Array(numId),
    vertexCount: 0,
    indexCount: 0
  };
}

