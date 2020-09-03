/******/ (function (modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if (installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
      /******/
    }
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
      /******/
    };
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
    /******/
  }
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function (exports, name, getter) {
/******/ 		if (!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
      /******/
    }
    /******/
  };
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function (exports) {
/******/ 		if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      /******/
    }
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
    /******/
  };
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function (value, mode) {
/******/ 		if (mode & 1) value = __webpack_require__(value);
/******/ 		if (mode & 8) return value;
/******/ 		if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
    /******/
  };
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function (module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
    /******/
  };
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
  /******/
})
/************************************************************************/
/******/({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no static exports found */
/***/ (function (module, exports) {

      function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

      function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

      function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



      const button = document.getElementById("btn");

      button.style.display = "none";

      /*  PARTICLE CODE STARTS HERE  */


      var canvas = document.querySelector('canvas');
      var c = canvas.getContext('2d');
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      var mouse = {
        x: innerWidth / 2,
        y: innerHeight / 2
      };
      var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];
      addEventListener('resize', function () {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        init();
      });

      function distance(x1, y1, x2, y2) {
        var xDist = x2 - x1;
        var yDist = y2 - y1;
        return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
      }

      function randomIntFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      } // Objects


      var Particle = /*#__PURE__*/function () {
        function Particle(x, y, radius, color) {
          _classCallCheck(this, Particle);

          this.x = x;
          this.y = y;
          this.velocity = {
            x: Math.random() - 0.5,
            y: Math.random() - 0.5
          };
          this.radius = radius;
          this.color = color;
        }

        _createClass(Particle, [{
          key: "draw",
          value: function draw() {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.strokeStyle = this.color;
            c.stroke();
            c.closePath();
          }
        }, {
          key: "update",
          value: function update(particles) {
            this.draw();

            for (var i = 0; i < particles.length; i++) {
              if (this === particles[i]) continue; // if (distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0)
              // console.log('has collided');
            }

            if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
              this.velocity.x = -this.velocity.x;
            }

            if (this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
              this.velocity.y = -this.velocity.y;
            }

            this.x += this.velocity.x;
            this.y += this.velocity.y;
          }
        }]);

        return Particle;
      }();

      var count = 47;
      function getUserdistance() {
        if (count > 7) {
          count--;
        }
        if (count % 8 === 0) {
          console.log(count);
          init();
          onLocationFound();
          displayButton();
          requestAnimationFrame(newLocations);
        }
      }

      function displayButton() {
        if (count < 10) {
          button.style.display = "inline-block";
        }
      }

      setInterval(getUserdistance, 1000);
      var particles;

      function init() {
        particles = [];

        for (var i = 0; i < count; i++) {
          var radius = 20;
          var x = randomIntFromRange(radius, canvas.width - radius);
          var y = randomIntFromRange(radius, canvas.height - radius);
          var color = 'red';

          if (i !== 0) {
            for (var j = 0; j < particles.length; j++) {
              if (distance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
                x = randomIntFromRange(radius, canvas.width - radius);
                y = randomIntFromRange(radius, canvas.height - radius);
                j = -1;
              }
            }
          }

          particles.push(new Particle(x, y, radius, color));
        }
      }


      function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(function (Particle) {
          Particle.update(particles);
        });
      }

      init();
      animate();



      /* MAP PART OF THE CODE */


      const newlocation = [];
      const userlocation = [];

      var map = new L.Map("mapid", {
        zoom: 14
      });

      var coronaIcon = L.icon({
        iconUrl: 'Image2.png',
        iconSize: [50, 50],
        iconAnchor: [25, 16]

      });

      var coronaIcon2 = L.icon({
        iconUrl: 'Image.jpeg',
        iconSize: [50, 50],
        iconAnchor: [25, 16]

      });

      // var popup = L.popup();

      map.locate({ setView: true, watch: false, maxZoom: 20 });
      map.on('locationfound', onLocationFound);
      map.on('locationerror', onLocationError);

      function onLocationFound(e) {
        console.log(newlocation);
        if (newlocation == 0) {
          var mylocation = [e.latitude, e.longitude];

          newlocation.push(mylocation[0], mylocation[1]);
          userlocation.push(mylocation[0], mylocation[1]);
          var distance = map.distance(mylocation, [55.711107, 12.473537])
          // var userDistance = Math.round(distance / 500);
          // console.log(userDistance);
          newLocations();
        }
      }

      var myMarker = {};

      function newLocations() {
        let loc1 = [newlocation[0] + 0.0002, newlocation[1] + 0.00025];
        let loc2 = [newlocation[0] - 0.0002, newlocation[1] - 0.0003];
        var loc3 = [userlocation[0] += 0.00002, userlocation[1] -= 0.000062];

        L.marker([loc1[0], loc1[1]], { icon: coronaIcon2 }).addTo(map)
          .bindPopup("<b>Sebastian</b>").openPopup();
        L.marker([loc2[0], loc2[1]], { icon: coronaIcon }).addTo(map)
          .bindPopup("<b>Marie</b>").openPopup();
        let radius = 15;
        map.removeLayer(myMarker);

          myMarker = L.marker(loc3).addTo(map)
            .bindPopup("<b>Your Position</b><br>Keep Distance To Limit Covid Spread!</br>").openPopup();
          L.circle(mylocation, radius).addTo(map);

        }

        function onLocationError(e) {
          alert(e.message);
        }



        /***/
      })

  /******/
});
//# sourceMappingURL=canvas.bundle.js.map