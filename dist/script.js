"use strict";

document.addEventListener("DOMContentLoaded", function () {
  init();
  mainLoop();
});

var scene = void 0,
    camera = void 0,
    renderer = void 0,
    cube = void 0;

//how much to move cube in every call in loop
var ADD = 0.1;

var createCube = function createCube() {
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshBasicMaterial({ color: 0x00a1cb });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
};

//Set up the environment - 
//Initialize scene, camera, objects and renderer

var init = function init() {
  console.log(document);
  //create the scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xababab);

  //create and locate the camera
  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 5;

  // show axis helper
  // let axes = new THREE.AxesHelper(5);
  // scene.add(axes);

  createCube();

  //create the renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
};

//main animation loop - calls every 50-60 ms

var mainLoop = function mainLoop() {
  //add ADD number on very loop.
  // cube.position.x += ADD;
  // cube.rotation.z -= ADD;

  cube.rotation.y += ADD;

  //reverse direction if reached 2 on either side
  if (cube.position.x <= -2 || cube.position.x >= 2) {
    ADD *= -1;
  }

  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
};