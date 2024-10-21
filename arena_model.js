// window.addEventListener("DOMContentLoaded", modelApp);
const model_wrapper = document.querySelector('.model_wrapper');
if (!model_wrapper != undefined) {
    const container = model_wrapper.querySelector('.canvas_area');
    const modelViewer = model_wrapper.querySelector('.enable_model');
    modelViewer.addEventListener("click", function () {
        modelApp();
        gsap.to(modelViewer, {
            pointerEvents: "none",
            opacity: 0,
        });
        gsap.to(".imms_container", {
            pointerEvents: "none",
            opacity: 0,
        })
        gsap.to(container, {

            opacity: 1,
            onComplete: () => {
                gsap.set(container, {
                    pointerEvents: "all",
                });
            }
        });
    });
    function modelApp() {
        const container = document.getElementById('canvas');
        const loader = container.querySelector('.sc_loader');
        const sizes = {
            width: container.clientWidth,
            height: container.clientHeight,
        }
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
            textureLoader = new THREE.TextureLoader(),
            controls = new THREE.OrbitControls(camera, renderer.domElement);

        var world = new THREE.Object3D();
        const model = {
            loaded: false,
            src: "https://soumya-webskitters-pal.github.io/nextgen/model.glb",
            // envMap: textureLoader.load("https://soumya-webskitters-pal.github.io/nextgen/texture/env_map.webp"),
            element: {
                wall: {
                    name: "room",
                    color: ["#0d0d0d", "#3d3530"],
                    click: false,
                    text: "Room",
                },
                floor: {
                    name: "floor",
                    map: textureLoader.load("https://soumya-webskitters-pal.github.io/nextgen/texture/Vr_floor.webp"),
                    lightMap: textureLoader.load("https://soumya-webskitters-pal.github.io/nextgen/texture/Vr_floor_lightmap.webp"),
                    color: ["#fff", "#38383a"],
                    click: false,
                    text: "Arena",
                },
                poster: {
                    name: ["poster_1", "poster_2"],
                    map: textureLoader.load("https://soumya-webskitters-pal.github.io/nextgen/texture/Vr_poster.webp"),
                    color: "#000000",
                    click: false,
                    text: "Poster",
                },
                cage: {
                    name: "metal",
                    // map: textureLoader.load("texture/cage.png"),
                    color: ["#4f4f4f", "#026bff"],
                    click: false,
                    text: "Arena",
                },
                camera: {
                    name: "camera",
                    map: textureLoader.load("https://soumya-webskitters-pal.github.io/nextgen/texture/Vr_camera.webp"),
                    color: "#b1b1b1",
                    click: true,
                    text: "Camera",
                },
                box: {
                    name: "box",
                    map: textureLoader.load("https://soumya-webskitters-pal.github.io/nextgen/texture/Vr_box.webp"),
                    color: "#976b3c",
                    click: false,
                    text: "Box",
                },
                sensorBody: {
                    name: ["scent_unit_body", "scent_unit_body001"],
                    map: textureLoader.load("https://soumya-webskitters-pal.github.io/nextgen/texture/Vr_sensor.webp"),
                    color: "#0f0f0f",
                    click: true,
                    text: "Scent Diffusion",
                },
                sensorCap: {
                    name: ["scent_unit_cap", "scent_unit_cap001"],
                    color: "#ff8700",
                    click: true,
                    text: "Scent Diffusion",
                },
                screen: {
                    name: "screen",
                    map: textureLoader.load("https://soumya-webskitters-pal.github.io/nextgen/texture/Vr_screen.webp"),
                    lightMap: textureLoader.load("https://soumya-webskitters-pal.github.io/nextgen/texture/Vr_screen_lightmap.webp"),
                    color: "#ffffff",
                    click: false,
                    text: "Screen",
                },
                fan: {
                    name: "fan",
                    color: "#3a3a3a",
                    click: true,
                    text: "Fan",
                },
                heatbox: {
                    name: "hit_unit",
                    color: "#5a4230",
                    click: true,
                    text: "Heating unit",
                },
                metalwheel: {
                    name: "metal001",
                    color: "#a7a7a7",
                    click: false,
                    text: "Metal wheel",
                },
                men: {
                    name: "men_character",
                    maps: [
                        {
                            name: 'chest', texture: textureLoader.load("https://soumya-webskitters-pal.github.io/nextgen/texture/men/chest.webp"),
                        },
                        { name: 'eye', texture: textureLoader.load("https://soumya-webskitters-pal.github.io/nextgen/texture/men/eye.webp") },
                        { name: 'head', texture: textureLoader.load("https://soumya-webskitters-pal.github.io/nextgen/texture/men/head.webp") },
                        { name: 'leg', texture: textureLoader.load("https://soumya-webskitters-pal.github.io/nextgen/texture/men/leg.webp"), color: "#000000" },
                    ],
                    click: false,
                    text: "Player",
                },
                women: {
                    name: "Girl_character",
                    maps: [
                        {
                            name: 'Accessoires',
                            color: "#000000",
                        },
                        { name: 'body', color: "#947a69", texture: textureLoader.load("https://soumya-webskitters-pal.github.io/nextgen/texture/girl/body.webp") },
                        {
                            name: 'Clothing', texture: textureLoader.load("https://soumya-webskitters-pal.github.io/nextgen/texture/girl/cloth.webp"),
                            color: "#383838",
                        },
                        { name: 'eyes', texture: textureLoader.load("https://soumya-webskitters-pal.github.io/nextgen/texture/girl/eye.webp") },
                        { name: 'hair', color: "#000000" },
                    ],
                    click: false,
                    text: "Player",
                },
                gun: {
                    name: "GUN",
                    map: textureLoader.load("https://soumya-webskitters-pal.github.io/nextgen/texture/gun.webp"),
                    bumpMap: textureLoader.load("https://soumya-webskitters-pal.github.io/nextgen/texture/gun_bump.webp"),
                    color: "#ffffff",
                    click: false,
                    text: "Gun",
                }
            },
            fog: {
                color: {
                    h: 215,
                    s: 80,
                    l: 80,
                },
                near: 0.01,
                far: 272
            },
            ambient: {
                color: "#ffffff",
                intensity: 1
            },
            theme: {
                color: "#00d3ff",
                intensity: 0.5,
                map: textureLoader.load('https://soumya-webskitters-pal.github.io/nextgen/texture/lightmap.webp'),
            },
            shadow: {
                color: "#000000",
            },
            heaterLight: {
                color: ["#ff0000", "#ff623e"],
            }
        };

        const cameraResetPos = new THREE.Vector3(0, 18.5, 45);
        const lookAt = new THREE.Vector3(0, 1.5, 0);
        var interactiveMeshes = [];
        let zoomed = false;
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const mousePxPositionOnClickStart = new THREE.Vector2();

        //UI
        //add tooltip
        const tooltip = document.createElement('div');
        tooltip.classList.add('info_tooltip');
        container.appendChild(tooltip);
        let xSetter = gsap.quickSetter(tooltip, "x", "px")
        let ySetter = gsap.quickSetter(tooltip, "y", "px")

        //info modal
        const info_modal = container.querySelector('.arena_modal');

        //reset button
        const resetCam = container.querySelector(".reset")

        //show stat
        // const stats = new Stats();
        // stats.showPanel(0);
        // stats.domElement.style.position = 'absolute';
        // document.body.appendChild(stats.domElement);

        //add bg color
        scene.background = new THREE.Color('#000000');
        controls.enabled = false;

        function adjustWindow() {
            sizes.width = container.clientWidth;
            sizes.height = container.clientHeight;

            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }

        function controlCameraRange() {
            controls.enabled = true;
            controls.target.set(0, 0, 0);
            controls.enableRotate = true;
            controls.enableDamping = true;
            controls.enableZoom = true;
            controls.enablePan = true;
            controls.minDistance = 10;
            controls.maxDistance = 45;
            controls.minPolarAngle = Math.PI / 2.61;
            controls.maxPolarAngle = Math.PI / 2.1;
            controls.minAzimuthAngle = - Math.PI / 4.5;
            controls.maxAzimuthAngle = Math.PI / 3;
        }

        function resetCamera() {
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            camera.position.set(cameraResetPos.x, cameraResetPos.y, cameraResetPos.z);
            camera.rotation.set(0, 0, 0);
            camera.lookAt(lookAt.x, lookAt.y, lookAt.z);
            lookAt.x = camera.position.x;
            lookAt.y = camera.position.y;
            lookAt.z = camera.position.z;
            controlCameraRange();
        }


        function init() {
            resetCamera();

            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            // renderer.gammaOutput = true;
            // renderer.gammaFactor = 1.5;

            // first render
            // document.body.appendChild(renderer.domElement);
            container.appendChild(renderer.domElement);
            loadModel();
            addLight();
            renderScene();
        }

        function enableSetup() {
            gsap.to(loader, {
                delay: 0.5,
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    loader.remove();
                },
            })
            gsap.set(resetCam, {
                opacity: 0,
                pointerEvents: "none",
            });
            info_modal.querySelectorAll('.modal_data')[0].classList.add('show');

            gsap.set(info_modal, {
                opacity: 0,
                pointerEvents: "none",
                yPercent: 100,
            });
            gsap.to(info_modal, {
                opacity: 1,
                pointerEvents: "all",
                yPercent: 0,
                duration: 0.5,
            });

            resetCam.addEventListener("click", () => {
                gsap.to(resetCam, { opacity: 0, pointerEvents: "none", duration: 0.5 });
                controls.enabled = true;
                controlCameraRange();
                resetCamera();
                info_modal.querySelectorAll('.modal_data').forEach((e, i) => {
                    i == 0 ? e.classList.add('show') : e.classList.remove('show')
                })
            });
        }

        function renderScene() {
            // stats.begin();
            updateObjects();
            renderer.render(scene, camera);
            requestAnimationFrame(renderScene);
            // stats.end();
        }

        function updateObjects() {
            if (model.loaded) {
                controls.update();
            }
        }


        //load model
        function loadModel() {
            new THREE.GLTFLoader().load(
                // resource URL
                model.src,
                // called when the resource is loaded
                function (gltf) {
                    world = gltf.scene.children[0];
                    scene.add(world);
                    addTexture();
                    model.loaded = true;
                    enableSetup();
                    // console.log("world:", world);
                },
                function (xhr) {
                    // console.log(xhr);
                    // let percentLoad = (xhr.loaded / xhr.total) * 100;
                    // console.log(`${percentLoad}% loaded`);
                    // if (percentLoad == 100) {
                    //   model.loaded = true;
                    //   enableSetup();
                    // }
                },
                function (error) {
                    console.error(error);
                }
            );
        }

        //add light
        function addLight() {
            //// Env light
            scene.add(new THREE.AmbientLight(model.ambient.color, 0.5));

            // ambient front light for shadow
            const ambientFrontCenterLight = new THREE.SpotLight(model.ambient.color, model.ambient.intensity);
            ambientFrontCenterLight.name = 'ambientFrontCenterLight';
            ambientFrontCenterLight.position.set(0, 10, 65);
            modifyShadow(ambientFrontCenterLight);
            scene.add(ambientFrontCenterLight);
            //console.log(ambientFrontCenterLight);

            // ambient light-top 1
            const ambientLightTop1 = new THREE.PointLight(model.ambient.color, model.ambient.intensity / 2);
            ambientLightTop1.name = 'ambientLightTop1';
            ambientLightTop1.position.set(-40, 15, 45);
            scene.add(ambientLightTop1);

            // ambient light-top 2
            const ambientLightTop2 = new THREE.PointLight(model.ambient.color, model.ambient.intensity / 2);
            ambientLightTop2.name = 'ambientLightTop2';
            ambientLightTop2.position.set(40, 15, 45);
            scene.add(ambientLightTop2);

            // ambient light-top 3
            const ambientLightTop3 = new THREE.PointLight(model.ambient.color, model.ambient.intensity / 2);
            ambientLightTop3.name = 'ambientLightTop3';
            ambientLightTop3.position.set(0, 15, 45);
            scene.add(ambientLightTop3);

            // ambient front left light
            // const ambientFrontLightLeft = new THREE.SpotLight(model.ambient.color, model.ambient.intensity / 2, 0.1, Math.PI / 2);
            // ambientFrontLightLeft.name = 'ambientFrontLightLeft';
            // ambientFrontLightLeft.position.set(-20, 25, 65);
            // // ambientFrontLightLeft.target.position.set(10, 0, 10);
            // scene.add(ambientFrontLightLeft);
            // // console.log(ambientFrontLightLeft);


            // // // ambient front right light
            // const ambientFrontLightRight = new THREE.SpotLight(model.ambient.color, model.theme.intensity / 2, 0.1, Math.PI / 2);
            // ambientFrontLightRight.name = 'ambientFrontLightRight';
            // ambientFrontLightRight.position.set(20, 25, 65);
            // // ambientFrontLightRight.target.position.set(-10, 0, 10);
            // scene.add(ambientFrontLightRight);

            // ambient top left light
            // const ambientLightTopLeft = new THREE.SpotLight(model.ambient.color, model.theme.intensity / 2, 0.1, Math.PI);
            // ambientLightTopLeft.name = 'ambientLightTopLeft';
            // ambientLightTopLeft.position.set(-45, 10, 55);
            // scene.add(ambientLightTopLeft);
            // ambientLightTopLeft.target.position.set(45, 0, 10);
            // ambientLightTopLeft.target.updateMatrixWorld();

            // ambient top right light
            // const ambientLightTopRight = new THREE.SpotLight(model.ambient.color, model.theme.intensity / 2, 0.1, Math.PI);
            // ambientLightTopRight.name = 'ambientLightTopRight';
            // ambientLightTopRight.position.set(45, 10, 55);
            // scene.add(ambientLightTopRight);
            // ambientLightTopRight.target.position.set(-45, 0, 10);
            // ambientLightTopRight.target.updateMatrixWorld();

            // // // ambient top center light
            // const ambientLightTopCenter = new THREE.SpotLight(model.ambient.color, model.theme.intensity / 2, 0.1, Math.PI);
            // ambientLightTopCenter.name = 'ambientLightTopCenter';
            // ambientLightTopCenter.position.set(0, 10, 55);
            // scene.add(ambientLightTopCenter);
            // ambientLightTopCenter.target.position.set(0, 0, 10);
            // ambientLightTopCenter.target.updateMatrixWorld();


            // scene.add(new THREE.HemisphereLightHelper(ambientLightCenter, 5));

            // ambient light-left
            // const ambientLightLeft = new THREE.HemisphereLight(model.ambient.color, '#000', model.ambient.intensity);
            // ambientLightLeft.name = 'ambientLightLeft';
            // ambientLightLeft.position.set(60, 15, -25);
            // scene.add(ambientLightLeft);

            // // // ambient light-right
            // const ambientLightRight = new THREE.HemisphereLight(model.ambient.color, '#000', model.ambient.intensity);
            // ambientLightRight.position.set(-60, 15, -25);
            // scene.add(ambientLightRight);


            // piller Light -1
            // var themeLight0 = new THREE.PointLight(model.theme.color, 0.6, 0.5, 0.1);
            // themeLight0.name = 'pillerLight0';
            // themeLight0.position.set(-0.15, 0, 32.2);
            // scene.add(themeLight0);

            /*
                var themeLight1 = new THREE.SpotLight(
                    model.theme.color, model.theme.intensity * 2, 0.01, Math.PI / 15);
                themeLight1.name = 'pillerLight1';
                themeLight1.position.set(-0.15, 0.1, 19.2);
                themeLight1.target.position.set(themeLight1.position.x, 5, themeLight1.position.z);
                themeLight1.penumbra = 0.9;
                themeLight1.decay = -0.005;
                scene.add(themeLight1);
                themeLight1.target.updateMatrixWorld();
            
                // piller Light -2
                const themeLight2 = new THREE.SpotLight(
                    model.theme.color, model.theme.intensity * 2, 0.01, Math.PI / 15);
                themeLight2.name = 'pillerLight2';
                themeLight2.position.set(-22, 0.1, 19.2);
                themeLight2.target.position.set(themeLight2.position.x, 5, themeLight2.position.z);
                themeLight2.penumbra = 0.9;
                themeLight2.decay = -0.005;
                scene.add(themeLight2);
                themeLight2.target.updateMatrixWorld();
            
                // // piller Light -3
                const themeLight3 = new THREE.SpotLight(
                    model.theme.color, model.theme.intensity * 2, 0.01, Math.PI / 15);
                themeLight3.name = 'pillerLight3';
                themeLight3.position.set(22, 0.1, 19.2);
                themeLight3.target.position.set(themeLight3.position.x, 5, themeLight3.position.z);
                themeLight3.penumbra = 0.9;
                themeLight3.decay = -0.005;
                scene.add(themeLight3);
                themeLight3.target.updateMatrixWorld();
            
                // // // piller Light -4
                const themeLight4 = new THREE.SpotLight(
                    model.theme.color, model.theme.intensity * 2, 0.01, Math.PI / 15);
                themeLight4.name = 'pillerLight4';
                themeLight4.position.set(21.5, 0.1, 4);
                themeLight4.target.position.set(themeLight4.position.x, 5, themeLight4.position.z);
                themeLight4.penumbra = 0.9;
                themeLight4.decay = -0.005;
                scene.add(themeLight4);
                themeLight4.target.updateMatrixWorld();
            
                // // // piller Light -5
                const themeLight5 = new THREE.SpotLight(
                    model.theme.color, model.theme.intensity * 2, 0.01, Math.PI / 15);
                themeLight5.name = 'pillerLight5';
                themeLight5.position.set(-0.15, 0.1, 4);
                themeLight5.target.position.set(themeLight5.position.x, 5, themeLight5.position.z);
                themeLight5.penumbra = 0.9;
                themeLight5.decay = -0.005;
                scene.add(themeLight5);
                themeLight5.target.updateMatrixWorld();
            
                // // // piller Light -6
                const themeLight6 = new THREE.SpotLight(
                    model.theme.color, model.theme.intensity * 2, 0.01, Math.PI / 15);
                themeLight6.name = 'pillerLight6';
                themeLight6.position.set(-22, 0.1, 4);
                themeLight6.target.position.set(themeLight6.position.x, 5, themeLight6.position.z);
                themeLight6.penumbra = 0.9;
                themeLight6.decay = -0.005;
                scene.add(themeLight6);
                themeLight6.target.updateMatrixWorld();
                */

            //screen light
            var backscreenLight = GlowLight({ w: 43.0, h: 0.03 }, { color1: model.ambient.color, color2: model.theme.color }, 0.05, 0.5);
            backscreenLight.name = 'backscreenLight';
            backscreenLight.rotation.x = Math.PI / 2;
            var backscreenLightBottom = backscreenLight.clone();
            backscreenLightBottom.position.set(0.05, 0.21, -4.55);
            scene.add(backscreenLightBottom);
            var backscreenLightTop = backscreenLightBottom.clone();
            backscreenLightTop.position.y = backscreenLightTop.position.y + 6.12;
            scene.add(backscreenLightTop);

            //heater light
            var heaterLight = new THREE.Group();
            var heaterLight1 = GlowLight({ w: 6.0, h: 0.01 }, { color1: model.heaterLight.color[0], color2: model.heaterLight.color[1] }, 0.3, 0.99);
            heaterLight1.name = 'heaterLight';
            heaterLight1.position.set(11.25, 15.55, 7.2);
            var heaterLight2 = heaterLight1.clone();
            heaterLight2.position.z = heaterLight2.position.z - 0.34;
            heaterLight.add(heaterLight1, heaterLight2)
            scene.add(heaterLight);
            var heaterLight2 = heaterLight.clone();
            heaterLight2.position.x = -22;
            scene.add(heaterLight2);

            //room light
            const roomLight = new THREE.HemisphereLight(model.ambient.color, model.shadow.color, model.ambient.intensity / 2);
            roomLight.name = 'roomLight';
            roomLight.position.set(-0.15, -15, 5);
            scene.add(roomLight);

            //add piller light

            let pillerLights = pillerLight({ x: 0.2, y: 0.5, z: 19.2, r: 0.5, h: 12, color: model.theme.color, step: 18 });
            //piller light 1
            let pillerLight1 = pillerLights.clone();
            pillerLight1.name = 'pillerLight1';
            scene.add(pillerLight1);
            //piller light 2
            let pillerLight2 = pillerLights.clone();
            pillerLight2.name = 'pillerLight2';
            pillerLight2.position.z = -4;
            scene.add(pillerLight2);
            //piller light 3
            let pillerLight3 = pillerLights.clone();
            pillerLight3.name = 'pillerLight3';
            pillerLight3.position.x = -21.6;
            scene.add(pillerLight3);
            //piller light 4
            let pillerLight4 = pillerLights.clone();
            pillerLight4.name = 'pillerLight4';
            pillerLight4.position.x = 22.1;
            scene.add(pillerLight4);
            //piller light 5
            let pillerLight5 = pillerLights.clone();
            pillerLight5.name = 'pillerLight5';
            pillerLight5.position.x = 22.1;
            pillerLight5.position.z = -4;
            scene.add(pillerLight5);
            //piller light 6
            let pillerLight6 = pillerLights.clone();
            pillerLight6.name = 'pillerLight6';
            pillerLight6.position.x = -21.6;
            pillerLight6.position.z = -4;
            scene.add(pillerLight6);
        }

        function pillerLight(props) {
            var pillerLightGroup = new THREE.Group();
            pillerLightGroup.position.set(props.x, props.y, props.z);
            var lights = new THREE.PointLight(props.color, 0.08, 0.01, 0.01);
            lights.name = 'pillerLights';
            lights.position.set(0, 0, 0);
            pillerLightGroup.add(lights);
            // console.log(lights);
            pillerLightGroup.add(new THREE.Mesh(
                new THREE.CylinderGeometry(props.r, props.r, props.h, 15, 8),
                new THREE.MeshBasicMaterial({
                    color: props.color,
                    transparent: true,
                    // needsUpdate: true,
                    opacity: 1,
                    alphaMap: model.theme.map,
                    aoMap: model.theme.map,
                    aoMapIntensity: 10,
                    // side: THREE.DoubleSide,
                })
            ));

            // for (var i = 0; i < 1; i += (props.step / 100)) {
            //   if (i > 0) {
            //     let r = (i * (props.r / props.step) * props.step);
            //     pillerLightGroup.add(new THREE.Mesh(
            //       new THREE.CylinderGeometry(r, r, props.h, 10, 10),
            //       new THREE.MeshBasicMaterial({
            //         color: props.color,
            //         transparent: true,
            //         opacity: 1 - Math.pow(i, props.step / 100),
            //         needsUpdate: true,
            //         alphaMap: model.theme.map,
            //       })
            //     ));
            //     // // console.log(aa);
            //     // aa);
            //     // console.log(r);
            //     // pillerLightGroup.add(new THREE.Mesh(
            //     //   new THREE.CylinderGeometry(r, r, props.h, 5, 5),
            //     //   new THREE.MeshBasicMaterial({
            //     //     color: props.color,
            //     //     transparent: true,
            //     //     opacity: 1 - Math.pow(i, props.step/100),
            //     //   })
            //     // ));
            //   }
            //   // else {
            //   //   pillerLightGroup.add(new THREE.Mesh(
            //   //     new THREE.SphereGeometry(props.r/4, 5, 5),
            //   //     new THREE.MeshBasicMaterial({ color: props.color, })
            //   //   ));
            //   // }
            // }
            //scene.add(pillerLightGroup);
            return pillerLightGroup;
        }
        function GlowLight(dimention, colors, step, spread) {
            var glowLight = new THREE.Group();
            glowLight.position.x = 0;
            glowLight.position.y = step;
            glowLight.position.z = 4.5;
            for (var i = 0; i < 1; i += step) {
                glowLight.add(new THREE.Mesh(
                    new THREE.BoxGeometry(dimention.w, dimention.h, 0.1 + i * i / spread),
                    new THREE.MeshLambertMaterial({
                        color: i < 0.15 ? colors.color1 : colors.color2,
                        transparent: true,
                        opacity: 1 - Math.pow(i, step)
                    })
                ));
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

        function addTexture() {
            let elm = model.element;

            //add texture to room
            let roomMat = new THREE.MeshStandardMaterial({
                side: THREE.DoubleSide,
                color: elm.wall.color[0],
                emissive: elm.wall.color[1],
                // envMap: elm.envMap, 
                roughness: 0.55,
                metalness: 0.35,
                emissiveIntensity: 0.05,
            });
            let roomObj = world.getObjectByName(elm.wall.name);
            roomObj.receiveShadow = true;
            roomObj.material = roomMat;
            // console.log("room:", roomObj);


            //add base floor
            let baseFloorMat = new THREE.MeshStandardMaterial({
                side: THREE.DoubleSide,
                color: elm.wall.color[0],
                emissive: elm.wall.color[1],
                color: elm.wall.color[0],
                roughness: 0.65,
                metalness: 0.25,
                emissiveIntensity: 0.05,
            });
            let baseFloor = new THREE.Mesh(new THREE.PlaneGeometry(125.5, 60.5), baseFloorMat);
            baseFloor.name = elm.floor.name;
            baseFloor.receiveShadow = true;
            baseFloor.position.set(0, 0.08, 20);
            baseFloor.rotation.x = Math.PI / 2;
            scene.add(baseFloor);
            // console.log("baseFloor:", baseFloor);


            //add stage floor
            let floorMat = new THREE.MeshStandardMaterial({
                color: elm.floor.color[0],
                roughness: 0.55,
                metalness: 0.35,
                side: THREE.DoubleSide,
                map: elm.floor.map,
                // alphaMap: elm.floor.lightMap,
                aoMap: elm.floor.map,
                bumpMap: elm.floor.map,
                bumpScale: 0.15,
                displacementMap: elm.floor.lightMap,
                displacementScale: -0.01,
                emissive: elm.floor.color[1],
                emissiveIntensity: 0.05,
            });
            floorMat.map.wrapS = THREE.RepeatWrapping;
            floorMat.map.wrapT = THREE.RepeatWrapping;
            floorMat.map.flipY = false;
            floorMat.map.repeat.set(20, 10);
            floorMat.map.magFilter = THREE.NearestFilter;
            // floorMat.map.encoding = THREE.sRGBEncoding;
            let floor = new THREE.Mesh(new THREE.PlaneGeometry(44.5, 24.5), floorMat);
            floor.name = elm.floor.name;
            floor.receiveShadow = true;
            // floor.castShadow = true;
            floor.position.set(0, 0.1, 7.5);
            floor.rotation.x = Math.PI / 2;
            scene.add(floor);
            // console.log("floor:", floor);
            // createInteractiveMeshes(elm.floor);


            //add texture to stage cage
            let stageMat = new THREE.MeshStandardMaterial({
                side: THREE.DoubleSide,
                color: elm.cage.color[0],
                // emissive: elm.cage.color[1],
                // emissiveIntensity: 0.02,
                roughness: 0.25,
                metalness: 0.75,
                refractionRatio: 0.05,
                // map: elm.cage.map,
            });
            let stageCageObj = world.getObjectByName(elm.cage.name);
            stageCageObj.castShadow = true;
            stageCageObj.receiveShadow = false;
            stageCageObj.material = stageMat;
            console.log("stageCage:", stageCageObj.material);


            //add color to stage poster area
            let posterBoxMat = new THREE.MeshStandardMaterial({
                side: THREE.DoubleSide,
                color: elm.poster.color,
                roughness: 1,
                metalness: 0,
            });
            elm.poster.name.map((poster, i) => {
                let posterObj = world.getObjectByName(poster);
                posterObj.material = posterBoxMat;
                // console.log("poster:", posterObj);
            });


            //poster texture
            let posterMat = new THREE.MeshStandardMaterial({
                side: THREE.FrontSide,
                roughness: 1,
                metalness: 0,
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
                //color:  elm.camera.color,
                roughness: 0.3,
                metalness: 0.85,
                map: elm.camera.map,
            });
            let cameraObj = world.getObjectByName(elm.camera.name);
            cameraObj.castShadow = false;
            cameraObj.receiveShadow = false;
            cameraObj.material = camMat;
            // console.log("camera:", cameraObj);
            createInteractiveMeshes(elm.camera);


            //add texture to fan
            let fanMat = new THREE.MeshStandardMaterial({
                side: THREE.DoubleSide,
                color: elm.fan.color,
                roughness: 0.3,
                metalness: 0.85,
            });
            let fanObj = world.getObjectByName(elm.fan.name);
            fanObj.castShadow = false;
            fanObj.receiveShadow = false;
            fanObj.material = fanMat;
            //console.log("fan:", fanObj);
            createInteractiveMeshes(elm.fan);


            //add texture to metal wheel
            let wheelMat = new THREE.MeshStandardMaterial({
                side: THREE.DoubleSide,
                color: elm.metalwheel.color,
                roughness: 0.3,
                metalness: 0.85,
            });
            let wheelObj = world.getObjectByName(elm.metalwheel.name);
            wheelObj.castShadow = true;
            wheelObj.receiveShadow = false;
            wheelObj.material = wheelMat;
            //console.log("wheel:", wheelObj);
            createInteractiveMeshes(elm.metalwheel);


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
            });
            boxMat.map.wrapS = THREE.RepeatWrapping;
            boxMat.map.wrapT = THREE.RepeatWrapping;
            let boxObj = world.getObjectByName(elm.box.name);
            boxObj.castShadow = true;
            boxObj.receiveShadow = false;
            boxObj.material = boxMat;
            boxObj.material.map.repeat.set(1.5, 3.85);
            // console.log("box:", boxObj);
            createInteractiveMeshes(elm.box);


            //add texture to heat unit
            let heatMat = new THREE.MeshStandardMaterial({
                side: THREE.DoubleSide,
                color: elm.heatbox.color,
                roughness: 0.25,
                metalness: 0.85,
            });
            let heatObj = world.getObjectByName(elm.heatbox.name);
            heatObj.material = heatMat;
            heatObj.castShadow = false;
            heatObj.receiveShadow = false;
            //console.log("heatbox:", heatObj);
            createInteractiveMeshes(elm.heatbox);



            //add texture to sensor unit
            let sensorBodyMat = new THREE.MeshStandardMaterial({
                side: THREE.DoubleSide,
                color: elm.sensorBody.color,
                roughness: 0.85,
                metalness: 0.05,
                map: elm.sensorBody.map,
            });
            sensorBodyMat.map.wrapS = THREE.RepeatWrapping;
            sensorBodyMat.map.wrapT = THREE.RepeatWrapping;
            sensorBodyMat.map.repeat.set(5, 5);
            elm.sensorBody.name.map((sensorOBJS, i) => {
                let sensorObj = world.getObjectByName(sensorOBJS);
                sensorObj.castShadow = true;
                sensorObj.material = sensorBodyMat;
                // console.log(sensorObj);
                createInteractiveMeshes({
                    name: sensorOBJS,
                    click: elm.sensorBody.click,
                    text: elm.sensorBody.text,
                });
            })
            let sensorCapMat = new THREE.MeshStandardMaterial({
                side: THREE.DoubleSide,
                color: elm.sensorCap.color,
                roughness: 0.05,
                metalness: 0.85,
            });
            elm.sensorCap.name.map((sensorOBJS, i) => {
                let sensorObj = world.getObjectByName(sensorOBJS);
                sensorObj.castShadow = true;
                sensorObj.material = sensorCapMat;
                // console.log(sensorObj);
                createInteractiveMeshes({
                    name: sensorOBJS,
                    click: elm.sensorBody.click,
                    text: elm.sensorBody.text,
                });
            })


            //add texture to screen
            let screenMat = new THREE.MeshStandardMaterial({
                side: THREE.FrontSide,
                color: elm.screen.color,
                map: elm.screen.map,
                roughness: 1, metalness: 0.55,
            });
            screenMat.map.wrapS = THREE.ClampToEdgeWrapping;
            screenMat.map.wrapT = THREE.ClampToEdgeWrapping;
            screenMat.map.repeat.set(1.5, 1.5);
            let screenObj = world.getObjectByName(elm.screen.name);
            screenObj.material = screenMat;
            // console.log(screenObj.material);
            createInteractiveMeshes(elm.screen);


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
            gunMat.needsUpdate = true;
            let gunObj = world.getObjectByName(elm.gun.name);
            gunObj.material = gunMat;
            gunObj.castShadow = true;
            // console.log(gunObj);
            createInteractiveMeshes(elm.gun);



            //add texture to girls
            let womenOBJS = world.getObjectByName(elm.women.name);
            // console.log(womenOBJS.children);

            let w_acc = womenOBJS.children[0];
            w_acc.castShadow = true;
            // console.log(w_acc);
            w_acc.material = new THREE.MeshStandardMaterial({
                color: elm.women.maps[0].color,
                metalness: 0.85,
                roughness: 0.15,
            });

            let w_bdy = womenOBJS.children[1];
            w_bdy.castShadow = true;
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
            w_bdy.material.needsUpdate = true;

            let w_clth = womenOBJS.children[2];
            w_clth.castShadow = true;
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
            // w_clth.material.map.repeat.set(1.5, 1.5);
            w_clth.material.map.flipY = false;
            w_clth.material.map.magFilter = THREE.NearestFilter;
            w_clth.material.needsUpdate = true;

            let w_eye = womenOBJS.children[3];
            w_eye.castShadow = true;
            // console.log(w_eye);
            w_eye.material = new THREE.MeshStandardMaterial({
                map: elm.women.maps[3].texture,
                emissiveMap: elm.women.maps[3].texture,
            });
            w_eye.material.map.wrapS = THREE.ClampToEdgeWrapping;
            w_eye.material.map.wrapT = THREE.ClampToEdgeWrapping;
            // w_eye.material.map.repeat.set(1.5, 1.5);
            w_eye.material.map.flipY = false;
            w_eye.material.map.magFilter = THREE.NearestFilter;
            w_eye.material.needsUpdate = true;

            let w_hir = womenOBJS.children[5];
            w_hir.castShadow = true;
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
            m_bdy.material.needsUpdate = true;

            let m_eye = menOBJS.children[1];
            m_eye.castShadow = true;
            // console.log(m_eye);
            m_eye.material = new THREE.MeshStandardMaterial({
                map: elm.men.maps[1].texture,
                emissiveMap: elm.men.maps[1].texture,
            });
            m_eye.material.map.wrapS = THREE.ClampToEdgeWrapping;
            m_eye.material.map.wrapT = THREE.ClampToEdgeWrapping;
            m_eye.material.map.flipY = false;
            m_eye.material.map.magFilter = THREE.NearestFilter;
            m_eye.material.needsUpdate = true;

            let m_hd = menOBJS.children[2];
            m_hd.castShadow = true;
            // console.log(m_hd);
            m_hd.material = new THREE.MeshStandardMaterial({
                map: elm.men.maps[2].texture,
                emissiveMap: elm.men.maps[2].texture,
            });
            m_hd.material.map.wrapS = THREE.ClampToEdgeWrapping;
            m_hd.material.map.wrapT = THREE.ClampToEdgeWrapping;
            m_hd.material.map.flipY = false;
            m_hd.material.map.magFilter = THREE.NearestFilter;
            m_hd.material.needsUpdate = true;

            let m_leg = menOBJS.children[3];
            m_leg.castShadow = true;
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
            m_leg.material.needsUpdate = true;


            let menOBJS2 = menOBJS.clone();
            menOBJS2.position.set(0, 0, 0);
            menOBJS2.name = "men2";
            scene.add(menOBJS2);
            // console.log(menOBJS2);
        }

        window.addEventListener("load", init);
        window.addEventListener("resize", adjustWindow);


        //// interaction
        //////////////////////
        function zoomInTimeline(pos, rotate = false) {
            let zoomOutFactor = 5;
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
                    }
                }
            });
            camTl
                .to(controls.target, { x: pos.x, y: pos.y, z: pos.z, })
                .to(camera.position, {
                    x: rotate ? pos.x + 5 : pos.x,
                    y: pos.y,
                    z: pos.z + zoomOutFactor,
                }, "<")
                .to(controls, {
                    minDistance: zoomOutFactor,
                    minPolarAngle: rotate ? Math.PI / 1.5 : Math.PI / 2,
                    maxPolarAngle: rotate ? Math.PI / 1.5 : Math.PI / 2,
                    minAzimuthAngle: - Math.PI / 2.5,
                    maxAzimuthAngle: Math.PI / 2.5,
                }, "<")
        };

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
            tooltip.classList.remove('show');
            xSetter(e.clientX), ySetter(e.clientY);
            // tooltip.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

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
                        tooltip.classList.add('show');

                        var modalName, modal_data;
                        if (e.type == "click") {
                            if (el.clickable == true) {
                                modalName = el.id;
                                modal_data = info_modal.querySelector(`[data-id='${modalName}']`);
                                if (modalName.includes("scent_unit")) {
                                    modal_data = info_modal.querySelector("[data-id='scent_unit']");
                                }
                                // console.log(modalName);
                            }

                            gsap.to(info_modal, {
                                opacity: 0, duration: 0.15,
                                onComplete: () => {
                                    info_modal.querySelectorAll('.modal_data').forEach(e => {
                                        e.classList.remove('show');
                                    });
                                    if (modal_data != undefined) {
                                        modal_data.classList.add('show');
                                    }
                                }
                            });
                            gsap.to(resetCam, {
                                opacity: 1, duration: 0.3, pointerEvents: "all",
                            });

                            let camGOTOpos = {
                                x: intersect.point.x,
                                y: intersect.point.y,
                                z: intersect.point.z
                            },
                                camRotation = intersect.object.name == "hit_unit" ? true : false;
                            zoomInTimeline(camGOTOpos, camRotation)
                        }
                        return;
                    }
                }
            });
        }

        //add text
        function createInteractiveMeshes(el) {
            interactiveMeshes.push({
                id: el.name,
                name: el.text,
                clickable: el.click,
            });
        }

        renderer.domElement.addEventListener("mousemove", onMouseMove, false);
        renderer.domElement.addEventListener("click", onClick, false);
    }
}
