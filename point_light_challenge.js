import * as THREE from 'three';

let scene, renderer, camera, cube, sphere, cone, plane, sphere1, pointLight, pointLight1, sphere2;
let moveObject = 0.02;
let theta = 0;

function createGeometry() {
    // let material = new THREE.MeshLambertMaterial({
    //     color: 0x7fc5f9,
    //     side: THREE.DoubleSide,
    //     emissive: 0x25673d,
    //     emissiveIntensity: 0.5
    // });

    let material = new THREE.MeshPhongMaterial({
        color: 0x7fc5f9,
        side: THREE.DoubleSide,
        emissive: 0x25673d,
        emissiveIntensity: 0.5,
        shininess: 10,
        specular: 0x9d0a00
    });


    // let material = new THREE.MeshStandardMaterial({
    //     color: 0x7fc5f9,
    //     side: THREE.DoubleSide,
    //     emissive: 0x25673d,
    //     emissiveIntensity: 0.4,
    //     metalness: 1,
    //     roughness: 0
    // });

    let geometry = new THREE.BoxGeometry(3, 3, 3);
    cube = new THREE.Mesh(geometry, material);
    cube.position.x = -6;

    geometry = new THREE.SphereGeometry(3, 30, 30);
    sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = 0;

    geometry = new THREE.ConeGeometry(3, 4, 20, 1, true);
    cone = new THREE.Mesh(geometry, material);
    cone.position.x = 7;

    geometry = new THREE.PlaneGeometry(90, 100);
    material = new THREE.MeshPhongMaterial({
        color: 0x000000,
        side: THREE.DoubleSide,
        emissive: 0x808080,
        emissiveIntensity: 0.5,
        shininess: 2,
    });
    plane = new THREE.Mesh(geometry, material);

    geometry = new THREE.SphereGeometry(.1, 30, 30);
    material = new THREE.MeshBasicMaterial(0xffffff);
    sphere1 = new THREE.Mesh(geometry, material);
    sphere2 = new THREE.Mesh(geometry, material);

    plane.rotation.x = Math.PI / 1.7;
    plane.position.y = -4;

    scene.add(cube, sphere, cone, plane, sphere1, sphere2);
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

    pointLight = new THREE.PointLight(0xffffff, 2, 20, 2);
    pointLight1 = new THREE.PointLight(0xffffff, 2, 20, 2);

    scene.add(pointLight, pointLight1);

    // pravimo renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

// glavna petlja animacije. Poziva se 50-60 puta u sekundi zahvaljujuci requestAnimationFrame fukciji browsera.
function mainLoop() {

    // koriscenje trigonometrijskih funkcija da se dobije putanja (soh kah toa);
    sphere1.position.x = 10 * Math.sin(theta);
    sphere1.position.z = 10 * Math.cos(theta);
    pointLight.position.x = sphere1.position.x;
    pointLight.position.z = sphere1.position.z;

    sphere2.position.y = 7 * Math.sin(theta);
    sphere2.position.z = -7 * Math.cos(theta);
    pointLight1.position.y = sphere2.position.y;
    pointLight1.position.z = sphere2.position.z;

    theta += moveObject;

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