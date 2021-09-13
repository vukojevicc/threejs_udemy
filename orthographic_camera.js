import * as THREE from 'three';

let scene, camera, renderer, light1, sphere;
let add = 0.01, theta = 0;
const radius = 5, base_x = -20, base_y = -20;

let createGeometry = function () {
    let material = new THREE.MeshPhongMaterial({
        color: 0x0450fb,
        shininess: 100,
        side: THREE.DoubleSide
    });

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let geometry = new THREE.SphereGeometry(radius, 30, 30);
            sphere = new THREE.Mesh(geometry, material);

            sphere.position.x = base_x + j * 2 * (radius + 0.5);
            sphere.position.z = -2 * radius * i;
            sphere.position.y = base_y + i * radius;

            scene.add(sphere);
        }
    }
}

// Set up the environment - 
// Initialize scene, camera, objects and renderer
let init = function () {
    // create the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // create and locate the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 40);

    let axes = new THREE.AxesHelper(15);
    light1 = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(light1, axes);

    createGeometry();

    // create the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

function MainLoop() {

    camera.position.z = 50 * Math.sin(theta);
    camera.position.x = 50 * Math.cos(theta);

    theta += add;
    camera.lookAt(0,0,0);

    renderer.render(scene, camera);
    requestAnimationFrame(MainLoop);
}
init();
MainLoop();

if (camera instanceof THREE.PerspectiveCamera) {
    camera = new THREE.OrthographicCamera(-300, 300, 400, -400, 1, 1000);
    camera.zoom = 5;
    camera.updateProjectionMatrix();
}