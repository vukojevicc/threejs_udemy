import * as THREE from 'three';

const left = 37, right = 39, up = 38, down = 40;
let scene, camera, renderer, light;
let particles = [];
let add = .2;

function randomInRange(from, to){
    return (to - from) * Math.random() + from;
}

class Particle {
    constructor(){
        let geometry = new THREE.SphereGeometry(.5, 30, 30);
        let material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            shininess: 100,
            specular: 0xafeeee,
            side: THREE.DoubleSide
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.x = randomInRange(-15, 15);
        this.mesh.position.y = randomInRange(-5, 5);
        this.mesh.position.z = randomInRange(-10, 10);
        this.radius = this.mesh.position.x;

        this.theta = 0;
        this.dTheta = 2 * Math.PI / randomInRange(150, 200);
        this.yFactor = randomInRange(0, Math.PI);
    }

    move(){
        this.mesh.position.y = this.radius * Math.sin(this.theta + this.yFactor);
        this.mesh.position.x = this.radius * Math.sin(this.theta);
        this.mesh.position.z = this.radius * Math.cos(this.theta);
        this.theta += this.dTheta;
    }
}

function onKeyDown(event){
    if(event.keyCode == up){
        camera.position.z -= add;
    }
    else if(e.keyCode == down){
        camera.position.z += add;
    }
}

function createGeometry(){
    for(let i = 0; i <= 10; i++){
        let p = new Particle();
        particles.push(p);
        scene.add(p.mesh);
    }
}

// setup the environment
function init(){

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 20;

    light = new THREE.PointLight(0xffffff, 2, 30, 2);
    let light2 = new THREE.PointLight(0xffffff, 2, 30, 2);
    let light3 = new THREE.PointLight(0xffffff, 2, 30, 2);

    light2.position.y = 10;
    light3.position.y = -10;

    scene.add(light, light2, light3);

    createGeometry();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    document.addEventListener('keydown', onKeyDown);
}

function mainLoop(){

    particles.forEach(p => {
        p.move();
    })

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();