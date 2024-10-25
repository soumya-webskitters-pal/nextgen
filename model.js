const hostURL = "https://soumya-webskitters-pal.github.io/nextgen";

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/addons/renderers/CSS2DRenderer.js";
// import { LightProbeGenerator } from 'three/addons/lights/LightProbeGenerator.js';
// import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
// import { EffectComposer } from 'addons/postprocessing/EffectComposer.js';
// import { RenderPass } from 'addons/postprocessing/RenderPass.js';
// import { ShaderPass } from 'addons/postprocessing/ShaderPass.js';
// import { BloomPass } from 'addons/postprocessing/BloomPass.js';
// import { FilmPass } from 'addons/postprocessing/FilmPass.js';
// import Stats from 'addons/libs/stats.module.js';
// import { FocusShader } from 'addons/shaders/FocusShader.js';

const model_wrapper = document.querySelector(".model_wrapper");
if (!model_wrapper != undefined) {
  //UI
  const container = model_wrapper.querySelector(".canvas_area");
  const modelViewer = model_wrapper.querySelector(".enable_model");

  //add tooltip
  const tooltip = document.createElement("div");
  tooltip.classList.add("info_tooltip");
  container.appendChild(tooltip);

  //info modal
  const info_modal = container.querySelector(".arena_modal");

  //reset button
  const resetCam = container.querySelector(".reset");

  window.addEventListener("DOMContentLoaded", modelApp);
  modelViewer.addEventListener("click", function () {
    gsap.to(modelViewer, {
      pointerEvents: "none",
      opacity: 0,
    });
    gsap.to(".imms_container", {
      duration: 0.5,
      pointerEvents: "none",
      opacity: 0,
      onComplete: () => {
        gsap.to(container, {
          pointerEvents: "all",
        });
        gsap.to(info_modal, {
          opacity: 1,
          pointerEvents: "all",
          yPercent: 0,
          duration: 0.5,
        });
      },
    });
  });

  function modelApp() {
    const container = document.getElementById("canvas");
    const loader = model_wrapper.querySelector(".sc_loader");
    const sizes = {
      width: container.clientWidth,
      height: container.clientHeight,
    };
    var scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(
        45,
        sizes.width / sizes.height,
        0.001,
        1000
      ),
      renderer = new THREE.WebGLRenderer({
        logarithmicDepthBuffer: false,
        antialias: true,
        alpha: true,
      }),
      labelRenderer = new CSS2DRenderer(),
      textureLoader = new THREE.TextureLoader(),
      // controls = new OrbitControls(camera, renderer.domElement);
      controls = new OrbitControls(camera, labelRenderer.domElement);

    var world = new THREE.Object3D();
    const model = {
      loaded: false,
      src: `${hostURL}/model_new.glb`,
      // src: "model_new.glb",
      // envMap: textureLoader.load(`${hostURL}/texture/env_map.webp`),
      element: {
        // vrGradient: textureLoader.load(`${hostURL}/texture/vr_gradient.webp`),
        wall: {
          name: "room",
          color: ["#0d0d0d", "#3d3530"],
          click: false,
          text: "Room",
          id: "",
        },
        floor: {
          name: "floor",
          map: textureLoader.load(`${hostURL}/texture/Vr_floor.webp`),
          lightMap: textureLoader.load(
            `${hostURL}/texture/Vr_floor_lightmap.webp`
          ),
          color: ["#f1f1f1", "#38383a"],
          click: false,
          text: "Arena",
          id: "",
        },
        poster: {
          name: ["poster_1", "poster_2"],
          map: textureLoader.load(`${hostURL}/texture/Vr_poster.webp`),
          color: "#000000",
          click: false,
          text: "Poster",
          id: "",
        },
        cage: {
          name: "metal",
          color: ["#777777", "#000000"],
          click: false,
          text: "Arena",
          id: "",
        },
        camera: {
          name: "camera",
          map: textureLoader.load(`${hostURL}/texture/Vr_camera.webp`),
          color: "#858585",
          click: true,
          text: "Camera",
          id: "camera_item",
        },
        box: {
          name: "box",
          map: textureLoader.load(`${hostURL}/texture/Vr_box.webp`),
          color: "#976b3c",
          click: false,
          text: "Box",
          id: "",
        },
        sensorBody: {
          name: ["scent_unit_body", "scent_unit_body001"],
          map: textureLoader.load(`${hostURL}/texture/Vr_sensor.webp`),
          color: "#535353",
          click: true,
          text: "Scent Diffusion",
          id: "scent_item",
        },
        sensorCap: {
          name: ["scent_unit_cap", "scent_unit_cap001"],
          color: "#ff8700",
          click: true,
          text: "Scent Diffusion",
          id: "",
        },
        screen: {
          name: "screen",
          map: textureLoader.load(`${hostURL}/texture/Vr_screen.webp`),
          lightMap: textureLoader.load(
            `${hostURL}/texture/Vr_screen_lightmap.webp`
          ),
          color: "#ffffff",
          click: false,
          text: "Screen",
          id: "",
        },
        fan: {
          name: "fan",
          color: "#3a3a3a",
          click: true,
          text: "Fan",
          id: "wind_item",
        },
        heatbox: {
          name: "hit_unit",
          color: "#5a4230",
          click: true,
          text: "Heating unit",
          id: "heat_item",
        },
        heatboxStand: {
          name: "hit_unit_stand",
          color: "#000000",
          click: false,
          text: "Heating unit wire",
        },
        metalwheel: {
          name: "metal001",
          color: "#555555",
          text: "Metal wheel",
          id: "",
        },
        /* men: {
                    name: "men_character",
                    maps: [
                        {
                            name: 'chest', texture: textureLoader.load(`${hostURL}/texture/men/chest.webp`),
                        },
                        { name: 'eye', texture: textureLoader.load(`${hostURL}/texture/men/eye.webp`) },
                        { name: 'head', texture: textureLoader.load(`${hostURL}/texture/men/head.webp`) },
                        { name: 'leg', texture: textureLoader.load(`${hostURL}/texture/men/leg.webp`), color: "#000000" },
                    ],
                    click: false,
                    text: "Player",
                    id: "",
                },
                women: {
                    name: "Girl_character",
                    maps: [
                        {
                            name: 'Accessoires',
                            color: "#000000",
                        },
                        { name: 'body', color: "#947a69", texture: textureLoader.load(`${hostURL}/texture/girl/body.webp`) },
                        {
                            name: 'Clothing', texture: textureLoader.load(`${hostURL}/texture/girl/cloth.webp`),
                            color: "#383838",
                        },
                        { name: 'eyes', texture: textureLoader.load(`${hostURL}/texture/girl/eye.webp`) },
                        { name: 'hair', color: "#000000" },
                    ],
                    click: false,
                    text: "Player",
                    id: "",
                },
                gun: {
                    name: "GUN",
                    map: textureLoader.load(`${hostURL}/texture/gun.webp`),
                    bumpMap: textureLoader.load(`${hostURL}/texture/gun_bump.webp`),
                    color: "#ffffff",
                    click: false,
                    text: "Gun",
                    id: "",
                }*/
      },
      fog: {
        color: {
          h: 215,
          s: 80,
          l: 80,
        },
        near: 0.01,
        far: 272,
      },
      ambient: {
        color: "#ffffff",
        intensity: 2.5,
      },
      theme: {
        color: "#00d3ff",
        intensity: 1,
        map: textureLoader.load(`${hostURL}/texture/lightmap.webp`),
      },
      shadow: {
        color: "#000000",
      },
      heaterLight: {
        color: ["#ff0000", "#ff623e"],
      },
      labels: {
        color: "#000000",
        size: "1.5vw",
        weight: "bold",
        alignment: "center",
        background: "#ffffff",
        text: ["250 ft", "150 ft"],
      },
    };

    const cameraResetPos = new THREE.Vector3(0, 8, 38);
    // const lookAt = new THREE.Vector3(0, 0, 0);
    var interactiveMeshes = [];
    let zoomed = false;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const mousePxPositionOnClickStart = new THREE.Vector2();

    let xSetter = gsap.quickSetter(tooltip, "x", "px");
    let ySetter = gsap.quickSetter(tooltip, "y", "px");

    //add bg color
    scene.background = new THREE.Color("#000000");
    controls.enabled = false;

    //// reset camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    controls.enabled = true;
    controls.enableRotate = true;
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.minDistance = 5;
    controls.maxDistance = 35;
    controls.minPolarAngle = Math.PI / 2.61;
    controls.maxPolarAngle = Math.PI / 2.1;
    controls.minAzimuthAngle = -Math.PI / 4.5;
    controls.maxAzimuthAngle = Math.PI / 2.5;

    // controls.minDistance = 5;
    // controls.maxDistance = 45;
    // controls.minPolarAngle = -Math.PI / 2;
    // controls.maxPolarAngle = Math.PI / 2;
    // controls.minAzimuthAngle = -Math.PI / 2;
    // controls.maxAzimuthAngle = Math.PI / 2;

    function init() {
      gsap.set(container, {
        pointerEvents: "none",
      });

      //3D renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      THREE.ColorManagement.enabled = true;
      THREE.ColorManagement.legacyMode = false;
      // renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      // renderer.toneMapping = THREE.ACESFilmicToneMapping;
      // renderer.toneMapping = THREE.ReinhardToneMapping;
      // renderer.toneMappingExposure = Math.pow(1.98, 1.0);

      renderer.gammaInput = true;
      renderer.gammaOutput = true;
      renderer.gammaFactor = 0.08;

      // first render
      container.appendChild(renderer.domElement);

      //2d label renderer
      labelRenderer.setSize(window.innerWidth, window.innerHeight);
      labelRenderer.domElement.style.position = "absolute";
      labelRenderer.domElement.style.top = "0px";
      container.appendChild(labelRenderer.domElement);

      loadModel();
      addLight();
      renderScene();

      //camera
        zoomInTimeline(cameraResetPos, true, true);
    }

    //// enable setup
    function enableSetup() {
      gsap.set(info_modal, {
        opacity: 0,
        pointerEvents: "none",
        yPercent: 100,
      });
      gsap.to(loader, {
        delay: 0.5,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          loader.remove();

          info_modal
            .querySelector('.modal_data[data-id="arena"]')
            .classList.add("show");

          gsap.set(resetCam, {
            opacity: 0,
            pointerEvents: "none",
          });
        },
      });

      resetCam.addEventListener("click", () => {
        gsap.to(resetCam, { opacity: 0, pointerEvents: "none", duration: 0.5 });
        controls.enabled = true;
        zoomInTimeline(cameraResetPos, true, true);
        info_modal.querySelectorAll(".modal_data").forEach((e, i) => {
          e.dataset.id == "arena"
            ? e.classList.add("show")
            : e.classList.remove("show");
        });
      });
    }

    //// render scene
    function renderScene() {
      if (model.loaded) {
        controls.update();
      }
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
      requestAnimationFrame(renderScene);
    }

    //// load model
    function loadModel() {
      new GLTFLoader().load(
        // resource URL
        model.src,
        // called when the resource is loaded
        function (gltf) {
          world = gltf.scene.children[0];
          scene.add(world);
          addTexture();
          model.loaded = true;
          enableSetup();
          console.log("world:", world);
        },
        function (xhr) {},
        function (error) {
          console.error(error);
        }
      );
    }

    //// add light
    //////////////////////
    function addLight() {
      //// Env light
      //  scene.add(new THREE.AmbientLight(model.ambient.color, model.ambient.intensity / 5));
      // modifyShadow(ambientFrontLight1);

      ////ambient light - room
      // ambient front light1
      const ambientFrontLight1 = new THREE.DirectionalLight(
        model.ambient.color,
        model.ambient.intensity / 5
      );
      ambientFrontLight1.name = "ambientFrontLight1";
      ambientFrontLight1.position.set(-10.5, 5, 35);
      ambientFrontLight1.target.position.set(
        ambientFrontLight1.position.x + 12,
        ambientFrontLight1.position.y,
        0
      );
      ambientFrontLight1.castShadow = true;
      scene.add(ambientFrontLight1);
      // scene.add(new THREE.DirectionalLightHelper(ambientFrontLight1, 0.5));
      // console.log(ambientFrontLight1);

      // ambient front light2
      const ambientFrontLight2 = new THREE.DirectionalLight(
        model.ambient.color,
        model.ambient.intensity / 5
      );
      ambientFrontLight2.name = "ambientFrontLight2";
      ambientFrontLight2.position.set(10.5, 5, 35);
      ambientFrontLight2.target.position.set(
        ambientFrontLight2.position.x - 12,
        ambientFrontLight2.position.y,
        0
      );
      ambientFrontLight2.castShadow = true;
      scene.add(ambientFrontLight2);
      // scene.add(new THREE.DirectionalLightHelper(ambientFrontLight2, 0.5));
      // console.log(ambientFrontLight2);

      // ambient front light3
      const ambientFrontLight3 = new THREE.DirectionalLight(
        model.ambient.color,
        model.ambient.intensity / 5
      );
      ambientFrontLight3.name = "ambientFrontLight3";
      ambientFrontLight3.position.set(0, 20, 45);
      ambientFrontLight3.target.position.set(
        ambientFrontLight3.position.x,
        10,
        0
      );
      ambientFrontLight3.castShadow = true;
      scene.add(ambientFrontLight3);
      // scene.add(new THREE.DirectionalLightHelper(ambientFrontLight3, 0.5));
      // console.log(ambientFrontLight3);

      ////room light
      // ambient 1
      const ambientLight1 = new THREE.HemisphereLight(
        model.ambient.color,
        model.ambient.color,
        model.ambient.intensity / 2
      );
      ambientLight1.name = "ambientLight1";
      ambientLight1.position.set(-50, 8, -5);
      scene.add(ambientLight1);
      // scene.add(new THREE.HemisphereLightHelper(ambientLight1, 0.5));

      // ambient 2
      const ambientLight2 = new THREE.HemisphereLight(
        model.ambient.color,
        model.ambient.color,
        model.ambient.intensity / 2
      );
      ambientLight2.name = "ambientLight2";
      ambientLight2.position.set(50, 8, -5);
      scene.add(ambientLight2);
      // scene.add(new THREE.HemisphereLightHelper(ambientLight2, 0.5));

      // const ambientLight3 = new THREE.DirectionalLight(model.ambient.color,  model.ambient.intensity / 10);
      // ambientLight3.name = 'ambientLight3';
      // ambientLight3.position.set(0, 12, 25);
      // ambientLight3.target.position.set(0, 5, 75);
      // scene.add(ambientLight3);
      // scene.add(new THREE.DirectionalLightHelper(ambientLight3, 0.5));

      //// celling light
      // ambient light-top 1
      const ambientLightTop1 = new THREE.DirectionalLight(
        model.ambient.color,
        model.ambient.intensity / 4
      );
      ambientLightTop1.name = "ambientLightTop1";
      ambientLightTop1.position.set(-11.5, 15, 15);
      ambientLightTop1.castShadow = true;
      ambientLightTop1.target.position.set(
        ambientLightTop1.position.x,
        0.1,
        ambientLightTop1.position.z - 5
      );
      scene.add(ambientLightTop1);
      // scene.add(new THREE.DirectionalLightHelper(ambientLightTop1, 0.5));
      // console.log(ambientLightTop1);

      // ambient light-top 2
      const ambientLightTop2 = new THREE.DirectionalLight(
        model.ambient.color,
        model.ambient.intensity / 4
      );
      ambientLightTop2.name = "ambientLightTop2";
      ambientLightTop2.position.set(11.5, 15, 15);
      ambientLightTop2.castShadow = true;
      ambientLightTop2.target.position.set(
        ambientLightTop2.position.x,
        0.1,
        ambientLightTop2.position.z - 5
      );
      scene.add(ambientLightTop2);
      // scene.add(new THREE.DirectionalLightHelper(ambientLightTop2, 0.5));
      // console.log(ambientLightTop2);

      // ambient light-top 3
      const ambientLightTop3 = new THREE.DirectionalLight(
        model.ambient.color,
        model.ambient.intensity / 4
      );
      ambientLightTop3.name = "ambientLightTop3";
      ambientLightTop3.position.set(0, 15, 15);
      ambientLightTop3.castShadow = true;
      ambientLightTop3.target.position.set(
        ambientLightTop3.position.x,
        0.1,
        ambientLightTop3.position.z - 5
      );
      scene.add(ambientLightTop3);
      // scene.add(new THREE.DirectionalLightHelper(ambientLightTop3, 0.5));
      // console.log(ambientLightTop3);

      //screen light
      var backscreenLight = GlowLight(
        { w: 43.0, h: 0.03 },
        { color1: model.ambient.color, color2: model.theme.color },
        0.05,
        0.5
      );
      backscreenLight.name = "backscreenLight";
      backscreenLight.rotation.x = Math.PI / 2;
      var backscreenLightBottom = backscreenLight.clone();
      backscreenLightBottom.position.set(0.05, 0.21, -4.55);
      scene.add(backscreenLightBottom);
      var backscreenLightTop = backscreenLightBottom.clone();
      backscreenLightTop.position.y = backscreenLightTop.position.y + 6.12;
      scene.add(backscreenLightTop);

      //heater light
      var heaterLight = new THREE.Group();
      var heaterLight1 = GlowLight(
        { w: 6.0, h: 0.01 },
        {
          color1: model.heaterLight.color[0],
          color2: model.heaterLight.color[1],
        },
        0.3,
        0.99
      );
      heaterLight1.name = "heaterLight";
      // heaterLight1.position.set(11.25, 15.55, 7.2);
      heaterLight1.position.set(11.25, 10.665, 7.2);
      var heaterLight2 = heaterLight1.clone();
      heaterLight2.position.z = heaterLight2.position.z - 0.34;
      heaterLight.add(heaterLight1, heaterLight2);
      scene.add(heaterLight);
      var heaterLight2 = heaterLight.clone();
      heaterLight2.position.x = -22;
      scene.add(heaterLight2);

      //room light
      const roomLight = new THREE.HemisphereLight(
        model.ambient.color,
        model.shadow.color,
        model.ambient.intensity / 2
      );
      roomLight.name = "roomLight";
      roomLight.position.set(-0.15, -15, 5);
      scene.add(roomLight);

      //add piller light
      let pillerLights = pillerLight({
        x: 0.2,
        y: 3.5,
        z: 19.2,
        r: 0.5,
        h: 8,
        color: model.theme.color,
        step: 18,
      });
      //piller light 1
      let pillerLight1 = pillerLights.clone();
      pillerLight1.name = "pillerLight1";
      scene.add(pillerLight1);

      //piller light 2
      let pillerLight2 = pillerLights.clone();
      pillerLight2.name = "pillerLight2";
      pillerLight2.position.z = -4;
      scene.add(pillerLight2);
      //piller light 3
      let pillerLight3 = pillerLights.clone();
      pillerLight3.name = "pillerLight3";
      pillerLight3.position.x = -21.6;
      scene.add(pillerLight3);
      //piller light 4
      let pillerLight4 = pillerLights.clone();
      pillerLight4.name = "pillerLight4";
      pillerLight4.position.x = 22.1;
      scene.add(pillerLight4);
      //piller light 5
      let pillerLight5 = pillerLights.clone();
      pillerLight5.name = "pillerLight5";
      pillerLight5.position.x = 22.1;
      pillerLight5.position.z = -4;
      scene.add(pillerLight5);
      //piller light 6
      let pillerLight6 = pillerLights.clone();
      pillerLight6.name = "pillerLight6";
      pillerLight6.position.x = -21.6;
      pillerLight6.position.z = -4;
      scene.add(pillerLight6);
    }

    function pillerLight(props) {
      var pillerLightGroup = new THREE.Group();
      pillerLightGroup.position.set(props.x, props.y, props.z);
      let lights = new THREE.PointLight(
        props.color,
        model.theme.intensity,
        4,
        8
      );
      //   lights.castShadow=true;
      lights.position.set(0, -2.8, 0);
      pillerLightGroup.add(lights);
      lights.name = "pillerLights";
      // console.log(lights);
      pillerLightGroup.add(
        new THREE.Mesh(
          new THREE.CylinderGeometry(props.r, props.r, props.h, 15, 8),
          new THREE.MeshBasicMaterial({
            color: props.color,
            transparent: true,
            alphaMap: model.theme.map,
          })
        )
      );
      return pillerLightGroup;
    }

    function GlowLight(dimention, colors, step, spread, map = false) {
      var glowLight = new THREE.Group();
      glowLight.position.x = 0;
      glowLight.position.y = step;
      glowLight.position.z = 4.5;
      for (var i = 0; i < 1; i += step) {
        glowLight.add(
          new THREE.Mesh(
            new THREE.BoxGeometry(
              dimention.w,
              dimention.h,
              0.1 + (i * i) / spread
            ),
            new THREE.MeshLambertMaterial({
              side: THREE.FrontSide,
              color: i < 0.15 ? colors.color1 : colors.color2,
              transparent: true,
              opacity: 1 - Math.pow(i, step),
              // alphaMap: map ? map : null
            })
          )
        );
      }
      return glowLight;
    }

    function modifyShadow(obj) {
      obj.castShadow = true;
      obj.shadow.mapSize.width = 1024;
      obj.shadow.mapSize.height = 1024;
      obj.shadow.camera.near = 0.001;
      obj.shadow.camera.far = 5000;
      obj.shadow.focus = 1;

      obj.angle = 1.25;
      obj.penumbra = 0.01;
      obj.decay = 0.1;
      obj.distance = 150;

      obj.target.updateMatrixWorld();
      scene.add(obj.target);
    }

    //// add texture
    //////////////////////

    //add 2d text
    // function addText(text, textOptions) {
    //     const option = {
    //         font: textOptions.font || "Arial",
    //         size: textOptions.size || 20,
    //         weight: textOptions.weight || "regular",
    //         align: textOptions.align || "center",
    //         vAlign: textOptions.vAlign || "middle",
    //         color: textOptions.color || "#ff0000",
    //     };
    //     const c = document.createElement('canvas');
    //     c.style.cssText = `
    // position: absolute;
    // z-index: 22;
    // top: 50px;
    // left: 50px;`;
    //     c.width = 1024; c.height = 1024;
    //     const ctx = c.getContext('2d');
    //     ctx.font = `${option.size}px ${option.font}`;
    //     ctx.textAlign = option.align;
    //     ctx.textBaseline = option.vAlign;
    //     ctx.fillStyle = option.color;
    //     let metrics = ctx.measureText(text);
    //     // ctx.font ="regular 500px Arial" //`${option.weight} ${option.size}px ${option.font}`;
    //     // console.log(metrics);
    //     var textWidth = metrics.width;
    //     var textHeight = option.size;
    //     //  console.log(textWidth, textHeight);
    //     ctx.fillText(text, textWidth / 2, c.height / 2 + textHeight / 2);

    //     let txtBox = new THREE.Group();
    //     var textTexture = new THREE.Texture(c);
    //     textTexture.needsUpdate = true;
    //     // console.log(textTexture);
    //     textTexture.wrapS = THREE.RepeatWrapping;
    //     textTexture.wrapT = THREE.RepeatWrapping;
    //     var textMaterial = new THREE.MeshPhongMaterial({
    //         map: textTexture,
    //         transparent: true,
    //         side: THREE.FrontSide,
    //         alphaMap: textTexture,
    //         displacementMap: textTexture,
    //         normalMap: textTexture,
    //         bumpMap: textTexture,
    //         // emmissive: option.color,
    //         //useScreenCoordinates: false
    //     });
    //     // console.log(textMaterial);
    //     let textTxt = new THREE.Mesh(new THREE.PlaneGeometry(8, 5, 10, 10), textMaterial);
    //     let textTxt2 = textTxt.clone();
    //     textTxt2.position.set(-4, 0, 0);
    //     textTxt2.rotation.set(0, -Math.PI, 0);
    //     txtBox.add(textTxt, textTxt2);

    //     return txtBox;
    //     // container.appendChild(c);
    // }

    function addTexture() {
      let elm = model.element;

      //add texture to room
      let roomMat = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        color: elm.wall.color[0],
        emissive: elm.wall.color[1],
        emissiveIntensity: 0.15,
        roughness: 0.3,
        metalness: 0.65,
        aoMap: model.theme.map,
      });
      let roomObj = world.getObjectByName(elm.wall.name);
      roomObj.receiveShadow = true;
      roomObj.matrixAutoUpdate = false;
      roomObj.material = roomMat;
      // console.log("room:", roomObj.material);

      //add base floor
      let baseFloorMat = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        color: elm.wall.color[0],
        emissive: elm.wall.color[1],
        color: elm.wall.color[0],
        roughness: 0.4,
        metalness: 0.25,
        aoMap: model.theme.map,
        emissiveIntensity: 0.05,
      });
      let baseFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(125.5, 60.5),
        baseFloorMat
      );
      baseFloor.name = elm.floor.name + "base";
      baseFloor.receiveShadow = true;
      baseFloor.position.set(0, 0.08, 20);
      baseFloor.rotation.x = Math.PI / 2;
      scene.add(baseFloor);
      // console.log("baseFloor:", baseFloor);

      //add stage floor
      let floorMat = new THREE.MeshStandardMaterial({
        color: elm.floor.color[0],
        roughness: 0.25,
        metalness: 0.65,
        side: THREE.DoubleSide,
        map: elm.floor.map,
        alphaMap: elm.floor.lightMap,
        // aoMap: elm.floor.map,
        bumpMap: elm.floor.map,
        bumpScale: 2,
        displacementMap: elm.floor.lightMap,
        displacementScale: -0.01,
        // emissive: elm.floor.color[1],
        // emissiveIntensity: 0.05,
      });
      floorMat.map.wrapS = THREE.RepeatWrapping;
      floorMat.map.wrapT = THREE.RepeatWrapping;
      floorMat.map.flipY = false;
      floorMat.map.repeat.set(20, 10);
      floorMat.map.magFilter = THREE.NearestFilter;
      floorMat.map.encoding = THREE.sRGBEncoding;
      let floor = new THREE.Mesh(new THREE.PlaneGeometry(44.5, 24.5), floorMat);
      floor.name = elm.floor.name + "cage";
      floor.receiveShadow = true;
      floor.position.set(0, 0.1, 7.5);
      floor.rotation.x = Math.PI / 2;
      scene.add(floor);
      // console.log("floor:", floor);

      //create stage area line
      //create v-line
      const arenaLine = new THREE.Group();
      arenaLine.name = "arenaLine";
      let _line = GlowLight(
        { w: 44.5, h: 0.01 },
        { color1: model.theme.color, color2: model.theme.color },
        0.05,
        0.75,
        elm.vrGradient
      );
      _line.position.set(0, 0.1, 20.5);
      arenaLine.add(_line);
      //add arrow
      let _cone = new THREE.Mesh(
        new THREE.ConeGeometry(0.08, 0.25, 10),
        new THREE.MeshBasicMaterial({ color: model.theme.color })
      );
      _cone.position.set(-22.3, 0.1, 20.5);
      _cone.rotation.set(Math.PI / 2, 0, Math.PI / 2);
      arenaLine.add(_cone);
      let _cone2 = _cone.clone();
      _cone2.position.set(22.3, 0.1, 20.5);
      _cone2.rotation.set(Math.PI / 2, 0, -Math.PI / 2);
      arenaLine.add(_cone2);
      //create text
      let labelDiv = document.createElement("span");
      labelDiv.className = "label1";
      labelDiv.classList.add("modelLabel");
      labelDiv.textContent = `${model.labels.text[0]}`;
      labelDiv.style.cssText = `
            background-color: ${model.labels.background};
            font-size: ${model.labels.size};
            font-weight: ${model.labels.weight};
            color: ${model.labels.color};
            text-align: ${model.labels.alignment};
            `;
      let pointLabel = new CSS2DObject(labelDiv);
      pointLabel.position.set(0, 0.2, 0);
      pointLabel.center.set(0, 1);
      _line.add(pointLabel);

      ////create h-line
      _line = GlowLight(
        { w: 24.5, h: 0.01 },
        { color1: model.theme.color, color2: model.theme.color },
        0.05,
        0.75,
        elm.vrGradient
      );
      _line.position.set(-22.8, 0.1, 7.5);
      _line.rotation.set(0, Math.PI / 2, 0);
      arenaLine.add(_line);
      //add arrow
      _cone = new THREE.Mesh(
        new THREE.ConeGeometry(0.08, 0.25, 10),
        new THREE.MeshBasicMaterial({ color: model.theme.color })
      );
      _cone.position.set(-22.8, 0.1, 19.8);
      _cone.rotation.set(Math.PI / 2, 0, 0);
      arenaLine.add(_cone);
      _cone2 = _cone.clone();
      _cone2.position.set(-22.8, 0.1, -4.5);
      _cone2.rotation.set(-Math.PI / 2, 0, 0);
      arenaLine.add(_cone2);
      // //create text
      labelDiv = document.createElement("span");
      labelDiv.className = "label2";
      labelDiv.classList.add("modelLabel");
      labelDiv.textContent = `${model.labels.text[1]}`;
      labelDiv.style.cssText = `
            background-color: ${model.labels.background};
            font-size: ${model.labels.size};
            font-weight: ${model.labels.weight};
            color: ${model.labels.color};
            text-align: ${model.labels.alignment};
            `;
      pointLabel = new CSS2DObject(labelDiv);
      pointLabel.position.set(0, 0.2, 0);
      pointLabel.center.set(0, 1);
      _line.add(pointLabel);
      scene.add(arenaLine);

      //add texture to stage cage
      let stageMat = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        color: elm.cage.color[0],
        emissive: elm.cage.color[1],
        emissiveIntensity: 0.02,
        roughness: 0.15,
        metalness: 0.95,
        aoMap: model.theme.map,
      });
      let stageCageObj = world.getObjectByName(elm.cage.name);
      stageCageObj.castShadow = true;
      stageCageObj.receiveShadow = false;
      stageCageObj.matrixAutoUpdate = false;
      stageCageObj.material = stageMat;
      // console.log("stageCage:", stageCageObj.material);

      //add color to stage poster area
      let posterBoxMat = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        color: elm.poster.color,
      });
      elm.poster.name.map((poster, i) => {
        let posterObj = world.getObjectByName(poster);
        posterObj.material = posterBoxMat;
        posterObj.matrixAutoUpdate = false;
        // console.log("poster:", posterObj);
      });

      //poster texture
      let posterMat = new THREE.MeshBasicMaterial({
        side: THREE.FrontSide,
        map: elm.poster.map,
        transparent: true,
        alphaMap: elm.poster.map,
      });
      posterMat.map.wrapS = THREE.ClampToEdgeWrapping;
      posterMat.map.wrapT = THREE.ClampToEdgeWrapping;
      posterMat.needsUpdate = true;
      let poster = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), posterMat);
      poster.name = "poster";
      poster.position.set(-10.5, 3.25, -4.42);
      scene.add(poster);
      let rightPoster = poster.clone();
      rightPoster.position.x = rightPoster.position.x + 22;
      scene.add(rightPoster);
      // console.log("poster:", poster,rightPoster);

      //add texture to camera
      let camMat = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        color: elm.camera.color,
        roughness: 0.15,
        metalness: 0.85,
        map: elm.camera.map,
        aoMap: model.theme.map,
      });
      let cameraObj = world.getObjectByName(elm.camera.name);
      cameraObj.castShadow = true;
      cameraObj.receiveShadow = false;
      cameraObj.matrixAutoUpdate = false;
      cameraObj.material = camMat;
      console.log("camera:", cameraObj);

      //add texture to fan
      let fanMat = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        color: elm.fan.color,
        roughness: 0.15,
        metalness: 0.85,
      });
      let fanObj = world.getObjectByName(elm.fan.name);
      fanObj.castShadow = true;
      fanObj.receiveShadow = false;
      fanObj.matrixAutoUpdate = false;
      fanObj.material = fanMat;
      //console.log("fan:", fanObj);

      //add texture to metal wheel
      let wheelMat = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        color: elm.metalwheel.color,
        roughness: 0.1,
        metalness: 0.85,
      });
      let wheelObj = world.getObjectByName(elm.metalwheel.name);
      wheelObj.castShadow = true;
      wheelObj.receiveShadow = false;
      wheelObj.matrixAutoUpdate = false;
      wheelObj.material = wheelMat;
      //console.log("wheel:", wheelObj);

      //add texture to box
      let boxMat = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        color: elm.box.color,
        roughness: 0.85,
        metalness: 0.15,
        map: elm.box.map,
        bumpMap: elm.box.map,
        bumpScale: 0.15,
        displacementMap: elm.box.map,
        aoMap: model.theme.map,
      });
      boxMat.map.wrapS = THREE.RepeatWrapping;
      boxMat.map.wrapT = THREE.RepeatWrapping;
      let boxObj = world.getObjectByName(elm.box.name);
      boxObj.castShadow = true;
      boxObj.receiveShadow = false;
      boxObj.matrixAutoUpdate = false;
      boxObj.material = boxMat;
      boxObj.material.map.repeat.set(1.5, 3.85);
      // console.log("box:", boxMat);

      //add texture to heat unit
      let heatMat = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        color: elm.heatbox.color,
        roughness: 0.15,
        metalness: 0.85,
      });
      let heatObj = world.getObjectByName(elm.heatbox.name);
      heatObj.material = heatMat;
      heatObj.castShadow = false;
      heatObj.receiveShadow = false;
      heatObj.matrixAutoUpdate = false;
      // console.log("heatbox:", heatObj);

      //add texture to heatBox rope
      let heatRopeMat = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        color: elm.heatboxStand.color,
      });
      let heatRopeObj = world.getObjectByName(elm.heatboxStand.name);
      heatRopeObj.material = heatRopeMat;
      heatRopeObj.matrixAutoUpdate = false;
      // console.log("heatbox rope:", heatRopeObj);

      //add texture to sensor unit
      let sensorBodyMat = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        color: elm.sensorBody.color,
        roughness: 0.85,
        metalness: 0.35,
        map: elm.sensorBody.map,
      });
      sensorBodyMat.map.wrapS = THREE.RepeatWrapping;
      sensorBodyMat.map.wrapT = THREE.RepeatWrapping;
      sensorBodyMat.map.repeat.set(5, 5);
      elm.sensorBody.name.map((sensorOBJS, i) => {
        let sensorObj = world.getObjectByName(sensorOBJS);
        sensorObj.castShadow = true;
        sensorObj.matrixAutoUpdate = false;
        sensorObj.material = sensorBodyMat;
        // console.log(sensorObj);
      });
      let sensorCapMat = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        color: elm.sensorCap.color,
        roughness: 0.05,
        metalness: 0.9,
      });
      elm.sensorCap.name.map((sensorOBJS, i) => {
        let sensorObj = world.getObjectByName(sensorOBJS);
        sensorObj.castShadow = true;
        sensorObj.matrixAutoUpdate = false;
        sensorObj.material = sensorCapMat;
        // console.log(sensorObj);
      });

      //add texture to screen
      let screenMat = new THREE.MeshBasicMaterial({
        side: THREE.FrontSide,
        color: elm.screen.color,
        map: elm.screen.map,
      });
      screenMat.map.wrapS = THREE.ClampToEdgeWrapping;
      screenMat.map.wrapT = THREE.ClampToEdgeWrapping;
      screenMat.map.repeat.set(1.5, 1.5);
      let screenObj = world.getObjectByName(elm.screen.name);
      screenObj.material = screenMat;
      screenObj.matrixAutoUpdate = false;
      // console.log(screenObj.material);

      /*
                  //add gun texture
                  let gunMat = new THREE.MeshStandardMaterial({
                    side: THREE.FrontSide,
                    color: elm.screen.color,
                    roughness: 0.35,
                    metalness: 0.45,
                    map: elm.gun.map,
                    bumpMap: elm.gun.bumpMap,
                    bumpScale: 0.15,
                  });
                  gunMat.map.wrapS = THREE.ClampToEdgeWrapping;
                  gunMat.map.wrapT = THREE.ClampToEdgeWrapping;
                  // gunMat.map.repeat.set(1.5, 1.5);
                  gunMat.map.flipY = false;
                  gunMat.map.magFilter = THREE.NearestFilter;
                  // gunMat.map.encoding = THREE.sRGBEncoding;
                  // gunMat.needsUpdate = true;
                  gunMat.matrixAutoUpdate = false;
                  let gunObj = world.getObjectByName(elm.gun.name);
                  gunObj.material = gunMat;
                  gunObj.castShadow = true;
                  // console.log(gunObj);
            
            
            
                  //add texture to girls
                  let womenOBJS = world.getObjectByName(elm.women.name);
                  // console.log(womenOBJS.children);
            
                  let w_acc = womenOBJS.children[0];
                  w_acc.castShadow = true;
                  // w_acc.matrixAutoUpdate = false;
                  // console.log(w_acc);
                  w_acc.material = new THREE.MeshStandardMaterial({
                    color: elm.women.maps[0].color,
                    metalness: 0.85,
                    roughness: 0.15,
                  });
            
                  let w_bdy = womenOBJS.children[1];
                  w_bdy.castShadow = true;
                  // w_bdy.matrixAutoUpdate = false;
                  // console.log(w_bdy);
                  w_bdy.material = new THREE.MeshStandardMaterial({
                    map: elm.women.maps[1].texture,
                    metalness: 0.35,
                    roughness: 0.45,
                    color: elm.women.maps[1].color,
                    emissiveMap: elm.women.maps[1].texture,
                  });
                  w_bdy.material.map.wrapS = THREE.ClampToEdgeWrapping;
                  w_bdy.material.map.wrapT = THREE.ClampToEdgeWrapping;
                  // w_bdy.material.map.repeat.set(1.5, 1.5);
                  w_bdy.material.map.flipY = false;
                  w_bdy.material.map.magFilter = THREE.NearestFilter;
                  // w_bdy.material.needsUpdate = true;
            
                  let w_clth = womenOBJS.children[2];
                  w_clth.castShadow = true;
                  // w_clth.matrixAutoUpdate = false;
                  // console.log(w_clth);
                  w_clth.material = new THREE.MeshStandardMaterial({
                    map: elm.women.maps[2].texture,
                    metalness: 0.25,
                    roughness: 0.45,
                    color: elm.women.maps[2].color,
                    bumpMap: elm.women.maps[2].texture,
                    bumpScale: 0.05,
                  });
                  w_clth.material.map.wrapS = THREE.ClampToEdgeWrapping;
                  w_clth.material.map.wrapT = THREE.ClampToEdgeWrapping;
                  w_clth.material.map.flipY = false;
                  w_clth.material.map.magFilter = THREE.NearestFilter;
                  // w_clth.material.needsUpdate = true;
            
                  let w_eye = womenOBJS.children[3];
                  w_eye.castShadow = true;
                  // w_eye.matrixAutoUpdate = false;
                  // console.log(w_eye);
                  w_eye.material = new THREE.MeshStandardMaterial({
                    map: elm.women.maps[3].texture,
                    emissiveMap: elm.women.maps[3].texture,
                  });
                  w_eye.material.map.wrapS = THREE.ClampToEdgeWrapping;
                  w_eye.material.map.wrapT = THREE.ClampToEdgeWrapping;
                  w_eye.material.map.flipY = false;
                  w_eye.material.map.magFilter = THREE.NearestFilter;
                  // w_eye.material.needsUpdate = true;
            
                  let w_hir = womenOBJS.children[5];
                  w_hir.castShadow = true;
                  // w_hir.matrixAutoUpdate = false;
                  // console.log(w_hir);
                  w_hir.material = new THREE.MeshStandardMaterial({
                    color: elm.women.maps[4].color,
                    metalness: 0,
                    roughness: 1,
                  });
            
            
                  //add texture to boys
                  let menOBJS = world.getObjectByName(elm.men.name);
                  // console.log(menOBJS.children);
            
                  let m_bdy = menOBJS.children[0];
                  m_bdy.castShadow = true;
                  // m_bdy.matrixAutoUpdate = false;
                  // console.log(m_bdy);
                  m_bdy.material = new THREE.MeshStandardMaterial({
                    map: elm.men.maps[0].texture,
                    metalness: 0.45,
                    roughness: 0.45,
                    emissiveMap: elm.men.maps[0].texture,
                  });
                  m_bdy.material.map.wrapS = THREE.ClampToEdgeWrapping;
                  m_bdy.material.map.wrapT = THREE.ClampToEdgeWrapping;
                  m_bdy.material.map.flipY = false;
                  m_bdy.material.map.magFilter = THREE.NearestFilter;
                  // m_bdy.material.needsUpdate = true;
            
                  let m_eye = menOBJS.children[1];
                  m_eye.castShadow = true;
                  // m_eye.matrixAutoUpdate = false;
                  // console.log(m_eye);
                  m_eye.material = new THREE.MeshStandardMaterial({
                    map: elm.men.maps[1].texture,
                    emissiveMap: elm.men.maps[1].texture,
                  });
                  m_eye.material.map.wrapS = THREE.ClampToEdgeWrapping;
                  m_eye.material.map.wrapT = THREE.ClampToEdgeWrapping;
                  m_eye.material.map.flipY = false;
                  m_eye.material.map.magFilter = THREE.NearestFilter;
                  // m_eye.material.needsUpdate = true;
            
                  let m_hd = menOBJS.children[2];
                  m_hd.castShadow = true;
                  // m_hd.matrixAutoUpdate = false;
                  // console.log(m_hd);
                  m_hd.material = new THREE.MeshStandardMaterial({
                    map: elm.men.maps[2].texture,
                    emissiveMap: elm.men.maps[2].texture,
                  });
                  m_hd.material.map.wrapS = THREE.ClampToEdgeWrapping;
                  m_hd.material.map.wrapT = THREE.ClampToEdgeWrapping;
                  m_hd.material.map.flipY = false;
                  m_hd.material.map.magFilter = THREE.NearestFilter;
                  // m_hd.material.needsUpdate = true;
            
                  let m_leg = menOBJS.children[3];
                  m_leg.castShadow = true;
                  // m_leg.matrixAutoUpdate = false;
                  // console.log(m_leg);
                  m_leg.material = new THREE.MeshStandardMaterial({
                    map: elm.men.maps[3].texture,
                    metalness: 0.15,
                    roughness: 0.65,
                    color: elm.men.maps[3].color,
                    bumpMap: elm.men.maps[3].texture,
                    bumpScale: 0.15,
                  });
                  m_leg.material.map.wrapS = THREE.ClampToEdgeWrapping;
                  m_leg.material.map.wrapT = THREE.ClampToEdgeWrapping;
                  m_leg.material.map.flipY = false;
                  m_leg.material.map.magFilter = THREE.NearestFilter;
                  // m_leg.material.needsUpdate = true;*/

      addInteractiveItem();
    }

    //// interaction
    //////////////////////
    function addInteractiveItem() {
      let elm = model.element;
      var InteractiveItemGrup = new THREE.Group();
      var labelDiv, pointLabel,pluseDiv,pulseLabel;

      const transparentMat = new THREE.MeshStandardMaterial({
        transparent: true,
        opacity: 0,
        color: 0x00ff00,
      });

      //add camera box
      let camCube = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.8, 23.5),
        transparentMat
      );
      camCube.name = elm.camera.id;
      camCube.position.set(-21.48, 7.75, 7.6);
      //add text
      labelDiv = document.createElement("span");
      labelDiv.className = "camCubeLabel";
      labelDiv.classList.add("modelLabel");
      labelDiv.textContent = `${elm.camera.text}`;
      labelDiv.style.cssText = `
            background-color: ${model.labels.background};
            font-size: ${model.labels.size};
            font-weight: ${model.labels.weight};
            color: ${model.labels.color};
            text-align: ${model.labels.alignment};
            `;
      pointLabel = new CSS2DObject(labelDiv);
      pointLabel.position.set(0, 0, 0);
      pointLabel.center.set(0, 0);
      camCube.add(pointLabel);
      //add pulse
      pluseDiv = document.createElement("span");
      pluseDiv.className = "labelPulse";
      pulseLabel=new CSS2DObject(pluseDiv);
      pulseLabel.position.set(0, 0, 0);
      pulseLabel.center.set(0, 0);
      camCube.add(pulseLabel);
      InteractiveItemGrup.add(camCube);
      
      let camCube2 = camCube.clone();
      camCube2.position.set(21.5, 7.75, 7.6);
      InteractiveItemGrup.add(camCube2);
      
      let camCube3 = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 0.8, 20.5),
        transparentMat
      );
      camCube3.name = elm.camera.id;
      camCube3.position.set(0.25, 7.75, 7.75);
      //add text
      labelDiv = document.createElement("span");
      labelDiv.className = "camCubeLabel";
      labelDiv.classList.add("modelLabel");
      labelDiv.textContent = `${elm.camera.text}`;
      labelDiv.style.cssText = `
             background-color: ${model.labels.background};
             font-size: ${model.labels.size};
             font-weight: ${model.labels.weight};
             color: ${model.labels.color};
             text-align: ${model.labels.alignment};
             `;
      pointLabel = new CSS2DObject(labelDiv);
      pointLabel.position.set(0, 0, 0);
      pointLabel.center.set(0, 0);
      camCube3.add(pointLabel);
      //add pulse
      pluseDiv = document.createElement("span");
      pluseDiv.className = "labelPulse";
      pulseLabel=new CSS2DObject(pluseDiv);
      pulseLabel.position.set(0, 0, 0);
      pulseLabel.center.set(0, 0);
      camCube3.add(pulseLabel);
      InteractiveItemGrup.add(camCube3);
      
      let camCube4 = new THREE.Mesh(
        new THREE.BoxGeometry(37.3, 0.8, 0.8),
        transparentMat
      );
      camCube4.name = elm.camera.id;
      camCube4.position.set(-0.6, 7.75, -3.6);
      //add text
      labelDiv = document.createElement("span");
      labelDiv.className = "camCubeLabel";
      labelDiv.classList.add("modelLabel");
      labelDiv.textContent = `${elm.camera.text}`;
      labelDiv.style.cssText = `
             background-color: ${model.labels.background};
             font-size: ${model.labels.size};
             font-weight: ${model.labels.weight};
             color: ${model.labels.color};
             text-align: ${model.labels.alignment};
             `;
      pointLabel = new CSS2DObject(labelDiv);
      pointLabel.position.set(0, 0, 0);
      pointLabel.center.set(0, 0);
      camCube4.add(pointLabel);
       //add pulse
       pluseDiv = document.createElement("span");
       pluseDiv.className = "labelPulse";
       pulseLabel=new CSS2DObject(pluseDiv);
       pulseLabel.position.set(0, 0, 0);
       pulseLabel.center.set(0, 0);
       camCube4.add(pulseLabel);
      InteractiveItemGrup.add(camCube4);
      
      let camCube5 = camCube4.clone();
      camCube5.position.set(-1.1, 7.75, 18.8);
      InteractiveItemGrup.add(camCube5);
      createInteractiveMeshes({
        name: elm.camera.id,
        click: elm.camera.click,
        text: elm.camera.text,
      });



      //add fan box
      let fanCube = new THREE.Mesh(
        new THREE.BoxGeometry(1.4, 5.15, 2),
        transparentMat
      );
      fanCube.name = elm.fan.id;
      fanCube.position.set(-21.48, 3.5, -3);
      //add text
      labelDiv = document.createElement("span");
      labelDiv.className = "fanCubeLabel";
      labelDiv.classList.add("modelLabel");
      labelDiv.textContent = `${elm.fan.text}`;
      labelDiv.style.cssText = `
            background-color: ${model.labels.background};
            font-size: ${model.labels.size};
            font-weight: ${model.labels.weight};
            color: ${model.labels.color};
            text-align: ${model.labels.alignment};
            `;
      pointLabel = new CSS2DObject(labelDiv);
      pointLabel.position.set(0, 0, 0);
      pointLabel.center.set(0, 0);
      fanCube.add(pointLabel);
       //add pulse
       pluseDiv = document.createElement("span");
       pluseDiv.className = "labelPulse";
       pulseLabel=new CSS2DObject(pluseDiv);
       pulseLabel.position.set(0, 0, 0);
       pulseLabel.center.set(0, 0);
       fanCube.add(pulseLabel);
      InteractiveItemGrup.add(fanCube);
      
      let fanCube1 = fanCube.clone();
      fanCube1.position.set(-21.6, 3.5, 18);
      InteractiveItemGrup.add(fanCube1);
      
      let fanCube2 = fanCube.clone();
      fanCube2.position.set(22.2, 3.6, 17.8);
      InteractiveItemGrup.add(fanCube2);
      
      let fanCube3 = fanCube.clone();
      fanCube3.position.set(21.82, 3.6, -2.8);
      InteractiveItemGrup.add(fanCube3);
      createInteractiveMeshes({
        name: elm.fan.id,
        click: elm.fan.click,
        text: elm.fan.text,
      });



      //add heat box
      let HeatCube = new THREE.Mesh(
        new THREE.BoxGeometry(9, 1.2, 1.5),
        transparentMat
      );
      HeatCube.name = elm.heatbox.id;
      HeatCube.position.set(-11, 10.9, 7);
      //add text
      labelDiv = document.createElement("span");
      labelDiv.className = "heatCubeLabel";
      labelDiv.classList.add("modelLabel");
      labelDiv.textContent = `${elm.heatbox.text}`;
      labelDiv.style.cssText = `
            background-color: ${model.labels.background};
            font-size: ${model.labels.size};
            font-weight: ${model.labels.weight};
            color: ${model.labels.color};
            text-align: ${model.labels.alignment};
            `;
      pointLabel = new CSS2DObject(labelDiv);
      pointLabel.position.set(0, 0, 0);
      pointLabel.center.set(0, 0);
      HeatCube.add(pointLabel);
      //add pulse
      pluseDiv = document.createElement("span");
      pluseDiv.className = "labelPulse";
      pulseLabel=new CSS2DObject(pluseDiv);
      pulseLabel.position.set(0, 0, 0);
      pulseLabel.center.set(0, 0);
      HeatCube.add(pulseLabel);
      InteractiveItemGrup.add(HeatCube);
      
      let HeatCube1 = HeatCube.clone();
      HeatCube1.position.set(11.15, 10.9, 7);
      InteractiveItemGrup.add(HeatCube1);
      createInteractiveMeshes({
        name: elm.heatbox.id,
        click: elm.heatbox.click,
        text: elm.heatbox.text,
      });

      //add scent box
      let scentCube = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 2, 0.8),
        transparentMat
      );
      scentCube.name = elm.sensorBody.id;
      scentCube.position.set(-1.1, 1, -1.7);
      //add text
      labelDiv = document.createElement("span");
      labelDiv.className = "scentCubeLabel";
      labelDiv.classList.add("modelLabel");
      labelDiv.textContent = `${elm.sensorBody.text}`;
      labelDiv.style.cssText = `
            background-color: ${model.labels.background};
            font-size: ${model.labels.size};
            font-weight: ${model.labels.weight};
            color: ${model.labels.color};
            text-align: ${model.labels.alignment};
            `;
      pointLabel = new CSS2DObject(labelDiv);
      pointLabel.position.set(0, 0, 0);
      pointLabel.center.set(0,0);
      scentCube.add(pointLabel);
      //add pulse
      pluseDiv = document.createElement("span");
      pluseDiv.className = "labelPulse";
      pulseLabel=new CSS2DObject(pluseDiv);
      pulseLabel.position.set(0, 0, 0);
      pulseLabel.center.set(0, 0);
      scentCube.add(pulseLabel);
      InteractiveItemGrup.add(scentCube);
      
      let scentCube1 = scentCube.clone();
      scentCube1.position.set(-1.15, 1, 17.9);
      InteractiveItemGrup.add(scentCube1);
      createInteractiveMeshes({
        name: elm.sensorBody.id,
        click: elm.sensorBody.click,
        text: elm.sensorBody.text,
      });

      scene.add(InteractiveItemGrup);
    }

    function zoomInTimeline(pos, rotate = false, reset = false) {
      if (reset) {
        let zoomOutFactor = 0.001;
        controls.enabled = false;
        let camTl = gsap.timeline({
          defaults: {
            duration: 1,
            ease: "linear",
            onComplete: () => {
              controls.enabled = true;
            },
          },
        });
        camTl
          .to(controls.target, {
            x: pos.x,
            y: pos.y + zoomOutFactor / 10,
            z: pos.z,
          })
          .to(
            camera.position,
            {
              x: pos.x,
              y: pos.y,
              z: pos.z,
            },
            "<"
          )
          .to(
            controls,
            {
              minDistance: 0.5,
              maxDistance: 15,
              minPolarAngle: Math.PI / 3,
              maxPolarAngle: Math.PI / 2.1,
              minAzimuthAngle: -Math.PI / 15,
              maxAzimuthAngle: Math.PI / 15,
            },
            "<"
          );
      } else {
        let zoomOutFactor = 8;
        zoomed = true;
        controls.enabled = false;
        let camTl = gsap.timeline({
          defaults: {
            duration: 1,
            ease: "linear",
            onComplete: () => {
              controls.enabled = true;
              zoomed = false;
              controls.enableZoom = false;

              gsap.to(info_modal, { opacity: 1 });
            },
          },
        });
        camTl
          .to(controls.target, { x: pos.x, y: pos.y, z: pos.z })
          .to(
            camera.position,
            {
              x: rotate ? pos.x + 12 : pos.x,
              y: pos.y + 3.5,
              z: pos.z + zoomOutFactor,
            },
            "<"
          )
          .to(
            controls,
            {
              minDistance: zoomOutFactor,
              maxDistance: 35,
              minPolarAngle: rotate ? Math.PI / 1.5 : Math.PI / 4,
              maxPolarAngle: rotate ? Math.PI / 1.5 : Math.PI / 1.7,
              minAzimuthAngle: -Math.PI / 4,
              maxAzimuthAngle: Math.PI / 3,
            },
            "<"
          );
      }
    }

    //get position on mouse move
    function onMouseMove(e) {
      e.preventDefault();
      mousePxPositionOnClickStart.set(e.clientX, e.clientY);
      detecthover(e);
    }

    //animate to target object on click
    function onClick(e) {
      e.preventDefault();
      detecthover(e);
    }

    function detecthover(e) {
      container.style.cursor = "default";
      // tooltip.innerHTML = '';
      tooltip.classList.remove("show");
      xSetter(e.clientX), ySetter(e.clientY);

      const draggedDistance = mousePxPositionOnClickStart.distanceTo(
        new THREE.Vector2(e.clientX, e.clientY)
      );
      if (draggedDistance > 3) {
        return;
      }
      mouse.x = (e.clientX / sizes.width) * 2 - 1;
      mouse.y = -(e.clientY / sizes.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      //console.log(interactiveMeshes);

      var intersects = raycaster.intersectObjects(scene.children, true);
      interactiveMeshes.map((el, i) => {
        if (el.id === intersects[0].object.name) {
          let intersect = intersects[0];
          if (!zoomed) {
            container.style.cursor = "pointer";
            tooltip.innerHTML = el.name;
            tooltip.classList.add("show");

            var modalName, modal_data;
            if (e.type == "click") {
              if (el.clickable == true) {
                modalName = el.id;
                modal_data = info_modal.querySelector(
                  `[data-id='${modalName}']`
                );
                if (modalName.includes("scent_unit")) {
                  modal_data = info_modal.querySelector(
                    "[data-id='scent_unit']"
                  );
                }
                // console.log(modalName);
              }

              gsap.to(info_modal, {
                opacity: 0,
                duration: 0.15,
                onComplete: () => {
                  info_modal.querySelectorAll(".modal_data").forEach((e) => {
                    e.classList.remove("show");
                  });
                  if (modal_data != undefined) {
                    modal_data.classList.add("show");
                  }
                },
              });
              gsap.to(resetCam, {
                opacity: 1,
                duration: 0.3,
                pointerEvents: "all",
              });

              let camGOTOpos = {
                  x: intersect.point.x,
                  y: intersect.point.y,
                  z: intersect.point.z,
                },
                camRotation =
                  intersect.object.name == "hit_unit" ? true : false;
              zoomInTimeline(camGOTOpos, camRotation);
            }
            return;
          }
        }
      });
    }

    //add text
    function createInteractiveMeshes(el) {
      interactiveMeshes.push({
        id: el.id,
        name: el.text,
        clickable: el.click,
      });
    }

    //// responsive canvas
    function adjustWindow() {
      sizes.width = container.clientWidth;
      sizes.height = container.clientHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      labelRenderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    renderer.domElement.addEventListener("mousemove", onMouseMove, false);
    renderer.domElement.addEventListener("click", onClick, false);

    //// init function
    init();
    window.addEventListener("resize", adjustWindow);
  }
}
