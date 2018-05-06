define("gmath", ["require", "exports"], function(e, t) {
  "use strict";
  function n(e) {
    return e > 0 ? 1 : 0 > e ? -1 : 0;
  }
  function o(e, t) {
    var n = Math.pow(10, t);
    return Math.round((e + 1e-9) * n) / n;
  }
  function r(e, t, n) {
    return Math.min(Math.max(e, t), n);
  }
  function a(e, t) {
    return (e % t + t) % t;
  }
  function i() {
    return 2 * Math.random() - 1;
  }
  function s(e, n) {
    return a(Math.atan2(n, e), t.PI2);
  }
  function l(e, o) {
    var r = a(o, t.PI2) - a(e, t.PI2);
    return Math.abs(r) < Math.PI ? r : r - t.PI2 * n(r);
  }
  function u(e, t, n, o) {
    return e * n + t * o;
  }
  function c(e, t) {
    return e.x * t.x + e.y * t.y;
  }
  function f(e) {
    return Math.sqrt(e.x * e.x + e.y * e.y);
  }
  function d(e, t, n) {
    var o = f(e);
    o > 0
      ? ((o = t / o), (n.x = e.x * o), (n.y = e.y * o))
      : ((n.x = t), (n.y = 0));
  }
  function p(e, t) {
    d(e, 1, t);
  }
  (t.PI2 = 2 * Math.PI),
    (t.sign = n),
    (t.roundFrac = o),
    (t.clamp = r),
    (t.pmod = a),
    (t.nrand = i),
    (t.angle = s),
    (t.difAngle = l),
    (t.dot = u),
    (t.dot2d = c),
    (t.length2d = f),
    (t.setLength2d = d),
    (t.normalize2d = p);
}),
  define("anim", ["require", "exports", "gmath"], function(e, t, n) {
    "use strict";
    function o(e, t, o, r, a) {
      function s() {
        var c = Date.now() - l;
        if (c >= r)
          (e.style.opacity = n.roundFrac(o, i).toString()),
            (e = null),
            a && a();
        else {
          var f = n.roundFrac(t + c / r * (o - t), i).toString();
          f !== u && ((e.style.opacity = f), (u = f)), requestAnimationFrame(s);
        }
      }
      var l = Date.now(),
        u = n.roundFrac(t, i).toString();
      (e.style.opacity = u), requestAnimationFrame(s);
    }
    function r(e, t, n) {
      o(e, 0, 1, t, n);
    }
    function a(e, t, n) {
      o(e, 1, 0, t, n);
    }
    var i = 5;
    (t.fade = o), (t.fadeIn = r), (t.fadeOut = a);
  }),
  define("util", ["require", "exports"], function(e, t) {
    "use strict";
    function n(e) {
      return document.getElementById(e);
    }
    function o(e) {
      return document.getElementById(e);
    }
    function r() {
      try {
        var e = document.createElement("canvas");
        return !(
          !window.WebGLRenderingContext ||
          (!e.getContext("webgl") && !e.getContext("experimental-webgl"))
        );
      } catch (t) {
        return null;
      }
    }
    (t.$e = n), (t.$i = o), (t.detectWebGL = r);
  }),
  define("loader", ["require", "exports"], function(e, t) {
    "use strict";
    function n() {
      function e(e, n, r, v, g) {
        (a = n),
          (i = r),
          (s = v),
          (l = g),
          (p = new o()),
          (c = e.textures.length),
          (f = 0),
          (d = 0),
          (u = !0);
        for (var h = 0; h < e.textures.length; ++h) t(e.textures[h]);
      }
      function t(e) {
        p.textures[e.name] = new THREE.TextureLoader().load(e.url, n);
      }
      function n() {
        (f += 1), i && i(f / c), r();
      }
      function r() {
        if (!u) return !0;
        if (f + d >= c) {
          var e = !d;
          e && a && a(p), l && l(e), (u = !1);
        }
        return !u;
      }
      var a,
        i,
        s,
        l,
        u = !1,
        c = 0,
        f = 0,
        d = 0,
        p = new o();
      return {
        load: e,
        getAssets: function() {
          return p;
        }
      };
    }
    var o = (function() {
      function e() {
        this.textures = {};
      }
      return e;
    })();
    (t.Assets = o), (t.Loader = n);
  }),
  define("input", ["require", "exports"], function(e, t) {
    "use strict";
    function n(e, n) {
      var o = t.state;
      37 === e
        ? (o.left = n)
        : 39 === e
          ? (o.right = n)
          : 38 === e
            ? (o.forward = n)
            : 40 === e
              ? (o.back = n)
              : 87 === e
                ? (o.up = n)
                : 83 === e
                  ? (o.down = n)
                  : 81 === e
                    ? (o.pitchup = n)
                    : 65 === e && (o.pitchdown = n);
    }
    function o(e) {
      n(e.keyCode, 1);
      var t = e.keyCode.toString();
      s.hasOwnProperty(t) && s[t]();
    }
    function r(e) {
      n(e.keyCode, 0);
    }
    function a() {
      l ||
        (document.addEventListener("keydown", o, !0),
        document.addEventListener("keyup", r, !0),
        (l = !0));
    }
    function i(e, t) {
      s[e.toString()] = t;
    }
    t.state = {
      up: 0,
      down: 0,
      left: 0,
      right: 0,
      forward: 0,
      back: 0,
      pitchup: 0,
      pitchdown: 0
    };
    var s = {},
      l = !1;
    (t.init = a), (t.setKeyPressListener = i);
  }),
  define("fullscreen", ["require", "exports"], function(e, t) {
    "use strict";
    function n(e) {
      o()
        ? document.exitFullscreen
          ? document.exitFullscreen()
          : document.msExitFullscreen
            ? document.msExitFullscreen()
            : document.mozCancelFullScreen
              ? document.mozCancelFullScreen()
              : document.webkitExitFullscreen && document.webkitExitFullscreen()
        : e.requestFullscreen
          ? e.requestFullscreen()
          : e.msRequestFullscreen
            ? e.msRequestFullscreen()
            : e.mozRequestFullScreen
              ? e.mozRequestFullScreen()
              : e.webkitRequestFullscreen && e.webkitRequestFullscreen();
    }
    function o() {
      return !!(
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      );
    }
    (t.toggle = n), (t.is = o);
  }),
  define("browser", ["require", "exports"], function(e, t) {
    "use strict";
    (t.isStandalone = (function() {
      return void 0 !== navigator.standalone
        ? !!navigator.standalone
        : window.external && window.external.msIsSiteMode
          ? !!window.external.msIsSiteMode()
          : window.matchMedia("(display-mode: standalone)").matches;
    })()),
      (t.isMobile = (function() {
        var e = !!navigator.userAgent.match(/Android/i),
          t = !!navigator.userAgent.match(/BlackBerry/i),
          n = !!navigator.userAgent.match(/iPhone|iPad|iPod/i),
          o = !!navigator.userAgent.match(/Opera Mini/i),
          r = !!navigator.userAgent.match(/IEMobile/i),
          a = !!navigator.userAgent.match(/\(Mobile/i),
          i = e || t || n || o || r || a;
        return {
          Android: e,
          BlackBerry: t,
          iOS: n,
          Opera: o,
          Windows: r,
          FireFox: a,
          any: i
        };
      })());
  }),
  define("notification", ["require", "exports", "util", "anim"], function(
    e,
    t,
    n,
    o
  ) {
    "use strict";
    function r(e) {
      var t = n.$e("notification_text");
      if (((t.textContent = e), !a)) {
        var r = n.$e("notification");
        (r.style.display = "block"),
          (r.style.opacity = "1.0"),
          (a = !0),
          setTimeout(function() {
            o.fadeOut(r, 1e3, function() {
              (r.style.display = "none"), (t.textContent = ""), (a = !1);
            });
          }, 4e3);
      }
    }
    var a = !1;
    Object.defineProperty(t, "__esModule", { value: !0 }), (t["default"] = r);
  }),
  define("player", [
    "require",
    "exports",
    "gmath",
    "input",
    "notification"
  ], function(e, t, n, o, r) {
    "use strict";
    function a() {
      function e(e) {
        (S += e), C ? M(S / 1e3, e) : R(o.state, e);
      }
      function t() {
        (C = !C),
          C &&
            ((_.roll = 0), (_.rollVel = 0), (_.pitchVel = 0), (_.yawVel = 0));
      }
      function a() {
        return C;
      }
      function F(e) {
        C = !!e;
      }
      function M(e, t) {
        A.copy(_.pos);
        var n = _.yaw,
          o = _.pitch,
          r = 0.035 * e;
        (_.pos.x = Math.cos(r) * c + Math.sin(r) * c * 2),
          (_.pos.y = Math.sin(r) * c + Math.cos(r) * c * 2);
        var a = 0.3 * e;
        (_.pos.z = i + 4.5 + 7 * Math.cos(a)),
          (_.pitch = u - 0.25 * Math.sin(a + 0.5 * Math.PI)),
          (_.yaw = Math.sin(0.04 * e) * Math.PI * 2 + 0.5 * Math.PI);
        var s = t / 1e3;
        (T.x = _.pos.x - A.x),
          (T.y = _.pos.y - A.y),
          (T.z = _.pos.z - A.z),
          (_.vel.x = T.x / s),
          (_.vel.y = T.y / s),
          (_.vel.z = T.z / s);
        var l = _.yaw - n;
        _.yawVel = l / s;
        var f = _.pitch - o;
        _.pitchVel = f / s;
      }
      function R(e, t) {
        var o = t / 1e3,
          r = 0;
        e.left > 0 ? (r = -w) : e.right > 0 && (r = w);
        var a = -_.roll * b,
          i = -n.sign(_.rollVel) * E * Math.abs(_.rollVel);
        (r = r + a + i), (_.rollVel += r * o), (_.roll += _.rollVel * o);
        var u = -_.roll * g,
          c = -n.sign(_.yawVel) * Math.abs(Math.pow(_.yawVel, 3)) * h;
        (_.yawVel += (u + c) * o), (_.yaw += _.yawVel * o);
        var F = 0;
        e.forward > 0 ? (F = -m) : e.back > 0 && (F = 0.5 * m);
        var M = -_.pitch * y,
          R = -n.sign(_.pitchVel) * x * Math.abs(_.pitchVel);
        (F = F + M + R),
          (_.pitchVel += F * o),
          (_.pitch += _.pitchVel * o),
          A.set(0, 0, 0),
          (A.x = -_.pitch * f * Math.cos(_.yaw)),
          (A.y = -_.pitch * f * Math.sin(_.yaw));
        var C = n.length2d(_.vel);
        (T.x = -_.vel.x),
          (T.y = -_.vel.y),
          n.setLength2d(T, C * d, T),
          e.up > 0 && _.pos.z < l - 2
            ? (A.z = p)
            : e.down > 0 && _.pos.z > s && (A.z = -p),
          (T.z = -_.vel.z * v),
          (_.vel.x += (A.x + T.x) * o),
          (_.vel.y += (A.y + T.y) * o),
          (_.vel.z += (A.z + T.z) * o),
          (_.pos.x += _.vel.x * o),
          (_.pos.y += _.vel.y * o),
          (_.pos.z += _.vel.z * o),
          _.pos.z < s ? (_.pos.z = s) : _.pos.z > l && (_.pos.z = l);
      }
      var C = !0,
        S = 0,
        _ = {
          pos: new THREE.Vector3(0, 0, i),
          vel: new THREE.Vector3(0, 0, 0),
          yaw: 0,
          yawVel: 0,
          pitch: 0,
          pitchVel: 0,
          roll: 0,
          rollVel: 0
        };
      o.setKeyPressListener(13, function() {
        t(),
          C
            ? r["default"]("Press ENTER to enable manual camera")
            : r["default"](
                "ARROWS drive, W/S up/down. Press ENTER to return to auto camera."
              );
      });
      var A = new THREE.Vector3(),
        T = new THREE.Vector3();
      return {
        update: e,
        state: _,
        toggleAutoPlay: t,
        getAutoPlay: a,
        setAutoPlay: F
      };
    }
    var i = 4,
      s = 1,
      l = 16,
      u = -0.15,
      c = 250,
      f = 60,
      d = 0.1,
      p = 20,
      v = 5,
      g = 4,
      h = 2,
      m = 2,
      y = 8,
      x = 4,
      w = 1,
      b = 5,
      E = 4;
    Object.defineProperty(t, "__esModule", { value: !0 }), (t["default"] = a);
  }),
  define("bufferSet", ["require", "exports"], function(e, t) {
    "use strict";
    function n(e, n, o) {
      return (
        (o = "number" == typeof o ? o & t.ALL : t.ALL),
        {
          position: o & t.POSITION ? new Float32Array(3 * e) : null,
          normal: o & t.NORMAL ? new Float32Array(3 * e) : null,
          color: o & t.COLOR ? new Float32Array(4 * e) : null,
          uv: o & t.UV ? new Float32Array(2 * e) : null,
          index: o & t.INDEX ? new Uint16Array(n) : null,
          vertexCount: 0,
          indexCount: 0
        }
      );
    }
    (t.POSITION = 1),
      (t.NORMAL = 2),
      (t.COLOR = 4),
      (t.UV = 8),
      (t.INDEX = 16),
      (t.ALL = t.POSITION | t.NORMAL | t.COLOR | t.UV | t.INDEX),
      (t.create = n);
  }),
  define("grass", ["require", "exports", "gmath"], function(e, t, n) {
    "use strict";
    function o(e) {
      var t = {
        vindex: new Float32Array(2 * c * 1),
        shape: new Float32Array(4 * e.numBlades),
        offset: new Float32Array(4 * e.numBlades),
        index: new Uint16Array(f)
      };
      r(t.index, 0, c, 0),
        a(t.shape, e.numBlades),
        i(t.offset, e.numBlades, e.radius),
        s(t.vindex);
      var n = new THREE.InstancedBufferGeometry();
      (n.boundingSphere = new THREE.Sphere(
        new THREE.Vector3(0, 0, 0),
        1e4 * Math.sqrt(e.radius * e.radius * 2)
      )),
        n.addAttribute("vindex", new THREE.BufferAttribute(t.vindex, 1)),
        n.addAttribute("shape", new THREE.InstancedBufferAttribute(t.shape, 4)),
        n.addAttribute(
          "offset",
          new THREE.InstancedBufferAttribute(t.offset, 4)
        ),
        n.setIndex(new THREE.BufferAttribute(t.index, 1));
      var o = e.texture;
      o.wrapS = o.wrapT = THREE.RepeatWrapping;
      var l = new THREE.RawShaderMaterial({
        uniforms: {
          time: { type: "f", value: 0 },
          map: { type: "t", value: o },
          patchSize: { type: "f", value: 2 * e.radius },
          drawPos: { type: "2f", value: [0, 0] },
          fogColor: { type: "3f", value: e.fogColor.toArray() },
          fogNear: { type: "f", value: 1 },
          fogFar: { type: "f", value: e.fogFar },
          grassFogColor: { type: "3f", value: e.grassFogColor.toArray() },
          grassFogFar: { type: "f", value: e.grassFogFar }
        },
        vertexShader: g,
        fragmentShader: h
      });
      return new THREE.Mesh(n, l);
    }
    function r(e, t, n, o) {
      var r;
      for (r = 0; u > r; ++r)
        (e[o++] = t + 0),
          (e[o++] = t + 1),
          (e[o++] = t + 2),
          (e[o++] = t + 2),
          (e[o++] = t + 1),
          (e[o++] = t + 3),
          (t += 2);
      for (r = 0; u > r; ++r)
        (e[o++] = n + 2),
          (e[o++] = n + 1),
          (e[o++] = n + 0),
          (e[o++] = n + 3),
          (e[o++] = n + 1),
          (e[o++] = n + 2),
          (n += 2);
    }
    function a(e, t) {
      for (var n = 0; t > n; ++n)
        (e[4 * n + 0] = d + Math.random() * d * 0.5),
          (e[4 * n + 1] = p + Math.pow(Math.random(), 4) * (v - p)),
          (e[4 * n + 2] = 0 + 0.7 * Math.random()),
          (e[4 * n + 3] = 0.2 + 0.8 * Math.random());
    }
    function i(e, t, o) {
      for (var r = 0; t > r; ++r)
        (e[4 * r + 0] = n.nrand() * o),
          (e[4 * r + 1] = n.nrand() * o),
          (e[4 * r + 2] = 0),
          (e[4 * r + 3] = 2 * Math.PI * Math.random());
    }
    function s(e) {
      for (var t = 0; t < e.length; ++t) e[t] = t;
    }
    function l(e, t, n, o) {
      var r = e.material;
      (r.uniforms.time.value = t),
        (r.uniforms.drawPos.value[0] = n),
        (r.uniforms.drawPos.value[1] = o);
    }
    var u = 4,
      c = 2 * (u + 1),
      f = 12 * u,
      d = 0.15,
      p = 2,
      v = 4,
      g =
        "\n	precision highp float;\n\n	#define BLADE_SEGS " +
        u.toFixed(1) +
        " // # of blade segments\n	#define BLADE_DIVS (BLADE_SEGS + 1.0)  // # of divisions\n	#define BLADE_VERTS (BLADE_DIVS * 2.0) // # of vertices (per side, so 1/2 total)\n\n	uniform mat4 modelViewMatrix;\n	uniform mat4 projectionMatrix;\n	uniform float patchSize; // size of grass square area (width & height)\n	uniform vec2 drawPos; // centre of where we want to draw\n	uniform float time;  // used to animate blades\n\n	attribute float vindex; // Which vertex are we drawing - the main thing we need to know\n	attribute vec4 offset; // {x:x, y:y, z:z, w:rot} (blade's position & rotation)\n	attribute vec4 shape; // {x:width, y:height, z:lean, w:curve} (blade's shape properties)\n\n	varying vec4 vColor;\n	varying vec2 vUv;\n\n	vec2 rotate (float x, float y, float r) {\n		float c = cos(r);\n		float s = sin(r);\n		return vec2(x * c - y * s, x * s + y * c);\n	}\n\n	void main() {\n		float vi = mod(vindex, BLADE_VERTS); // vertex index for this side of the blade\n		float di = floor(vi / 2.0);  // div index (0 .. BLADE_DIVS)\n		float hpct = di / BLADE_SEGS;  // percent of height of blade this vertex is at\n		float bside = floor(vindex / BLADE_VERTS);  // front/back side of blade\n		float xside = mod(vi, 2.0);  // left/right edge (x=0 or x=1)\n		float x = shape.x * (xside - 0.5) * (1.0 - pow(hpct, 3.0)); // taper blade as approach tip\n		// apply blade's natural curve amount, then apply animated curve amount by time\n		float curve = shape.w + 0.4 * (sin(time * 4.0 + offset.x * 0.8) + cos(time * 4.0 + offset.y * 0.8));\n		float y = shape.z * hpct + curve * (hpct * hpct); // pow(hpct, 2.0);\n\n		// based on centre of view cone position, what grid tile should\n		// this piece of grass be drawn at?\n		vec2 gridOffset = vec2(\n			floor((drawPos.x - offset.x) / patchSize) * patchSize + patchSize / 2.0,\n			floor((drawPos.y - offset.y) / patchSize) * patchSize + patchSize / 2.0\n		);\n\n		// rotate this blade vertex by this blade's rotation\n		vec4 pos = vec4(\n			rotate(x, y, offset.w),\n			shape.y * di / BLADE_SEGS + offset.z,\n			1.0\n		);\n\n		// move to grid position and then to blade position\n		pos.x += gridOffset.x + offset.x;\n		pos.y += gridOffset.y + offset.y;\n\n		// grass texture coordinate for this vertex\n		vec2 uv = vec2(xside, di * 2.0);\n\n		// cheap lighting for now - light based on rotation angle of blade\n		// and depending on which side of the blade this vertex is on\n		// and depending on how high up the blade we are\n		// TODO: calculate normal?\n		float c = max(cos(offset.w + bside * 3.14159) - (1.0 - hpct) * 0.4, 0.0);\n		c = 0.3 + 0.7 * c * c * c;\n\n		// outputs\n		vColor = vec4(\n			c * 0.85 + cos(offset.x * 80.0) * 0.05,\n			c + sin(offset.y * 140.0) * 0.05,\n			c + sin(offset.x * 99.0) * 0.05,\n			1.0\n		);\n		vUv = uv;\n		gl_Position = projectionMatrix * modelViewMatrix * pos;\n	}\n",
      h =
        "\n	precision highp float;\n\n	uniform sampler2D map;\n	uniform vec3 fogColor;\n	uniform float fogNear;\n	uniform float fogFar;\n	uniform vec3 grassFogColor;\n	uniform float grassFogFar;\n\n	varying vec3 vPosition;\n	varying vec4 vColor;\n	varying vec2 vUv;\n\n	void main() {\n		vec4 color = vec4(vColor) * texture2D(map, vec2(vUv.s, vUv.t));\n		float depth = gl_FragCoord.z / gl_FragCoord.w;\n		// apply 'grass fog' first\n		float fogFactor = smoothstep(fogNear, grassFogFar, depth);\n		color.rgb = mix(color.rgb, grassFogColor, fogFactor);\n		// then apply atmosphere fog\n		fogFactor = smoothstep(fogNear, fogFar, depth);\n		color.rgb = mix(color.rgb, fogColor, fogFactor);\n		// output\n		gl_FragColor = color;\n	}\n";
    (t.createMesh = o), (t.update = l);
  }),
  define("terrain", ["require", "exports"], function(e, t) {
    "use strict";
    function n(e) {
      var t = e.texture;
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      var n = new THREE.PlaneBufferGeometry(1e4, 1e4, 1, 1),
        a = new THREE.RawShaderMaterial({
          uniforms: {
            map: { type: "t", value: t },
            uvRepeat: { type: "2f", value: [1200, 1200] },
            fogColor: { type: "3f", value: e.fogColor.toArray() },
            fogNear: { type: "f", value: 1 },
            fogFar: { type: "f", value: e.fogFar },
            grassFogColor: { type: "3f", value: e.grassFogColor.toArray() },
            grassFogFar: { type: "f", value: e.grassFogFar }
          },
          vertexShader: o,
          fragmentShader: r
        });
      return new THREE.Mesh(n, a);
    }
    var o =
        "\n	precision highp float;\n\n	uniform mat4 modelViewMatrix;\n	uniform mat4 projectionMatrix;\n	uniform vec2 uvRepeat;\n\n	attribute vec3 position;\n	attribute vec2 uv;\n\n	varying vec2 vUv;\n\n	void main() {\n		vUv = uv * uvRepeat.xy;\n		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n	}\n",
      r =
        "\n	precision highp float;\n\n	uniform sampler2D map;\n	uniform vec3 fogColor;\n	uniform float fogNear;\n	uniform float fogFar;\n	uniform vec3 grassFogColor; // \"grass fog\"\n	uniform float grassFogFar;\n\n	varying vec2 vUv;\n\n	void main() {\n		vec4 color = texture2D(map, vUv);\n		float depth = gl_FragCoord.z / gl_FragCoord.w;\n		// apply 'grass fog' first\n		float fogFactor = smoothstep(fogNear, grassFogFar, depth);\n		color.rgb = mix(color.rgb, grassFogColor, fogFactor);\n		// then apply atmosphere fog\n		fogFactor = smoothstep(fogNear, fogFar, depth);\n		color.rgb = mix(color.rgb, fogColor, fogFactor);\n		gl_FragColor = color;\n	}\n";
    t.createMesh = n;
  }),
  define("skydome", ["require", "exports", "bufferSet"], function(e, t, n) {
    "use strict";
    function o(e, t, n, o, r, a, i, s, l, u) {
      void 0 === u && (u = 0);
      for (var c = e.position, f = e.uv, d = e.index, p = 0, v = 0; t > v; ++v)
        for (
          var g = Math.PI / 2 * v / (t - 1), h = o * Math.cos(g), m = 0;
          n > m;
          ++m
        ) {
          var y = u + Math.PI * m / (n - 1);
          (p = 3 * (e.vertexCount + v * n + m)),
            (c[p++] = Math.cos(y) * h),
            (c[p++] = Math.sin(y) * h),
            (c[p++] = Math.sin(g) * r),
            (p = 2 * (e.vertexCount + v * n + m)),
            (f[p++] = a + (n - 1 - m) / (n - 1) * (i - a)),
            (f[p++] = s + Math.sin(g) * (l - s));
        }
      p = e.indexCount;
      for (var v = 0; t - 1 > v; ++v)
        for (var m = 0; n - 1 > m; ++m) {
          var x = e.vertexCount + v * (n - 1) + m;
          (d[p++] = x + v),
            (d[p++] = x + v + 1),
            (d[p++] = x + t + v + 1),
            (d[p++] = x + t + v + 1),
            (d[p++] = x + t + v),
            (d[p++] = x + v);
        }
      return (
        (e.vertexCount += t * n), (e.indexCount += 6 * (t - 1) * (n - 1)), e
      );
    }
    function r(e, t, r, a, i) {
      void 0 === a && (a = 16), void 0 === i && (i = 16);
      var s = n.create(
        2 * a * i,
        12 * (a - 1) * (i - 1),
        n.POSITION | n.UV | n.INDEX
      );
      o(s, a, i, t, r, 0, 1, 0, 0.5, 0),
        o(s, a, i, t, r, 0, 1, 0.5, 1, Math.PI);
      var l = new THREE.BufferGeometry();
      l.addAttribute("position", new THREE.BufferAttribute(s.position, 3)),
        l.addAttribute("uv", new THREE.BufferAttribute(s.uv, 2)),
        l.setIndex(new THREE.BufferAttribute(s.index, 1)),
        (e.wrapS = e.wrapT = THREE.ClampToEdgeWrapping);
      var u = new THREE.MeshBasicMaterial({
          color: 16777215,
          map: e,
          fog: !1,
          side: THREE.BackSide
        }),
        c = new THREE.Mesh(l, u);
      return c;
    }
    t.createMesh = r;
  }),
  define("world", [
    "require",
    "exports",
    "util",
    "gmath",
    "player",
    "grass",
    "terrain",
    "skydome"
  ], function(e, t, n, o, r, a, i, s) {
    "use strict";
    function l(e, t, l, y, x, w) {
      function b() {
        var e = Date.now(),
          t = e - L;
        t > 0 && (t > c && ((t = c), (L = e - c)), F(t), C(), (L = e));
      }
      function E(e, t) {
        (y = e),
          (x = t),
          _.setSize(y, x),
          (P.aspect = y / x),
          P.updateProjectionMatrix();
      }
      function F(e) {
        m > V && R(e), (V += e);
        var t = 0.001 * V;
        H.update(e);
        var n = H.state.pos,
          o = H.state.yaw,
          r = H.state.pitch,
          i = H.state.roll;
        (z.sky.position.x = n.x),
          (z.sky.position.y = n.y),
          a.update(z.grass, t, n.x + Math.cos(o) * l, n.y + Math.sin(o) * l),
          I.position.copy(n),
          (I.rotation.z = o),
          (I.rotation.y = -r),
          (I.rotation.x = i),
          M();
      }
      function M() {
        var e = Math.abs(o.difAngle(g, H.state.yaw)),
          t = 1.375 * Math.abs(o.difAngle(h, H.state.pitch)),
          n = Math.sqrt(e * e + t * t);
        if (v > n) {
          var r = p * Math.pow((v - n) / (1 + p), 0.75);
          (z.sunFlare.material.opacity = Math.max(0, r)),
            (z.sunFlare.visible = !0);
        } else z.sunFlare.visible = !1;
      }
      function R(e) {
        V + e >= m
          ? ((z.fade.material.opacity = 0), (z.fade.visible = !1))
          : (z.fade.material.opacity = 1 - Math.pow(V / m, 2));
      }
      function C() {
        _.render(k, P);
      }
      var S = n.$e("app_canvas"),
        _ = new THREE.WebGLRenderer({
          canvas: S,
          antialias: w,
          clearColor: 16777215,
          clearAlpha: 1,
          alpha: !0
        });
      if (!_)
        return console.error("Failed to create THREE.WebGLRenderer"), null;
      var A = 10 * l,
        T = 2 * l,
        P = new THREE.PerspectiveCamera(45, y / x, 1, u),
        z = {
          ground: null,
          grass: null,
          sky: null,
          sunFlare: null,
          fade: null
        },
        k = new THREE.Scene();
      (P.rotation.order = "ZXY"),
        (P.rotation.x = 0.5 * Math.PI),
        (P.rotation.y = 0.5 * Math.PI),
        (P.rotation.z = Math.PI),
        P.up.set(0, 0, 1);
      var I = new THREE.Object3D();
      (I.rotation.order = "ZYX"),
        I.add(P),
        k.add(I),
        (_.sortObjects = !1),
        (z.grass = a.createMesh({
          numBlades: t,
          radius: l,
          texture: e.textures.grass,
          fogColor: f,
          fogFar: A,
          grassFogColor: d,
          grassFogFar: T
        })),
        k.add(z.grass),
        (z.ground = i.createMesh({
          texture: e.textures.ground,
          fogColor: f,
          fogFar: A,
          grassFogColor: d,
          grassFogFar: T
        })),
        k.add(z.ground),
        (z.sky = s.createMesh(e.textures.skydome, 0.95 * u, 0.95 * u)),
        k.add(z.sky),
        (z.sky.position.z = -25),
        (z.fade = new THREE.Mesh(
          new THREE.PlaneBufferGeometry(6, 4, 1, 1),
          new THREE.MeshBasicMaterial({
            color: 16777215,
            fog: !1,
            transparent: !0,
            opacity: 1,
            depthTest: !1,
            depthWrite: !1
          })
        )),
        (z.fade.position.x = 2),
        (z.fade.rotation.y = 1.5 * Math.PI),
        I.add(z.fade),
        (z.sunFlare = new THREE.Mesh(
          new THREE.PlaneBufferGeometry(6, 4, 1, 1),
          new THREE.MeshBasicMaterial({
            color: 16775236,
            fog: !1,
            transparent: !0,
            opacity: 0,
            depthTest: !1,
            depthWrite: !1,
            blending: THREE.AdditiveBlending
          })
        )),
        (z.sunFlare.position.x = 2.05),
        (z.sunFlare.rotation.y = 1.5 * Math.PI),
        (z.sunFlare.visible = !1),
        I.add(z.sunFlare);
      var H = r["default"](),
        L = Date.now(),
        V = 0;
      return E(y, x), { doFrame: b, resize: E };
    }
    var u = 1e3,
      c = 67,
      f = new THREE.Color(0.92, 0.94, 0.98),
      d = new THREE.Color(0.46, 0.56, 0.38),
      p = 0.25,
      v = 1.1,
      g = 1.5 * Math.PI,
      h = 0.2,
      m = 2e3;
    t.World = l;
  }),
  define("app", [
    "require",
    "exports",
    "util",
    "loader",
    "input",
    "anim",
    "fullscreen",
    "browser",
    "world"
  ], function(e, t, n, o, r, a, i, s, l) {
    "use strict";
    function u() {
      function e() {
        return n.$e("app_canvas_container")
          ? n.detectWebGL()
            ? (h(), u(), t(), window.addEventListener("resize", h, !1), !0)
            : ((n.$e("loading_text").textContent = "WebGL unavailable."), !1)
          : (console.error("app_canvas_container element not found in page"),
            !1);
      }
      function t() {
        var e = s.isMobile.any ? "mobile" : "desktop",
          t = c[e],
          o = n.$i("sel_devicepower");
        o.value = e;
        var r = n.$i("inp_blades");
        r.value = t.blades.toString();
        var a = n.$i("inp_depth");
        (a.value = t.depth.toString()),
          (n.$i("chk_fullscreen").checked = !1),
          (n.$i("chk_fullscreen").onchange = function() {
            i.toggle(n.$e("app_container"));
          }),
          (o.onchange = function(e) {
            var t = c[o.value],
              i = t.blades.toString(),
              s = t.depth.toString();
            (r.value = i),
              (a.value = s),
              (n.$e("txt_blades").textContent = i),
              (n.$e("txt_depth").textContent = s);
          }),
          (n.$e("txt_blades").textContent = t.blades.toString()),
          (n.$e("txt_depth").textContent = t.depth.toString()),
          (r.onchange = function(e) {
            n.$e("txt_blades").textContent = r.value;
          }),
          (a.onchange = function(e) {
            n.$e("txt_depth").textContent = a.value;
          });
      }
      function u() {
        var e = o.Loader();
        e.load(
          {
            textures: [
              { name: "grass", url: "data/grass.jpg" },
              { name: "skydome", url: "data/skydome.jpg" },
              { name: "ground", url: "data/ground.jpg" }
            ]
          },
          p,
          f,
          d
        );
      }
      function f(e) {
        var t = Math.floor(90 * e);
        n.$e("loading_bar").style.width = t + "%";
      }
      function d(e) {
        n.$e("loading_text").textContent = e;
      }
      function p(e) {
        (m = e),
          (n.$e("loading_bar").style.width = "100%"),
          (n.$e("loading_text").innerHTML = "&nbsp;"),
          setTimeout(function() {
            (n.$e("loading_bar_outer").style.visibility = "hidden"),
              (n.$e("config_block").style.visibility = "visible"),
              (n.$e("btn_start").onclick = function() {
                a.fadeOut(n.$e("loading_block"), 80, function() {
                  (n.$e("loading_block").style.display = "none"),
                    E || (n.$e("title_bar").style.display = "block"),
                    (n.$e("btn_fullscreen").onclick = function() {
                      console.log("toggling fullscreen"),
                        i.toggle(n.$e("app_container"));
                    }),
                    (n.$e("btn_restart").onclick = function() {
                      document.location.reload();
                    }),
                    v();
                });
              });
          }, 10);
      }
      function v() {
        r.init();
        var e = +n.$i("inp_blades").value,
          t = +n.$i("inp_depth").value,
          o = !!n.$i("chk_antialias").checked;
        (y = l.World(m, e, t, w, b, o)), g();
      }
      function g() {
        y.doFrame(), requestAnimationFrame(g);
      }
      function h() {
        if (((w = x.clientWidth), (b = x.clientHeight), y)) y.resize(w, b);
        else {
          var e = n.$e("app_canvas");
          (e.width = w), (e.height = b);
        }
        var t = i.is();
        t !== E &&
          ((n.$e("title_bar").style.display = t ? "none" : "block"), (E = t));
      }
      var m,
        y,
        x = n.$e("app_canvas_container"),
        w = 640,
        b = 480,
        E = i.is();
      return { run: e };
    }
    var c = {
      mobile: { blades: 2e4, depth: 50 },
      laptop: { blades: 4e4, depth: 65 },
      desktop: { blades: 65e3, depth: 85 },
      desktop2: { blades: 15e4, depth: 120 },
      gamerig: { blades: 3e5, depth: 200 }
    };
    Object.defineProperty(t, "__esModule", { value: !0 }), (t["default"] = u);
  }),
  define("main", ["require", "exports", "app"], function(e, t, n) {
    "use strict";
    function o() {
      n["default"]().run();
    }
    t.boot = o;
  });
