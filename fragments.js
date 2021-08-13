import * as THREE from 'three';

let scene, renderer, camera;
let mesh_arr = [];
let moveObject = 0.02;

function createGeometry() {
    let material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        emissive: 0xffffff,
        emissiveIntensity: .2
    });

    let vertices_arr = [
        new Float32Array([
            2, 0, 0,
            -2, 0, 0,
            0, 2, 2
        ]),
        new Float32Array([
            -2, 0, 0,
            -2, 0, 4,
            0, 2, 2
        ]),
        new Float32Array([
            2, 0, 0,
            2, 0, 4,
            0, 2, 2
        ]),
        new Float32Array([
            2, 0, 4,
            -2, 0, 4,
            0, 2, 2
        ]),
        new Float32Array([
            2, 0, 0,
            -2, 0, 0,
            0, -2, 2
        ]),
        new Float32Array([
            -2, 0, 0,
            -2, 0, 4,
            0, -2, 2
        ]),
        new Float32Array([
            2, 0, 0,
            2, 0, 4,
            0, -2, 2
        ]),
        new Float32Array([
            2, 0, 4,
            -2, 0, 4,
            0, -2, 2
        ])     
    ];

    for(let i = 0; i < vertices_arr.length; i++){

        let geometry = new THREE.BufferGeometry();

        geometry.setAttribute('position', new THREE.BufferAttribute(vertices_arr[i], 3));
        geometry.computeVertexNormals();
    
        let mesh = new THREE.Mesh(geometry, material);
    
        mesh_arr.push(mesh);

        scene.add(mesh_arr[i]);
    }
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
    camera.position.x = 5;
    camera.position.y = 5;

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

    for(let i = 0; i < mesh_arr.length; i++){
        mesh_arr[i].rotation.y += moveObject;
        mesh_arr[i].rotation.x += moveObject;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();