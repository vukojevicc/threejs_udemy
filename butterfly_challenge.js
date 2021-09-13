import * as THREE from 'three';

let scene, renderer, camera, mesh;
let moveObject = 2;

function createGeometry() {
    let geometry = new THREE.BufferGeometry();

    let verticies = new Float32Array([ // pravis trougao po trougao. tri vrednosti predstavljaju vektor, 9 vrednosti trougao.
        2, 0, 0,
        0, 5, 0,
        -2, 0, 0,
        2, 0, 0,
        -2, 3, 0,
        -2, 0, 0
    ]);

    geometry.setAttribute('position', new THREE.BufferAttribute(verticies, 3));

    let material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });

    mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.z = Math.PI / 9;

    scene.add(mesh);
}

// set up the environment - 
// initiallize scene, camera, objects and renderer

function init() {

    // Pravimo novu scenu
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // pravimo i lociramo kameru
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 15;

    // let axes = new THREE.AxesHelper(15); //jako korisna stvar
    // scene.add(axes);

    createGeometry();

    // pravimo renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

// glavna petlja animacije. Poziva se 50-60 puta u sekundi zahvaljujuci requestAnimationFrame fukciji browsera.
function mainLoop() {

    mesh.geometry.attributes.position.array[4] += moveObject;
    mesh.geometry.attributes.position.array[13] += moveObject;
    mesh.geometry.attributes.position.needsUpdate = true;

    if(mesh.geometry.attributes.position.array[4] > 5.5 || mesh.geometry.attributes.position.array[4] < -5.5){
        moveObject *= -1;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();