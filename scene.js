"use strict";

// To store the scene graph, and elements usefull to rendering the scene
const sceneElements = {
    sceneGraph: null,
    camera: null,
    renderer: null,
};
var objects = [];
var materials = [];
var snakeMaterial = []
var rotate = true;
var swing = false;
var remove = false;


//shiny Red material
var diffuse = new THREE.Color(100, 0, 0)
var specular = new THREE.Color(100, 0, 0)
var shiny = 10000000000000.0
var shinyRedMaterial = new THREE.MeshStandardMaterial({ color: diffuse, specular: specular, shininess: shiny });
materials.push(shinyRedMaterial)
//red material
diffuse = new THREE.Color(0.6, 0.0, 0.0)
specular = new THREE.Color(0.8, 0.6, 0.6)
shiny = 32.0
var redPlasticMaterial = new THREE.MeshStandardMaterial({ color: diffuse, specular: specular, shininess: shiny });
//var redPlasticMaterial = new THREE.MeshPhongMaterial();
materials.push(redPlasticMaterial)
//redder material
diffuse = new THREE.Color(1, 0.0, 0.0)
specular = new THREE.Color(1, 0.6, 0.6)
shiny = 0.8
var redderPlasticMaterial = new THREE.MeshStandardMaterial({ color: diffuse, specular: specular, shininess: shiny });
//var redderPlasticMaterial = new THREE.MeshPhongMaterial();
materials.push(redderPlasticMaterial)
//red brown material
diffuse = new THREE.Color(0.6, 0.2, 0.2)
specular = new THREE.Color(0.63, 0.23, 0.17)
shiny = 12.0
var redBrownPlasticMaterial = new THREE.MeshStandardMaterial({ color: diffuse, specular: specular, shininess: shiny });
//var redBrownPlasticMaterial = new THREE.MeshPhongMaterial();
materials.push(redBrownPlasticMaterial)
//black material
diffuse = new THREE.Color(0.13, 0.05, 0.01)
specular = new THREE.Color(0.07, 0.01, 0.05)
shiny = 32.0
var blackMaterial = new THREE.MeshStandardMaterial({ color: diffuse, specular: specular, shininess: shiny });
//var blackMaterial = new THREE.MeshPhongMaterial();
materials.push(blackMaterial)
//Silver
diffuse = new THREE.Color(0.2775, 0.2775, 0.2775)
specular = new THREE.Color(0.773911, 0.773911, 0.773911)
shiny = 89.6
var ironMaterial = new THREE.MeshStandardMaterial({ color: diffuse, specular: specular, shininess: shiny });
//var ironMaterial = new THREE.MeshPhongMaterial();
materials.push(ironMaterial)

// HANDLING EVENTS

// Event Listeners

window.addEventListener('resize', resizeWindow);

//To keep track of the keyboard - WASD
var keyD = false, keyA = false, keyS = false, keyW = false;
document.addEventListener('keydown', onDocumentKeyDown, false);

//Textures:
var color = new THREE.TextureLoader().load("textures/blade/Metal_Pattern_004_basecolor.jpg");
var disp = new THREE.TextureLoader().load("textures/blade/Metal_Pattern_004_height.png");
var norm = new THREE.TextureLoader().load("textures/blade/Metal_Pattern_004_normal.jpg");
var occ = new THREE.TextureLoader().load("textures/blade/Metal_Pattern_004_ambientOcclusion.jpg");
var rough = new THREE.TextureLoader().load("textures/blade/Metal_Pattern_004_roughness.jpg");
var metal = new THREE.TextureLoader().load("textures/blade/Metal_Pattern_004_metallic.jpg");
redPlasticMaterial.map = color;
redPlasticMaterial.displacementMap = disp
redPlasticMaterial.normalMap = norm
redPlasticMaterial.aoMap = occ
redPlasticMaterial.roughnessMap = rough
redPlasticMaterial.metalnessMap = metal

color = new THREE.TextureLoader().load("textures/iron/Greeble_Techno_001_basecolor.jpg");
disp = new THREE.TextureLoader().load("textures/iron/Greeble_Techno_001_height.png");
norm = new THREE.TextureLoader().load("textures/iron/Greeble_Techno_001_normal.jpg");
occ = new THREE.TextureLoader().load("textures/iron/Greeble_Techno_001_ambientOcclusion.jpg");
rough = new THREE.TextureLoader().load("textures/iron/Greeble_Techno_001_metallic.jpg");
metal = new THREE.TextureLoader().load("textures/iron/Greeble_Techno_001_roughness.jpg");
ironMaterial.map = color;
ironMaterial.displacementMap = disp
ironMaterial.normalMap = norm
ironMaterial.aoMap = occ
ironMaterial.roughnessMap = rough
ironMaterial.metalnessMap = metal

color = new THREE.TextureLoader().load("textures/saphire/Sapphire_001_COLOR.jpg");
disp = new THREE.TextureLoader().load("textures/saphire/Sapphire_001_DISP.png");
norm = new THREE.TextureLoader().load("textures/saphire/Sapphire_001_NORM.jpg");
occ = new THREE.TextureLoader().load("textures/saphire/Sapphire_001_OCC.jpg");
rough = new THREE.TextureLoader().load("textures/saphire/Sapphire_001_ROUGH.jpg");
redderPlasticMaterial.map = color;
redderPlasticMaterial.displacementMap = disp
redderPlasticMaterial.normalMap = norm
redderPlasticMaterial.aoMap = occ
redderPlasticMaterial.roughnessMap = rough

color = new THREE.TextureLoader().load("textures/sword/Metal_Galvanized_001_basecolor.jpg");
disp = new THREE.TextureLoader().load("textures/sword/Metal_Galvanized_001_height.png");
norm = new THREE.TextureLoader().load("textures/sword/Metal_Galvanized_001_normal.jpg");
occ = new THREE.TextureLoader().load("textures/sword/Metal_Galvanized_001_ambientOcclusion.jpg");
rough = new THREE.TextureLoader().load("textures/sword/Metal_Galvanized_001_roughness.jpg");
metal = new THREE.TextureLoader().load("textures/sword/Metal_Galvanized_001_metallic.jpg");
redBrownPlasticMaterial.map = color;
redBrownPlasticMaterial.displacementMap = disp
redBrownPlasticMaterial.normalMap = norm
redBrownPlasticMaterial.aoMap = occ
redBrownPlasticMaterial.roughnessMap = rough
redBrownPlasticMaterial.metalnessMap = metal

color = new THREE.TextureLoader().load("textures/black/Gun_Metal_Scratched_001_COLOR.jpg");
norm = new THREE.TextureLoader().load("textures/black/Gun_Metal_Scratched_001_NORM.jpg");
occ = new THREE.TextureLoader().load("textures/black/Gun_Metal_Scratched_001_OCC.jpg");
rough = new THREE.TextureLoader().load("textures/black/Gun_Metal_Scratched_001_ROUGH.jpg");
metal = new THREE.TextureLoader().load("textures/black/Gun_Metal_Scratched_001_METAL.jpg");
blackMaterial.map = color;
blackMaterial.normalMap = norm
blackMaterial.aoMap = occ
blackMaterial.roughnessMap = rough
blackMaterial.roughness = 0.04
blackMaterial.metalnessMap = metal
blackMaterial.metalness = 0.9

// Update render image size and camera aspect when the window is resized
function resizeWindow(eventParam) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    sceneElements.camera.aspect = width / height;
    sceneElements.camera.updateProjectionMatrix();

    sceneElements.renderer.setSize(width, height);
}

function onDocumentKeyDown(event) {
    switch (event.keyCode) {
        case 68: //d
            keyW = false;
            keyA = false;
            keyS = false;
            keyD = true;
            break;
        case 83: //s
            keyW = false;
            keyA = false;
            keyS = true;
            keyD = false;
            break;
        case 65: //a
            keyW = false;
            keyA = true;
            keyS = false;
            keyD = false;
            break;
        case 87: //w
            keyW = true;
            keyA = false;
            keyS = false;
            keyD = false;
            break;
    }
}

// Create and insert in the scene graph the models of the 3D scene
function load3DObjects(sceneGraph) {
    const stars = new THREE.TextureLoader().load( 'textures/stars.jpg' );
    sceneGraph.background = stars
    var sceneCenter = sceneGraph.getObjectByName("centro")
    if(!sceneCenter){
        sceneCenter = new THREE.Object3D();
        sceneCenter.name = "centro";
        sceneGraph.add(sceneCenter);
    }
    
    /*var reflectiveCenter = new THREE.Object3D();
    reflectiveCenter.add(createReflectiveFloor())
    sceneGraph.add(reflectiveCenter)
    
    createScene(sceneGraph)
    */
    sceneGraph.add(createBoard())
    createSnake(sceneGraph)
    sceneGraph.add(pointBall)/*
    var squarePillar = pillar.clone()
    for(var l = 0; l < 25;l++){
        for(var c = 0; c < 25;c++){
            squarePillar = pillar.clone()
            squarePillar.scale.y = 0.001
            squarePillar.position.y = -160
            squarePillar.position.x = -halfBoard + 25 + c*25
            squarePillar.position.z = -halfBoard + 25 + l*25
            sceneGraph.add(squarePillar)
        }
    }*/
    boardData[pointLin][pointCol] = 1
    var sword = createAndCenterSword()
    sword.scale.x = 1
    sword.scale.y = 1
    sword.scale.z = 1
    sceneCenter.add(sword)
    sceneCenter.scale.x = 0.4
    sceneCenter.scale.y = 0.4
    sceneCenter.scale.z = 0.4
    sceneCenter.position.y = 100
    for(var i=0 ; i<objects.length;i++){
        objects[i].visible = false
    }
    
}
var theRealSnake = []
var snakeObjs = []
var snakeobj;
var snakeDir;
var snakeLinPos;
var snakeColPos;
var tailLinPos;
var tailColPos;
function createSnake(sceneGraph){
    const snakeColor = new THREE.TextureLoader().load( 'textures/snake/Skin_Lizard_001_COLOR.jpg' );
    const snakeDisp = new THREE.TextureLoader().load( 'textures/snake/Skin_Lizard_001_DISP.png' );
    const snakeNorm = new THREE.TextureLoader().load( 'textures/snake/Skin_Lizard_001_NRM.jpg' );
    const snakeOCC = new THREE.TextureLoader().load( 'textures/snake/Skin_Lizard_001_OCC.jpg' );
    const snakeEmissive = new THREE.TextureLoader().load( 'textures/snake/Dragon_Scales_001_Emission.jpg' );
    const snakeRough = new THREE.TextureLoader().load( 'textures/snake/Skin_Lizard_001_ROUGH.jpg' );
    const snakeBody = new THREE.MeshStandardMaterial( { map: snakeColor});
    snakeMaterial.push(snakeBody)
    snakeBody.displacementMap = snakeDisp
    snakeBody.displacementScale = 0.05
    snakeBody.normalMap = snakeNorm
    snakeBody.aoMap = snakeOCC
    snakeBody.emissiveMap = snakeEmissive
    snakeBody.emissiveMapIntensity = 0.1
    snakeBody.roughnessMap = snakeRough
    snakeBody.roughness = 0.5
    const tongueEyesColor = new THREE.TextureLoader().load( 'textures/tongue/Veins_001_basecolor.jpg' );
    const tongueEyesDisp = new THREE.TextureLoader().load( 'textures/tongue/Veins_001_height.png' );
    const tongueEyesNorm = new THREE.TextureLoader().load( 'textures/tongue/Veins_001_normal.jpg' );
    const tongueEyesOCC = new THREE.TextureLoader().load( 'textures/tongue/Veins_001_ambientOcclusion.jpg' );
    const tongueEyesRough = new THREE.TextureLoader().load( 'textures/tongue/Veins_001_roughness.jpg' );
    const tongueEyes = new THREE.MeshStandardMaterial( { map: tongueEyesColor});
    tongueEyes.displacementMap = tongueEyesDisp
    tongueEyes.displacementScale = 0.05
    tongueEyes.normalMap = tongueEyesNorm
    tongueEyes.aoMap = tongueEyesOCC
    tongueEyes.roughnessMap = tongueEyesRough
    tongueEyes.roughness = 0.5

    var head = new THREE.Group()
    var body = new THREE.Group()
    var tail = new THREE.Group()
    var turn = new THREE.Group()
    const cornerGeo = new THREE.TorusGeometry( 14, 15, 30, 200, 3.14/2 );
    const torus = new THREE.Mesh( cornerGeo, snakeBody );
    turn.add(torus)
    var face = new THREE.SphereGeometry( 15, 32, 32,0,6.27,6,6.1 );
    var snakeFace = new THREE.Mesh( face, snakeBody );
    snakeFace.rotateX(-3.14/2)
    snakeFace.rotateZ(3.14*3/2)
    var eye = new THREE.SphereGeometry(3, 32, 32)
    var eyes = new THREE.Mesh( eye, tongueEyes );
    eyes.rotateX(-3.14/2)
    eyes.rotateY(3.14/4)
    eyes.position.x += 8
    eyes.position.y += 9
    eyes.position.z -= 4
    head.add(eyes)
    eyes = eyes.clone()
    eyes.position.x -= 8+8
    head.add(eyes)

    const shape = new THREE.Shape();
    shape.moveTo( -3,0 );
    shape.lineTo( -3, 10 );
    shape.lineTo( -5, 13 );
    shape.lineTo( -1, 12 );
    shape.lineTo( 0, 11 );
    shape.lineTo( 1, 12 );
    shape.lineTo( 5, 13 );
    shape.lineTo( 3, 10 );
    shape.lineTo( 3, 0 );

    const extrudeSettings = {
        steps: 55,
        depth: 0.2,
        bevelEnabled: true,
        bevelThickness: 0.2,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 55
    };

    const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    const tongue = new THREE.Mesh( geometry, tongueEyes ) ;
    tongue.rotateX(-3.14/2)
    tongue.position.z -= 1
    theRealSnake.push(tongue)

    head.add(tongue)
    head.add(snakeFace)

    const bodbod = new THREE.CylinderGeometry( 15, 15, 25, 32 );
    const bodyMesh = new THREE.Mesh( bodbod, snakeBody );
    bodyMesh.rotateX(3.14/2)
    bodyMesh.position.z += 13.5
    
    var updown = bodyMesh.clone()
    var leftright = bodyMesh.clone()
    leftright.rotateY(3.14/2)
    var new_torus = torus.clone()
    new_torus.position.y -= 155
    new_torus.rotateX(3.14/2)
    var leftup = new_torus.clone()
    var rightup = new_torus.clone()
    rightup.rotateZ(3.14/2)
    var leftdown = new_torus.clone()
    leftdown.rotateZ(3.14*3/2)
    var rightdown = new_torus.clone()
    rightdown.rotateZ(3.14*2/2)
    snakeObjs.push(updown)
    snakeObjs.push(leftup)
    snakeObjs.push(rightup)
    snakeObjs.push(leftright)
    snakeObjs.push(leftdown)
    snakeObjs.push(rightdown)

    body.add(bodyMesh)
    const taltil = new THREE.CylinderGeometry( 15, 0, 40, 32 );
    const tailMesh = new THREE.Mesh( taltil, snakeBody );
    tailMesh.rotateX(-3.14/2)
    tailMesh.position.z += 46
    tail.add(tailMesh)

    
    tail.position.y -= 155
    tail.position.x = startCPos
    tail.position.z = startLPos
    
    head.position.y -= 155
    head.position.x = startCPos
    head.position.z = startLPos
    
    body.position.y -= 155
    body.position.x = startCPos
    body.position.z = startLPos

    snakeLinPos = startLine+3;
    snakeColPos = startCol+3;

    turn.position.y -= 155
    turn.rotateX(3.14/2)
    switch(startDirct){
        case 1:
            theRealSnake.push({"obj":tail,"dir": 3})
            theRealSnake.push({"obj":head,"dir": 3})
            theRealSnake.push({"obj":body,"dir": 3})
            boardData[startLine-2][startCol-1] = 3
            boardData[startLine-1][startCol-1] = 3
            boardData[startLine][startCol-1] = 3
            tail.rotateY(3.14*0/2)
            head.rotateY(3.14*0/2)
            body.rotateY(3.14*0/2)
            snakeDir = 3;
            
            tailLinPos = startLine;
            tailColPos = startCol-1;
            break
        case 2:
            theRealSnake.push({"obj":tail,"dir": 6})
            theRealSnake.push({"obj":head,"dir": 6})
            theRealSnake.push({"obj":body,"dir": 6})
            boardData[startLine-1][startCol-2] = 6
            boardData[startLine-1][startCol-1] = 6
            boardData[startLine-1][startCol] = 6
            tail.rotateY(3.14*1/2)
            head.rotateY(3.14*1/2)
            body.rotateY(3.14*1/2)
            snakeDir = 6;

            tailLinPos = startLine-1;
            tailColPos = startCol;
            break
        case 3:
            theRealSnake.push({"obj":tail,"dir": 12})
            theRealSnake.push({"obj":head,"dir": 12})
            theRealSnake.push({"obj":body,"dir": 12})
            boardData[startLine][startCol-1] = 12
            boardData[startLine-1][startCol-1] = 12
            boardData[startLine-2][startCol-1] = 12
            tail.rotateY(3.14*2/2)
            head.rotateY(3.14*2/2)
            body.rotateY(3.14*2/2)
            snakeDir = 12;

            tailLinPos = startLine-2;
            tailColPos = startCol-1;
            break
        case 4:
            theRealSnake.push({"obj":tail,"dir": 9})
            theRealSnake.push({"obj":head,"dir": 9})
            theRealSnake.push({"obj":body,"dir": 9})
            boardData[startLine-1][startCol] = 9
            boardData[startLine-1][startCol-1] = 9
            boardData[startLine-1][startCol-2] = 9
            tail.rotateY(3.14*3/2)
            head.rotateY(3.14*3/2)
            body.rotateY(3.14*3/2)
            snakeDir = 9;
            
            tailLinPos = startLine-1;
            tailColPos = startCol-2;
            break
    }
    sceneGraph.add(tail)
    sceneGraph.add(head)
    sceneGraph.add(body)
}

var boardData = []
for(var c = 0;c<25;c++){
    boardData[c] = []
    for(var l = 0;l<25;l++){
        boardData[c][l] = 0
    }   
}
var halfBoard = (25*25+25)/2
var startLine = Math.floor(Math.random()*(9)+8)
var startCol = Math.floor(Math.random()*(9)+8)
var startLPos = -(halfBoard) + startLine*25
var startCPos = -(halfBoard) + startCol*25
var startDirct = Math.floor(Math.random()*4+1)

function createBoard(){
    const floorColor = new THREE.TextureLoader().load( 'textures/snow/Snow_001_COLOR.jpg' );
    const floorDisp = new THREE.TextureLoader().load( 'textures/snow/Snow_001_DISP.png' );
    const floorNorm = new THREE.TextureLoader().load( 'textures/snow/Snow_001_NORM.jpg' );
    const floorOCC = new THREE.TextureLoader().load( 'textures/snow/Snow_001_OCC.jpg' );
    const floorRough = new THREE.TextureLoader().load( 'textures/snow/Snow_001_ROUGH.jpg' );
    const material = new THREE.MeshStandardMaterial( { map: floorColor});
    material.displacementMap = floorDisp
    material.displacementScale = 0.05
    material.normalMap = floorNorm
    material.aoMap = floorOCC
    material.roughnessMap = floorRough
    material.roughness = 0.5
    const wallColor = new THREE.TextureLoader().load( 'textures/ice/Blue_Ice_001_COLOR.jpg' );
    const wallDisp = new THREE.TextureLoader().load( 'textures/ice/Blue_Ice_001_DISP.png' );
    const wallNorm = new THREE.TextureLoader().load( 'textures/ice/Blue_Ice_001_NORM.jpg' );
    const wallOCC = new THREE.TextureLoader().load( 'textures/ice/Blue_Ice_001_OCC.jpg' );
    const wallRough = new THREE.TextureLoader().load( 'textures/ice/Blue_Ice_001_ROUGH.jpg' );
    const wallMaterial = new THREE.MeshStandardMaterial( { map: wallColor});
    wallMaterial.displacementMap = wallDisp
    wallMaterial.displacementScale = 0.09
    wallMaterial.normalMap = wallNorm
    wallMaterial.aoMap = wallOCC
    wallMaterial.roughnessMap = wallRough
    wallMaterial.roughness = 0.5
    var geometry = new THREE.PlaneGeometry(25*25+25,25*25+25)
    var wallGeo = new THREE.BoxGeometry(25,25,25)
    var wall = new THREE.Mesh( wallGeo, wallMaterial );
    var plane = new THREE.Mesh( geometry, material );
    plane.rotateX(-3.14/2)
    plane.position.y -= 160
    //Top
    wall.position.y -= 160-12.5
    wall.position.z = -halfBoard-12.5
    wall.position.x = -halfBoard-12.5
    var board = new THREE.Group()
    board.add(wall)
    for(var i = 1 ; i < 28; i++){
        wall = new THREE.Mesh( wallGeo, wallMaterial );
        wall.position.y -= 160-12.5
        wall.position.z = -halfBoard-12.5
        wall.position.x = -halfBoard-12.5 +i*25
        board.add(wall)
    }
    //Left
    wall = new THREE.Mesh( wallGeo, wallMaterial );
    wall.position.y -= 160-12.5
    wall.position.z = -halfBoard -12.5
    wall.position.x = -halfBoard -12.5
    board.add(wall)
    for(var i = 1 ; i < 28; i++){
        wall = new THREE.Mesh( wallGeo, wallMaterial );
        wall.position.y -= 160-12.5
        wall.position.z = -halfBoard - 12.5 +i*25
        wall.position.x = -halfBoard - 12.5
        board.add(wall)
    }
    //Bot
    wall = new THREE.Mesh( wallGeo, wallMaterial );
    wall.position.y -= 160-12.5
    wall.position.z = -halfBoard -12.5+27*25
    wall.position.x = -halfBoard -12.5
    board.add(wall)
    for(var i = 0 ; i < 28; i++){
        wall = new THREE.Mesh( wallGeo, wallMaterial );
        wall.position.y -= 160-12.5
        wall.position.z = -halfBoard - 12.5+27*25
        wall.position.x = -halfBoard - 12.5+i*25
        board.add(wall)
    }
    //Right
    wall = new THREE.Mesh( wallGeo, wallMaterial );
    wall.position.y -= 160-12.5
    wall.position.z = -halfBoard -12.5
    wall.position.x = -halfBoard -12.5+27*25
    board.add(wall)
    for(var i = 0 ; i < 28; i++){
        wall = new THREE.Mesh( wallGeo, wallMaterial );
        wall.position.y -= 160-12.5
        wall.position.z = -halfBoard - 12.5+i*25
        wall.position.x = -halfBoard - 12.5+27*25
        board.add(wall)
    }
    /*
    plane.position.x += 25
    plane.position.z += 25
    plane.position.x -= 250*50
    plane.position.z -= 250*50
    const board = new THREE.Group();
    board.add(plane)
    var clonedPlane = plane.clone()
    for(var c = 0; c< 63; c++){
        for(var l = 0; l< 70; l++){
            clonedPlane.position.x = plane.position.x + 200*c
            clonedPlane.position.z = plane.position.z + 200*l
            board.add(clonedPlane)
            clonedPlane = plane.clone()
        }
    }
    return board*/
    board.add(plane)
    return board
}

function createReflectiveFloor(){
    var plane = new THREE.Reflector( new THREE.CircleBufferGeometry(
        10000, 10000), {
			textureWidth: 1024 * window.devicePixelRatio,
			textureHeight: 1024 * window.devicePixelRatio,
    } );
    plane.rotateX(-3.14/2)
    plane.position.y -= 160
    return plane
}

function createAndCenterSword(){
    var sword = new THREE.Group()
    sword.name = "sword"
    sword.add(createBlade());
    sword.add(createHiltPlusGuard());
    sword.rotateZ(-3.14/6)
    sword.position.x -= 110
    sword.position.y -= 150
    return sword
}

function createHiltPlusGuard(){
    //Hitl and guard group
    var HG = new THREE.Group()

    HG.add(createGuard())

    //center sphere
    var geometry = new THREE.SphereGeometry( 7, 32, 32 );
    var sphere = new THREE.Mesh( geometry, shinyRedMaterial );
    sphere.position.y += 250
    sphere.position.x += 12
    sphere.position.z += 4
    objects.push(sphere)
    HG.add( sphere );

    //front
    //center spikes base
    var geometry = new THREE.BoxGeometry( 1, 2.5, 1 );
    var cube = new THREE.Mesh( geometry, blackMaterial );
    var cube2 = cube.clone()
    var cube3 = cube.clone()
    cube.position.x += 12
    cube.position.y += 243
    cube.position.z += 11
    cube.rotateY(3.14/4)
    objects.push(cube)
    HG.add( cube );
    
    cube2.rotateZ(3.14/2)
    cube2.position.x += 19
    cube2.position.y += 250
    cube2.position.z += 11
    cube2.rotateY(3.14/4)
    objects.push(cube2)
    HG.add( cube2 );
    
    cube3.rotateZ(3.14/2)
    cube3.position.x += 5
    cube3.position.y += 250
    cube3.position.z += 11
    cube3.rotateY(3.14/4)
    objects.push(cube3)
    HG.add( cube3 );

    //center spike spike
    var geometry = new THREE.ConeGeometry( 1.5, 4, 4 );
    var spike = new THREE.Mesh( geometry, blackMaterial );
    var spike2 = spike.clone()
    var spike3 = spike.clone()
    spike.position.x += 12
    spike.position.y += 246
    spike.position.z += 11
    spike.rotateY(3.14/2)
    objects.push(spike)
    HG.add( spike );
    
    
    spike2.rotateZ(3.14/2)
    spike2.position.x += 16
    spike2.position.y += 250
    spike2.position.z += 11
    spike2.rotateY(3.14/2)
    objects.push(spike2)
    HG.add( spike2 );
    
    spike3.rotateZ(-3.14/2)
    spike3.position.x += 8
    spike3.position.y += 250
    spike3.position.z += 11
    spike3.rotateY(3.14/2)
    objects.push(spike3)
    HG.add( spike3 );

    //back
    //center spikes base
    var geometry = new THREE.BoxGeometry( 1, 2.5, 1 );
    var cube = new THREE.Mesh( geometry, blackMaterial );
    var cube2 = cube.clone()
    var cube3 = cube.clone()
    cube.position.x += 12
    cube.position.y += 243
    cube.position.z -= 3
    cube.rotateY(3.14/4)
    objects.push(cube)
    HG.add( cube );
    
    cube2.rotateZ(3.14/2)
    cube2.position.x += 19
    cube2.position.y += 250
    cube2.position.z += 11
    cube2.rotateY(3.14/4)
    objects.push(cube2)
    HG.add( cube2 );
    
    cube3.rotateZ(3.14/2)
    cube3.position.x += 5
    cube3.position.y += 250
    cube3.position.z -= 3
    cube3.rotateY(3.14/4)
    objects.push(cube3)
    HG.add( cube3 );

    //center spike spike
    var geometry = new THREE.ConeGeometry( 1.5, 4, 4 );
    var spike = new THREE.Mesh( geometry, blackMaterial );
    var spike2 = spike.clone()
    var spike3 = spike.clone()
    spike.position.x += 12
    spike.position.y += 246
    spike.position.z -= 3
    spike.rotateY(3.14/2)
    objects.push(spike)
    HG.add( spike );
    
    spike2.rotateZ(3.14/2)
    spike2.position.x += 16
    spike2.position.y += 250
    spike2.position.z -= 3
    spike2.rotateY(3.14/2)
    objects.push(spike2)
    HG.add( spike2 );
    
    spike3.rotateZ(-3.14/2)
    spike3.position.x += 8
    spike3.position.y += 250
    spike3.position.z -= 3
    spike3.rotateY(3.14/2)
    objects.push(spike3)
    HG.add( spike3 );

    HG.add(createHilt())
    return HG
    
}

function createGuard(){
    var Guard = new THREE.Group();
    //guard around center
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(0,245);
    bladeShape.lineTo(-1,233);
    bladeShape.lineTo(-3,235);
    bladeShape.lineTo(-2,243);
    bladeShape.lineTo(-6,240);
    bladeShape.lineTo(-7,242);
    bladeShape.lineTo(-3,245);
    bladeShape.lineTo(-4,248);
    bladeShape.lineTo(-3,252);
    //pointy things
    bladeShape.lineTo(-19,258);
    bladeShape.lineTo(-15,262);
    //pointy things
    bladeShape.lineTo(-7,259);
    bladeShape.lineTo(0,260);
    bladeShape.lineTo(5,266);
    bladeShape.lineTo(6,269);
    bladeShape.lineTo(7,271);
    bladeShape.lineTo(9,275);
    bladeShape.lineTo(12,280);
    bladeShape.lineTo(12,262);
    bladeShape.lineTo(10,259);
    bladeShape.bezierCurveTo(-1.8,252,5,243,12,242)
    bladeShape.lineTo(12,237);
    bladeShape.bezierCurveTo(9,237,5,239,0,245)
    var extrudeSettings = { depth: 16, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var mesh = new THREE.Mesh( bladeBlockGeo, redBrownPlasticMaterial );
    var mesh2 = mesh.clone()
    mesh.position.z -= 4
    objects.push(mesh)
    Guard.add(mesh);
    mesh2.rotateY(3.14)
    mesh2.position.z += 12
    mesh2.position.x += 24
    objects.push(mesh2)
    Guard.add(mesh2)

    //guard blade connect
        //behind
            //right
            var bladeShape = new THREE.Shape();
            bladeShape.moveTo(9,238)
            bladeShape.lineTo(2,230)
            bladeShape.lineTo(1,231.5)
            bladeShape.lineTo(8,239.5)
            var extrudeSettings = { depth: 1, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
            var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
            var bl1 = new THREE.Mesh( bladeBlockGeo, redBrownPlasticMaterial );
            var bl2 = bl1.clone()
            var br1 = bl1.clone()
            var br2 = bl1.clone()
            var fl1 = bl1.clone()
            var fl2 = bl1.clone()
            var fr1 = bl1.clone()
            var fr2 = bl1.clone()
            br1.position.z -= 1
            objects.push(br1)
            Guard.add(br1)
            br2.position.z -= 1
            br2.position.y += 1.5
            br2.position.x -= 1.1
            objects.push(br2)
            Guard.add(br2)
            //left
            bl1.rotateY(3.14)
            bl1.position.z = 0
            bl1.position.x += 24
            objects.push(bl1)
            Guard.add(bl1)
            bl2.rotateY(3.14)
            bl2.position.z = 0
            bl2.position.y += 1.5
            bl2.position.x += 25.1
            objects.push(bl2)
            Guard.add(bl2)
        //front
            //left        
            fl1.position.z += 8
            objects.push(fl1)
            Guard.add(fl1)
            fl2.position.z += 8
            fl2.position.y += 1.5
            fl2.position.x -= 1.1
            objects.push(fl2)
            Guard.add(fl2)
            //right
            fr1.rotateY(3.14)
            fr1.position.z += 9
            fr1.position.x += 24
            objects.push(fr1)
            Guard.add(fr1)
            fr2.rotateY(3.14)
            fr2.position.z += 9
            fr2.position.y += 1.5
            fr2.position.x += 25.1
            objects.push(fr2)
            Guard.add(fr2)
    //spike teeth
    var geometry = new THREE.ConeGeometry( 4.5, 15, 6 );
    var tooth1 = new THREE.Mesh( geometry, redderPlasticMaterial );
    var tooth2 = tooth1.clone()
    tooth1.rotateZ(3*3.14/4)
    tooth1.position.z += 4
    tooth1.position.y += 240
    tooth1.position.x -= 3
    objects.push(tooth1)
    Guard.add(tooth1)
    tooth2.rotateZ(-3*3.14/4)
    tooth2.position.z += 4
    tooth2.position.y += 240
    tooth2.position.x += 27
    objects.push(tooth2)
    Guard.add(tooth2)

    //black inside guard
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(-7,242);
    bladeShape.lineTo(-14,243);
    bladeShape.lineTo(-14,244);
    bladeShape.lineTo(-16,244);
    bladeShape.lineTo(-14,252);
    bladeShape.lineTo(-3,252);
    bladeShape.lineTo(-4,248);
    bladeShape.lineTo(-3,247);
    bladeShape.lineTo(-9,247);
    bladeShape.lineTo(-8,251);
    bladeShape.lineTo(-10,251);
    bladeShape.lineTo(-11,246);
    bladeShape.lineTo(-10,245);
    bladeShape.lineTo(-3,243);
    bladeShape.lineTo(-7,242);
    var extrudeSettings = { depth: 4, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var mesh = new THREE.Mesh( bladeBlockGeo, blackMaterial );
    var mesh2 = mesh.clone()
    mesh.position.z += 2
    objects.push(mesh)
    Guard.add(mesh)
    mesh2.rotateY(3.14)
    mesh2.position.z += 6
    mesh2.position.x += 24
    objects.push(mesh2)
    Guard.add(mesh2)

    var i = -8
    //Guard black outside left
    var bladeShape = new THREE.Shape();
    //outside lining
    bladeShape.moveTo(-1,250);
    bladeShape.lineTo(-10,250);
    bladeShape.lineTo(-12,248);
    bladeShape.lineTo(-34-i,248);
    bladeShape.lineTo(-38-i,243);
    bladeShape.lineTo(-42-i,250);
    bladeShape.lineTo(-45-i,252);
    bladeShape.lineTo(-42-i,254);
    bladeShape.lineTo(-38-i,261);
    bladeShape.lineTo(-34-i,256);
    bladeShape.lineTo(-12,256);
    bladeShape.lineTo(-10,256);
    bladeShape.lineTo(-1,256);
    //transition
    bladeShape.lineTo(-1,254);
    //inside lining
    bladeShape.lineTo(-10,254);
    bladeShape.lineTo(-12,254);
    bladeShape.lineTo(-34-i,254);
    bladeShape.lineTo(-38-i,259);
    bladeShape.lineTo(-40-i,254);
    bladeShape.lineTo(-43-i,252);
    bladeShape.lineTo(-40-i,250);
    bladeShape.lineTo(-38-i,245);
    bladeShape.lineTo(-34-i,250);
    bladeShape.lineTo(-12,250);
    bladeShape.lineTo(-10,252);
    bladeShape.lineTo(-1,250);
    var extrudeSettings = { depth: 8, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var gbol = new THREE.Mesh( bladeBlockGeo, blackMaterial );
    var gbor = gbol.clone()
    objects.push(gbol)
    Guard.add(gbol)

    //Guard Red inside left
    var bladeShape = new THREE.Shape();
    //outside lining
    bladeShape.moveTo(-1,252);
    bladeShape.lineTo(-10,254);
    bladeShape.lineTo(-12,254);
    bladeShape.lineTo(-34-i,254);
    bladeShape.lineTo(-38-i,259);
    bladeShape.lineTo(-40-i,254);
    bladeShape.lineTo(-43-i,252);
    bladeShape.lineTo(-40-i,250);
    bladeShape.lineTo(-38-i,245);
    bladeShape.lineTo(-34-i,250);
    bladeShape.lineTo(-12,250);
    bladeShape.lineTo(-10,252);
    bladeShape.lineTo(-1,252);
    var extrudeSettings = { depth: 9, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var gril = new THREE.Mesh( bladeBlockGeo, redPlasticMaterial );
    var grir = gril.clone()
    gril.position.z -= 0.5
    objects.push(gril)
    Guard.add(gril)

    //Guard black outside right
    gbor.rotateY(3.14)
    gbor.position.z += 8
    gbor.position.x += 24
    objects.push(gbor)
    Guard.add(gbor)

    //Guard Red inside right
    grir.rotateY(3.14)
    grir.position.z += 8.5
    grir.position.x += 24
    objects.push(grir)
    Guard.add(grir)

    //top guard left
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(-14.5,261.5);
    bladeShape.lineTo(-12.5,264);
    bladeShape.lineTo(-7,263);
    bladeShape.lineTo(7,276);
    bladeShape.lineTo(12,276);
    bladeShape.lineTo(12,263);
    bladeShape.lineTo(5,266);
    bladeShape.lineTo(0,260);
    bladeShape.lineTo(-7,259);
    var extrudeSettings = { depth: 8, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var topGl = new THREE.Mesh( bladeBlockGeo, blackMaterial );
    var topGr = topGl.clone()
    objects.push(topGl)
    Guard.add(topGl)
    //top guard right
    topGr.rotateY(3.14)
    topGr.position.z += 8
    topGr.position.x += 24
    objects.push(topGr)
    Guard.add(topGr)

    //top guard red spikes
    var geometry = new THREE.BoxGeometry( 2, 4, 2 );
    var cube1 = new THREE.Mesh( geometry, redBrownPlasticMaterial );
    var cube2 = cube1.clone()
    var cube3 = cube1.clone()
    var cube4 = cube1.clone()

    var geometry = new THREE.ConeGeometry( 2.5, 7, 4 );
    var spike1 = new THREE.Mesh( geometry, redBrownPlasticMaterial );
    var spike2 = spike1.clone()
    var spike3 = spike1.clone()
    var spike4 = spike1.clone()
        //back left
        cube1.rotateZ(3.14/4)
        cube1.rotateY(3.14/4)
        cube1.position.y += 263
        objects.push(cube1)
        Guard.add(cube1)
        spike1.rotateZ(3.14/4)
        spike1.position.x -= 4
        spike1.position.y += 267
        objects.push(spike1)
        Guard.add(spike1)
        //back right
        cube2.rotateZ(-3.14/4)
        cube2.rotateY(-3.14/4)
        cube2.position.x += 24
        cube2.position.y += 263
        objects.push(cube2)
        Guard.add(cube2)
        spike2.rotateZ(-3.14/4)
        spike2.position.x += 28
        spike2.position.y += 267
        objects.push(spike2)
        Guard.add(spike2)
        //front left
        cube3.rotateZ(3.14/4)
        cube3.rotateY(3.14/4)
        cube3.position.y += 263
        cube3.position.z += 8
        objects.push(cube3)
        Guard.add(cube3)
        spike3.rotateZ(3.14/4)
        spike3.position.x -= 4
        spike3.position.y += 267
        spike3.position.z += 8
        objects.push(spike3)
        Guard.add(spike3)
        //front right
        cube4.rotateZ(-3.14/4)
        cube4.rotateY(-3.14/4)
        cube4.position.x += 24
        cube4.position.y += 263
        cube4.position.z += 8
        objects.push(cube4)
        Guard.add(cube4)
        spike4.rotateZ(-3.14/4)
        spike4.position.x += 28
        spike4.position.y += 267
        spike4.position.z += 8
        objects.push(spike4)
        Guard.add(spike4)

    //top guard black spikes
    var geometry = new THREE.BoxGeometry( 2, 4, 2 );
    var cube1 = new THREE.Mesh( geometry, blackMaterial );
    var cube2 = cube1.clone()

    var geometry = new THREE.ConeGeometry( 2.5, 7, 4 );
    var spike1 = new THREE.Mesh( geometry, blackMaterial );
    var spike2 = spike1.clone()
        //left
        cube1.rotateZ(3.14/4)
        cube1.rotateY(3.14/4)
        cube1.position.x -= 4.5
        cube1.position.y += 267.5
        cube1.position.z += 4
        objects.push(cube1)
        Guard.add(cube1)
        spike1.rotateZ(3.14/4)
        spike1.position.x -= 8
        spike1.position.y += 271
        spike1.position.z += 4
        objects.push(spike1)
        Guard.add(spike1)
        //right
        cube2.rotateZ(-3.14/4)
        cube2.rotateY(-3.14/4)
        cube2.position.x += 28.5
        cube2.position.y += 267.5
        cube2.position.z += 4
        objects.push(cube2)
        Guard.add(cube2)
        spike2.rotateZ(-3.14/4)
        spike2.position.x += 32
        spike2.position.y += 271
        spike2.position.z += 4
        objects.push(spike2)
        Guard.add(spike2)
    return Guard
}

function createHilt(){
    var Hilt = new THREE.Group();
    //Top ellipsoid hilt   
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(7,0);
    bladeShape.bezierCurveTo(9.5,3,14.5,3,17,0)
    bladeShape.bezierCurveTo(14.5,-3,9.5,-3,7,0)
    var extrudeSettings = { depth: 3, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var ellipsoid = new THREE.Mesh( bladeBlockGeo, blackMaterial );
    ellipsoid.rotateX(3.14/2)
    ellipsoid.position.z += 4
    ellipsoid.position.y += 279
    objects.push(ellipsoid)
    Hilt.add(ellipsoid)

    //hilt base
    var geometry = new THREE.CylinderGeometry( 2, 2, 5, 64 );
    var cylinder = new THREE.Mesh( geometry, blackMaterial );
    cylinder.position.x += 12
    cylinder.position.y += 279
    cylinder.position.z += 4
    objects.push(cylinder)
    Hilt.add( cylinder );
    //hilt girth
    var geometry = new THREE.CylinderGeometry( 1.5, 1.5, 67, 64 );
    var cylinder = new THREE.Mesh( geometry, blackMaterial );
    cylinder.position.x += 12
    cylinder.position.y += 284
    cylinder.position.z += 4
    objects.push(cylinder)
    Hilt.add( cylinder );
    //hilt bot anomaly
    var geometry = new THREE.CylinderGeometry( 2.5, 1.5, 3, 64 );
    var cylinder = new THREE.Mesh( geometry, blackMaterial );
    cylinder.position.x += 12
    cylinder.position.y += 319
    cylinder.position.z += 4
    objects.push(cylinder)
    Hilt.add( cylinder );
    //hilt top anomaly
    var geometry = new THREE.CylinderGeometry( 1.5, 2.5, 3, 64 );
    var cylinder = new THREE.Mesh( geometry, blackMaterial );
    cylinder.position.x += 12
    cylinder.position.y += 322
    cylinder.position.z += 4
    objects.push(cylinder)
    Hilt.add( cylinder );
    //hilt bot point base
    var geometry = new THREE.CylinderGeometry( 2, 1.5, 1.5, 64 );
    var cylinder = new THREE.Mesh( geometry, blackMaterial );
    cylinder.position.x += 12
    cylinder.position.y += 323.5
    cylinder.position.z += 4
    objects.push(cylinder)
    Hilt.add( cylinder );
    //hilt top point base
    var geometry = new THREE.CylinderGeometry( 1.6, 2, 1.5, 64 );
    var cylinder = new THREE.Mesh( geometry, blackMaterial );
    cylinder.position.x += 12
    cylinder.position.y += 325
    cylinder.position.z += 4
    objects.push(cylinder)
    Hilt.add( cylinder );
    //hilt top red base
    var geometry = new THREE.CylinderGeometry( 1.6, 1.6, 0.2, 64 );
    var cylinder = new THREE.Mesh( geometry, redPlasticMaterial );
    cylinder.position.x += 12
    cylinder.position.y += 325.7
    cylinder.position.z += 4
    objects.push(cylinder)
    Hilt.add( cylinder );
    //hilt girthy line
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(-0.06,0);
    bladeShape.lineTo(3.06,0)
    bladeShape.lineTo(3.06,35.6)
    bladeShape.lineTo(4.06,39.5)
    bladeShape.lineTo(3.06,42.5)
    bladeShape.lineTo(-0.06,42.5)
    bladeShape.lineTo(-1.06,39.5)
    bladeShape.lineTo(-0.06,36.5)
    bladeShape.lineTo(-0.06,0)
    var extrudeSettings = { depth: 0.6, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var girth = new THREE.Mesh( bladeBlockGeo, redBrownPlasticMaterial );
    girth.rotateY(3.14/2)
    girth.position.z += 5.51
    girth.position.y += 281
    girth.position.x += 11.7
    objects.push(girth)
    Hilt.add(girth)

    //hilt point outside
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(11,325);
    //left
    bladeShape.lineTo(11,327.5);
    bladeShape.lineTo(10,327.5);
    bladeShape.lineTo(8,326.5);
    bladeShape.lineTo(6,328.5);
    bladeShape.lineTo(8,330.5);
    bladeShape.lineTo(10,329.5);
    bladeShape.lineTo(11,329.5);
    bladeShape.lineTo(11.3,330);
    bladeShape.lineTo(10,332);
    //center
    bladeShape.lineTo(12,336);
    //right
    bladeShape.lineTo(14,332);
    bladeShape.lineTo(12.7,330);
    bladeShape.lineTo(13,329.5);
    bladeShape.lineTo(14,329.5);
    bladeShape.lineTo(16,330.5);
    bladeShape.lineTo(18,328.5);
    bladeShape.lineTo(16,326.5);
    bladeShape.lineTo(14,327.5);
    bladeShape.lineTo(13,327.5);
    //connect 4
    bladeShape.lineTo(13,325);
    var extrudeSettings = { depth: 2.4, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var cross = new THREE.Mesh( bladeBlockGeo, blackMaterial );
    cross.position.z += 2.8
    objects.push(cross)
    Hilt.add(cross)
    //hilt point inside
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(12,325.5);
    //left
    bladeShape.lineTo(11.4,327.8);
    bladeShape.lineTo(9.5,328);
    bladeShape.lineTo(8,327.5);
    bladeShape.lineTo(7,328.5);
    bladeShape.lineTo(8,329.5);
    bladeShape.lineTo(9.5,329);
    bladeShape.lineTo(11.6,329);
    bladeShape.lineTo(11.6,330);
    bladeShape.lineTo(10.6,332);
    //center
    bladeShape.lineTo(12,335);
    //right
    bladeShape.lineTo(13.4,332);
    bladeShape.lineTo(12.4,330);
    bladeShape.lineTo(12.4,329);
    bladeShape.lineTo(14.5,329);
    bladeShape.lineTo(16,329.5);
    bladeShape.lineTo(17,328.5);
    bladeShape.lineTo(16,327.5);
    bladeShape.lineTo(14.5,328);
    bladeShape.lineTo(12.6,327.8);
    //connect 4
    bladeShape.lineTo(12,325.5);
    var extrudeSettings = { depth: 3.4, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var cross = new THREE.Mesh( bladeBlockGeo, redPlasticMaterial );
    cross.position.z += 2.3
    objects.push(cross)
    Hilt.add(cross)
    return Hilt
}

function createBlade() {
    //Creating shape for repeated use
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(0,0);
    bladeShape.lineTo(24,0);
    bladeShape.lineTo(24,7);
    bladeShape.lineTo(0,7);
    bladeShape.lineTo(0,0);
    var extrudeSettings = { depth: 8, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(-5,-6);
    bladeShape.lineTo(-1,-2);
    bladeShape.lineTo(-9,-2);
    bladeShape.lineTo(-5,-6);
    var extrudeSettings = { depth: 7, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeEdgeLeftGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(-5,-6);
    bladeShape.lineTo(-1,-2);
    bladeShape.lineTo(-9,-2);
    bladeShape.lineTo(-5,-6);
    var extrudeSettings = { depth: 7, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var bladeEdgeRightGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    
    //Creating a Normal block for replicating
    var bladeBlockShape = new THREE.Group()
    //Normal blade block
    var mesh = new THREE.Mesh( bladeBlockGeo, redPlasticMaterial );
    mesh.position.y += 40
    bladeBlockShape.add(mesh);
    //Normal left blade edgge
    var mesh = new THREE.Mesh( bladeEdgeLeftGeo, ironMaterial );
    mesh.rotation.x = 3.14/2
    mesh.rotation.z = -3.14/2
    mesh.position.x += 2
    mesh.position.y += 47
    mesh.position.z -= 1
    bladeBlockShape.add(mesh);
    //Normal right blade edgge
    var mesh = new THREE.Mesh( bladeEdgeRightGeo, ironMaterial );
    mesh.rotation.x = 3.14/2
    mesh.rotation.z = -3.14/2
    mesh.rotation.y = 3.14
    mesh.position.x += 22
    mesh.position.y += 40
    mesh.position.z -= 1
    bladeBlockShape.add(mesh);

    //Full blade group
    var blade = new THREE.Group();
    
    //LEFT BLADE SIDE
    blade.add(leftBlade())

    //RIGHT BLADE SIDE
    blade.add(rightBlade())

    //Join both blade sides

    //Adding length
    for(var i = 1; i<10;i++){
        var normalBlock = bladeBlockShape.clone()
        normalBlock.position.y += 58+7*i
        objects.push(normalBlock)
        blade.add(normalBlock)    
    }

    //Creating blade top
    //spikes 1st row
    var pts = [
        new THREE.Vector3(7, 5.5, 4),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 8),
      new THREE.Vector3(14, 0, 8),
      new THREE.Vector3(14, 0, 0)
    ];
    
    var geom = new THREE.BufferGeometry().setFromPoints(pts);
    geom.setIndex([
        0, 1, 2,
      0, 2, 3, 
      0, 3, 4,
      0, 4, 1,
      1, 3, 2,
      1, 4, 3
    ]);
    geom.computeVertexNormals();
    var mesh = new THREE.Mesh(geom, ironMaterial);
    mesh.rotation.z += 3.14/2
    mesh.position.y += 159
    objects.push(mesh)
    blade.add(mesh);
    var mesh = new THREE.Mesh(geom, ironMaterial);
    mesh.rotation.z -= 3.14/2
    mesh.position.y += 173
    mesh.position.x += 24
    objects.push(mesh)
    blade.add(mesh)

    //sword center
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(0,168);
    bladeShape.lineTo(0,173);
    bladeShape.bezierCurveTo(3,177,5,181,7,199)
    bladeShape.lineTo(5,205);
    bladeShape.lineTo(5,225);
    bladeShape.lineTo(-1,235);
    bladeShape.lineTo(0,245);
    bladeShape.bezierCurveTo(8,235,16,235,24,245)
    bladeShape.lineTo(25,235);
    bladeShape.lineTo(19,225);
    bladeShape.lineTo(19,205);
    bladeShape.lineTo(17,199);
    bladeShape.bezierCurveTo(21,177,19,181,24,173)
    bladeShape.lineTo(24,168);
    bladeShape.lineTo(0,168);
    var extrudeSettings = { depth: 8, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var mesh = new THREE.Mesh( bladeBlockGeo, redPlasticMaterial );
    objects.push(mesh)
    blade.add(mesh);
    
    //curved sides right
    for(var i = 1; i <= 5; i+=0.05){
        var bladeShape = new THREE.Shape();
        bladeShape.moveTo(24,173);
        bladeShape.bezierCurveTo(19+(i/3),181,21+(i/3),177,17+i,199)
        bladeShape.lineTo(20+(i/2),208)
        bladeShape.lineTo(19+(i/2 - 1/2),208)
        bladeShape.lineTo(17+(i-1),199)
        bladeShape.bezierCurveTo(21,177,19,181,24,173)
        var extrudeSettings = { depth: 8-i, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
        var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
        var mesh = new THREE.Mesh( bladeBlockGeo, redderPlasticMaterial );
        mesh.position.z += 0.5*i
        objects.push(mesh)
        blade.add(mesh);
    }
    for(var i = 5; i < 7; i+=0.05){
        var bladeShape = new THREE.Shape();
        bladeShape.moveTo(26,168);
        bladeShape.bezierCurveTo(19+(i/3),181,21+(i/3),177,17+i,199)
        bladeShape.lineTo(20+(i/2),205)
        bladeShape.lineTo(19+(i/2 - 1/2),205)
        bladeShape.lineTo(17+(i-1),199)
        bladeShape.bezierCurveTo(3-(i/3),179,4-(i/3),184,7-i,199)
        bladeShape.lineTo(4-(i/2),205)
        bladeShape.lineTo(5-(i/2 - 1/2),205)
        bladeShape.lineTo(7-(i-1),199)
        bladeShape.bezierCurveTo(21,177,19,181,26,168)
        var extrudeSettings = { depth: 8-i, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
        var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
        var mesh = new THREE.Mesh( bladeBlockGeo, ironMaterial );
        mesh.position.z += 0.5*i
        objects.push(mesh)
        blade.add(mesh);
    }
    //curved sides left
    for(var i = 1; i <= 5; i+=0.05){
        var bladeShape = new THREE.Shape();
        bladeShape.moveTo(0,173);
        bladeShape.bezierCurveTo(3-(i/3),179,4-(i/3),184,7-i,199)
        bladeShape.lineTo(4-(i/2),208)
        bladeShape.lineTo(5-(i/2 - 1/2),208)
        bladeShape.lineTo(7-(i-1),199)
        bladeShape.bezierCurveTo(5,181,3,177,0,173)
        var extrudeSettings = { depth: 8-i, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
        var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
        var mesh = new THREE.Mesh( bladeBlockGeo, redderPlasticMaterial );
        mesh.position.z += 0.5*i
        objects.push(mesh)
        blade.add(mesh);
    }
    for(var i = 5; i < 7; i+=0.05){
        var bladeShape = new THREE.Shape();
        bladeShape.moveTo(-2,168);
        bladeShape.bezierCurveTo(3-(i/3),179,4-(i/3),184,7-i,199)
        bladeShape.lineTo(4-(i/2),205)
        bladeShape.lineTo(5-(i/2 - 1/2),205)
        bladeShape.lineTo(7-(i-1),199)
        bladeShape.bezierCurveTo(5,181,3,177,-2,168)
        var extrudeSettings = { depth: 8-i, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
        var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
        var mesh = new THREE.Mesh( bladeBlockGeo, ironMaterial );
        mesh.position.z += 0.5*i
        objects.push(mesh)
        blade.add(mesh);
    }
    //blade spikes outlines
    var i = 2
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(0.1+i,3);
    bladeShape.lineTo(0+i,0);
    bladeShape.bezierCurveTo(1+i,-4,2+i,-7,5,-8)
    bladeShape.lineTo(7,-8)
    bladeShape.bezierCurveTo(10-i,-7,11-i,-4,12-i,0)
    bladeShape.lineTo(11.9-i,3)
    bladeShape.lineTo(12.9-i,3)
    bladeShape.lineTo(13-i,0)
    bladeShape.bezierCurveTo(12-i,-4,11-i,-7,7,-9)
    bladeShape.lineTo(5,-9)
    bladeShape.bezierCurveTo(1+i,-7,0+i,-4,-1+i,0)
    bladeShape.lineTo(-0.9+i,3)
    bladeShape.lineTo(0.1+i,3)
    
    var extrudeSettings = { depth: 2, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var mesh = new THREE.Mesh( bladeBlockGeo, redBrownPlasticMaterial);
    mesh.rotateY(3.14/2)
    mesh.rotateX(-0.75)
    mesh.position.z += 10
    mesh.position.y += 208
    mesh.position.x += 18
    objects.push(mesh)
    blade.add(mesh);

    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(0.1+i,3);
    bladeShape.lineTo(0+i,0);
    bladeShape.bezierCurveTo(1+i,-4,2+i,-7,5,-8)
    bladeShape.lineTo(7,-8)
    bladeShape.bezierCurveTo(10-i,-7,11-i,-4,12-i,0)
    bladeShape.lineTo(11.9-i,3)
    bladeShape.lineTo(12.9-i,3)
    bladeShape.lineTo(13-i,0)
    bladeShape.bezierCurveTo(12-i,-4,11-i,-7,7,-9)
    bladeShape.lineTo(5,-9)
    bladeShape.bezierCurveTo(1+i,-7,0+i,-4,-1+i,0)
    bladeShape.lineTo(-0.9+i,3)
    bladeShape.lineTo(0.1+i,3)
    
    var extrudeSettings = { depth: 2, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var mesh = new THREE.Mesh( bladeBlockGeo, redBrownPlasticMaterial);
    mesh.rotateY(-3.14/2)
    mesh.rotateX(-0.75)
    mesh.position.z -= 2
    mesh.position.y += 208
    mesh.position.x += 6
    objects.push(mesh)
    blade.add(mesh);
    
    //spikes 2nd row
    var pts = [
      new THREE.Vector3(7, 7.5, 4),
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(0, 0, 7),
      new THREE.Vector3(20, 0, 6),
      new THREE.Vector3(20, 0, 2)
    ];
    
    var geom = new THREE.BufferGeometry().setFromPoints(pts);
    geom.setIndex([
        0, 1, 2,
      0, 2, 3, 
      0, 3, 4,
      0, 4, 1,
      1, 3, 2,
      1, 4, 3
    ]);
    geom.computeVertexNormals();
    var mesh = new THREE.Mesh(geom, ironMaterial);
    mesh.rotation.z += 3.14/2
    mesh.rotation.x += 3.14
    mesh.position.x += 4
    mesh.position.y += 218
    mesh.position.z += 8
    objects.push(mesh)
    blade.add(mesh);
    var mesh = new THREE.Mesh(geom, ironMaterial);
    mesh.rotation.z -= 3.14/2
    mesh.position.y += 218
    mesh.position.x += 20
    objects.push(mesh)
    blade.add(mesh)
    //filling the gaps
    //inside
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(5,208);
    bladeShape.lineTo(4,210);
    bladeShape.lineTo(4,240);
    bladeShape.lineTo(5,240);
    bladeShape.lineTo(5,208);
    var extrudeSettings = { depth: 6, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var mesh = new THREE.Mesh( bladeBlockGeo, blackMaterial );
    mesh.position.z += 1
    objects.push(mesh)
    blade.add(mesh);
    var mesh = mesh.clone()
    mesh.rotateY(3.14)
    mesh.position.z += 6
    mesh.position.x += 24
    objects.push(mesh)
    blade.add(mesh)
    //inside outlines
    for(var i = 0; i <= 1; i+=0.05){
        var bladeShape = new THREE.Shape();
        bladeShape.moveTo(2+(i),1);
        bladeShape.bezierCurveTo(3,-4,4,-7,5+(i),-8)
        bladeShape.lineTo(7-(i),-8)
        bladeShape.bezierCurveTo(8,-7,9,-4,10-(i),0)
        bladeShape.lineTo(2+(i),1);
        var extrudeSettings = { depth: 2.4, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
        var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
        var leftbot = new THREE.Mesh( bladeBlockGeo, blackMaterial );
        var rightbot = leftbot.clone()
        var lefttop = rightbot.clone()
        var righttop = lefttop.clone()
        leftbot.rotateY(-3.14/2)
        leftbot.rotateX(-0.75)
        leftbot.position.z -= 2
        leftbot.position.y += 208+2*i
        leftbot.position.x += 6
        objects.push(leftbot)
        blade.add(leftbot)
        rightbot.rotateY(3.14/2)
        rightbot.rotateX(-0.75)
        rightbot.position.z += 10
        rightbot.position.y += 208+2*i
        rightbot.position.x += 18
        objects.push(rightbot)
        blade.add(rightbot);
        lefttop.rotateY(-3.14/2)
        lefttop.rotateX(-2.70)
        lefttop.position.z -= 2
        lefttop.position.y += 212.1-i
        lefttop.position.x += 5-i
        objects.push(lefttop)
        blade.add(lefttop)
        righttop.rotateY(3.14/2)
        righttop.rotateX(-2.70)
        righttop.position.z += 10
        righttop.position.y += 212.1-i
        righttop.position.x += 19+i
        objects.push(righttop)
        blade.add(righttop);
    }
    //spikes outlines 2
    var i = 2
    //right
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(0.1+i,3);
    bladeShape.lineTo(0+i,0);
    bladeShape.bezierCurveTo(1+i,-4,2+i,-7,5,-8)
    bladeShape.lineTo(7,-8)
    bladeShape.bezierCurveTo(10-i,-7,11-i,-4,12-i,0)
    bladeShape.lineTo(11.9-i,3)
    bladeShape.lineTo(12.9-i,3)
    bladeShape.lineTo(13-i,0)
    bladeShape.bezierCurveTo(12-i,-4,11-i,-7,7,-9)
    bladeShape.lineTo(5,-9)
    bladeShape.bezierCurveTo(1+i,-7,0+i,-4,-1+i,0)
    bladeShape.lineTo(-0.9+i,3)
    bladeShape.lineTo(0.1+i,3)
    
    var extrudeSettings = { depth: 2, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var mesh = new THREE.Mesh( bladeBlockGeo, redBrownPlasticMaterial);
    mesh.rotateY(3.14/2)
    mesh.rotateX(-2.70)
    mesh.position.z += 10
    mesh.position.y += 212.1
    mesh.position.x += 19
    objects.push(mesh)
    blade.add(mesh);
    //left
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(0.1+i,3);
    bladeShape.lineTo(0+i,0);
    bladeShape.bezierCurveTo(1+i,-4,2+i,-7,5,-8)
    bladeShape.lineTo(7,-8)
    bladeShape.bezierCurveTo(10-i,-7,11-i,-4,12-i,0)
    bladeShape.lineTo(11.9-i,3)
    bladeShape.lineTo(12.9-i,3)
    bladeShape.lineTo(13-i,0)
    bladeShape.bezierCurveTo(12-i,-4,11-i,-7,7,-9)
    bladeShape.lineTo(5,-9)
    bladeShape.bezierCurveTo(1+i,-7,0+i,-4,-1+i,0)
    bladeShape.lineTo(-0.9+i,3)
    bladeShape.lineTo(0.1+i,3)
    
    var extrudeSettings = { depth: 2, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var mesh = new THREE.Mesh( bladeBlockGeo, redBrownPlasticMaterial);

    mesh.rotateY(-3.14/2)
    mesh.rotateX(-2.70)
    mesh.position.z -= 2
    mesh.position.y += 212.1
    mesh.position.x += 5
    objects.push(mesh)
    blade.add(mesh);

    //big spike outline
    //rightBot
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(0.1+2,3);
    bladeShape.lineTo(0+2,0);
    bladeShape.bezierCurveTo(1+2,-7,2+2,-12,6,-12.5)
    bladeShape.bezierCurveTo(10-2,-12,11-2,-7,12-2,0)
    bladeShape.lineTo(11.9-2,3)
    bladeShape.lineTo(12.9-2,3)
    bladeShape.lineTo(13-2,0)
    bladeShape.bezierCurveTo(12-2,-7,11-2,-12,6,-13.5)
    bladeShape.bezierCurveTo(1+2,-12,0+2,-7,-1+2,0)
    bladeShape.lineTo(-0.9+2,3)
    bladeShape.lineTo(0.1+2,3)
    
    var extrudeSettings = { depth: 2.5, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    var mesh = new THREE.Mesh( bladeBlockGeo, redBrownPlasticMaterial);
    var mesh2 = mesh.clone()
    mesh.rotateY(3.14/2)
    mesh.rotateX(-0.8)
    mesh.position.z += 10
    mesh.position.y += 219
    mesh.position.x += 18
    objects.push(mesh)
    blade.add(mesh);
    //leftBot
    var mesh = mesh2.clone()
    mesh.rotateY(-3.14/2)
    mesh.rotateX(-0.8)
    mesh.position.z -= 2
    mesh.position.y += 219
    mesh.position.x += 6
    objects.push(mesh)
    blade.add(mesh);
    //rightTop
    var mesh = mesh2.clone()
    mesh.rotateY(3.14/2)
    mesh.rotateX(-2.66)
    mesh.position.z += 10
    mesh.position.y += 222
    mesh.position.x += 19
    objects.push(mesh)
    blade.add(mesh);
    //leftTop
    var mesh = mesh2
    mesh.rotateY(-3.14/2)
    mesh.rotateX(-2.66)
    mesh.position.z -= 2
    mesh.position.y += 222
    mesh.position.x += 5
    objects.push(mesh)
    blade.add(mesh);
    //big black spikes row 3
    var pts = [
        new THREE.Vector3(7, 8.5, 4),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 7),
        new THREE.Vector3(20, 0, 7),
        new THREE.Vector3(20, 0, 0)
      ];
      
      var geom = new THREE.BufferGeometry().setFromPoints(pts);
      geom.setIndex([
          0, 1, 2,
        0, 2, 3, 
        0, 3, 4,
        0, 4, 1,
        1, 3, 2,
        1, 4, 3
      ]);
      geom.computeVertexNormals();
      //left
      var mesh = new THREE.Mesh(geom, blackMaterial);
      mesh.rotation.z += 3.14/2
      mesh.rotation.x += 3.14
      mesh.position.x += 4
      mesh.position.y += 233
      mesh.position.z += 7.5
      objects.push(mesh)
      blade.add(mesh);
      //right
      var mesh = new THREE.Mesh(geom, blackMaterial);
      mesh.rotation.z -= 3.14/2
      mesh.position.y += 233
      mesh.position.x += 20
      mesh.position.z += 0.5
      objects.push(mesh)
      blade.add(mesh)
    return blade;
}

function rightBlade(){
    //Creating shape for repeated use
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(0,0);
    bladeShape.lineTo(10,0);
    bladeShape.lineTo(10,7);
    bladeShape.lineTo(0,7);
    bladeShape.lineTo(0,0);
    var extrudeSettings = { depth: 8, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(10,7);
    bladeShape.lineTo(11,7);
    bladeShape.lineTo(11,14);
    bladeShape.lineTo(10,14);
    bladeShape.lineTo(10,7);
    var extrudeSettings = { depth: 7.5, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeDetailGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(-5,-6);
    bladeShape.lineTo(-1,-2);
    bladeShape.lineTo(-9,-2);
    bladeShape.lineTo(-5,-6);
    var extrudeSettings = { depth: 7, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeEdgeGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    
    
    //Creating a Normal block for replicating
    var bladeBlockShape = new THREE.Group()
    //Normal blade block
    var mesh = new THREE.Mesh( bladeBlockGeo, redPlasticMaterial );
    mesh.position.y += 40
    bladeBlockShape.add(mesh);
    //Normal blade details
    var mesh = new THREE.Mesh( bladeDetailGeo, redPlasticMaterial );
    mesh.position.x = mesh.position.x;
    mesh.position.y = mesh.position.y+=33;
    mesh.position.z = mesh.position.z+0.25;
    bladeBlockShape.add(mesh)
    //Normal blade edgge
    var mesh = new THREE.Mesh( bladeEdgeGeo, ironMaterial );
    mesh.rotation.x = 3.14/2
    mesh.rotation.z = -3.14/2
    mesh.position.x += 2
    mesh.position.y += 47
    mesh.position.z -= 1
    bladeBlockShape.add(mesh);

    //RIGHT BLADE SIDE
    var blade = new THREE.Group();

    //blade creation
    //right blade Point
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(14,33);
    bladeShape.lineTo(24,48);
    bladeShape.lineTo(14,48);
    bladeShape.lineTo(14,33);
    var extrudeSettings = { depth: 8, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    
    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    
    var mesh = new THREE.Mesh( geometry, redPlasticMaterial );
    objects.push(mesh)
    blade.add(mesh);
    //right Blade Details
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(14,33);
    bladeShape.lineTo(14,48);
    bladeShape.lineTo(13,48);
    bladeShape.lineTo(13,31.5);
    bladeShape.lineTo(14,33);
    var extrudeSettings = { depth: 7.5, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    
    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    
    var mesh = new THREE.Mesh( geometry, redPlasticMaterial );
    mesh.position.x = mesh.position.x;
    mesh.position.y = mesh.position.y;
    mesh.position.z = mesh.position.z+0.25;
    objects.push(mesh)
    blade.add(mesh);
        
    //right Blade bottom edge
    //triangle1
    var edgeShape = new THREE.Shape();
    edgeShape.moveTo(0,0);
    edgeShape.lineTo(0,9.02);
    edgeShape.lineTo(5.67,9.02);
    edgeShape.lineTo(0,0);

    var extrudeSettings = { depth: 0.1, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( edgeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, ironMaterial );
    mesh.rotation.y += 0.7854
    mesh.position.x += 23.92;
    mesh.position.y += 48;
    mesh.position.z += 7.94;
    objects.push(mesh)
    blade.add(mesh);
    
    //triangle2
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(-5,-11.86);
    bladeShape.lineTo(-1,-2);
    bladeShape.lineTo(-9,-2);
    bladeShape.lineTo(-5,-11.86);
    var extrudeSettings = { depth: 0.1   , bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, ironMaterial );
    mesh.rotation.x = 3.14/2
    mesh.rotation.z = -3.14/2
    mesh.rotation.y = 4.29
    mesh.position.x += 23.17
    mesh.position.y += 46.14
    mesh.position.z -= 1
    objects.push(mesh)
    blade.add(mesh);
    
    
    //triangle3
    var edgeShape = new THREE.Shape();
    edgeShape.moveTo(0,0);
    edgeShape.lineTo(0,9.02);
    edgeShape.lineTo(5.67,9.02);
    edgeShape.lineTo(0,0);

    var extrudeSettings = { depth: 0.1, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( edgeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, ironMaterial );
    mesh.rotation.y -= 0.7854
    mesh.position.x += 24.01;
    mesh.position.y += 48;
    mesh.position.z -= 0.021
    objects.push(mesh)
    blade.add(mesh);
    
    
    //Creating and adding right center 1
    // right Blade center1 details missing
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(14,48);
    bladeShape.lineTo(14,50);
    bladeShape.lineTo(13,48);
    bladeShape.lineTo(14,48);

    var extrudeSettings = { depth: 7.5, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, redPlasticMaterial );
    mesh.position.x = mesh.position.x;
    mesh.position.y = mesh.position.y;
    mesh.position.z = mesh.position.z+0.25;
    objects.push(mesh)
    blade.add(mesh);
    // right Blade center1 block missing
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(14,48);
    bladeShape.lineTo(14,50);
    bladeShape.lineTo(15,52);
    bladeShape.lineTo(16,54);
    bladeShape.lineTo(24,54);
    bladeShape.lineTo(24,48);
    bladeShape.lineTo(14,48);
    var extrudeSettings = { depth: 8, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, redPlasticMaterial );
    objects.push(mesh)
    blade.add(mesh);
    // right Blade center1 edge missing
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(-5,-6);
    bladeShape.lineTo(-1,-2);
    bladeShape.lineTo(-9,-2);
    bladeShape.lineTo(-5,-6);
    var extrudeSettings = { depth: 7, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, ironMaterial );
    mesh.rotation.x = 3.14/2
    mesh.rotation.z = -3.14/2
    mesh.rotation.y = 3.14
    mesh.position.x += 22
    mesh.position.y += 57
    mesh.position.z -= 1
    objects.push(mesh)
    blade.add(mesh);
    

    //Creating and adding RIGHT center 2
    // right Blade center2 details missing
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(14,61);
    bladeShape.lineTo(14,58);
    bladeShape.lineTo(13,60);
    bladeShape.lineTo(13,61);
    bladeShape.lineTo(14,61);

    var extrudeSettings = { depth: 7.5, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, redPlasticMaterial );
    mesh.position.x = mesh.position.x;
    mesh.position.y = mesh.position.y;
    mesh.position.z = mesh.position.z+0.25;
    objects.push(mesh)
    blade.add(mesh);
    // right Blade center2 block missing
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(14,61);
    bladeShape.lineTo(14,58);
    bladeShape.lineTo(15,56);
    bladeShape.lineTo(16,54);
    bladeShape.lineTo(24,54);
    bladeShape.lineTo(24,61);
    bladeShape.lineTo(14,61);
    var extrudeSettings = { depth: 8, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, redPlasticMaterial );
    objects.push(mesh)
    blade.add(mesh);

    //adding length
    var normalBlock = bladeBlockShape.clone()
    normalBlock.rotation.y = 3.14
    normalBlock.position.y += 21
    normalBlock.position.x += 24
    normalBlock.position.z += 8
    objects.push(normalBlock)
    blade.add(normalBlock)
    var normalBlock = bladeBlockShape.clone()
    normalBlock.rotation.y = 3.14
    normalBlock.position.y += 28
    normalBlock.position.x += 24
    normalBlock.position.z += 8
    objects.push(normalBlock)
    blade.add(normalBlock)
    var normalBlock = bladeBlockShape.clone()
    normalBlock.rotation.y = 3.14
    normalBlock.position.y += 35   
    normalBlock.position.x += 24
    normalBlock.position.z += 8 
    objects.push(normalBlock)
    blade.add(normalBlock)
    var normalBlock = bladeBlockShape.clone()
    normalBlock.rotation.y = 3.14
    normalBlock.position.y += 42
    normalBlock.position.x += 24
    normalBlock.position.z += 8 
    objects.push(normalBlock)
    blade.add(normalBlock)
    var normalBlock = bladeBlockShape.clone()
    normalBlock.rotation.y = 3.14
    normalBlock.position.y += 49
    normalBlock.position.x += 24
    normalBlock.position.z += 8 
    objects.push(normalBlock)
    blade.add(normalBlock)
    
    //right blade edge point
    var geometry = new THREE.ConeGeometry( 4, 10, 4); 
    var piramid = new THREE.Mesh(geometry, ironMaterial)
    piramid.position.y += 84
    piramid.position.z += 4
    piramid.position.x += 27
    piramid.rotation.z -= 3.14/2
    objects.push(piramid)
    blade.add(piramid)

    //adding length
    var normalBlock = bladeBlockShape.clone()
    normalBlock.rotation.y = 3.14
    normalBlock.position.y += 56
    normalBlock.position.x += 24
    normalBlock.position.z += 8 
    objects.push(normalBlock)
    blade.add(normalBlock)
    
    var normalBlock = bladeBlockShape.clone()
    normalBlock.rotation.y = 3.14
    normalBlock.position.y += 58
    normalBlock.position.x += 24
    normalBlock.position.z += 8 
    objects.push(normalBlock)
    blade.add(normalBlock)
    return blade
}

function leftBlade(){
    //Creating shape for repeated use
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(0,0);
    bladeShape.lineTo(10,0);
    bladeShape.lineTo(10,7);
    bladeShape.lineTo(0,7);
    bladeShape.lineTo(0,0);
    var extrudeSettings = { depth: 8, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeBlockGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(10,7);
    bladeShape.lineTo(11,7);
    bladeShape.lineTo(11,14);
    bladeShape.lineTo(10,14);
    bladeShape.lineTo(10,7);
    var extrudeSettings = { depth: 7.5, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeDetailGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(-5,-6);
    bladeShape.lineTo(-1,-2);
    bladeShape.lineTo(-9,-2);
    bladeShape.lineTo(-5,-6);
    var extrudeSettings = { depth: 7, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var bladeEdgeGeo = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );
    
    
    //Creating a Normal block for replicating
    var bladeBlockShape = new THREE.Group()
    //Normal blade block
    var mesh = new THREE.Mesh( bladeBlockGeo, redPlasticMaterial );
    mesh.position.y += 40
    bladeBlockShape.add(mesh);
    //Normal blade details
    var mesh = new THREE.Mesh( bladeDetailGeo, redPlasticMaterial );
    mesh.position.x = mesh.position.x;
    mesh.position.y = mesh.position.y+=33;
    mesh.position.z = mesh.position.z+0.25;
    bladeBlockShape.add(mesh)
    //Normal blade edgge
    var mesh = new THREE.Mesh( bladeEdgeGeo, ironMaterial );
    mesh.rotation.x = 3.14/2
    mesh.rotation.z = -3.14/2
    mesh.position.x += 2
    mesh.position.y += 47
    mesh.position.z -= 1
    bladeBlockShape.add(mesh);

    //blade creation
    var blade = new THREE.Group();
    //Left blade Point
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(0,0);
    bladeShape.lineTo(10,18);
    bladeShape.lineTo(10,40);
    bladeShape.lineTo(0,40);
    bladeShape.lineTo(0,0);
    var extrudeSettings = { depth: 8, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, redPlasticMaterial );
    objects.push(mesh)
    blade.add(mesh);
    //Left Blade Details
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(10,18);
    bladeShape.lineTo(11,20);
    bladeShape.lineTo(11,40);
    bladeShape.lineTo(10,40);
    bladeShape.lineTo(10,18);
    var extrudeSettings = { depth: 7.5, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, redPlasticMaterial );
    mesh.position.x = mesh.position.x;
    mesh.position.y = mesh.position.y;
    mesh.position.z = mesh.position.z+0.25;
    objects.push(mesh)
    blade.add(mesh);
    
    //Left Blade edge
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(-5,-6);
    bladeShape.lineTo(-1,-2);
    bladeShape.lineTo(-9,-2);
    bladeShape.lineTo(-5,-6);
    var extrudeSettings = { depth: 40, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, ironMaterial );
    mesh.rotation.x = 3.14/2
    mesh.rotation.z = -3.14/2
    mesh.position.x += 2
    mesh.position.y += 40
    mesh.position.z -= 1
    objects.push(mesh)
    blade.add(mesh);

    
    var normalBlock = bladeBlockShape.clone()
    objects.push(normalBlock)
    blade.add(normalBlock)

    //Creating and adding left center 1
    // Left Blade center1 details missing
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(10,47);
    bladeShape.lineTo(11,47);
    bladeShape.lineTo(11,48);
    bladeShape.lineTo(10,50);
    bladeShape.lineTo(10,47);
    var extrudeSettings = { depth: 7.5, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, redPlasticMaterial );
    mesh.position.x = mesh.position.x;
    mesh.position.y = mesh.position.y;
    mesh.position.z = mesh.position.z+0.25;
    objects.push(mesh)
    blade.add(mesh);
    // Left Blade center1 block missing
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(0,47);
    bladeShape.lineTo(10,47);
    bladeShape.lineTo(10,50);
    bladeShape.lineTo(9,52);
    bladeShape.lineTo(8,54);
    bladeShape.lineTo(0,54);
    bladeShape.lineTo(0,47);
    var extrudeSettings = { depth: 8, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, redPlasticMaterial );
    objects.push(mesh)
    blade.add(mesh);
    // Left Blade center1 edge missing
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(-5,-6);
    bladeShape.lineTo(-1,-2);
    bladeShape.lineTo(-9,-2);
    bladeShape.lineTo(-5,-6);
    var extrudeSettings = { depth: 7, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, ironMaterial );
    mesh.rotation.x = 3.14/2
    mesh.rotation.z = -3.14/2
    mesh.position.x += 2
    mesh.position.y += 54
    mesh.position.z -= 1
    objects.push(mesh)
    blade.add(mesh);
    

    //Creating and adding left center 2
    // Left Blade center2 details missing
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(10,58);
    bladeShape.lineTo(11,60);
    bladeShape.lineTo(11,61);
    bladeShape.lineTo(10,61);
    bladeShape.lineTo(10,58);
    var extrudeSettings = { depth: 7.5, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, redPlasticMaterial );
    mesh.position.x = mesh.position.x;
    mesh.position.y = mesh.position.y;
    mesh.position.z = mesh.position.z+0.25;
    objects.push(mesh)
    blade.add(mesh);

    // Left Blade center2 block missing
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(0,54);
    bladeShape.lineTo(8,54);
    bladeShape.lineTo(9,56);
    bladeShape.lineTo(10,58);
    bladeShape.lineTo(10,61);
    bladeShape.lineTo(0,61);
    bladeShape.lineTo(0,54);
    var extrudeSettings = { depth: 8, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, redPlasticMaterial );
    objects.push(mesh)
    blade.add(mesh);
    // Left Blade center2 edge missing
    var bladeShape = new THREE.Shape();
    bladeShape.moveTo(-5,-6);
    bladeShape.lineTo(-1,-2);
    bladeShape.lineTo(-9,-2);
    bladeShape.lineTo(-5,-6);
    var extrudeSettings = { depth: 7, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var geometry = new THREE.ExtrudeGeometry( bladeShape, extrudeSettings );

    var mesh = new THREE.Mesh( geometry, ironMaterial );
    mesh.rotation.x = 3.14/2
    mesh.rotation.z = -3.14/2
    mesh.position.x += 2
    mesh.position.y += 61
    mesh.position.z -= 1
    objects.push(mesh)
    blade.add(mesh);

    //adding length
    var normalBlock = bladeBlockShape.clone()
    normalBlock.position.y += 21
    objects.push(normalBlock)
    blade.add(normalBlock)
    var normalBlock = bladeBlockShape.clone()
    normalBlock.position.y += 28
    objects.push(normalBlock)
    blade.add(normalBlock)
    var normalBlock = bladeBlockShape.clone()
    normalBlock.position.y += 35 
    objects.push(normalBlock)   
    blade.add(normalBlock)
    var normalBlock = bladeBlockShape.clone()
    normalBlock.position.y += 42
    objects.push(normalBlock)
    blade.add(normalBlock)
    var normalBlock = bladeBlockShape.clone()
    normalBlock.position.y += 49
    objects.push(normalBlock)
    blade.add(normalBlock)

    //left blade edge point
    var geometry = new THREE.ConeGeometry( 4, 10, 4); 
    var piramid = new THREE.Mesh(geometry, ironMaterial)
    piramid.position.y += 84
    piramid.position.z += 4
    piramid.position.x -= 3
    piramid.rotation.z += 3.14/2
    objects.push(piramid)
    blade.add(piramid)

    //adding length
    var normalBlock = bladeBlockShape.clone()
    normalBlock.position.y += 56
    objects.push(normalBlock)
    blade.add(normalBlock)
    
    var normalBlock = bladeBlockShape.clone()
    normalBlock.position.y += 58
    objects.push(normalBlock)
    blade.add(normalBlock)
    return blade
}

function createSnowFlake(){
    //shiny Red material
    var diffuse = new THREE.Color(35, 8, 0)
    var specular = new THREE.Color(193, 35, 96)
    var shiny = 0
    var snowMaterial = new THREE.MeshPhongMaterial({ color: diffuse, specular: specular, shininess: shiny });

    var snowflakePart = new THREE.Group()
    var snowflake = new THREE.Group()
    var rightFlake = new THREE.Shape();
    rightFlake.moveTo(0,0);
    rightFlake.lineTo(3,-5);
    rightFlake.lineTo(1,-8);
    rightFlake.lineTo(1,-10);
    rightFlake.lineTo(5,-11);
    rightFlake.lineTo(5.5,-11.5);
    rightFlake.lineTo(5.25,-12);
    rightFlake.lineTo(1,-11);
    rightFlake.lineTo(1,-16);
    rightFlake.lineTo(1,-18);
    rightFlake.lineTo(8,-10);
    rightFlake.lineTo(8.5,-9.8);
    rightFlake.lineTo(8.25,-10.2);
    rightFlake.lineTo(1,-19);
    rightFlake.lineTo(1,-22);
    rightFlake.lineTo(3,-20);
    rightFlake.lineTo(3.5,-19.8);
    rightFlake.lineTo(3.25,-20.2);
    rightFlake.lineTo(1,-23);
    rightFlake.lineTo(1,-24);
    rightFlake.lineTo(3,-26);
    rightFlake.lineTo(0,-30);
    var extrudeSettings = { depth: 1, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var snowflackeGEo = new THREE.ExtrudeGeometry( rightFlake, extrudeSettings );
    var right = new THREE.Mesh( snowflackeGEo, snowMaterial );
    var left = right.clone()
    left.rotateY(3.14)
    left.position.z += 1
    snowflakePart.add(right)
    snowflakePart.add(left)
    snowflake.add(snowflakePart)
    for(var rotate = 0; rotate < 6; rotate++){
        snowflakePart = snowflakePart.clone()
        snowflakePart.rotateZ(3.14/3)  
        snowflake.add(snowflakePart)  
    }
    snowflake.scale.x = 0.1
    snowflake.scale.y = 0.1
    snowflake.scale.z = 0.1
    return snowflake
}

var oldCamera;
var tFlopSwitch = false
function ChangeCamera(){
    if(tFlopSwitch){
        tFlopSwitch = false
        //Todo Change camera
        sceneElements.camera = oldCamera
    }
    else{
        tFlopSwitch = true
        //Todo Change camera
        oldCamera = sceneElements.camera
        sceneElements.camera = snakeCam
    }

}

var gameLost = false
function loseGame(){
    gameLost = true
    document.getElementById("lose").style.display = "inline";
    document.getElementById("reload").style.display = "inline";
}
var gameWon = false
function winGame(){
    gameWon = true
    document.getElementById("win").style.display = "inline";
    document.getElementById("reload").style.display = "inline";
}

function updateSnake(pos,direc,realPosLin,realPosCol,sceneGraph){

    var snakePart;
    if(pos == 1){
        snakePart = theRealSnake[pos]["obj"]
            switch(direc){
                case 3:
                    if(theRealSnake[pos]["dir"] == 6){
                        snakePart.rotateY(-3.14/2)
                    }else if(theRealSnake[pos]["dir"] == 9){
                        snakePart.rotateY(3.14/2)
                    }
                    break;
                case 6:
                    if(theRealSnake[pos]["dir"] == 12){
                        snakePart.rotateY(-3.14/2)
                    }else if(theRealSnake[pos]["dir"] == 3){
                        snakePart.rotateY(3.14/2)
                    }
                    break;
                case 9:
                    if(theRealSnake[pos]["dir"] == 3){
                        snakePart.rotateY(-3.14/2)
                    }else if(theRealSnake[pos]["dir"] == 12){
                        snakePart.rotateY(3.14/2)
                    }
                    break;
                case 12:
                    if(theRealSnake[pos]["dir"] == 9){
                        snakePart.rotateY(-3.14/2)
                    }else if(theRealSnake[pos]["dir"] == 6){
                        snakePart.rotateY(3.14/2)
                    }
                    break;
            }
    }else{
        switch(direc){
            case 3:
                snakePart = new THREE.Group().add(snakeObjs[0].clone())
                break;
            case 4:
                snakePart = new THREE.Group().add(snakeObjs[4].clone())
                snakePart.position.x += 0
                snakePart.position.z += 0
                break;
            case 5:
                snakePart = new THREE.Group().add(snakeObjs[5].clone())
                snakePart.position.x += 0
                snakePart.position.z += 0
                break;
            case 6:
                snakePart = new THREE.Group().add(snakeObjs[3].clone())
                snakePart.rotateY(3.14/2)
                break;
            case 7:
                snakePart = new THREE.Group().add(snakeObjs[2].clone())
                snakePart.position.x += 0
                snakePart.position.z += 0
                break;
            case 8:
                snakePart = new THREE.Group().add(snakeObjs[5].clone())
                snakePart.position.x += 0
                snakePart.position.z += 0
                break;
            case 9:
                snakePart = new THREE.Group().add(snakeObjs[3].clone())
                snakePart.rotateY(3.14*3/2)
                break;
            case 10:
                snakePart = new THREE.Group().add(snakeObjs[1].clone())
                snakePart.position.x += 0
                snakePart.position.z += 0
                break;
            case 11:
                snakePart = new THREE.Group().add(snakeObjs[4].clone())
                snakePart.position.x += 0
                snakePart.position.z += 0
                break;
            case 12:
                snakePart = new THREE.Group().add(snakeObjs[0].clone())
                snakePart.rotateY(3.14*2/2)
                break;
            case 13:
                snakePart = new THREE.Group().add(snakeObjs[1].clone())
                snakePart.position.x += 0
                snakePart.position.z += 0
                break;
            case 14:
                snakePart = new THREE.Group().add(snakeObjs[2].clone())
                snakePart.position.x += 0
                snakePart.position.z += 0
                break;
        }
    }
    theRealSnake[pos]["dir"] = direc
    snakePart.position.y = -155
    if(pos == 1){
        snakePart.position.x = theRealSnake[theRealSnake.length-1]["obj"].position.x
        snakePart.position.z = theRealSnake[theRealSnake.length-1]["obj"].position.z
    }else if(pos-1 == 2){
        //snakePart.position.x = realPosLin
        //snakePart.position.z = realPosCol
        
        snakePart.position.x = theRealSnake[pos-1]["obj"].position.x
        snakePart.position.z = theRealSnake[pos-1]["obj"].position.z
    }else{
        switch(direc){
            case 3:
                snakePart = new THREE.Group().add(snakeObjs[0].clone())
                snakePart.position.x = theRealSnake[pos-1]["obj"].position.x
                snakePart.position.z = theRealSnake[pos-1]["obj"].position.z+25
                break;
            case 6:
                snakePart = new THREE.Group().add(snakeObjs[3].clone())
                snakePart.rotateY(3.14/2)
                snakePart.position.x = theRealSnake[pos-1]["obj"].position.x+25
                snakePart.position.z = theRealSnake[pos-1]["obj"].position.z
                break;
            case 9:
                snakePart = new THREE.Group().add(snakeObjs[3].clone())
                snakePart.rotateY(3.14*3/2)
                snakePart.position.x = theRealSnake[pos-1]["obj"].position.x-25
                snakePart.position.z = theRealSnake[pos-1]["obj"].position.z
                break;
            case 12:
                snakePart = new THREE.Group().add(snakeObjs[0].clone())
                snakePart.rotateY(3.14*2/2)
                snakePart.position.x = theRealSnake[pos-1]["obj"].position.x
                snakePart.position.z = theRealSnake[pos-1]["obj"].position.z-25
                break;
        } 
    }
    sceneGraph.remove(theRealSnake[pos]["obj"])
    theRealSnake[pos]["obj"] = snakePart
    sceneGraph.add(theRealSnake[pos]["obj"])
    theRealSnake[pos]["obj"].position.y = -155
    theRealSnake[pos]["dir"] = direc

}

function printBoardData(){
    console.log("////////////////////////////////////////////////////////////////////////////////////////////////////////")
    for(var l = 0; l<25;l++){
        console.log(l + " - " + boardData[l][0] + " " + boardData[l][1] + " " + boardData[l][2] + " " + boardData[l][3] + " " + boardData[l][4] + " " + boardData[l][5] + " " + boardData[l][6] + " " + boardData[l][7] + " " + boardData[l][8] + " " + boardData[l][9] + " " + boardData[l][10] + " " + boardData[l][11] + " " + boardData[l][12] + " " + boardData[l][13] + " " + boardData[l][14] + " " + boardData[l][15] + " " + boardData[l][16] + " " + boardData[l][17] + " " + boardData[l][18] + " " + boardData[l][19] + " " + boardData[l][20] + " " + boardData[l][21] + " " + boardData[l][22] + " " + boardData[l][23] + " " + boardData[l][24])
    }
    console.log("////////////////////////////////////////////////////////////////////////////////////////////////////////")
}
var pointver = false;
var snakeLinAn;
var snakeColAn;
var snakeSize = 3;
var tailAdd = false;
var alreadyPassedVer = true
function updateBoardData(sceneGraph){
    if(snakeLinPos > 24 || snakeColPos > 24 || snakeLinPos < 0 || snakeColPos < 0){
        loseGame()
        //console.log("stopped 1")
        return
    }
    /*
    0-
    1-theRealSnake.push({"obj":tail,"dir": startDirct})
    2-theRealSnake.push({"obj":head,"dir": startDirct})
    3-theRealSnake.push({"obj":body,"dir": startDirct})
    */
    snakeLinAn = tailLinPos
    snakeColAn = tailColPos
    switch(boardData[snakeLinAn][snakeColAn]){
        case 3:
            //up
            if(!tailAdd){
                tailLinPos -= 1 
            }
            break;
        case 6:
            //left
            if(!tailAdd){
                tailColPos -= 1
            }
            break;
        case 9:
            //right
            if(!tailAdd){
                tailColPos += 1
            }
            break;
        case 12:
            //down
            if(!tailAdd){
                tailLinPos += 1
            }
            break;
    }
    var prev = 0;
    var pos = theRealSnake.length;
    var realPosLin;
    var realPosCol;
    //printBoardData()
    while(boardData[snakeLinAn][snakeColAn] != 0 && boardData[snakeLinAn][snakeColAn] != 1 ){
        if(snakeLinAn > 24 || snakeColAn > 24 || snakeLinAn < 0 || snakeColAn < 0){
            loseGame()
            //console.log("stopped 2")
            return
        }
        //-(halfBoard - 12.5-3*25) + startLine*25
        //-(halfBoard - 12.5-3*25) + startCol*25
        //realPosLin = -halfBoard + 12.5*2 + (snakeColAn)*22.5
        //realPosCol = -halfBoard + 12.5*2 + (snakeLinAn)*22.5
        //console.log(pos + " -> " + boardData[snakeLinAn][snakeColAn])
        switch(boardData[snakeLinAn][snakeColAn]){
            case 3:
                if(tailAdd){
                    prev = 3
                    tailAdd = false
                    
                }
                boardData[snakeLinAn][snakeColAn] = prev
                if(pos == theRealSnake.length){
                    //tail
                    updateSnake(1,3,realPosLin,realPosCol,sceneGraph)
                }else if(pos != 2){
                    //notTail
                    updateSnake(pos,3,realPosLin,realPosCol,sceneGraph)
                }
                prev = 3
                snakeLinAn -= 1
                break
            case 4:
                if(tailLinPos == snakeLinAn && tailColPos == snakeColAn){
                    //tail
                    updateSnake(1,6,realPosLin,realPosCol,sceneGraph)
                    boardData[snakeLinAn][snakeColAn] = 6
                }else if(!(pos+1 == theRealSnake.length)){
                    //notTail
                    sceneGraph.remove(theRealSnake[pos+1]["obj"])
                    theRealSnake[pos+1]["obj"]=theRealSnake[pos]["obj"].clone()
                    sceneGraph.add(theRealSnake[pos+1]["obj"])
                    theRealSnake[pos+1]["dir"]=theRealSnake[pos]["dir"]
                    updateSnake(pos,6,realPosLin,realPosCol,sceneGraph)
                }
                prev = 6
                snakeColAn -= 1
                break
            case 5:
                if(tailLinPos == snakeLinAn && tailColPos == snakeColAn){
                    //tail
                    updateSnake(1,9,realPosLin,realPosCol,sceneGraph)
                    boardData[snakeLinAn][snakeColAn] = 9
                }else if(!(pos+1 == theRealSnake.length)){
                    //notTail
                    sceneGraph.remove(theRealSnake[pos+1]["obj"])
                    theRealSnake[pos+1]["obj"]=theRealSnake[pos]["obj"].clone()
                    sceneGraph.add(theRealSnake[pos+1]["obj"])
                    theRealSnake[pos+1]["dir"]=theRealSnake[pos]["dir"]
                    updateSnake(pos,9,realPosLin,realPosCol,sceneGraph)
                }
                prev = 9
                snakeColAn += 1
                break
            case 6:
                if(tailAdd){
                    prev = 6
                    tailAdd = false
                }
                boardData[snakeLinAn][snakeColAn] = prev
                if(pos == theRealSnake.length){
                    //tail
                    updateSnake(1,6,realPosLin,realPosCol,sceneGraph)
                }else if(pos != 2){
                    //notTail

                    updateSnake(pos,6,realPosLin,realPosCol,sceneGraph)
                }
                prev = 6
                snakeColAn -= 1
                break
            case 7:
                if(tailLinPos == snakeLinAn && tailColPos == snakeColAn){
                    //tail
                    boardData[snakeLinAn][snakeColAn] = 3
                    updateSnake(1,3,realPosLin,realPosCol,sceneGraph)
                }else if(!(pos+1 == theRealSnake.length)){
                    //notTail
                    sceneGraph.remove(theRealSnake[pos+1]["obj"])
                    theRealSnake[pos+1]["obj"]=theRealSnake[pos]["obj"].clone()
                    sceneGraph.add(theRealSnake[pos+1]["obj"])
                    theRealSnake[pos+1]["dir"]=theRealSnake[pos]["dir"]
                    updateSnake(pos,3,realPosLin,realPosCol,sceneGraph)
                }
                prev = 3
                snakeLinAn -= 1
                break
            case 8:
                if(tailLinPos == snakeLinAn && tailColPos == snakeColAn){
                    //tail
                    boardData[snakeLinAn][snakeColAn] = 12
                    updateSnake(1,12,realPosLin,realPosCol,sceneGraph)
                }else if(!(pos+1 == theRealSnake.length)){
                    //notTail
                    sceneGraph.remove(theRealSnake[pos+1]["obj"])
                    theRealSnake[pos+1]["obj"]=theRealSnake[pos]["obj"].clone()
                    sceneGraph.add(theRealSnake[pos+1]["obj"])
                    theRealSnake[pos+1]["dir"]=theRealSnake[pos]["dir"]
                    updateSnake(pos,12,realPosLin,realPosCol,sceneGraph)
                }
                prev = 12
                snakeLinAn += 1
                break
            case 9:
                if(tailAdd){
                    prev = 9
                    tailAdd = false
                }
                if(pos == theRealSnake.length){
                    //tail
                    updateSnake(1,9,realPosLin,realPosCol,sceneGraph)
                }else if(pos != 2){
                    //notTail
                    updateSnake(pos,9,realPosLin,realPosCol,sceneGraph)
                }
                boardData[snakeLinAn][snakeColAn] = prev
                prev = 9
                snakeColAn += 1
                break
            case 10:
                if(tailLinPos == snakeLinAn && tailColPos == snakeColAn){
                    //tail
                    boardData[snakeLinAn][snakeColAn] = 3
                    updateSnake(1,3,realPosLin,realPosCol,sceneGraph)
                }else if(!(pos+1 == theRealSnake.length)){
                    //notTail
                    sceneGraph.remove(theRealSnake[pos+1]["obj"])
                    theRealSnake[pos+1]["obj"]=theRealSnake[pos]["obj"].clone()
                    sceneGraph.add(theRealSnake[pos+1]["obj"])
                    theRealSnake[pos+1]["dir"]=theRealSnake[pos]["dir"]
                    updateSnake(pos,3,realPosLin,realPosCol,sceneGraph)
                }
                prev = 3
                snakeLinAn -= 1
                break
            case 11:
                if(tailLinPos == snakeLinAn && tailColPos == snakeColAn){
                    //tail
                    boardData[snakeLinAn][snakeColAn] = 12
                    updateSnake(1,12,realPosLin,realPosCol,sceneGraph)
                }else if(!(pos+1 == theRealSnake.length)){
                    //notTail
                    sceneGraph.remove(theRealSnake[pos+1]["obj"])
                    theRealSnake[pos+1]["obj"]=theRealSnake[pos]["obj"].clone()
                    sceneGraph.add(theRealSnake[pos+1]["obj"])
                    theRealSnake[pos+1]["dir"]=theRealSnake[pos]["dir"]
                    updateSnake(pos,12,realPosLin,realPosCol,sceneGraph)
                }
                prev = 12
                snakeLinAn += 1
                break
            case 12:
                if(tailAdd){
                    prev = 12
                    tailAdd = false
                }
                if(pos == theRealSnake.length){
                    //tail
                    updateSnake(1,12,realPosLin,realPosCol,sceneGraph)
                }else if(pos != 2){
                    //notTail
                    updateSnake(pos,12,realPosLin,realPosCol,sceneGraph)
                }
                boardData[snakeLinAn][snakeColAn] = prev
                prev = 12
                snakeLinAn += 1
                break
            case 13:
                if(tailLinPos == snakeLinAn && tailColPos == snakeColAn){
                    //tail
                    boardData[snakeLinAn][snakeColAn] = 6
                    updateSnake(1,6,realPosLin,realPosCol,sceneGraph)
                }else if(!(pos+1 == theRealSnake.length)){
                    //notTail
                    sceneGraph.remove(theRealSnake[pos+1]["obj"])
                    theRealSnake[pos+1]["obj"]=theRealSnake[pos]["obj"].clone()
                    sceneGraph.add(theRealSnake[pos+1]["obj"])
                    theRealSnake[pos+1]["dir"]=theRealSnake[pos]["dir"]
                    updateSnake(pos,6,realPosLin,realPosCol,sceneGraph)
                }
                prev = 6
                snakeColAn -= 1
                break
            case 14:
                if(tailLinPos == snakeLinAn && tailColPos == snakeColAn){
                    //tail
                    boardData[snakeLinAn][snakeColAn] = 9
                    updateSnake(1,9,realPosLin,realPosCol,sceneGraph)
                }else if(!(pos+1 == theRealSnake.length)){
                    //notTail
                    sceneGraph.remove(theRealSnake[pos+1]["obj"])
                    theRealSnake[pos+1]["obj"]=theRealSnake[pos]["obj"].clone()
                    sceneGraph.add(theRealSnake[pos+1]["obj"])
                    theRealSnake[pos+1]["dir"]=theRealSnake[pos]["dir"]
                    updateSnake(pos,9,realPosLin,realPosCol,sceneGraph)
                }
                prev = 9
                snakeColAn += 1
                break
        }
        if(snakeLinAn > 24 || snakeColAn > 24 || snakeLinAn < 0 || snakeColAn < 0 || (pos-1 == 1 && (boardData[snakeLinAn][snakeColAn] != 0 && boardData[snakeLinAn][snakeColAn] != 1))){
            //console.log("stopped 3")
            pos -= 1
            break
        }
        pos -= 1
    }
    //console.log("Next: " + boardData[snakeLinAn][snakeColAn])
    if((snakeLinAn == pointLin && snakeColAn == pointCol) || pointver){
        if(verifyEdges(snakeLinAn,snakeColAn)){
            return
        }
        pointver = false
        var snakePrevBody;
        var snakePart
        var newBody
        var oneDir = 0
        tailAdd = true;
        theRealSnake[1]["dir"] = oneDir
        switch(prev){
            case 3:
                snakePrevBody = theRealSnake[3]
                snakePart = new THREE.Group().add(snakeObjs[0].clone())
                snakePart.position.y = -155
                snakePart.position.x = theRealSnake[3]["obj"].position.x
                snakePart.position.z = theRealSnake[3]["obj"].position.z

                theRealSnake[theRealSnake.length] = {"obj": snakePart,"dir":oneDir}
                break;
            case 6:
                snakePrevBody = theRealSnake[3]
                snakePart = new THREE.Group().add(snakeObjs[3].clone())
                snakePart.rotateY(3.14/2)
                snakePart.position.y = -155
                snakePart.position.x = theRealSnake[3]["obj"].position.x
                snakePart.position.z = theRealSnake[3]["obj"].position.z
                
                theRealSnake[theRealSnake.length] = {"obj": snakePart,"dir":0}
                break;
            case 9:
                snakePrevBody = theRealSnake[3]
                snakePart = new THREE.Group().add(snakeObjs[3].clone())
                snakePart.rotateY(3.14*3/2)
                snakePart.position.y = -155
                snakePart.position.x = theRealSnake[3]["obj"].position.x
                snakePart.position.z = theRealSnake[3]["obj"].position.z

                theRealSnake[theRealSnake.length] = {"obj": snakePart,"dir":0}
                break;
            case 12:
                snakePrevBody = theRealSnake[3]
                snakePart = new THREE.Group().add(snakeObjs[0].clone())
                snakePart.rotateY(3.14*2/2)
                snakePart.position.y = -155
                snakePart.position.x = theRealSnake[3]["obj"].position.x
                snakePart.position.z = theRealSnake[3]["obj"].position.z

                theRealSnake[theRealSnake.length] = {"obj": snakePart,"dir":0}
                break;
        }
        snakeSize += 1
        sceneGraph.add(snakePart)

        pointLin = Math.floor(Math.random()*23+1)
        pointCol = Math.floor(Math.random()*23+1)
        while(boardData[pointLin][pointCol] != 0){
            pointLin = Math.floor(Math.random()*23+1)
            pointCol = Math.floor(Math.random()*23+1)
        }
        pointLinPos = -(halfBoard) + 25 + pointLin*25
        pointColPos = -(halfBoard) + 25 + pointCol*25
        pointGeo = new THREE.SphereGeometry( 10, 32, 32);
        pointBall = new THREE.Mesh( pointGeo, blackMaterial );
        
        
        pointBall.position.y = -150
        pointBall.position.x = pointColPos
        pointBall.position.z = pointLinPos
        pointBall.name = "ball"
        var oldBall = sceneGraph.getObjectByName("ball")
        sceneGraph.remove(oldBall)
        sceneGraph.add(pointBall)
        boardData[pointLin][pointCol] = 1
        snakeSpeed += 0.02
        if(objects.length == 0){
            winGame()
            return
        }
        var swordPart = Math.floor(Math.random()*objects.length)
        objects[swordPart].visible = true
        objects.splice(swordPart,1)
        alreadyPassedVer = true

    }
    switch(prev){
        case 3:
            if(keyA){
                boardData[snakeLinAn+1][snakeColAn] = 4
                //transform into a turning obj
                theRealSnake[3]["dir"] = 4
                var corner = snakeObjs[4]
                corner.position.x = theRealSnake[3]["obj"].position.x
                corner.position.z = theRealSnake[3]["obj"].position.z
                corner.position.x -= 15
                corner.position.z += 15
                sceneGraph.remove(theRealSnake[3]["obj"])
                theRealSnake[3]["obj"] = corner
                sceneGraph.add(theRealSnake[3]["obj"])

                theRealSnake[2]["dir"] = 6
                theRealSnake[2]["obj"].rotateY(3.14/2)
                snakeLinAn += 1
                snakeColAn -= 1
                if(verifyEdges(snakeLinAn,snakeColAn)){
                    return
                }
                pointVerify(snakeLinAn,snakeColAn)
                boardData[snakeLinAn][snakeColAn] = 6
            }else if(keyD){
                boardData[snakeLinAn+1][snakeColAn] = 5
                //transform into a turning obj
                theRealSnake[3]["dir"] = 5
                var corner = snakeObjs[5]
                corner.position.x = theRealSnake[3]["obj"].position.x
                corner.position.z = theRealSnake[3]["obj"].position.z
                sceneGraph.remove(theRealSnake[3]["obj"])
                corner.position.x += 15
                corner.position.z += 15
                theRealSnake[3]["obj"] = corner
                sceneGraph.add(theRealSnake[3]["obj"])

                theRealSnake[2]["dir"] = 9
                theRealSnake[2]["obj"].rotateY(-3.14/2)
                snakeDir = 9
                snakeLinAn += 1
                snakeColAn += 1
                if(verifyEdges(snakeLinAn,snakeColAn)){
                    return
                }
                pointVerify(snakeLinAn,snakeColAn)
                boardData[snakeLinAn][snakeColAn] = 9
            }else{
                if(verifyEdges(snakeLinAn,snakeColAn)){
                    return
                }
                pointVerify(snakeLinAn,snakeColAn)
                boardData[snakeLinAn][snakeColAn] = 3
                snakeLinAn -= 1 
            }
            break;
        case 6:
            if(keyD && tFlopSwitch || keyW && !tFlopSwitch){
                boardData[snakeLinAn][snakeColAn+1] = 7
                //transform into a turning obj
                theRealSnake[3]["dir"] = 7
                var corner = snakeObjs[2]
                corner.position.x = theRealSnake[3]["obj"].position.x
                corner.position.z = theRealSnake[3]["obj"].position.z
                corner.position.x += 15
                corner.position.z -= 15
                sceneGraph.remove(theRealSnake[3]["obj"])
                theRealSnake[3]["obj"] = corner
                sceneGraph.add(theRealSnake[3]["obj"])

                theRealSnake[2]["dir"] = 3
                theRealSnake[2]["obj"].rotateY(-3.14/2)
                snakeDir = 3
                snakeColAn += 1
                snakeLinAn -= 1
                if(verifyEdges(snakeLinAn,snakeColAn)){
                    return
                }
                pointVerify(snakeLinAn,snakeColAn)
                boardData[snakeLinAn][snakeColAn] = 3
            }else if(keyA && tFlopSwitch || keyS && !tFlopSwitch){
                boardData[snakeLinAn][snakeColAn+1] = 8
                //transform into a turning obj
                theRealSnake[3]["dir"] = 8
                var corner = snakeObjs[5]
                corner.position.x = theRealSnake[3]["obj"].position.x
                corner.position.z = theRealSnake[3]["obj"].position.z
                corner.position.x += 15
                corner.position.z += 15
                sceneGraph.remove(theRealSnake[3]["obj"])
                theRealSnake[3]["obj"] = corner
                sceneGraph.add(theRealSnake[3]["obj"])

                theRealSnake[2]["dir"] = 12
                theRealSnake[2]["obj"].rotateY(3.14/2)
                snakeDir = 12
                snakeColAn += 1
                snakeLinAn += 1
                if(verifyEdges(snakeLinAn,snakeColAn)){
                    return
                }
                pointVerify(snakeLinAn,snakeColAn)
                boardData[snakeLinAn][snakeColAn] = 12
            }else{
                if(verifyEdges(snakeLinAn,snakeColAn)){
                    return
                }
                pointVerify(snakeLinAn,snakeColAn)
                boardData[snakeLinAn][snakeColAn] = 6
                snakeColAn -= 1
            }
            break;
        case 9:
            if(keyA && tFlopSwitch || keyW && !tFlopSwitch){
                boardData[snakeLinAn][snakeColAn-1] = 10
                //transform into a turning obj
                theRealSnake[3]["dir"] = 10
                var corner = snakeObjs[1]
                corner.position.x = theRealSnake[3]["obj"].position.x
                corner.position.z = theRealSnake[3]["obj"].position.z
                corner.position.x -= 15
                corner.position.z -= 15
                sceneGraph.remove(theRealSnake[3]["obj"])
                theRealSnake[3]["obj"] = corner
                sceneGraph.add(theRealSnake[3]["obj"])

                theRealSnake[2]["dir"] = 3
                theRealSnake[2]["obj"].rotateY(3.14/2)
                snakeDir = 3
                snakeColAn -= 1
                snakeLinAn -= 1
                if(verifyEdges(snakeLinAn,snakeColAn)){
                    return
                }
                pointVerify(snakeLinAn,snakeColAn)
                boardData[snakeLinAn][snakeColAn] = 3
            }else if(keyD && tFlopSwitch || keyS && !tFlopSwitch){
                boardData[snakeLinAn][snakeColAn-1] = 11
                //transform into a turning obj
                theRealSnake[3]["dir"] = 11
                var corner = snakeObjs[4]
                corner.position.x = theRealSnake[3]["obj"].position.x
                corner.position.z = theRealSnake[3]["obj"].position.z
                corner.position.x -= 15
                corner.position.z += 15
                sceneGraph.remove(theRealSnake[3]["obj"])
                theRealSnake[3]["obj"] = corner
                sceneGraph.add(theRealSnake[3]["obj"])

                theRealSnake[2]["dir"] = 12
                theRealSnake[2]["obj"].rotateY(-3.14/2)
                snakeDir = 12
                snakeColAn -= 1
                snakeLinAn += 1
                if(verifyEdges(snakeLinAn,snakeColAn)){
                    return
                }
                pointVerify(snakeLinAn,snakeColAn)
                boardData[snakeLinAn][snakeColAn] = 12
            }else{
                if(verifyEdges(snakeLinAn,snakeColAn)){
                    return
                }
                pointVerify(snakeLinAn,snakeColAn)
                boardData[snakeLinAn][snakeColAn] = 9
                snakeColAn += 1
            }
            break;
        case 12:
            if(keyA && !tFlopSwitch || keyD && tFlopSwitch){
                boardData[snakeLinAn-1][snakeColAn] = 13
                //transform into a turning obj
                theRealSnake[3]["dir"] = 13
                var corner = snakeObjs[1]
                corner.position.x = theRealSnake[3]["obj"].position.x
                corner.position.z = theRealSnake[3]["obj"].position.z
                corner.position.x -= 15
                corner.position.z -= 15
                sceneGraph.remove(theRealSnake[3]["obj"])
                theRealSnake[3]["obj"] = corner
                sceneGraph.add(theRealSnake[3]["obj"])

                theRealSnake[2]["dir"] = 6
                theRealSnake[2]["obj"].rotateY(-3.14/2)
                snakeDir = 6
                snakeLinAn -= 1
                snakeColAn -= 1
                if(verifyEdges(snakeLinAn,snakeColAn)){
                    return
                }
                pointVerify(snakeLinAn,snakeColAn)
                boardData[snakeLinAn][snakeColAn] = 6
            }else if(keyD && !tFlopSwitch || keyA && tFlopSwitch){
                boardData[snakeLinAn-1][snakeColAn] = 14
                //transform into a turning obj
                theRealSnake[3]["dir"] = 14
                var corner = snakeObjs[2]
                corner.position.x = theRealSnake[3]["obj"].position.x
                corner.position.z = theRealSnake[3]["obj"].position.z
                corner.position.x += 15
                corner.position.z -= 15
                sceneGraph.remove(theRealSnake[3]["obj"])
                theRealSnake[3]["obj"] = corner
                sceneGraph.add(theRealSnake[3]["obj"])

                theRealSnake[2]["dir"] = 9
                theRealSnake[2]["obj"].rotateY(3.14/2)
                snakeDir = 9
                snakeLinAn -= 1
                snakeColAn += 1
                if(verifyEdges(snakeLinAn,snakeColAn)){
                    return
                }
                pointVerify(snakeLinAn,snakeColAn)
                boardData[snakeLinAn][snakeColAn] = 9
            }else{
                if(verifyEdges(snakeLinAn,snakeColAn)){
                    return
                }
                pointVerify(snakeLinAn,snakeColAn)
                boardData[snakeLinAn][snakeColAn] = 12
                snakeLinAn += 1
            }
            break;
    }
    keyW = false
    keyA = false
    keyS = false
    keyD = false
}
//startDirct = 3
function pointVerify(snakeLinAn,snakeColAn){

    if(boardData[snakeLinAn][snakeColAn] == 1){
        if(!alreadyPassedVer){
            pointver = true
            //printBoardData()
        }
        boardData[snakeLinAn][snakeColAn] = 0
    }
    alreadyPassedVer = false
}
function verifyEdges(snakeLinAn,snakeColAn){
    if(snakeLinAn > 24 || snakeColAn > 24 || snakeLinAn < 0 || snakeColAn < 0 || (boardData[snakeLinAn][snakeColAn] != 0 && boardData[snakeLinAn][snakeColAn] != 1)){
        loseGame()
        //console.log("stopped 4")
        return true
    }
    return false
}
var pointLin = Math.floor(Math.random()*23+1)
var pointCol = Math.floor(Math.random()*23+1)
while(boardData[pointLin][pointCol] != 0){
    pointLin = Math.floor(Math.random()*23+1)
    pointCol = Math.floor(Math.random()*23+1)
}
var pointLinPos = -halfBoard + 25 + (pointLin)*25
var pointColPos = -halfBoard + 25 + (pointCol)*25
var pointGeo = new THREE.SphereGeometry( 10, 32, 32);
var pointBall = new THREE.Mesh( pointGeo, blackMaterial );
pointBall.name = "ball"
pointBall.position.y -= 150
pointBall.position.x = pointColPos
pointBall.position.z = pointLinPos

var pillarGeo = new THREE.BoxGeometry(3,1000,3)
var pillar = new THREE.Mesh( pillarGeo, blackMaterial );

var moveTongue = 555
// Functions are called
//  1. Initialize the empty scene
//  2. Add elements within the scene
//  3. Animate
helper.initEmptyScene(sceneElements);
load3DObjects(sceneElements.sceneGraph);
requestAnimationFrame(computeFrame);
var ctr = sceneElements.sceneGraph.getObjectByName("centro")
var velCenter = 0.01
var snowflakes = []
var snakeSpeed = objects.length*0.01
var snakeCam = sceneElements.sceneGraph.getObjectByName("snakeCam")
var movementMark = 0
function computeFrame(time) {
    if(snowflakes.length <= 75){
    	snowflakes.push({obj:createSnowFlake(), xVel:Math.random()*halfBoard*2-halfBoard, zVel:Math.random()*halfBoard*2-halfBoard})
    	snowflakes[snowflakes.length-1]["obj"].position.y += 300

    	sceneElements.sceneGraph.add(snowflakes[snowflakes.length-1]["obj"])
    }
    for(var indx = 0; indx < snowflakes.length; indx++){
        var curr = snowflakes[indx]["obj"]
        curr.position.y -= 3
        if(curr.position.y <= -155){
		curr.position.y = 300
        }
        curr.position.x = (snowflakes[indx]["xVel"])*Math.sin((curr.position.y/3)/(8*3.14))
        curr.position.z = (snowflakes[indx]["zVel"])*Math.cos((curr.position.y/3)/(8*3.14))
        curr.rotateX(snowflakes[indx]["xVel"])
        curr.rotateY(snowflakes[indx]["xVel"]+snowflakes[indx]["zVel"])
        curr.rotateZ(snowflakes[indx]["zVel"])
    }

    if (rotate){    
        ctr.rotation.y += velCenter
    }
    //snakemovement check direction and check if reached the 12.5 mark´
    if(!(gameLost || gameWon)){
        movementMark += snakeSpeed
        var moving = snakeSpeed
        if(movementMark > 25){
            moving = 25-(movementMark-snakeSpeed)
            //console.log(moving)
        }
        for(var i = 1; i < theRealSnake.length;i++){
            switch(theRealSnake[i]["dir"]){
                case 3:
                    theRealSnake[i]["obj"].position.z -= moving
                    break
                case 9:
                    theRealSnake[i]["obj"].position.x += moving
                    break
                case 12:
                    theRealSnake[i]["obj"].position.z += moving
                    break
                case 6:
                    theRealSnake[i]["obj"].position.x -= moving
                    break
            }
        }
        console.log("lmao")
        sceneElements.sceneGraph.getObjectByName("sun").rotateX(snakeSpeed/600)
        if(movementMark > 25){
            movementMark = 0
            updateBoardData(sceneElements.sceneGraph)
            //printBoardData()
        }
        //todo
    }
    snakeobj = theRealSnake[2]["obj"]
    switch(theRealSnake[2]["dir"]){
        case 3:
            snakeCam.position.set(snakeobj.position.x, -20, snakeobj.position.z+130)
            snakeCam.lookAt(snakeobj.position.x, -150, snakeobj.position.z-75)
            break
        case 9:
            snakeCam.position.set(snakeobj.position.x-130, -20, snakeobj.position.z)
            snakeCam.lookAt(snakeobj.position.x+75, -150, snakeobj.position.z)
            break
        case 12:
            snakeCam.position.set(snakeobj.position.x, -20, snakeobj.position.z-130)
            snakeCam.lookAt(snakeobj.position.x, -150, snakeobj.position.z+75)
            break
        case 6:
            snakeCam.position.set(snakeobj.position.x+130, -20, snakeobj.position.z)
            snakeCam.lookAt(snakeobj.position.x-75, -150, snakeobj.position.z)
            break
    }
    if(Math.random()*100 <=1 || moveTongue < 12){
        if(moveTongue >= 12){
            moveTongue = 0
        }
        if(moveTongue < 6){
            theRealSnake[0].position.z -= 2
            moveTongue += 1
        }
        if(moveTongue >= 6){
            theRealSnake[0].position.z += 2
            moveTongue += 1
        }
    }
    // Rendering
    helper.render(sceneElements);
    // Call for the next frame
    requestAnimationFrame(computeFrame);
}