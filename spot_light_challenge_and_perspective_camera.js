import * as THREE from 'three';

let scene, renderer, camera, plane, spotLight, spotLight2, cube1, cube2, cube3;
let moveObject = 0.02;
let theta = 0.1;

function createGeometry() {

    let geometry = new THREE.PlaneGeometry(90, 100);
    let material = new THREE.MeshPhongMaterial({
        color: 0x000000,
        side: THREE.DoubleSide,
        emissive: 0x824409,
        emissiveIntensity: 0.3,
        shininess: 2,
    });

    plane = new THREE.Mesh(geometry, material);

    geometry = new THREE.BoxGeometry(3, 3, 3);
    material = new THREE.MeshPhongMaterial({
        color: 0xffffff
    });
    cube1 = new THREE.Mesh(geometry, material);
    cube1.position.set(-2, -4, 0);

    geometry = new THREE.BoxGeometry(5, 5, 5);
    material = new THREE.MeshPhongMaterial({
        color: 0xff0000
    });
    cube2 = new THREE.Mesh(geometry, material);
    cube2.position.set(3, -3, 1);

    plane.rotation.x = Math.PI / 2;
    plane.position.y = -4;

    scene.add(plane, cube1, cube2);
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

    spotLight = new THREE.SpotLight(0xffffff, 6, 0, Math.PI / 9, 0.0, 2);
    spotLight.position.set(9, 4, 2);
    spotLight.target.position.set(9, -4, 2);

    spotLight2 = new THREE.SpotLight(0xffffff, 6, 0, Math.PI / 9, 0.0, 2);
    spotLight2.position.set(-9, 4, 2);
    spotLight2.target.position.set(-9, -4, 2);

    let ambient = new THREE.AmbientLight(0xffffff, 0.1);

    scene.add(spotLight, spotLight2, ambient);

    // pravimo renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

// glavna petlja animacije. Poziva se 50-60 puta u sekundi zahvaljujuci requestAnimationFrame fukciji browsera.
function mainLoop() {



    spotLight.position.x -= moveObject;
    spotLight.target.position.x -= moveObject;
    spotLight.target.updateMatrixWorld();

    camera.lookAt(0, 0, 0);
    camera.position.z = Math.sin(theta) * 19;
    camera.position.x = Math.cos(theta) * 19; 
    theta += moveObject;

    spotLight2.position.x += moveObject;
    spotLight2.target.position.x += moveObject;
    spotLight2.target.updateMatrixWorld();

    if(spotLight.position.x > 9 || spotLight.position.x < -9){
        moveObject *= -1;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();