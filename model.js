"use strict";

const hostURL = "https://soumya-webskitters-pal.github.io/nextgen";

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { CSS2DRenderer, CSS2DObject, } from "three/addons/renderers/CSS2DRenderer.js";

const model_wrapper = document.querySelector(".model_wrapper");

if (model_wrapper != undefined) {
    //render flag
    var modelRender = false;

    //UI
    const container = model_wrapper.querySelector(".canvas_area");
    const modelViewer = model_wrapper.querySelector(".enable_model");
    const modelCloser = model_wrapper.querySelector(".close_model");

    //info modal
    const info_modal = container.querySelector(".arena_modal");

    //reset button
    const resetCam = container.querySelector(".reset");


    gsap.set(info_modal, {
        yPercent: 100,
    });

    gsap.set([resetCam, modelCloser, info_modal], {
        opacity: 0,
        pointerEvents: "none",
    });

    modelViewer.addEventListener("click", function () {
        modelRender = true;

        container.scrollIntoView({
            behavior: 'smooth'
        });

        gsap.to(modelViewer, {
            pointerEvents: "none",
            opacity: 0,
        });
        info_modal.querySelector('.modal_data[data-id="arena"]').classList.add("show");

        if (container.querySelector("canvas") == null) {
            modelApp();
        }

        let navbar = document.querySelector(".navbar");

        if (navbar != undefined) {
            document.querySelector(".navbar").classList.add("hide");
        }

        gsap.to(".imms_container", {
            delay: 0.3,
            duration: 0.5,
            pointerEvents: "none",
            opacity: 0,
            onComplete: () => {
                gsap.to(container, {
                    pointerEvents: "all",
                });
                document.querySelector("html").classList.add("modelView");
                document.body.classList.add("modelView");
                modelCloser.style.display = "inline-flex";

                gsap.to(info_modal, {
                    yPercent: 0,
                });

                gsap.to([modelCloser, info_modal], {
                    opacity: 1,
                    pointerEvents: "all",
                });

                gsap.set(resetCam, {
                    opacity: 0,
                    pointerEvents: "none",
                });
            }
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
            camera = new THREE.PerspectiveCamera(20, sizes.width / sizes.height, 1, 1000),
            renderer = new THREE.WebGLRenderer({
                logarithmicDepthBuffer: false,
                antialias: true,
                alpha: true,
            }),
            labelRenderer = new CSS2DRenderer(),
            textureLoader = new THREE.TextureLoader(),
            controls = new OrbitControls(camera, renderer.domElement);

        var world = new THREE.Object3D();

        const model = {
            loaded: false,
            src: `${hostURL}/model_new.glb`,
            camera: {
                control: false,
                targetPosition: new THREE.Vector3(0, 3.85, 0),
                position: new THREE.Vector3(0, 12.5, 88.5),
                zoomed: false,
                rotate: false,
                pan: false,
                distance: {
                    min: 0.05,
                    max: 88.5,
                },
                polar: {
                    min: Math.PI / 2.15,
                    max: Math.PI / 2.1,
                },
                azimuth: {
                    min: -Math.PI / 8,
                    max: Math.PI / 8,
                }
            },
            element: {
                env: [
                    `${hostURL}/texture/env/px.jpg`,
                    `${hostURL}/texture/env/nx.jpg`,
                    `${hostURL}/texture/env/py.jpg`,
                    `${hostURL}/texture/env/ny.jpg`,
                    `${hostURL}/texture/env/pz.jpg`,
                    `${hostURL}/texture/env/nz.jpg`
                ],
                wall: {
                    name: "room",
                    color: ["#333333", "#000000"],
                    click: false,
                    text: "Room",
                    id: "",
                },
                floor: {
                    name: "floor",
                    map: textureLoader.load(`${hostURL}/texture/Vr_floor.webp`),
                    color: ["#ffffff", "#ffffff"],
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
                    color: ["#ffffff", "#000000"],
                    click: false,
                    text: "Arena",
                    id: "",
                    map: textureLoader.load(`${hostURL}/texture/Vr_cage.webp`),
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
                    text: "Scent Diffuser",
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
                    color: "#ffffff",
                    click: false,
                    text: "Screen",
                    id: "",
                },
                fan: {
                    name: "fan",
                    color: "#ffffff",
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
                size: "0.8em",
                weight: "regular",
                alignment: "center",
                background: "#ffffff",
                pulseDot: "#00d3ff",
                text: [container.getAttribute("data-length"), container.getAttribute("data-width")],
                areaBackground: "rgba(0,0,0,0.5)",
                areaFontSize: "0.85em",
            },
        };

        var interactiveMeshes = [];
        let zoomed = false;
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const mousePxPositionOnClickStart = new THREE.Vector2();

        //add bg color
        scene.background = new THREE.Color("#000000");

        //// reset camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        // env map
        const reflectionEnv = new THREE.CubeTextureLoader().load(model.element.env);


        //adjust z axis for mobile view
        let mmModel = gsap.matchMedia();

        mmModel.add("(max-width: 1024px)", () => {
            if (window.innerHeight > window.innerWidth) {
                model.camera.position.z = model.camera.position.z + 35;
            }
            else{
                model.camera.position.z = model.camera.position.z + 8.5;
            }
        })
        model.camera.distance.max = model.camera.position.z;

        //init model
        function init() {
            gsap.set(container, {
                pointerEvents: "none",
            });

            //3D renderer
            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            renderer.physicallyCorrectLights = true;

            // first render
            container.appendChild(renderer.domElement);

            //2d label renderer
            labelRenderer.setSize(sizes.width, sizes.height);
            labelRenderer.domElement.style.position = "absolute";
            labelRenderer.domElement.style.top = "0px";
            container.appendChild(labelRenderer.domElement);

            loadModel();
            addLight();
            renderScene();

            //controller
            controls.enabled = model.camera.control;
            controls.enableRotate = model.camera.rotate;
            controls.enableDamping = true;
            controls.enableZoom = model.camera.zoomed;
            controls.enablePan = model.camera.pan;
            controls.minDistance = model.camera.distance.min;
            controls.maxDistance = model.camera.distance.max;
            controls.minPolarAngle = model.camera.polar.min;
            controls.maxPolarAngle = model.camera.polar.max;
            controls.minAzimuthAngle = model.camera.azimuth.min;
            controls.maxAzimuthAngle = model.camera.azimuth.max;

            gsap.set(camera.position,
                {
                    x: model.camera.position.x,
                    y: model.camera.position.y,
                    z: model.camera.position.z,
                });
            gsap.set(controls.target, {
                x: model.camera.targetPosition.x,
                y: model.camera.targetPosition.y,
                z: model.camera.targetPosition.z,
            });
            // camera
            zoomInTimeline(null, true);
        }


        //// enable setup
        function enableSetup() {
            gsap.to(loader, {
                delay: 0.5,
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    loader.remove();
                    info_modal.querySelector('.modal_data[data-id="arena"]').classList.add("show");
                },
            });

            resetCam.addEventListener("click", () => {
                gsap.to(resetCam, {
                    opacity: 0, pointerEvents: "none", duration: 0.5
                });
                zoomInTimeline(null, true);
                controls.enabled = true;

                if (window.innerWidth > 1024 || container.classList.contains("responsive")) {
                    modelRender = true;
                }

                info_modal.querySelectorAll(".modal_data").forEach((e, i) => {
                    e.dataset.id == "arena" ? e.classList.add("show") : e.classList.remove("show");
                });

                //hide all labels
                container.querySelectorAll(".modelLabel").forEach((e) => {
                    e.classList.remove("show");
                    e.classList.remove("clicked");
                })
            });

            modelCloser.addEventListener("click", function () {
                resetCam.click();

                gsap.set(container, {
                    pointerEvents: "none"
                });
                modelCloser.style.display = "none";

                gsap.to([modelCloser, info_modal, resetCam], {
                    opacity: 0,
                    pointerEvents: "none",
                });

                gsap.to(info_modal, {
                    yPercent: 100,
                });

                gsap.to(".imms_container", {
                    duration: 0.5,
                    pointerEvents: "all",
                    opacity: 1,
                    onComplete: () => {
                        modelRender = false;

                        gsap.to(modelViewer, {
                            pointerEvents: "all",
                            opacity: 1,
                        });
                        let navbar = document.querySelector(".navbar");

                        if (navbar != undefined) {
                            document.querySelector(".navbar").classList.remove("hide");
                        }

                        document.querySelector("html").classList.remove("modelView");
                        document.body.classList.remove("modelView");
                    }
                });
            });
        }


        //// render scene
        function renderScene() {
            if (model.loaded) {
                controls.update();
            }

            if (modelRender) {
                renderer.render(scene, camera);
                labelRenderer.render(scene, camera);
            }

            requestAnimationFrame(renderScene);
        }


        //// load model
        function loadModel() {
            new GLTFLoader().load(
                model.src,
                function (gltf) {
                    world = gltf.scene.children[0];
                    scene.add(world);
                    addTexture();
                    model.loaded = true;
                    enableSetup();
                    // console.log("world:", world);
                },
                function (xhr) { },
                function (error) {
                    console.error(error);
                });
        }


        //// add light
        //////////////////////
        function modifyShadow(obj) {
            obj.castShadow = true;
            obj.shadow.intensity = 50;
            obj.shadow.mapSize.width = 1024 * 2;
            obj.shadow.mapSize.height = 1024 * 2;
            obj.shadow.camera.near = 0.0001;
            obj.shadow.camera.far = 5000;
            obj.shadow.focus = 1;
            obj.angle = 0.25;
            obj.penumbra = 0.01;
            obj.decay = 0.001;
            obj.distance = 20
        }

        function pillerLight(props) {
            var pillerLightGroup = new THREE.Group();
            pillerLightGroup.position.set(props.x, props.y, props.z);
            let lights = new THREE.PointLight(props.color, model.theme.intensity, 12, 0.001);
            lights.position.set(0, -2.8, 0);
            lights.name = "pillerLights1";
            pillerLightGroup.add(lights);

            let lights2 = new THREE.PointLight(props.color, model.theme.intensity / 5, 5, 8);
            lights2.position.set(0, -3, 0);
            lights2.name = "pillerLights2";
            pillerLightGroup.add(lights2);

            pillerLightGroup.add(new THREE.Mesh(new THREE.CylinderGeometry(props.r, props.r, props.h, 15, 8),
                new THREE.MeshBasicMaterial({
                    color: props.color,
                    transparent: true,
                    alphaMap: model.theme.map,
                })));
            return pillerLightGroup;
        }

        function GlowLight(dimention, colors, step, spread) {
            var glowLight = new THREE.Group();
            glowLight.position.x = 0;
            glowLight.position.y = step;
            glowLight.position.z = 4.5;

            for (var i = 0; i < 1; i += step) {

                glowLight.add(new THREE.Mesh(new THREE.BoxGeometry(dimention.w,
                    dimention.h,
                    0.1 + (i * i) / spread),
                    new THREE.MeshLambertMaterial({
                        side: THREE.DoubleSide,
                        color: i < 0.15 ? colors.color1 : colors.color2,
                        emissive: colors.color2,
                        transparent: true,
                        opacity: 1 - Math.pow(i, step),
                    })));
            }

            glowLight.renderOrder = -5;
            return glowLight;
        }

        function addLight() {
            //// Env light
            var ambientFrontLight1 = new THREE.DirectionalLight(model.ambient.color, 0.25);
            ambientFrontLight1.name = "ambientFrontLight1";
            ambientFrontLight1.position.set(0, 50, 65);
            ambientFrontLight1.target.position.set(ambientFrontLight1.position.x, 0, 8);
            // ambientFrontLight1.castShadow = true;
            scene.add(ambientFrontLight1);
            // scene.add(new THREE.DirectionalLightHelper(ambientFrontLight1, 0.5));

            ////ambient light - room
            var ambientFrontLight1 = new THREE.DirectionalLight(model.ambient.color, model.ambient.intensity / 10);
            ambientFrontLight1.name = "ambientFrontLight1";
            ambientFrontLight1.position.set(0, 15, 35);
            ambientFrontLight1.target.position.set(ambientFrontLight1.position.x, ambientFrontLight1.position.y - 10, 8);
            // ambientFrontLight1.castShadow = false;
            scene.add(ambientFrontLight1);
            // scene.add(new THREE.DirectionalLightHelper(ambientFrontLight1, 0.5));
            /////
            var ambientFrontLight2 = ambientFrontLight1.clone();
            ambientFrontLight2.name = "ambientFrontLight2";
            ambientFrontLight2.position.set(-40, 15, 5);
            ambientFrontLight2.target.position.set(0, ambientFrontLight2.position.y - 10, 8);
            // ambientFrontLight2.castShadow = true;
            scene.add(ambientFrontLight2);
            // scene.add(new THREE.DirectionalLightHelper(ambientFrontLight2, 0.5));
            /////
            var ambientFrontLight3 = ambientFrontLight1.clone();
            ambientFrontLight3.name = "ambientFrontLight3";
            ambientFrontLight3.position.set(40, 15, 5);

            ambientFrontLight3.target.position.set(0, ambientFrontLight3.position.y - 10, 8);
            // ambientFrontLight3.castShadow = false;
            scene.add(ambientFrontLight3);
            // scene.add(new THREE.DirectionalLightHelper(ambientFrontLight3, 0.5));
            /////
            var ambientFrontLight4 = ambientFrontLight1.clone();
            ambientFrontLight4.name = "ambientFrontLight4";
            ambientFrontLight4.position.set(0, 15, -3);
            ambientFrontLight4.target.position.set(ambientFrontLight4.position.x, ambientFrontLight3.position.y - 10, 8);
            // ambientFrontLight4.castShadow = true;
            scene.add(ambientFrontLight4);
            // scene.add(new THREE.DirectionalLightHelper(ambientFrontLight4, 0.5));
            /////
            var ambientFrontLight5 = new THREE.PointLight(model.ambient.color, model.ambient.intensity, 5, 0.5);
            ambientFrontLight5.name = "ambientFrontLight5";
            ambientFrontLight5.position.set(10, 12, 11);
            scene.add(ambientFrontLight5);
            // scene.add(new THREE.PointLightHelper(ambientFrontLight5, 0.5));
            /////
            var ambientFrontLight6 = ambientFrontLight5.clone();
            ambientFrontLight6.name = "ambientFrontLight6";
            ambientFrontLight6.position.set(-10, 12, 11);
            scene.add(ambientFrontLight6);
            // scene.add(new THREE.PointLightHelper(ambientFrontLight6, 0.5));
            /////
            var ambientFrontLight7 = ambientFrontLight5.clone();
            ambientFrontLight7.name = "ambientFrontLight7";
            ambientFrontLight7.position.set(-15, 12.5, 8);
            scene.add(ambientFrontLight7);
            // scene.add(new THREE.PointLightHelper(ambientFrontLight7, 0.5));
            /////
            var ambientFrontLight8 = ambientFrontLight5.clone();
            ambientFrontLight8.name = "ambientFrontLight8";
            ambientFrontLight8.position.set(15, 12.5, 8);
            // modifyShadow(ambientFrontLight8);
            scene.add(ambientFrontLight8);
            // scene.add(new THREE.PointLightHelper(ambientFrontLight8, 0.5));

            /////add light to room roof
            var ambientFrontLight9 = ambientFrontLight1.clone();
            ambientFrontLight9.name = "ambientFrontLight9";
            ambientFrontLight9.intensity = 0.3;
            ambientFrontLight9.position.set(-30, -15, -5);
            ambientFrontLight9.target.position.set(0, 15, 15);
            ambientFrontLight9.castShadow = false;
            scene.add(ambientFrontLight9);
            // scene.add(new THREE.DirectionalLightHelper(ambientFrontLight9, 0.5));

            //////add Shadow
            var ambientFrontLight10 = ambientFrontLight5.clone();
            ambientFrontLight10.intensity = 0.01;
            ambientFrontLight10.name = "ambientFrontLight10";
            ambientFrontLight10.position.set(12, 4.7, 3);
            modifyShadow(ambientFrontLight10);
            scene.add(ambientFrontLight10);
            // scene.add(new THREE.PointLightHelper(ambientFrontLight10, 0.5));
            //////
            var ambientFrontLight11 = ambientFrontLight10.clone();
            ambientFrontLight11.name = "ambientFrontLight11";
            ambientFrontLight11.position.set(0, 12, 10);
            scene.add(ambientFrontLight11);
            // scene.add(new THREE.PointLightHelper(ambientFrontLight11, 0.5));
            //////
            var ambientFrontLight12 = ambientFrontLight10.clone();
            ambientFrontLight12.name = "ambientFrontLight12";
            ambientFrontLight12.position.set(-10, 4.7, 3);
            scene.add(ambientFrontLight12);
            // scene.add(new THREE.PointLightHelper(ambientFrontLight12, 0.5));


            //screen light
            var backscreenLight = GlowLight(
                { w: 43.0, h: 0.03 }, {
                color1: model.ambient.color, color2: model.theme.color
            }, 0.05, 0.5);
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

            var heaterLight1 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 7.2, 10, 5),
                new THREE.MeshBasicMaterial({
                    side: THREE.DoubleSide,
                    color: model.heaterLight.color[1],
                }));
            heaterLight1.rotation.set(0, 0, -Math.PI / 2);
            heaterLight1.name = "heaterLight";
            heaterLight1.position.set(11.25, 10.77, 7.2);
            var heaterLight2 = heaterLight1.clone();
            heaterLight2.position.z = heaterLight2.position.z - 0.34;
            heaterLight.add(heaterLight1, heaterLight2);
            scene.add(heaterLight);
            var heaterLight2 = heaterLight.clone();
            heaterLight2.position.x = -22;
            scene.add(heaterLight2);

            //room light
            const roomLight = new THREE.HemisphereLight(model.ambient.color, model.shadow.color, model.ambient.intensity / 2);
            roomLight.name = "roomLight";
            roomLight.position.set(-0.15, -15, 5);
            scene.add(roomLight);

            //add piller light
            let pillerLights = pillerLight({
                x: 0.2, y: 3.5, z: 19.1, r: 0.45, h: 8, color: model.theme.color, step: 18,
            });
            //piller light 1
            let pillerLight1 = pillerLights.clone();
            pillerLight1.name = "pillerLight1";
            scene.add(pillerLight1);

            //piller light 2
            let pillerLight2 = pillerLights.clone();
            pillerLight2.name = "pillerLight2";
            pillerLight2.position.z = -4.1;
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
            let pillerLight5 = pillerLight4.clone();
            pillerLight5.name = "pillerLight5";
            pillerLight5.position.z = pillerLight2.position.z;
            scene.add(pillerLight5);
            //piller light 6
            let pillerLight6 = pillerLight3.clone();
            pillerLight6.name = "pillerLight6";
            pillerLight6.position.z = pillerLight5.position.z;
            scene.add(pillerLight6);
        }


        //// add texture
        //////////////////////
        function addTexture() {
            let elm = model.element;

            //add texture to room
            let roomMat = new THREE.MeshStandardMaterial({
                side: THREE.DoubleSide,
                color: elm.wall.color[0],
                emissive: elm.wall.color[1],
                emissiveIntensity: 1,
                aoMap: model.theme.map,
                normalScale: new THREE.Vector2(-1, -1),
                roughness: 0.1,
                metalness: 0.35,
                envMap: reflectionEnv,
                envMapIntensity: 0.05,
            });
            let roomObj = world.getObjectByName(elm.wall.name);
            roomObj.material = roomMat;

            //add base floor
            let baseFloorMat = new THREE.MeshStandardMaterial({
                side: THREE.DoubleSide,
                color: elm.wall.color[0],
                roughness: 0.08,
                metalness: 0.35,
                envMap: reflectionEnv,
                envMapIntensity: 0.025,
            });
            let baseFloor = new THREE.Mesh(new THREE.PlaneGeometry(125.5, 60.5),
                baseFloorMat);
            baseFloor.name = elm.floor.name + "base";
            baseFloor.position.set(0, 0.06, 20);
            baseFloor.rotation.x = Math.PI / 2;
            scene.add(baseFloor);

            //add stage floor
            let floorMat = new THREE.MeshStandardMaterial({
                color: elm.floor.color[0],
                roughness: 0.05,
                metalness: 0.35,
                side: THREE.DoubleSide,
                map: elm.floor.map,
                bumpMap: elm.floor.map,
                bumpScale: 0.5,
                transparent: true,
                opacity: 0.95,
                envMap: reflectionEnv,
                envMapIntensity: 0.5,
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
            floor.position.set(0, 0.08, 7.5);
            floor.rotation.x = Math.PI / 2;
            scene.add(floor);

            //create stage area line
            //create v-line
            const arenaLine = new THREE.Group();
            arenaLine.name = "arenaLine";

            let _line = GlowLight({ w: 44.5, h: 0.001 },
                {
                    color1: model.theme.color, color2: model.theme.color
                },
                0.05, 0.75,
                elm.vrGradient);
            _line.position.set(0, 0.1, 22.5);
            arenaLine.add(_line);

            //add arrow
            let _cone = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.45, 10),
                new THREE.MeshBasicMaterial({ color: model.theme.color }));
            _cone.position.set(-22.3, _line.position.y, _line.position.z + 0.05);
            _cone.rotation.set(Math.PI / 2, 0, Math.PI / 2);
            arenaLine.add(_cone);
            let _cone2 = _cone.clone();
            _cone2.position.set(Math.abs(_cone.position.x), _cone.position.y, _cone.position.z);
            _cone2.rotation.set(Math.PI / 2, 0, -Math.PI / 2);
            arenaLine.add(_cone2);
            //create text
            let labelDiv = document.createElement("span");
            labelDiv.className = "modelLabelArea";

            labelDiv.textContent = `${model.labels.text[0]}`;
            labelDiv.style.cssText = `
                background-color: ${model.labels.areaBackground};
                font-size: ${model.labels.areaFontSize};
                font-weight: ${model.labels.weight};
                color: ${model.labels.pulseDot};
                text-align: ${model.labels.alignment};
            `;
            let pointLabel = new CSS2DObject(labelDiv);
            pointLabel.name = "areaLabel";
            pointLabel.position.set(0, 0.2, 0);
            pointLabel.center.set(0, 1);
            _line.add(pointLabel);

            ////create h-line
            _line = GlowLight({ w: 24.5, h: 0.01 },
                {
                    color1: model.theme.color, color2: model.theme.color
                }, 0.05, 0.75,
                elm.vrGradient);
            _line.position.set(-23, 0.1, 7.5);
            _line.rotation.set(0, Math.PI / 2, 0);
            arenaLine.add(_line);

            //add arrow
            _cone = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.25, 10),
                new THREE.MeshBasicMaterial({ color: model.theme.color }));
            _cone.position.set(_line.position.x, _line.position.y, 19.8);
            _cone.rotation.set(Math.PI / 2, 0, 0);
            arenaLine.add(_cone);
            _cone2 = _cone.clone();
            _cone2.position.set(_line.position.x, _line.position.y, -4.5);
            _cone2.rotation.set(-Math.PI / 2, 0, 0);
            arenaLine.add(_cone2);
            // //create text
            labelDiv = document.createElement("span");
            labelDiv.className = "modelLabelArea";

            labelDiv.textContent = `${model.labels.text[1]}`;
            labelDiv.style.cssText = ` 
                background-color: ${model.labels.areaBackground};
                font-size: ${model.labels.areaFontSize};
                font-weight: ${model.labels.weight};
                color: ${model.labels.pulseDot};
                text-align: ${model.labels.alignment};
            `;
            pointLabel = new CSS2DObject(labelDiv);
            pointLabel.name = "areaLabel";
            pointLabel.position.set(0, 0.2, 0);
            pointLabel.center.set(0, 1);
            _line.add(pointLabel);
            scene.add(arenaLine);


            //add texture to stage cage
            let stageMat = new THREE.MeshStandardMaterial({
                side: THREE.DoubleSide,
                color: elm.cage.color[0],
                roughness: 0.2,
                metalness: 1,
            });
            let stageCageObj = world.getObjectByName(elm.cage.name);
            stageCageObj.castShadow = true;
            stageCageObj.material = stageMat;

            //add color to stage poster area
            let posterBoxMat = new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                color: elm.poster.color,
            });

            elm.poster.name.map((poster, i) => {
                let posterObj = world.getObjectByName(poster);
                posterObj.material = posterBoxMat;
                posterObj.matrixAutoUpdate = false;
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
            // cameraObj.castShadow = true;
            cameraObj.material = camMat;

            //add texture to fan
            let fanMat = new THREE.MeshStandardMaterial({
                side: THREE.DoubleSide,
                color: elm.fan.color,
                roughness: 0.25,
                metalness: 1,
                envMap: reflectionEnv,
                envMapIntensity: 3.5,
            });
            let fanObj = world.getObjectByName(elm.fan.name);
            fanObj.material = fanMat;

            //add texture to metal wheel
            let wheelMat = new THREE.MeshStandardMaterial({
                side: THREE.DoubleSide,
                color: elm.metalwheel.color,
                roughness: 0.05,
                metalness: 1,
                envMap: reflectionEnv,
                envMapIntensity: 2,
            });
            let wheelObj = world.getObjectByName(elm.metalwheel.name);
            wheelObj.castShadow = true;
            wheelObj.receiveShadow = true;
            wheelObj.material = wheelMat;

            //add texture to box
            let boxMat = new THREE.MeshStandardMaterial({
                side: THREE.DoubleSide,
                color: elm.box.color,
                normalMap: elm.box.map,
                map: elm.box.map,
                bumpMap: elm.box.map,
                bumpScale: 0.35,
                displacementMap: elm.box.map,
                displacementScale: -0.35,
                envMap: reflectionEnv,
                envMapIntensity: 1,
                emissive: elm.box.color,
                emissiveIntensity: 0.05,
            });
            boxMat.map.wrapS = THREE.RepeatWrapping;
            boxMat.map.wrapT = THREE.RepeatWrapping;
            let boxObj = world.getObjectByName(elm.box.name);
            boxObj.castShadow = true;
            boxObj.receiveShadow = true;
            boxObj.matrixAutoUpdate = true;
            boxObj.material = boxMat;
            boxObj.material.map.repeat.set(1.5, 3.85);

            //add texture to heat unit
            let heatMat = new THREE.MeshStandardMaterial({
                side: THREE.DoubleSide,
                color: elm.heatbox.color,
                roughness: 0.15,
                metalness: 0.85,
                envMap: reflectionEnv,
                envMapIntensity: 1,
            });
            let heatObj = world.getObjectByName(elm.heatbox.name);
            heatObj.material = heatMat;

            //add texture to heatBox rope
            let heatRopeMat = new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                color: elm.heatboxStand.color,
            });
            let heatRopeObj = world.getObjectByName(elm.heatboxStand.name);
            heatRopeObj.material = heatRopeMat;

            //add texture to sensor unit
            let sensorBodyMat = new THREE.MeshStandardMaterial({
                side: THREE.DoubleSide,
                color: elm.sensorBody.color,
                roughness: 0.85,
                metalness: 0.35,
                map: elm.sensorBody.map,
                envMap: reflectionEnv,
                envMapIntensity: 1.5,
            });
            sensorBodyMat.map.wrapS = THREE.RepeatWrapping;
            sensorBodyMat.map.wrapT = THREE.RepeatWrapping;
            sensorBodyMat.map.repeat.set(5, 5);

            elm.sensorBody.name.map((sensorOBJS, i) => {
                let sensorObj = world.getObjectByName(sensorOBJS);
                stageCageObj.castShadow = true;
                sensorObj.material = sensorBodyMat;
            });

            let sensorCapMat = new THREE.MeshStandardMaterial({
                side: THREE.DoubleSide,
                color: elm.sensorCap.color,
                roughness: 0.05,
                metalness: 0.9,
            });

            elm.sensorCap.name.map((sensorOBJS, i) => {
                let sensorObj = world.getObjectByName(sensorOBJS);
                stageCageObj.castShadow = true;
                sensorObj.material = sensorCapMat;
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

            addInteractiveItem();
        }


        //// interaction
        //////////////////////
        function addInteractiveItem() {
            let elm = model.element;
            var InteractiveItemGrup = new THREE.Group();
            var labelDiv, pointLabel, pluseDiv, pulseLabel;

            const transparentMat = new THREE.MeshBasicMaterial({
                transparent: true,
                opacity: 0,
                color: "#000000",
                // color:"red"
            });

            //add camera box
            let camCube = new THREE.Mesh( // new THREE.BoxGeometry(0.8, 0.8, 0.8),
                new THREE.BoxGeometry(2.8, 2.8, 2.8),
                transparentMat);
            camCube.renderOrder = 5;
            camCube.name = elm.camera.id;
            camCube.position.set(5.265, 7.8, -3.75);
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
            pointLabel.name = "itemLabel";
            pointLabel.position.set(-0.5, 0, 0);
            pointLabel.center.set(0, 0);
            camCube.add(pointLabel);
            //add pulse
            pluseDiv = document.createElement("span");
            pluseDiv.className = "labelPulse";
            pulseLabel = new CSS2DObject(pluseDiv);
            pulseLabel.name = "pointerLabel";
            pulseLabel.position.set(-0.5, 0, 0);
            pulseLabel.center.set(0, 0);
            camCube.add(pulseLabel);
            InteractiveItemGrup.add(camCube);

            createInteractiveMeshes({
                name: elm.camera.id,
                click: elm.camera.click,
                text: elm.camera.text,
            });



            //add fan box
            let fanCube = new THREE.Mesh(
                new THREE.BoxGeometry(3.4, 6, 4),
                transparentMat);
            fanCube.renderOrder = 5;
            fanCube.name = elm.fan.id;
            fanCube.position.set(21.85, 6.5, -2.8);

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
            pointLabel.name = "itemLabel";
            pointLabel.position.set(0, 0, 0);
            pointLabel.center.set(0, 0);
            fanCube.add(pointLabel);
            //add pulse
            pluseDiv = document.createElement("span");
            pluseDiv.className = "labelPulse";
            pulseLabel = new CSS2DObject(pluseDiv);
            pulseLabel.name = "pointerLabel";
            pulseLabel.position.set(-0.25, -0.5, 0);
            pulseLabel.center.set(0, 0);
            fanCube.add(pulseLabel);
            InteractiveItemGrup.add(fanCube);

            createInteractiveMeshes({
                name: elm.fan.id,
                click: elm.fan.click,
                text: elm.fan.text,
            });



            //add heat box
            let HeatCube = new THREE.Mesh(new THREE.BoxGeometry(9, 1.2, 1.5),
                transparentMat);
            HeatCube.renderOrder = 5;
            HeatCube.name = elm.heatbox.id;
            HeatCube.position.set(-11.15, 10.9, 7);
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
            pointLabel.name = "itemLabel";
            pointLabel.position.set(0, 0, 0);
            pointLabel.center.set(0, 0);
            HeatCube.add(pointLabel);
            //add pulse
            pluseDiv = document.createElement("span");
            pluseDiv.className = "labelPulse";
            pulseLabel = new CSS2DObject(pluseDiv);
            pulseLabel.name = "pointerLabel";
            pulseLabel.position.set(0, 0, 0);
            pulseLabel.center.set(0, 0);
            HeatCube.add(pulseLabel);
            InteractiveItemGrup.add(HeatCube);

            createInteractiveMeshes({
                name: elm.heatbox.id,
                click: elm.heatbox.click,
                text: elm.heatbox.text,
            });

            //add scent box
            let scentCube = new THREE.Mesh(new THREE.BoxGeometry(1.54, 1.64, 0.65),
                transparentMat);
            scentCube.renderOrder = 5;
            scentCube.castShadow = true;
            scentCube.name = elm.sensorBody.id;
            scentCube.position.set(-1.1, 1, 17.87);
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
            pointLabel.name = "itemLabel";
            pointLabel.position.set(0, 0, 0);
            pointLabel.center.set(0, 0);
            scentCube.add(pointLabel);
            //add pulse
            pluseDiv = document.createElement("span");
            pluseDiv.className = "labelPulse";
            pulseLabel = new CSS2DObject(pluseDiv);
            pulseLabel.name = "pointerLabel";
            pulseLabel.position.set(-0.35, 0, 0);
            pulseLabel.center.set(0, 0);
            scentCube.add(pulseLabel);
            InteractiveItemGrup.add(scentCube);

            createInteractiveMeshes({
                name: elm.sensorBody.id,
                click: elm.sensorBody.click,
                text: elm.sensorBody.text,
            });

            scene.add(InteractiveItemGrup);
        }

        function zoomInTimeline(obj = null, reset = false) {
            controls.enabled = false;

            //hide all labels
            container.querySelectorAll(".modelLabel").forEach((e) => {
                e.classList.remove("clicked");
            });

            if (reset) {
                let camTl = gsap.timeline({
                    defaults: {
                        duration: 1,
                        ease: "linear",
                        onComplete: () => {
                            controls.enabled = true;
                            controls.enableRotate = true;
                            controls.enableDamping = true;
                            controls.enableZoom = true;
                            controls.enablePan = model.camera.pan;
                            controls.minDistance = model.camera.distance.min;
                            controls.maxDistance = model.camera.distance.max;
                            controls.minPolarAngle = model.camera.polar.min;
                            controls.maxPolarAngle = model.camera.polar.max;
                            controls.minAzimuthAngle = model.camera.azimuth.min;
                            controls.maxAzimuthAngle = model.camera.azimuth.max;
                        },
                    },
                });

                camTl.to(controls, {
                    minPolarAngle: model.camera.polar.min,
                    maxPolarAngle: model.camera.polar.max,
                    minAzimuthAngle: model.camera.azimuth.min,
                    maxAzimuthAngle: model.camera.azimuth.max,
                }).to(controls.target, {
                    x: model.camera.targetPosition.x,
                    y: model.camera.targetPosition.y,
                    z: model.camera.targetPosition.z,
                }, "<").to(camera.position,
                    {
                        x: model.camera.position.x,
                        y: model.camera.position.y,
                        z: model.camera.position.z,
                    },
                    "<");

                gsap.set(resetCam, {
                    opacity: 0,
                    duration: 0.3,
                    pointerEvents: "none",
                });
            }

            else {
                zoomed = true;
                obj.label.classList.add("clicked");
                var modal_data = info_modal.querySelector(`[data-id='${obj.target}']`);

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

                let camTl = gsap.timeline({
                    defaults: {
                        duration: 1,
                        ease: "linear",
                        onComplete: () => {
                            controls.enabled = true;
                            zoomed = false;
                            controls.enableZoom = false;

                            gsap.to(info_modal, {
                                opacity: 1
                            });
                        },
                    },
                });


                //heat
                if (obj.target == "heat_item") {
                    camTl
                        .to(controls.target, {
                            x: obj.pos.x, y: obj.pos.y, z: obj.pos.z

                        })
                        .to(camera.position,
                            {
                                x: obj.pos.x + 11.5,
                                y: obj.pos.y - 5,
                                z: obj.pos.z + 5,
                            }, "<")
                        .to(controls, {
                            minPolarAngle: Math.PI / 1.75,
                            maxPolarAngle: Math.PI / 1.85,
                            minAzimuthAngle: -Math.PI / 3,
                            maxAzimuthAngle: Math.PI / 2,
                        })
                }

                //fan
                else if (obj.target == "wind_item") {
                    camTl
                        .to(controls.target, {
                            x: obj.pos.x, y: obj.pos.y, z: obj.pos.z
                        })
                        .to(camera.position,
                            {
                                x: obj.pos.x - 8,
                                y: obj.pos.y - 15,
                                z: obj.pos.z + 1.5,
                            }, "<")
                        .to(controls, {
                            minPolarAngle: Math.PI / 1.8,
                            maxPolarAngle: Math.PI / 1.95,
                            minAzimuthAngle: -Math.PI / 3,
                            maxAzimuthAngle: Math.PI / 3,
                        }, "<");
                }

                //scent
                else if (obj.target == "scent_item") {
                    camTl
                        .to(controls.target, {
                            x: obj.pos.x, y: obj.pos.y, z: obj.pos.z

                        })
                        .to(camera.position,
                            {
                                x: obj.pos.x - 15,
                                y: obj.pos.y + 5,
                                z: obj.pos.z,
                            }, "<")
                        .to(controls, {
                            minPolarAngle: -Math.PI / 3,
                            maxPolarAngle: Math.PI / 3,
                            minAzimuthAngle: -Math.PI / 1.5,
                            maxAzimuthAngle: Math.PI / 1.2,
                        });
                }

                //camera
                if (obj.target == "camera_item") {
                    camTl
                        .to(controls.target, {
                            x: obj.pos.x, y: obj.pos.y, z: obj.pos.z
                        })
                        .to(camera.position,
                            {
                                x: obj.pos.x,
                                y: obj.pos.y - 2.5,
                                z: obj.pos.z + 5,
                            }, "<")
                        .to(controls, {
                            minPolarAngle: -Math.PI / 3,
                            maxPolarAngle: Math.PI / 3,
                            minAzimuthAngle: -Math.PI / 3,
                            maxAzimuthAngle: Math.PI / 3,
                        });
                }
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

            const draggedDistance = mousePxPositionOnClickStart.distanceTo(new THREE.Vector2(e.clientX, e.clientY));

            if (draggedDistance > 3) {
                return;
            }

            mouse.x = (e.clientX / sizes.width) * 2 - 1;
            mouse.y = -(e.clientY / sizes.height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);

            let target = new THREE.Vector3();

            //hide all labels
            container.querySelectorAll(".modelLabel").forEach((e) => {
                e.classList.remove("show");
            });
            var intersects = raycaster.intersectObjects(scene.children, true);

            interactiveMeshes.map((el, i) => {
                if (el.id === intersects[0].object.name) {
                    let intersect = intersects[0];

                    if (!zoomed) {
                        container.style.cursor = "pointer";

                        let instObj = intersect.object.children[0];
                        if (instObj.name == "itemLabel"

                        ) {
                            instObj.element.classList.add("show");
                            instObj.getWorldPosition(target);
                        }

                        if (e.type == "click") {
                            if (el.clickable == true) {
                                if (!instObj.element.classList.contains("clicked")) {
                                    zoomInTimeline({
                                        label: instObj.element,
                                        target: el.id,
                                        pos: target,
                                    });
                                }
                            }
                        }
                        return;

                    }
                }
            });
        }

        function createInteractiveMeshes(el) {
            interactiveMeshes.push({
                id: el.name,
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
