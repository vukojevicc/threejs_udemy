import * as THREE from 'three';

const left = 37, right = 39, up = 38, down = 40;
let scene, camera, renderer, light1;
let cubes = [];
let add = .9;
let moveObject = .4;

function randomInRange(from, to) {
    let random = Math.random() * (to - from);
    return random + from;
}

function createGeometry() {

    for (let i = 0; i < 50; i++) {
        let geometry = new THREE.BoxGeometry(randomInRange(5, 15), randomInRange(5, 15), randomInRange(5, 15));
        let randomColor = 0xffffff * Math.random();

        let material = new THREE.MeshPhongMaterial({
            color: randomColor,
            shininess: 100,
            side: THREE.DoubleSide,
            emissive: randomColor,
            emissiveIntensity: .2
        });

        let cube = new THREE.Mesh(geometry, material);
        cube.position.set(randomInRange(-110, 110), 0, randomInRange(-60, 60));

        cubes.push(cube);
        scene.add(cube);
    }
}

function onKeyDown(e) {

    if (e.keyCode == left) {
        camera.position.x += -add;
    }
    else if (e.keyCode == right) {
        camera.position.x += add;
    }
    else if (e.keyCode == up) {
        camera.position.y += add;
    }
    else if (e.keyCode == down) {
        camera.position.y += -add;
    }
}

// set up the environment - 
// initiallize scene, camera, objects and renderer
function init() {

    // create the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // create and locate the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 10, 150);

    light1 = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(light1);

    createGeometry();

    // create the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    document.addEventListener('keydown', onKeyDown);
}

function mainLoop() {

    camera.position.z -= moveObject;
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();