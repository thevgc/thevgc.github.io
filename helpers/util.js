'use strict'

export function $e (id) {
	return document.getElementById(id);
}

export function $i (id) {
	return document.getElementById(id);
}

export function detectWebGL() {
	try {
		const canvas = document.createElement('canvas')
		return (
			!!canvas.getContext('webgl') || !!canvas.getContext('experimental-webgl')
		)
	}
	catch (e) {
		return null;
	}
}
