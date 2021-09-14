import * as THREE from 'three';

let scene, renderer, camera, sphere, target, texture;
let add = .005, theta = 0;

function createGeometry(){
    let texture = new THREE.TextureLoader().load('https://i.ibb.co/Qmjxkgt/Panorama-Meransen.jpg');

    let material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide
    });
    let geometry = new THREE.SphereGeometry(5, 100, 100);
    sphere = new THREE.Mesh(geometry, material);

    scene.add(sphere);
}

// set up the environment - 
// initiallize scene, camera, objects and renderer
function init() {

    // create the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // create and locate the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    
    createGeometry();

    // create the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

function mainLoop() {
    camera.rotation.y += add;

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();