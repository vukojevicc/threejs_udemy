import * as THREE from 'three';

let scene, camera, renderer, cube1, cube2, spotLight, plane;
    let ADD = 0.01, theta = 0;
    
    let createGeometry = function() {
        
        
        let geometry = new THREE.BoxGeometry(5, 5, 5);
        let material = new THREE.MeshPhongMaterial({color:0Xdff913, 
                        shininess: 100, side:THREE.DoubleSide});
        cube1 = new THREE.Mesh(geometry, material);
        cube1.position.set(5, 2, 0);
        cube1.castShadow = true;
        cube1.receiveShadow = true;
        
        geometry = new THREE.BoxGeometry(5, 6, 4);
        cube2 = new THREE.Mesh(geometry, material);
        cube2.position.set(-4, 2, 0);
        cube2.castShadow = true;
        cube2.receiveShadow = true;
        
        
        geometry = new THREE.BoxGeometry(2000, 1, 2000);
        material = new THREE.MeshPhongMaterial({color: 0X693421, 
                                    side: THREE.DoubleSide});
        plane = new THREE.Mesh(geometry, material);
        plane.position.y = -1;
        plane.receiveShadow = true;
        
        scene.add(cube1);
        scene.add(cube2);
        scene.add(plane);
    };
    
    
    // set up the environment - 
    // initiallize scene, camera, objects and renderer
    let init = function() {
        // create the scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        
        // create an locate the camera
        camera = new THREE.PerspectiveCamera(70, 
                    window.innerWidth / window.innerHeight, 
                    1, 1000);
        
        camera.position.set(0, 5, 40);
        
        spotLight = new THREE.SpotLight(0xffffff, 1);
        spotLight.position.set(0, 15, 10);
        spotLight.penumbra = 0.05;
        spotLight.decay = 2;
        spotLight.distance = 200;
        
        // // shadow
        spotLight.castShadow = true;
        spotLight.shadow.bias = 0.0001;
        spotLight.shadow.mapSize.width = 2048;
        spotLight.shadow.mapSize.height = 1024;        
        
        scene.add(spotLight);

        createGeometry();
        
        // create the renderer   
        renderer = new THREE.WebGLRenderer();   
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        
        document.body.appendChild(renderer.domElement);
        
    };
   
    
    // main animation loop - calls 50-60 times per second.
    let mainLoop = function() {
        spotLight.position.x = 10 * Math.sin(theta);
        spotLight.position.z = 10 * Math.cos(theta);
        theta += ADD;
        renderer.render(scene, camera);
        requestAnimationFrame(mainLoop);
    };
    
    ///////////////////////////////////////////////
    init();
    mainLoop();