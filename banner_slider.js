document.addEventListener("DOMContentLoaded", function () {
  class Sketch {
    constructor(opts) {
      this.container = opts.container;
      this.autoplay = opts.autoplay || false;
      this.autoplayTime = opts.autoplayTime || 800;
      this.fragment = opts.fragment;
      this.uniforms = opts.uniforms;
      this.duration = opts.duration || 1;
      this.easing = opts.easing || 'easeInOut';
      this.displacement = opts.displacementMap;

      this.clicker = opts.clickable ? this.container : null;
      this.images = opts.images;

      this.scene = new THREE.Scene();
      this.vertex = `varying vec2 vUv;void main() {vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}`;

      this.renderer = new THREE.WebGLRenderer();
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this.width, this.height);
      this.renderer.setClearColor(0xeeeeee, 1);

      this.width = this.container.offsetWidth;
      this.height = this.container.offsetHeight;
      this.container.appendChild(this.renderer.domElement);

      this.camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.001,
        1000
      );

      this.camera.position.set(0, 0, 2);
      this.time = 0;
      this.current = 0;
      this.textures = [];
      this.last = 0;

      this.paused = true;
      this.initiate(() => {
        // console.log(this.textures);
        this.setupResize();
        this.settings();
        this.addObjects();
        this.resize();
        this.play();
        this.autoplay ? this.Autoplay() : this.clickEvent();
      })
    }

    initiate(cb) {
      const promises = [];
      let that = this;
      this.images.map((url, i) => {
        // console.log(url);
        let promise = new Promise(resolve => {
          that.textures[i] = new THREE.TextureLoader().load(url, resolve);
        });
        promises.push(promise);
      })

      Promise.all(promises).then(() => {
        cb();
      });
    }

    Autoplay(now = 0) {
      if (!this.last || now - this.last >= this.autoplayTime) {
        this.last = now;
        this.next();
      }
      requestAnimationFrame(this.Autoplay.bind(this));
    }

    clickEvent() {
      this.clicker.addEventListener('click', () => {
        this.next();
      })
    }

    settings() {
      this.settings = { progress: 0.5 };
      Object.keys(this.uniforms).forEach((item) => {
        this.settings[item] = this.uniforms[item].value;
      })
    }

    setupResize() {
      window.addEventListener("resize", this.resize.bind(this));
    }

    resize() {
      this.width = this.container.offsetWidth;
      this.height = this.container.offsetHeight;
      this.renderer.setSize(this.width, this.height);
      this.camera.aspect = this.width / this.height;


      // image cover
      this.imageAspect = this.textures[0].image.height / this.textures[0].image.width;
      let a1; let a2;
      if (this.height / this.width > this.imageAspect) {
        a1 = (this.width / this.height) * this.imageAspect;
        a2 = 1;
      } else {
        a1 = 1;
        a2 = (this.height / this.width) / this.imageAspect;
      }

      this.material.uniforms.resolution.value.x = this.width;
      this.material.uniforms.resolution.value.y = this.height;
      this.material.uniforms.resolution.value.z = a1;
      this.material.uniforms.resolution.value.w = a2;

      const dist = this.camera.position.z;
      const height = 1;
      this.camera.fov = 2 * (180 / Math.PI) * Math.atan(height / (2 * dist));

      this.plane.scale.x = this.camera.aspect;
      this.plane.scale.y = 1;

      this.camera.updateProjectionMatrix();
    }

    addObjects() {
      let that = this;
      this.material = new THREE.ShaderMaterial({
        extensions: {
          derivatives: "#extension GL_OES_standard_derivatives : enable"
        },
        side: THREE.DoubleSide,
        uniforms: {
          time: { type: "f", value: 0 },
          progress: { type: "f", value: 0 },
          border: { type: "f", value: 0 },
          intensity: { type: "f", value: 0 },
          scaleX: { type: "f", value: 40 },
          scaleY: { type: "f", value: 40 },
          transition: { type: "f", value: 40 },
          swipe: { type: "f", value: 0 },
          width: { type: "f", value: 0 },
          radius: { type: "f", value: 0 },
          texture1: { type: "f", value: this.textures[0] },
          texture2: { type: "f", value: this.textures[1] },
          displacement: { type: "f", value: new THREE.TextureLoader().load(this.displacement) },
          resolution: { type: "v4", value: new THREE.Vector4() },
        },
        wireframe: false,
        vertexShader: this.vertex,
        fragmentShader: this.fragment
      });

      this.geometry = new THREE.PlaneGeometry(1, 1, 2, 2);

      this.plane = new THREE.Mesh(this.geometry, this.material);
      this.scene.add(this.plane);
    }

    stop() {
      this.paused = true;
    }

    play() {
      this.paused = false;
      this.render();
    }

    next() {
      if (this.isRunning) return;
      this.isRunning = true;
      let len = this.textures.length;
      let nextTexture = this.textures[(this.current + 1) % len];
      this.material.uniforms.texture2.value = nextTexture;
      let tl = gsap.timeline();
      tl.to(this.material.uniforms.progress, this.duration, {
        value: 1,
        ease: Power2[this.easing],
        onComplete: () => {
          // console.log('FINISH');
          this.current = (this.current + 1) % len;
          this.material.uniforms.texture1.value = nextTexture;
          this.material.uniforms.progress.value = 0;
          this.isRunning = false;
        }
      })
    }
    render() {
      if (this.paused) return;
      this.time += 0.05;
      this.material.uniforms.time.value = this.time;

      Object.keys(this.uniforms).forEach((item) => {
        this.material.uniforms[item].value = this.settings[item];
      });

      requestAnimationFrame(this.render.bind(this));
      this.renderer.render(this.scene, this.camera);
    }
  }
  const banner_slider = document.getElementById("slider");
  if (banner_slider != undefined) {
    let imgSrc = [];
    banner_slider.querySelectorAll('img').forEach((el) => {
      imgSrc.push(el.src);
      el.remove();
    });
    new Sketch({
      container: banner_slider,
      autoplay: true,
      autoplayTime: 5000,
      clickable: false,
      duration: 10,
      easing: 'easeOut',
      uniforms: {
        width: { value: 0.35, type: 'f', min: 0., max: 1 },
      },
      fragment: `
		uniform float time;
		uniform float progress;
		uniform float width;
		uniform float scaleX;
		uniform float scaleY;
		uniform float transition;
		uniform float radius;
		uniform float swipe;
		uniform sampler2D texture1;
		uniform sampler2D texture2;
		uniform sampler2D displacement;
		uniform vec4 resolution;

		varying vec2 vUv;
		varying vec4 vPosition;
		vec2 mirrored(vec2 v) {
			vec2 m = mod(v,2.);
			return mix(m,2.0 - m, step(1.0 ,m));
		}

		void main()	{
		  vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
		  vec4 noise = texture2D(displacement, mirrored(newUV+time*0.04));
		  // float prog = 0.6*progress + 0.2 + noise.g * 0.06;
		  float prog = progress*0.8 -0.05 + noise.g * 0.06;
		  float intpl = pow(abs(smoothstep(0., 1., (prog*2. - vUv.x + 0.5))), 10.);
		  
		  vec4 t1 = texture2D( texture1, (newUV - 0.5) * (1.0 - intpl) + 0.5 ) ;
		  vec4 t2 = texture2D( texture2, (newUV - 0.5) * intpl + 0.5 );
		  gl_FragColor = mix( t1, t2, intpl );
		}
	`,
      displacementMap: 'https://soumya-webskitters-pal.github.io/nextgen/disp1.jpg',
      images: imgSrc,
    });
  }
})

