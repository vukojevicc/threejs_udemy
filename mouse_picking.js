import * as THREE from 'three';

let scene, camera, renderer, light1, light2, rayCast, mouse, cube, sphere;
let add = .05;

function onMouseClick(e){
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
    mouse.z = 1;

    rayCast.setFromCamera(mouse, camera);
}

function createGeometry() {

        let geometry = new THREE.BoxGeometry(5, 5, 5);
        let material = new THREE.MeshPhongMaterial({
            color: 0x0450fb,
            shininess: 100,
            side: THREE.DoubleSide
        });
        
        cube = new THREE.Mesh(geometry, material);

        geometry = new THREE.SphereGeometry(5, 30, 30);
        material = new THREE.MeshPhongMaterial({
            color: 0xff4500,
            shininess: 100,
            side: THREE.DoubleSide
        })

        sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(1, 4, -10);
        
        scene.add(cube, sphere);
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

    rayCast = new THREE.Raycaster();

    light1 = new THREE.DirectionalLight(0xffffff, 1);
    light2 = new THREE.DirectionalLight(0xffffff, 1);
    light2.position.set(0, -5, 2);
    scene.add(light1, light2);

    createGeometry();
    
    mouse = new THREE.Vector2(10, 10);
    rayCast.setFromCamera(mouse, camera);

    // create the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    document.addEventListener('click', onMouseClick);
}

function mainLoop() {

    sphere.material.color.set(0xff4500);
    cube.material.color.set(0x0450fb);

    let intersects = rayCast.intersectObjects(scene.children);
    intersects.forEach(obj => {
        obj.object.material.color.set(0x00ff00);
    })
    
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();