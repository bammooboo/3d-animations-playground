document.addEventListener("DOMContentLoaded", function() {
  init();
  mainLoop();
  donutLoop();
});
//For practice section
let scene, camera, renderer, cube, sphere, torus;

//For donuts section
let newScene, newCamera, newRenderer;
let donuts = [];
let donutsAdd = 0.1;

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
  // (-, -, radius sequence number, tubular sequence number (affects shape eg 5 would make pentagon shape), arc variable (creates arc))
  let geometry = new THREE.TorusGeometry(0.5, 0.2, 30, 30, Math.PI);
  let material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
  torus = new THREE.Mesh(geometry, material);
  scene.add(torus);
}

//Set up the environment - 
//Initialize scene, camera, objects and renderer

let init = function() {
  practiceShapes();
  rainingDonuts();
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
  if(x < 0.2) {
    createDonut();
  }
  // make donuts look like they are falling
  donuts.forEach(singleDonut => singleDonut.position.y -= donutsAdd);

  newRenderer.render(newScene, newCamera);
  requestAnimationFrame(donutLoop);
}