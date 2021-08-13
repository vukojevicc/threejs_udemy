import * as THREE from 'three';

let scene, renderer, camera;
let moveObject = 0.02;

function createGeometry() {
    let material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        emissive: 0xffffff,
        emissiveIntensity: .2
    });

    let geometry = new THREE.BufferGeometry();
    let vertices = new Float32Array([
        2, 0, 0,
        -2, 0, 0,
        0, 2, 2,

        -2, 0, 0,
        -2, 0, 4,
        0, 2, 2,

        2, 0, 0,
        2, 0, 4,
        0, 2, 2,

        2, 0, 4,
        -2, 0, 4,
        0, 2, 2,

        2, 0, 0,
        -2, 0, 0,
        0, -2, 2,

        -2, 0, 0,
        -2, 0, 4,
        0, -2, 2,

        2, 0, 0,
        2, 0, 4,
        0, -2, 2,

        2, 0, 4,
        -2, 0, 4,
        0, -2, 2,
    ]);

    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();
    console.log(geometry.attributes.position.array);

    mesh = new THREE.Mesh(geometry, material);

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
    camera.position.z = 20;

    let axes = new THREE.AxesHelper(15); //jako korisna stvar
    scene.add(axes);

    createGeometry();

    let directionalLightUp = new THREE.DirectionalLight({
        color: 0xffffff
    });
    scene.add(directionalLightUp);

    // pravimo renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

// glavna petlja animacije. Poziva se 50-60 puta u sekundi zahvaljujuci requestAnimationFrame fukciji browsera.
function mainLoop() {

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();