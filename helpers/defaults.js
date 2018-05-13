import {
  Color,
  Vector3
} from 'three';
export const defaults = {
  viewDepth: 2000,
  maxTimestep: 67,
  heightfieldSize: 3072,
  heightfieldHeight: 180,
  waterLevel: 55, // heightfieldHeight * 0.305556, // 55.0
  beachTransitionLow: 0.31,
  beachTransitionHigh: 0.36,
  lightDir: new Vector3(0.0, 1.0, -1.0).normalize(),
  fogColor: new Color(0.74, 0.77, 0.91),
  grassColor: new Color(0.45, 0.46, 0.19),
  waterColor: new Color(0.6, 0.7, 0.85),
  windDefault: 1.5,
  windMax: 3.0,
  maxGlare: 0.25, // max glare effect amount
  glareRange: 1.1, // angular range of effect
  glareYaw: Math.PI * 1.5, // yaw angle when looking directly at sun
  glarePitch: 0.2, // pitch angle looking at sun
  glareColor: new Color(1.0, 0.8, 0.4),
  introFadeDur: 2000
};
