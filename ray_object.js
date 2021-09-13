import * as THREE from 'three';

let scene, camera, renderer, light1, rayCast, mouse, vec = new THREE.Vector3();
const radius = 5;

function createSphere(pos) {

        let geometry = new THREE.SphereGeometry(radius, 30, 30);
        let material = new THREE.MeshPhongMaterial({
            color: 0x4a57fa,
            shininess: 100,
            side: THREE.DoubleSide
        });
        
        let sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(pos.x, pos.y, pos.y);
        
        scene.add(sphere);
}

function onMouseClick(e){
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
    mouse.z = 1;

    rayCast.setFromCamera(mouse, camera);
    createSphere(rayCast.ray.at(40, vec));
}

// set up the environment - 
// initiallize scene, camera, objects and renderer
function init() {

    // create the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // create and locate the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 40);

    light1 = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(light1);
    
    rayCast = new THREE.Raycaster();

    mouse = new THREE.Vector2(-1, -1);
    rayCast.setFromCamera(mouse, camera);

    // create the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    document.addEventListener('click', onMouseClick);
}

function mainLoop() {
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();