'use strict'

export const PI2 = Math.PI * 2.0;

export function sign (n) {
	return (n > 0 ? 1 : n < 0 ? -1 : 0);
}

export function roundFrac(n, places) {
	const d = Math.pow(10, places);
	return Math.round((n + 0.000000001) * d) / d;
}

export function clamp (n, min, max) {
	return Math.min(Math.max(n, min), max);
}

/**  Always positive modulus */
export function pmod (n, m) {
	return ((n % m + m) % m);
}

/** A random number from -1.0 to 1.0 */
export function nrand() {
	return Math.random() * 2.0 - 1.0;
}

export function angle (x, y) {
	return pmod(Math.atan2(y, x), PI2);
}

export function difAngle (a0, a1) {
	const r = pmod(a1, PI2) - pmod(a0, PI2);
	return Math.abs(r) < Math.PI ? r : r - PI2 * sign(r);
}

export function dot (x0, y0, x1, y1) {
	return (x0 * x1 + y0 * y1);
}
