'use strict';

import {
  BackSide,
  Mesh,
  ShaderMaterial,
  SphereBufferGeometry,
  UniformsUtils,
  Vector3
} from 'three';
//********************************************************************************

// Billboard grass vertex shader

//********************************************************************************

// Texture0 = The texture

// Texture1.r = Dissolve distance value

// Texture1.gb = [not used]

// TexCoord0 = Offset vertices

// TexCoord1 = Offset texture (inkl type, flip)

// Color = Color

// Color.w = distance factor

//********************************************************************************
// uniform float FadeOutStart;
// uniform float FadeOutDist;
// uniform float Time;
// uniform vec3 camPos;

// varying vec4 VertexColor;
// varying float Fog;

// void main(void)
// {

//    // Billboard calculations

//    float Dist  = length(camPos - gl_Vertex.xyz);

//    vec3 vAt    = normalize(camPos - gl_Vertex.xyz);

//    vec3 vUp    = vec3(0.0,1.0,0.0);

//    vec3 vRight = normalize(cross( vUp, vAt ));



//    // Fade

//    VertexColor.w   = max( ( Dist - FadeOutStart ) / (FadeOutDist * gl_Color.w ), 0.0 );



//    if( VertexColor.w < 1.0 ) {

//       // Color

//       VertexColor.xyz = gl_Color.xyz;



//       // Create the vertex move

//       vec4 vMove = vec4( gl_MultiTexCoord0.s * vRight + gl_MultiTexCoord0.t * vUp, 0.0 );



//       // Calculate wind

//       float fWind = ( (pow(((sin((-Time * 4.0 + gl_Vertex.x / 20.0 + sin(gl_Vertex.y * 25.4) / 1.0 )) + 1.0) / 3.0), 4.0)) +

//                  (sin( Time * 10.0 + gl_Vertex.y * 25.4 ) * 0.02) ) * gl_MultiTexCoord0.t;



//       // Add wind

//       vMove.xz += fWind;



//       // Move the vertex in position

//       vec4 vPos = gl_Vertex + vMove;



//       // Calculate gl_Position

//       gl_Position = gl_ModelViewProjectionMatrix * vPos;



//       // Grass (and noise) texture coordinates and

//       // Cloud shadow coordinates

//       gl_TexCoord[0].st = gl_MultiTexCoord1.st;

//       gl_TexCoord[0].pq = (gl_TextureMatrix[2] * vec4( vPos.xz, 0.0, 1.0 )).st;



//       // Wind Light

//       vec3 vNormalUp = normalize( vec3( fWind * 0.2, 1.0, 0.0 ) );

//       VertexColor.xyz *= dot( vec3( 0.0, 1.0, 0.0 ), vNormalUp );   // Multiply with VertexColor



//       // Fog

//       Fog = ( gl_Fog.end - gl_Position.z ) * gl_Fog.scale;      // Calculate fog value

//       Fog = clamp( Fog, 0.0, 1.0 );



//    }

//    else {

//           gl_Position = vec4(0.0, 0.0, -10.0, 0.0);

//    }

// }

/********************************************************************************

 * Billboard grass fragment shader

 ********************************************************************************/
// uniform sampler2D Texture;
// uniform sampler2D TextureNoise;
// uniform sampler2D TextureShadow;

// varying vec4 VertexColor;
// varying float Fog;

// void main(void) {

//     vec4  Color   = texture2D(Texture, gl_TexCoord[0].st);      // Diffuse texture
//     float Noise   = texture2D(TextureNoise, gl_TexCoord[0].st).r;   // Noise for dissolve
//     vec3  Shadow  = texture2D(TextureShadow, gl_TexCoord[0].pq).rgb;   // Shadow

//     Color.xyz *= VertexColor.xyz * Shadow;            // Apply vertex color, light and shadows
//     Color.w    = Color.w * Noise - VertexColor.w;         // Dissolve
//     Color.xyz  = mix( gl_Fog.color.xyz, Color.xyz, Fog );      // Add fog

//     gl_FragColor = Color;                  // Final color
// }
export const Shaders = {
  earth: {
    uniforms: {
      texture: { type: 't', value: null }
    },
    vertexShader: [
      'varying vec3 vNormal;',
      'varying vec2 vUv;',
      'void main() {',
      'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
      'vNormal = normalize( normalMatrix * normal );',
      'vUv = uv;',
      '}'
    ].join('\n'),
    fragmentShader: [
      'uniform sampler2D texture;',
      'varying vec3 vNormal;',
      'varying vec2 vUv;',
      'void main() {',
      'vec3 diffuse = texture2D( texture, vUv ).xyz;',
      'float intensity = 1.05 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) );',
      'vec3 atmosphere = vec3( 1.0, 1.0, 1.0 ) * pow( intensity, 3.0 );',
      'gl_FragColor = vec4( diffuse + atmosphere, 1.0 );',
      '}'
    ].join('\n')
  },
  atmosphere: {
    uniforms: {},
    vertexShader: [
      'varying vec3 vNormal;',
      'void main() {',
      'vNormal = normalize( normalMatrix * normal );',
      'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
      '}'
    ].join('\n'),
    fragmentShader: [
      'varying vec3 vNormal;',
      'void main() {',
      'float intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 12.0 );',
      'gl_FragColor = vec4( 0.0, 0.4862745098, 0.7294117647, 1.0 ) * intensity;',
      '}'
    ].join('\n')
  },
  overlay: {
    uniforms: {},
    vertexShader: [
      'uniform float amplitude;',
			'attribute float size;',
			'attribute vec3 customColor;',
			'varying vec3 vColor;',
			'void main() {',
			'vColor = customColor;',
			'vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
			'gl_PointSize = size;',
			'gl_Position = projectionMatrix * mvPosition;',
			'}'
    ].join('\n'),
    fragmentShader: [
			'uniform vec3 color;',
			'uniform sampler2D texture;',
			'varying vec3 vColor;',
			'void main() {',
			'gl_FragColor = vec4( color * vColor, 1.0 );',
			'gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );',
			'}'
    ].join('\n')
  },
  globe: {
    uniforms: {
      texture: { type: 't', value: null }
    },
    vertexShader: [
			'varying vec3 vNormal;',
			'varying vec2 vUv;',
			'void main() {',
			'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0);',
			'vNormal = normalize( normalMatrix * normal );',
			'vUv = uv;',
			'}'
    ].join('\n'),
    fragmentShader: [
			'uniform sampler2D mapIndex;',
			'uniform sampler2D lookup;',
			'uniform sampler2D outline;',
			'uniform float outlineLevel;',
			'varying vec3 vNormal;',
			'varying vec2 vUv;',
			'void main() {',
			'vec4 mapColor = texture2D( mapIndex, vUv );',
			'float indexedColor = mapColor.x;',
			'vec2 lookupUV = vec2( indexedColor, 0. );',
			'vec4 lookupColor = texture2D( lookup, lookupUV );',
			'float mask = lookupColor.x + (1.-outlineLevel) * indexedColor;',
			'mask = clamp(mask,0.,1.);',
			'float outlineColor = texture2D( outline, vUv ).x * outlineLevel;',
			'float diffuse = mask + outlineColor;',
			'gl_FragColor = vec4( vec3(diffuse), 1.  );',
				// 'gl_FragColor = vec4( lookupColor );',
				// 'gl_FragColor = vec4(texture2D( lookup, vUv ).xyz,1.);',
			'}'
    ].join('\n')
  },
  grass: {
    uniforms: {
      texture: { type: 't', value: null }
    },
    vertexShader: [
      'uniform float FadeOutStart;',
      'uniform float FadeOutDist;',
      'uniform float Time;',
      'uniform vec3 camPos;',
      'varying vec4 VertexColor;',
			'void main() {',
        'float Dist  = length(camPos - gl_Vertex.xyz);',
        'vec3 vAt    = normalize(camPos - gl_Vertex.xyz);',
        'vec3 vUp    = vec3(0.0,1.0,0.0);',
        'vec3 vRight = normalize(cross( vUp, vAt ));',
        // Fade
        'VertexColor.w   = max( ( Dist - FadeOutStart ) / (FadeOutDist * gl_Color.w ), 0.0 );',
        'if( VertexColor.w < 1.0 ) {',
          'VertexColor.xyz = gl_Color.xyz;',
          'vec4 vMove = vec4( gl_MultiTexCoord0.s * vRight + gl_MultiTexCoord0.t * vUp, 0.0 );',
          'float fWind = ( (pow(((sin((-Time * 4.0 + gl_Vertex.x / 20.0 + sin(gl_Vertex.y * 25.4) / 1.0 )) + 1.0) / 3.0), 4.0)) + (sin( Time * 10.0 + gl_Vertex.y * 25.4 ) * 0.02) ) * gl_MultiTexCoord0.t;',
          'vMove.xz += fWind;',
          'vec4 vPos = gl_Vertex + vMove;',
          'gl_Position = gl_ModelViewProjectionMatrix * vPos;',
          'gl_TexCoord[0].st = gl_MultiTexCoord1.st;',
          'gl_TexCoord[0].pq = (gl_TextureMatrix[2] * vec4( vPos.xz, 0.0, 1.0 )).st;',
          'vec3 vNormalUp = normalize( vec3( fWind * 0.2, 1.0, 0.0 ) );',
          'VertexColor.xyz *= dot( vec3( 0.0, 1.0, 0.0 ), vNormalUp );',
          'Fog = ( gl_Fog.end - gl_Position.z ) * gl_Fog.scale;',
          'Fog = clamp( Fog, 0.0, 1.0 );',
        '} else {',
          'gl_Position = vec4(0.0, 0.0, -10.0, 0.0);',
        '}',
			'}'
    ].join('\n'),
    fragmentShader: [
      'uniform sampler2D Texture;',
      'uniform sampler2D TextureNoise;',
      'uniform sampler2D TextureShadow;',
      'varying vec4 VertexColor;',
      'varying float Fog;',
      'void main(void) {',
        'vec4  Color   = texture2D(Texture, gl_TexCoord[0].st);',
        'float Noise   = texture2D(TextureNoise, gl_TexCoord[0].st).r;',
        'vec3  Shadow  = texture2D(TextureShadow, gl_TexCoord[0].pq).rgb;',
        'Color.xyz *= VertexColor.xyz * Shadow;',
        'Color.w    = Color.w * Noise - VertexColor.w;',
        'Color.xyz  = mix( gl_Fog.color.xyz, Color.xyz, Fog );',
        'gl_FragColor = Color;',
      '}'
    ].join('\n')
  }
};

/**
 * @author zz85 / https://github.com/zz85
 *
 * Based on 'A Practical Analytic Model for Daylight'
 * aka The Preetham Model, the de facto standard analytic skydome model
 * http://www.cs.utah.edu/~shirley/papers/sunsky/sunsky.pdf
 *
 * First implemented by Simon Wallner
 * http://www.simonwallner.at/projects/atmospheric-scattering
 *
 * Improved by Martin Upitis
 * http://blenderartists.org/forum/showthread.php?245954-preethams-sky-impementation-HDR
 *
 * Three.js integration by zz85 http://twitter.com/blurspline
 */

export const SkyShader = {

    uniforms: {

        luminance:	 { type: 'f', value: 1 },
        turbidity:	 { type: 'f', value: 2 },
        reileigh:	 { type: 'f', value: 1 },
        mieCoefficient:	 { type: 'f', value: 0.005 },
        mieDirectionalG: { type: 'f', value: 0.8 },
        sunPosition: 	 { type: 'v3', value: new Vector3() }

    },

    vertexShader: [

        'varying vec3 vWorldPosition;',

        'void main() {',

        'vec4 worldPosition = modelMatrix * vec4( position, 1.0 );',
        'vWorldPosition = worldPosition.xyz;',

        'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

        '}',

    ].join( '\n' ),

    fragmentShader: [

        'uniform sampler2D skySampler;',
        'uniform vec3 sunPosition;',
        'varying vec3 vWorldPosition;',

        'vec3 cameraPos = vec3(0., 0., 0.);',
        '// uniform sampler2D sDiffuse;',
        '// const float turbidity = 10.0; //',
        '// const float reileigh = 2.; //',
        '// const float luminance = 1.0; //',
        '// const float mieCoefficient = 0.005;',
        '// const float mieDirectionalG = 0.8;',

        'uniform float luminance;',
        'uniform float turbidity;',
        'uniform float reileigh;',
        'uniform float mieCoefficient;',
        'uniform float mieDirectionalG;',

        '// constants for atmospheric scattering',
        'const float e = 2.71828182845904523536028747135266249775724709369995957;',
        'const float pi = 3.141592653589793238462643383279502884197169;',

        'const float n = 1.0003; // refractive index of air',
        'const float N = 2.545E25; // number of molecules per unit volume for air at',
        '// 288.15K and 1013mb (sea level -45 celsius)',
        'const float pn = 0.035;	// depolatization factor for standard air',

        '// wavelength of used primaries, according to preetham',
        'const vec3 lambda = vec3(680E-9, 550E-9, 450E-9);',

        '// mie stuff',
        '// K coefficient for the primaries',
        'const vec3 K = vec3(0.686, 0.678, 0.666);',
        'const float v = 4.0;',

        '// optical length at zenith for molecules',
        'const float rayleighZenithLength = 8.4E3;',
        'const float mieZenithLength = 1.25E3;',
        'const vec3 up = vec3(0.0, 1.0, 0.0);',

        'const float EE = 1000.0;',
        'const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;',
        '// 66 arc seconds -> degrees, and the cosine of that',

        '// earth shadow hack',
        'const float cutoffAngle = pi/1.95;',
        'const float steepness = 1.5;',


        'vec3 totalRayleigh(vec3 lambda)',
        '{',
        'return (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn));',
        '}',

        // see http://blenderartists.org/forum/showthread.php?321110-Shaders-and-Skybox-madness
        '// A simplied version of the total Reayleigh scattering to works on browsers that use ANGLE',
        'vec3 simplifiedRayleigh()',
        '{',
        'return 0.0005 / vec3(94, 40, 18);',
        // return 0.00054532832366 / (3.0 * 2.545E25 * pow(vec3(680E-9, 550E-9, 450E-9), vec3(4.0)) * 6.245);
        '}',

        'float rayleighPhase(float cosTheta)',
        '{	 ',
        'return (3.0 / (16.0*pi)) * (1.0 + pow(cosTheta, 2.0));',
        '//	return (1.0 / (3.0*pi)) * (1.0 + pow(cosTheta, 2.0));',
        '//	return (3.0 / 4.0) * (1.0 + pow(cosTheta, 2.0));',
        '}',

        'vec3 totalMie(vec3 lambda, vec3 K, float T)',
        '{',
        'float c = (0.2 * T ) * 10E-18;',
        'return 0.434 * c * pi * pow((2.0 * pi) / lambda, vec3(v - 2.0)) * K;',
        '}',

        'float hgPhase(float cosTheta, float g)',
        '{',
        'return (1.0 / (4.0*pi)) * ((1.0 - pow(g, 2.0)) / pow(1.0 - 2.0*g*cosTheta + pow(g, 2.0), 1.5));',
        '}',

        'float sunIntensity(float zenithAngleCos)',
        '{',
        'return EE * max(0.0, 1.0 - exp(-((cutoffAngle - acos(zenithAngleCos))/steepness)));',
        '}',

        '// float logLuminance(vec3 c)',
        '// {',
        '// 	return log(c.r * 0.2126 + c.g * 0.7152 + c.b * 0.0722);',
        '// }',

        '// Filmic ToneMapping http://filmicgames.com/archives/75',
        'float A = 0.15;',
        'float B = 0.50;',
        'float C = 0.10;',
        'float D = 0.20;',
        'float E = 0.02;',
        'float F = 0.30;',
        'float W = 1000.0;',

        'vec3 Uncharted2Tonemap(vec3 x)',
        '{',
        'return ((x*(A*x+C*B)+D*E)/(x*(A*x+B)+D*F))-E/F;',
        '}',


        'void main() ',
        '{',
        'float sunfade = 1.0-clamp(1.0-exp((sunPosition.y/450000.0)),0.0,1.0);',

        '// luminance =  1.0 ;// vWorldPosition.y / 450000. + 0.5; //sunPosition.y / 450000. * 1. + 0.5;',

        '// gl_FragColor = vec4(sunfade, sunfade, sunfade, 1.0);',

        'float reileighCoefficient = reileigh - (1.0* (1.0-sunfade));',

        'vec3 sunDirection = normalize(sunPosition);',

        'float sunE = sunIntensity(dot(sunDirection, up));',

        '// extinction (absorbtion + out scattering) ',
        '// rayleigh coefficients',

        // 'vec3 betaR = totalRayleigh(lambda) * reileighCoefficient;',
        'vec3 betaR = simplifiedRayleigh() * reileighCoefficient;',

        '// mie coefficients',
        'vec3 betaM = totalMie(lambda, K, turbidity) * mieCoefficient;',

        '// optical length',
        '// cutoff angle at 90 to avoid singularity in next formula.',
        'float zenithAngle = acos(max(0.0, dot(up, normalize(vWorldPosition - cameraPos))));',
        'float sR = rayleighZenithLength / (cos(zenithAngle) + 0.15 * pow(93.885 - ((zenithAngle * 180.0) / pi), -1.253));',
        'float sM = mieZenithLength / (cos(zenithAngle) + 0.15 * pow(93.885 - ((zenithAngle * 180.0) / pi), -1.253));',



        '// combined extinction factor	',
        'vec3 Fex = exp(-(betaR * sR + betaM * sM));',

        '// in scattering',
        'float cosTheta = dot(normalize(vWorldPosition - cameraPos), sunDirection);',

        'float rPhase = rayleighPhase(cosTheta*0.5+0.5);',
        'vec3 betaRTheta = betaR * rPhase;',

        'float mPhase = hgPhase(cosTheta, mieDirectionalG);',
        'vec3 betaMTheta = betaM * mPhase;',


        'vec3 Lin = pow(sunE * ((betaRTheta + betaMTheta) / (betaR + betaM)) * (1.0 - Fex),vec3(1.5));',
        'Lin *= mix(vec3(1.0),pow(sunE * ((betaRTheta + betaMTheta) / (betaR + betaM)) * Fex,vec3(1.0/2.0)),clamp(pow(1.0-dot(up, sunDirection),5.0),0.0,1.0));',

        '//nightsky',
        'vec3 direction = normalize(vWorldPosition - cameraPos);',
        'float theta = acos(direction.y); // elevation --> y-axis, [-pi/2, pi/2]',
        'float phi = atan(direction.z, direction.x); // azimuth --> x-axis [-pi/2, pi/2]',
        'vec2 uv = vec2(phi, theta) / vec2(2.0*pi, pi) + vec2(0.5, 0.0);',
        '// vec3 L0 = texture2D(skySampler, uv).rgb+0.1 * Fex;',
        'vec3 L0 = vec3(0.1) * Fex;',

        '// composition + solar disc',
        '//if (cosTheta > sunAngularDiameterCos)',
        'float sundisk = smoothstep(sunAngularDiameterCos,sunAngularDiameterCos+0.00002,cosTheta);',
        '// if (normalize(vWorldPosition - cameraPos).y>0.0)',
        'L0 += (sunE * 19000.0 * Fex)*sundisk;',


        'vec3 whiteScale = 1.0/Uncharted2Tonemap(vec3(W));',

        'vec3 texColor = (Lin+L0);   ',
        'texColor *= 0.04 ;',
        'texColor += vec3(0.0,0.001,0.0025)*0.3;',

        'float g_fMaxLuminance = 1.0;',
        'float fLumScaled = 0.1 / luminance;     ',
        'float fLumCompressed = (fLumScaled * (1.0 + (fLumScaled / (g_fMaxLuminance * g_fMaxLuminance)))) / (1.0 + fLumScaled); ',

        'float ExposureBias = fLumCompressed;',

        'vec3 curr = Uncharted2Tonemap((log2(2.0/pow(luminance,4.0)))*texColor);',
        'vec3 color = curr*whiteScale;',

        'vec3 retColor = pow(color,vec3(1.0/(1.2+(1.2*sunfade))));',


        'gl_FragColor.rgb = retColor;',

        'gl_FragColor.a = 1.0;',
        '}',

    ].join( '\n' )

};

export const Sky = function () {

    var skyShader = SkyShader;
    var skyUniforms = UniformsUtils.clone( skyShader.uniforms );

    var skyMat = new ShaderMaterial( {
        fragmentShader: skyShader.fragmentShader,
        vertexShader: skyShader.vertexShader,
        uniforms: skyUniforms,
        side: BackSide
    } );

    var skyGeo = new SphereBufferGeometry( 450000, 32, 15 );
    var skyMesh = new Mesh( skyGeo, skyMat );


    // Expose variables
    this.mesh = skyMesh;
    this.uniforms = skyUniforms;

};
