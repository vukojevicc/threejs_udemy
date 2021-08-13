import * as THREE from 'three';

let scene, renderer, camera, cube, sphere, cone;
let moveObject = 0.02;

function createGeometry() {
    // let material = new THREE.MeshLambertMaterial({
    //     color: 0x7fc5f9,
    //     side: THREE.DoubleSide,
    //     emissive: 0x25673d,
    //     emissiveIntensity: 0.5
    // });

    // let material = new THREE.MeshPhongMaterial({
    //         color: 0x7fc5f9,
    //         side: THREE.DoubleSide,
    //         emissive: 0x25673d,
    //         emissiveIntensity: 0.5,
    //         shininess: 100,
    //         specular: 0x9d0a00
    //     });

    let material = new THREE.MeshStandardMaterial({
        color: 0x7fc5f9,
        side: THREE.DoubleSide,
        emissive: 0x25673d,
        emissiveIntensity: 0.4,
        metalness: 1,
        roughness: 0
    });

    let geometry = new THREE.BoxGeometry(3, 3, 3);
    cube = new THREE.Mesh(geometry, material);
    cube.position.x = -6;

    geometry = new THREE.SphereGeometry(3, 30, 30);
    sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = 0;

    geometry = new THREE.ConeGeometry(3, 4, 20, 1, true);
    cone = new THREE.Mesh(geometry, material);
    cone.position.x = 7;

    scene.add(cube, sphere, cone);
}

// set up the environment - 
// initiallize scene, camera, objects and renderer

function init() {

    // Pravimo novu scenu
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // pravimo i lociramo kameru
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 15;

    // let axes = new THREE.AxesHelper(15); //jako korisna stvar
    // scene.add(axes);

    createGeometry();

    let directionalLightUp = new THREE.DirectionalLight(0xffffff);
    scene.add(directionalLightUp);

    // pravimo renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

// glavna petlja animacije. Poziva se 50-60 puta u sekundi zahvaljujuci requestAnimationFrame fukciji browsera.
function mainLoop() {

    cube.rotation.x += moveObject;
    cube.rotation.y += moveObject;

    cone.rotation.x += moveObject;
    cone.rotation.y += moveObject;

    sphere.rotation.x += moveObject;
    sphere.rotation.y += moveObject;

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();