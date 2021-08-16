import * as THREE from 'three';

let scene, renderer, camera;
let mesh_arr = [];
let moveObject = 0.07;

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

    for (let i = 0; i < vertices_arr.length; i++) {

        let geometry = new THREE.BufferGeometry();

        geometry.setAttribute('position', new THREE.BufferAttribute(vertices_arr[i], 3));
        geometry.computeVertexNormals();

        let mesh = new THREE.Mesh(geometry, material);

        // centriranje geometrija da se rotiraju oko svoje x ose prilikom rotacije. Jako korisno.
        const center = new THREE.Vector3();
        mesh.geometry.computeBoundingBox();
        mesh.geometry.boundingBox.getCenter(center);
        mesh.geometry.center();
        mesh.position.copy(center);

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
    camera.position.z = 25;
    // camera.position.x = 5;
    camera.position.y = 5;

    // let axes = new THREE.AxesHelper(15); //jako korisna stvar
    // scene.add(axes);

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

    setTimeout(() => {
        mesh_arr[0].position.y += moveObject;
        mesh_arr[0].position.z -= moveObject;

        mesh_arr[1].position.x -= moveObject;
        mesh_arr[1].position.y += moveObject;

        mesh_arr[2].position.x += moveObject;
        mesh_arr[2].position.y += moveObject;

        mesh_arr[3].position.y += moveObject;
        mesh_arr[3].position.z += moveObject;

        mesh_arr[4].position.z -= moveObject;
        mesh_arr[4].position.y -= moveObject;

        mesh_arr[5].position.x -= moveObject;
        mesh_arr[5].position.y -= moveObject;

        mesh_arr[6].position.x += moveObject;
        mesh_arr[6].position.y -= moveObject;

        mesh_arr[7].position.z += moveObject;
        mesh_arr[7].position.y -= moveObject;


        mesh_arr.forEach(item => {
            item.rotation.x += moveObject;
        })
    }, 1000);

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();