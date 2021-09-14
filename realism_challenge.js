import * as THREE from 'three';
import { Material, PCFShadowMap } from 'three';

let camera, scene, renderer, light, pyramid1, plane;
let add = .01, theta = 0;

function createGeometry() {
    let sandTexture = new THREE.TextureLoader().load('https://i.ibb.co/HrsSnhd/a5d0c4b21ddeee97ac28c9b44dc26a92.jpg');
    let pyramidTexture = new THREE.TextureLoader().load('https://i.ibb.co/SmJZM2N/ba624504f86336a81fb06c691624d4d4.jpg');

    let geometry = new THREE.PlaneGeometry(70, 70);
    let material = new THREE.MeshPhongMaterial({
        map: sandTexture,
        shininess: .5
    });

    plane = new THREE.Mesh(geometry, material);
    plane.rotateX(-(Math.PI / 2));
    plane.receiveShadow = true;
    scene.add(plane);

    geometry = new THREE.ConeGeometry(5, 10, 4);
    material = new THREE.MeshPhongMaterial({
        map: pyramidTexture
    })

    pyramid1 = new THREE.Mesh(geometry, material);
    pyramid1.position.set(-4, geometry.parameters.height / 2, -4);
    pyramid1.castShadow = true;
    pyramid1.receiveShadow = true;

    scene.add(pyramid1);
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 14, 60);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, -70, 0);

    light.castShadow = true;
    light.shadow.bias = 0.0001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 0.5; // default
    light.shadow.camera.far = 500; // default

    let helper = new THREE.AxesHelper(15);
    scene.add(light, helper);

    createGeometry();

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

function mainLoop() {
    light.position.x += Math.cos(theta) * 2;
    light.position.y += Math.sin(theta) * 2;

    theta += add;

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();