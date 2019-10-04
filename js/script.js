document.addEventListener("DOMContentLoaded", function() {
  init();
  mainLoop();
});

let scene, camera, renderer, cube, sphere;

//how much to move cube in every call in loop
let ADD = 0.1;

let createCube = function() {
  let geometry = new THREE.BoxGeometry(1, 1, 1);
  let material = new THREE.MeshBasicMaterial({color: 0x00a1cb});
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

//Set up the environment - 
//Initialize scene, camera, objects and renderer

let init = function() {
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

  createSphere();

  createCube();


  //create the renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
};

//main animation loop - calls every 50-60 ms

let mainLoop = function() {
  //add ADD number on very loop.
  cube.position.x += ADD;
  cube.rotation.z -= ADD;

  cube.rotation.y += ADD;

  sphere.rotation.x += ADD;
  // sphere.rotation.y += ADD;

  // reverse direction if reached 2 on either side
  if(cube.position.x <= -2 || cube.position.x >= 2) {
    ADD *= -1;
  }

  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
};