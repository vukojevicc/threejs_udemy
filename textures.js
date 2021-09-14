import * as THREE from 'three';

let scene, renderer, camera, cube, light;
let add = .02;

function createGeometry(){
    let texture = new THREE.TextureLoader().load('https://i.ibb.co/SwsDT4H/compressed-but-large-wood-texture.jpg');

    let material = new THREE.MeshPhongMaterial({
        map: texture,
        shininess: 100
    });
    let geometry = new THREE.BoxGeometry(4, 4, 4);
    cube = new THREE.Mesh(geometry, material);

    scene.add(cube);
}

// set up the environment - 
// initiallize scene, camera, objects and renderer
function init() {

    // create the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // create and locate the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 3, 20);

    light = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(light);
    
    createGeometry();

    // create the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

function mainLoop() {

    cube.rotation.x += add;
    cube.rotation.y += add;
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();