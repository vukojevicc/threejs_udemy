import * as THREE from 'three';

let scene, camera, renderer, light1, cube;
let add = .05;

function createGeometry() {

        let geometry = new THREE.BoxGeometry(5, 5, 5);

        let material = new THREE.MeshPhongMaterial({
            color: 0xc334eb,
            shininess: 100,
            side: THREE.DoubleSide,
            emissive: 0xc334eb,
            emissiveIntensity: .2
        });

        cube = new THREE.Mesh(geometry, material);
        cube.position.set(0, 0, 0);
        
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

    light1 = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(light1);

    createGeometry();

    // create the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    document.addEventListener('click', (event) => {
        add *= -1;
        let x = event.clientX;
        let y = event.clientY;
        console.log(x, y);
    });
}

function mainLoop() {

    cube.rotation.x += add;
    cube.rotation.y += add;

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();