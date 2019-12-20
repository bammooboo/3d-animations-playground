document.addEventListener("DOMContentLoaded", function() {
  init();
  // mainLoop();
  // donutLoop();
  // saturnLoop();
  // geoLoop();
  // butterflyLoop();
});
//For practice section
let scene, camera, renderer, cube, sphere, torus;

//For donuts section
let newScene, newCamera, newRenderer;
let donuts = [];
let donutsAdd = 0.1;

//For saturn section
let saturnScene, saturnCamera, saturnRenderer;
let planet;
let rings = [];
let saturnAdd = 0.01;

//how much to move cube in every call in loop - for practice section
let ADD = 0.05;

let createCube = function() {
  let geometry = new THREE.BoxGeometry(1, 1, 1);
  let material = new THREE.MeshBasicMaterial({color: 0x00a1cb, wireframe: true});
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
}

let createSphere = function() {
  console.log('creating sphere');
  //(radius/horizontal-vertical)
  let geometry = new THREE.SphereGeometry(0.5, 30, 30, 0, Math.PI, 0, Math.PI/2);
  let material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
}

let createTorus = function() {
  // (radius of ring, radius of tube, radius sequence number, tubular sequence number (affects shape eg 5 would make pentagon shape), arc variable (creates arc))
  let geometry = new THREE.TorusGeometry(0.5, 0.2, 30, 30, Math.PI);
  let material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
  torus = new THREE.Mesh(geometry, material);
  scene.add(torus);
}

//Set up the environment - 
//Initialize scene, camera, objects and renderer

let init = function() {
  // practiceShapes();
  // rainingDonuts();
  // saturnAnimation();
  // geometryShape();
  // butterflyEffect();
};

let practiceShapes = function() {
  console.log(document);
  //create the scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xababab);

  //create and locate the camera
  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 4;

  // show axis helper
  let axes = new THREE.AxesHelper(5);
  scene.add(axes);


  createTorus();

  createSphere();

  createCube();

  //create the renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector('.practice').appendChild(renderer.domElement);
}

//main animation loop - calls every 50-60 ms

let mainLoop = function() {
  //add ADD number on very loop.
  cube.position.x += ADD;
  cube.rotation.z -= ADD;

  cube.rotation.y += ADD;

  sphere.rotation.x += ADD;
  sphere.rotation.y += ADD;

  torus.rotation.x += ADD;
  torus.rotation.y += ADD;

  // reverse direction if reached 2 on either side
  if(cube.position.x <= -2 || cube.position.x >= 2) {
    ADD *= -1;
  }

  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
};

let randomInRange = function(from, to) {
  let x = Math.random() * (to - from);
  return x + from;
};

//create single donut
let createDonut = function() {
  let geometry = new THREE.TorusGeometry(0.2, 0.1, 5, 60);
  let material = new THREE.MeshBasicMaterial({color: Math.random() * 0xffffff, wireframe: true});
  let singleDonut = new THREE.Mesh(geometry, material);
  singleDonut.position.x = randomInRange(-15, 15);
  singleDonut.position.z = randomInRange(-15, 15);
  singleDonut.position.y = 15;
  newScene.add(singleDonut);
  //add to donuts array
  donuts.push(singleDonut);

}

let rainingDonuts = function() {
  newScene= new THREE.Scene();
  newScene.background = new THREE.Color(0xe2e2e2);

  newCamera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
  newCamera.position.z = 4;

  let newAxes = new THREE.AxesHelper(5);
  newScene.add(newAxes);

  newRenderer = new THREE.WebGLRenderer();
  newRenderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector('.donuts').appendChild(newRenderer.domElement);
}

let donutLoop = function() {
  //instead of generating donuts on every loop iteration - generate them randomly
  let x = Math.random();
  if(x < 0.6) {
    createDonut();
  }
  // make donuts look like they are falling
  donuts.forEach(singleDonut => singleDonut.position.y -= donutsAdd);

  newRenderer.render(newScene, newCamera);
  requestAnimationFrame(donutLoop);
}

let createSaturn = function() {
  //create inner spherical planet
  let geometry = new THREE.SphereGeometry(0.4, 30, 30);
  let material = new THREE.MeshBasicMaterial({color: 0x8d5524, wireframe: true});
  planet = new THREE.Mesh(geometry, material);
  saturnScene.add(planet);

  //create rings
  geometry = new THREE.TorusGeometry(0.51, 0.07, 2, 70);
  material = new THREE.MeshBasicMaterial({color: 0xffe39f, wireframe: true});
  let ring = new THREE.Mesh(geometry, material);
  rings.push(ring);

  geometry = new THREE.TorusGeometry(0.69, 0.07, 2, 70);
  material = new THREE.MeshBasicMaterial({color: 0xffad60, wireframe: true});
  ring = new THREE.Mesh(geometry, material);
  rings.push(ring);

  geometry = new THREE.TorusGeometry(0.85, 0.07, 2, 70);
  material = new THREE.MeshBasicMaterial({color: 0xeac086, wireframe: true});
  ring = new THREE.Mesh(geometry, material);
  rings.push(ring);

  //to set correct perspective/angle of planet
  rings.forEach(ring => {
    ring.rotation.x = 1.7;
    ring.rotation.y = 0.5;
    saturnScene.add(ring);
  });
}

let saturnAnimation = function() {
  saturnScene= new THREE.Scene();
  saturnScene.background = new THREE.Color(0x000000);

  saturnCamera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
  saturnCamera.position.z = 4;

  let saturnAxes = new THREE.AxesHelper(5);
  saturnScene.add(saturnAxes);

  saturnRenderer = new THREE.WebGLRenderer();
  saturnRenderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector('.saturn').appendChild(saturnRenderer.domElement);
}

let saturnLoop = function() {
  createSaturn();

  //create movement of camera around planet

  saturnCamera.position.y += saturnAdd;
  if(saturnCamera.position.y >= 0.5 || saturnCamera.position.y <= -0.5) {
    saturnAdd *= -1;
  }

  saturnRenderer.render(saturnScene, saturnCamera);
  requestAnimationFrame(saturnLoop);
}

//geometry section
let geoScene, geoCamera, geoRenderer, geoShape;
let geoAdd = 0.01;

let createGeometry = function() {
  let geometry = new THREE.Geometry();

  geometry.vertices.push(new THREE.Vector3(3, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, 5, 0));
  geometry.vertices.push(new THREE.Vector3(0, 0, 2));
  geometry.vertices.push(new THREE.Vector3(1, 2, -2));

  geometry.faces.push(new THREE.Face3(0, 1, 2));
  geometry.faces.push(new THREE.Face3(1, 2, 3));
  geometry.faces.push(new THREE.Face3(0, 1, 2));

  let material = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide, wireframe: true})
  geoShape = new THREE.Mesh(geometry, material);
  geoScene.add(geoShape);
}

let geometryShape = function() {
  console.log(document);
  //create the scene
  geoScene = new THREE.Scene();
  geoScene.background = new THREE.Color(0x000000);

  //create and locate the camera
  geoCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  geoCamera.position.z = 20;

  createGeometry();

  // show axis helper
  let geoAxes = new THREE.AxesHelper(5);
  geoScene.add(geoAxes);

  //create the renderer
  geoRenderer = new THREE.WebGLRenderer();
  geoRenderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector('.geometry').appendChild(geoRenderer.domElement);
}

let geoLoop = function() {
  geoShape.geometry.vertices[1].y -= 0.02;
  geoShape.geometry.verticesNeedUpdate = true;
  geoRenderer.render(geoScene, geoCamera);
  requestAnimationFrame(geoLoop);
}

//Butterfly geometry flapping

let butterflyScene, butterflyCamera, butterflyRenderer, butterfly;
let butterflyAdd = 0.8;

let createButterfly = function() {
  let geometry = new THREE.Geometry();
  let material = new THREE.MeshBasicMaterial({color: 0xff4606, side: THREE.DoubleSide, wireframe: true});

  butterfly = new THREE.Mesh(geometry, material);
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(5, 0, 0));
  geometry.vertices.push(new THREE.Vector3(2, 4, 3));
  geometry.vertices.push(new THREE.Vector3(2, 4, -3));

  let wing = new THREE.Face3(0, 1, 2);
  geometry.faces.push(wing);
  wing = new THREE.Face3(0, 1, 3);
  geometry.faces.push(wing);

  butterfly.rotation.z = 0.7;
  butterfly.rotation.x = 0.6;

  butterflyScene.add(butterfly);
}

let butterflyEffect = function() {
  butterflyScene = new THREE.Scene();
  butterflyScene.background = new THREE.Color(0x000000);

  butterflyCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  butterflyCamera.position.z = 20;

  createButterfly();

  let butterflyAxes = new THREE.AxesHelper(4);
  butterflyScene.add(butterflyAxes);

  butterflyRenderer = new THREE.WebGLRenderer();
  butterflyRenderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector('.butterfly').appendChild(butterflyRenderer.domElement);
}

let butterflyLoop = function() {
  butterfly.geometry.vertices[2].y += butterflyAdd;
  butterfly.geometry.vertices[3].y += butterflyAdd;
  butterfly.geometry.verticesNeedUpdate = true;

  if(butterfly.geometry.vertices[2].y < -4 || butterfly.geometry.vertices[2].y > 4) {
    butterflyAdd *= -1;
  }

  butterflyRenderer.render(butterflyScene, butterflyCamera);
  requestAnimationFrame(butterflyLoop);
}

