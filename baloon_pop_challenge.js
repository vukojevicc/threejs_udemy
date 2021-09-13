import * as THREE from 'three';

let scene, camera, renderer, light1, light2, rayCast, mouse;
let balloons = [];

function randomInRange(from, to){
    return (to - from) * Math.random() + from;
}

class Balloon {
    constructor(){
        let x = randomInRange(-30, 30);
        let z = randomInRange(20, -20);

        let geometry = new THREE.SphereGeometry(3, 30, 30);
        let material = new THREE.MeshPhongMaterial({
            color: Math.random() * 0xffffff,
            shininess: 100
        });

        let b = new THREE.Mesh(geometry, material);
        b.position.set(x, 0, z);
        this.object = b;

        scene.add(b);

        this.add = randomInRange(.05, .15);
        this.over = false;
        this.top = 50;
    }
    advance(){
        this.object.position.y += this.add;
        if(this.object.position.y > this.top){
            this.over = true;
        }
    }
}

function onMouseClick(e){
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
    mouse.z = 1;

    rayCast.setFromCamera(mouse, camera);
    let intersects = rayCast.intersectObjects(scene.children);

    if(intersects.length == 0){
        return;
    }else{
        let hit = intersects[0].object;

        balloons.forEach((balloon, index) => {
            if(balloon.object == hit){
                balloons.splice(index, 1);
                scene.remove(balloon.object);
            }
        })
    }
}

// set up the environment - 
// initiallize scene, camera, objects and renderer
function init() {

    // create the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // create and locate the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 10, 40);

    light1 = new THREE.DirectionalLight(0xffffff, 1);
    light2 = new THREE.DirectionalLight(0xffffff, 1);
    light2.position.set(0, -5, 2);

    scene.add(light1, light2);
    
    rayCast = new THREE.Raycaster();

    mouse = new THREE.Vector2(-1, -1);

    // create the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    document.addEventListener('click', onMouseClick);
}

function mainLoop() {
    let rand = Math.random();
    if(rand < .05){
        balloons.push(new Balloon());
    }
        balloons.forEach((balloon, index) => {

            balloon.advance();
            if(balloon.over){
                balloons.splice(index, 1);
                scene.remove(balloon.object);
            }
        })

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();