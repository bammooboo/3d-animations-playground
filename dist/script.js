'use strict';

document.addEventListener("DOMContentLoaded", function () {
  init();
  mainLoop();
  donutLoop();
});
//For practice section
var scene = void 0,
    camera = void 0,
    renderer = void 0,
    cube = void 0,
    sphere = void 0,
    torus = void 0;

//For donuts section
var newScene = void 0,
    newCamera = void 0,
    newRenderer = void 0;
var donuts = [];
var donutsAdd = 0.1;

//how much to move cube in every call in loop - for practice section
var ADD = 0.05;

var createCube = function createCube() {
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshBasicMaterial({ color: 0x00a1cb, wireframe: true });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
};

var createSphere = function createSphere() {
  console.log('creating sphere');
  //(radius/horizontal-vertical)
  var geometry = new THREE.SphereGeometry(0.5, 30, 30, 0, Math.PI, 0, Math.PI / 2);
  var material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
};

var createTorus = function createTorus() {
  // (-, -, radius sequence number, tubular sequence number (affects shape eg 5 would make pentagon shape), arc variable (creates arc))
  var geometry = new THREE.TorusGeometry(0.5, 0.2, 30, 30, Math.PI);
  var material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
  torus = new THREE.Mesh(geometry, material);
  scene.add(torus);
};

//Set up the environment - 
//Initialize scene, camera, objects and renderer

var init = function init() {
  practiceShapes();
  rainingDonuts();
};

var practiceShapes = function practiceShapes() {
  console.log(document);
  //create the scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xababab);

  //create and locate the camera
  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 4;

  // show axis helper
  var axes = new THREE.AxesHelper(5);
  scene.add(axes);

  createTorus();

  createSphere();

  createCube();

  //create the renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector('.practice').appendChild(renderer.domElement);
};

//main animation loop - calls every 50-60 ms

var mainLoop = function mainLoop() {
  //add ADD number on very loop.
  cube.position.x += ADD;
  cube.rotation.z -= ADD;

  cube.rotation.y += ADD;

  sphere.rotation.x += ADD;
  sphere.rotation.y += ADD;

  torus.rotation.x += ADD;
  torus.rotation.y += ADD;

  // reverse direction if reached 2 on either side
  if (cube.position.x <= -2 || cube.position.x >= 2) {
    ADD *= -1;
  }

  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
};

var randomInRange = function randomInRange(from, to) {
  var x = Math.random() * (to - from);
  return x + from;
};

//create single donut
var createDonut = function createDonut() {
  var geometry = new THREE.TorusGeometry(0.2, 0.1, 5, 60);
  var material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, wireframe: true });
  var singleDonut = new THREE.Mesh(geometry, material);
  singleDonut.position.x = randomInRange(-15, 15);
  singleDonut.position.z = randomInRange(-15, 15);
  singleDonut.position.y = 15;
  newScene.add(singleDonut);
  //add to donuts array
  donuts.push(singleDonut);
};

var rainingDonuts = function rainingDonuts() {
  newScene = new THREE.Scene();
  newScene.background = new THREE.Color(0xe2e2e2);

  newCamera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
  newCamera.position.z = 4;

  var newAxes = new THREE.AxesHelper(5);
  newScene.add(newAxes);

  newRenderer = new THREE.WebGLRenderer();
  newRenderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector('.donuts').appendChild(newRenderer.domElement);
};

var donutLoop = function donutLoop() {
  //instead of generating donuts on every loop iteration - generate them randomly
  var x = Math.random();
  if (x < 0.2) {
    createDonut();
  }
  // make donuts look like they are falling
  donuts.forEach(function (singleDonut) {
    return singleDonut.position.y -= donutsAdd;
  });

  newRenderer.render(newScene, newCamera);
  requestAnimationFrame(donutLoop);
};