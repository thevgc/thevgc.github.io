import {} from "three";
// import Stars from "~/static/data/star-data.json";
export default {
  data() {
    return {
      starData: {},
      starfield: [
        "/images/starfield/front.png",
        "/images/starfield/back.png",
        "/images/starfield/left.png",
        "/images/starfield/right.png",
        "/images/starfield/top.png",
        "/images/starfield/bottom.png"
      ],
      starTextures: [],
    };
  },
  meta: {},
  props: {},
  mounted() {
    this.loadStarData();
  },
  methods: {
    loadStarData() {
      $.getJSON("/data/star-data.json", {}, (data) => {
        //init typed arrays for star data
        let n = data.length;

        let starData = {
          dist: new Float64Array(n),
          proper: new Array(n),
          x: new Float64Array(n),
          y: new Float64Array(n),
          z: new Float64Array(n),
          spect: new Array(n),
          mag: new Float64Array(n),
          count: n,
          absmag: new Float64Array(n),
          con: new Array(n),
          bf: new Array(n),
          gl: new Array(n)
        };

        //populated typed arrays with star data
        var i = 0;
        while (i < n) {
          starData.dist[i] = data[i].dist;

          starData.proper[i] = data[i].proper;
          starData.x[i] = data[i].x;
          starData.y[i] = data[i].y;
          starData.z[i] = data[i].z;
          starData.spect[i] = data[i].spect;
          starData.mag[i] = data[i].mag;
          starData.absmag[i] = data[i].absmag;
          starData.con[i] = data[i].con;
          starData.bf[i] = data[i].bf;
          starData.gl[i] = data[i].gl;

          i++;
        }

        // Modernizr.addTest("highres", function() {
        //   // for opera
        //   var ratio = "2.99/2";
        //   // for webkit
        //   var num = "1.499";
        //   var mqs = [
        //     "only screen and (-o-min-device-pixel-ratio:" + ratio + ")",
        //     "only screen and (min--moz-device-pixel-ratio:" + num + ")",
        //     "only screen and (-webkit-min-device-pixel-ratio:" + num + ")",
        //     "only screen and (min-device-pixel-ratio:" + num + ")"
        //   ];
        //   var isHighRes = false;

        //   // loop through vendors, checking non-prefixed first
        //   for (var i = mqs.length - 1; i >= 0; i--) {
        //     isHighRes = Modernizr.mq(mqs[i]);
        //     // if found one, return early
        //     if (isHighRes) {
        //       return isHighRes;
        //     }
        //   }
        //   // not highres
        //   return isHighRes;
        // });

        //rendering appears to be partially broken on iOS 8 on latest version of three.js iOS 9 has about 90% market
        //share so we can recommend users update to that version
        //TODO: add three-orbit-controls library to allow mouse controls to be used by default on devices that don't
        //support motion controls

        //TODO: move these checks out into a first-run function along with the FPS test to determin if device is capable
        //of running the experience. Magnometer should be optional as it is only required to get the correct
        //orientation, but user should be warned that their direction won't be accurate
        this.starData = starData;
      });
    }
  }
};
