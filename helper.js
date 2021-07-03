"use strict";

const helper = {

    initEmptyScene: function (sceneElements) {

        // ************************** //
        // Create the 3D scene
        // ************************** //
        sceneElements.sceneGraph = new THREE.Scene();

        // ************************** //
        // Add camera
        // ************************** //
        const width = window.innerWidth;
        const height = window.innerHeight;
        var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000000);
        sceneElements.camera = camera;
        camera.position.set(0, 350, 650);
        //camera.position.set(100,-100,0)
        camera.lookAt(0,-160,0)
        var snakeCam = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000000);
        snakeCam.name = "snakeCam"
        sceneElements.sceneGraph.add(snakeCam);
        // ************************** //
        // Illumination
        // ************************** //

 
        // ************************** //
        // Add ambient light
        // ************************** //
        const ambientLight = new THREE.AmbientLight('rgb(255,255,255)', 0.2);
        sceneElements.sceneGraph.add(ambientLight);

        // ***************************** //
        // Add point light source (without shadows)
        // ***************************** //

        const light1 = new THREE.DirectionalLight('rgb(100,100,100)');
        light1.position.set(0, 200, 1500);
        sceneElements.sceneGraph.add(light1);

        const light2 = new THREE.DirectionalLight('rgb(100,100,100)');
        light2.position.set(0, 200, -1500);
        sceneElements.sceneGraph.add(light2)

        const light3 = new THREE.DirectionalLight('rgb(100,100,100)');
        light3.position.set(1500, 200, 0);
        sceneElements.sceneGraph.add(light3);

        const light4 = new THREE.DirectionalLight('rgb(100,100,100)');
        light4.position.set(-1500, 200, 0);
        sceneElements.sceneGraph.add(light4);

        const lightCenter = new THREE.Object3D();
        lightCenter.position.y = -166
        const light5 = new THREE.DirectionalLight('rgb(160,160,160)');
        
        light5.position.set(0, 3000, 0);
        lightCenter.name = "sun"
        lightCenter.add(light5)
        sceneElements.sceneGraph.add(lightCenter);

        // Setup shadow properties
        light5.castShadow = true;
        light5.shadow.mapSize.width = 2048;
        light5.shadow.mapSize.height = 2048;

        // Setup shadow properties
        light1.castShadow = true;
        light1.shadow.mapSize.width = 2048;
        light1.shadow.mapSize.height = 2048;
        
        light2.castShadow = true;
        light2.shadow.mapSize.width = 2048;
        light2.shadow.mapSize.height = 2048;
        
        light3.castShadow = true;
        light3.shadow.mapSize.width = 2048;
        light3.shadow.mapSize.height = 2048;
        
        light4.castShadow = true;
        light4.shadow.mapSize.width = 2048;
        light4.shadow.mapSize.height = 2048;
        
        // *********************************** //
        // Create renderer (with shadow map)
        // *********************************** //
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        sceneElements.renderer = renderer;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor('rgb(255, 255, 150)', 1.0);
        renderer.setSize( window.innerWidth, window.innerHeight );
        // Setup shadowMap property
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;


        // **************************************** //
        // Add the rendered image in the HTML DOM
        // **************************************** //
        const htmlElement = document.querySelector("#Wolfs-Gravestone-Snake");
        htmlElement.appendChild(renderer.domElement);
        
    },

    render: function render(sceneElements) {
        sceneElements.renderer.render(sceneElements.sceneGraph, sceneElements.camera);
    },
};