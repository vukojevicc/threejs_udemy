import * as THREE from 'three';

let scene, renderer, camera, cylinder, sphere;
let moveObject = 0.01;

function createGeometry() {
    // let material = new THREE.LineBasicMaterial({color: 0xffffff, linewidth: 1})

    let material = new THREE.PointsMaterial({
        color: 0xffffff,
        sizeAttenuation: false
    })

    let geometry = new THREE.CylinderGeometry(3, 2, 4);

    // cylinder = new THREE.Line(geometry, material);
    cylinder = new THREE.Points(geometry, material);

    cylinder.position.z = -10;
    cylinder.position.x = -5;

    geometry = new THREE.SphereGeometry(3, 30, 30);
    // sphere = new THREE.Line(geometry, material);
    sphere = new THREE.Points(geometry, material);

    sphere.position.z = 0;
    sphere.position.x = 5;

    //sphere.computeLineDistances(); iako nije zastareo metod, baca error
    //cylinder.computeLineDistances();
    
    scene.add(cylinder, sphere);
}

// set up the environment - 
// initiallize scene, camera, objects and renderer

function init() {

    // Pravimo novu scenu
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // pravimo i lociramo kameru
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 10;

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
    cylinder.rotation.x += moveObject;
    cylinder.rotation.y += moveObject;

    sphere.rotation.x += moveObject;
    sphere.rotation.y += moveObject;

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();