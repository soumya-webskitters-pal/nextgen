document.addEventListener("DOMContentLoaded", function (event) {
    /*particle*/
    const particles = document.getElementById("tsparticles");
    if (particles != undefined) {
        tsParticles.load("tsparticles", {
            fps_limit: 24,
            background: {
                color: "transparent"
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    ondiv: {
                        enable: true,
                        elementId: "login",
                        mode: "bubble",
                        type: "triangle"
                    },
                    resize: true
                },
                modes: {
                    bubble: {
                        distance: 400,
                        duration: 1,
                        opacity: 0.8,
                        size: 5,
                        speed: 1,
                        color: ["#CB3BF2", "#0FDBD9"]
                    }
                }
            },
            particles: {
                color: {
                    value: ["#0FDBD9", "#CB3BF2"]
                },
                links: {
                    color: "random",
                    distance: 150,
                    enable: true,
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    collisions: true,
                    direction: "none",
                    enable: true,
                    out_mode: "bounce",
                    random: false,
                    speed: 1,
                    straight: false
                },
                number: { density: { enable: true, value_area: 800 }, value: 70 },
                shape: {
                    type: "circle"
                },
                size: {
                    animation: {
                        enable: true,
                        minimumValue: 1,
                        speed: 1,
                        sync: false
                    },
                    random: {
                        enable: true,
                        minimumValue: 3
                    },
                    value: 1
                }
            },
            retina_detect: true
        });
    }
});