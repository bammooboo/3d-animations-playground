'use strict';

document.addEventListener("DOMContentLoaded", function () {
  init();
  // mainLoop();
  // donutLoop();
  // saturnLoop();
  // geoLoop();
  // butterflyLoop();
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

//For saturn section
var saturnScene = void 0,
    saturnCamera = void 0,
    saturnRenderer = void 0;
var planet = void 0;
var rings = [];
var saturnAdd = 0.01;

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
  // (radius of ring, radius of tube, radius sequence number, tubular sequence number (affects shape eg 5 would make pentagon shape), arc variable (creates arc))
  var geometry = new THREE.TorusGeometry(0.5, 0.2, 30, 30, Math.PI);
  var material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
  torus = new THREE.Mesh(geometry, material);
  scene.add(torus);
};

//Set up the environment - 
//Initialize scene, camera, objects and renderer

var init = function init() {
  // practiceShapes();
  // rainingDonuts();
  // saturnAnimation();
  // geometryShape();
  // butterflyEffect();
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
  if (x < 0.6) {
    createDonut();
  }
  // make donuts look like they are falling
  donuts.forEach(function (singleDonut) {
    return singleDonut.position.y -= donutsAdd;
  });

  newRenderer.render(newScene, newCamera);
  requestAnimationFrame(donutLoop);
};

var createSaturn = function createSaturn() {
  //create inner spherical planet
  var geometry = new THREE.SphereGeometry(0.4, 30, 30);
  var material = new THREE.MeshBasicMaterial({ color: 0x8d5524, wireframe: true });
  planet = new THREE.Mesh(geometry, material);
  saturnScene.add(planet);

  //create rings
  geometry = new THREE.TorusGeometry(0.51, 0.07, 2, 70);
  material = new THREE.MeshBasicMaterial({ color: 0xffe39f, wireframe: true });
  var ring = new THREE.Mesh(geometry, material);
  rings.push(ring);

  geometry = new THREE.TorusGeometry(0.69, 0.07, 2, 70);
  material = new THREE.MeshBasicMaterial({ color: 0xffad60, wireframe: true });
  ring = new THREE.Mesh(geometry, material);
  rings.push(ring);

  geometry = new THREE.TorusGeometry(0.85, 0.07, 2, 70);
  material = new THREE.MeshBasicMaterial({ color: 0xeac086, wireframe: true });
  ring = new THREE.Mesh(geometry, material);
  rings.push(ring);

  //to set correct perspective/angle of planet
  rings.forEach(function (ring) {
    ring.rotation.x = 1.7;
    ring.rotation.y = 0.5;
    saturnScene.add(ring);
  });
};

var saturnAnimation = function saturnAnimation() {
  saturnScene = new THREE.Scene();
  saturnScene.background = new THREE.Color(0x000000);

  saturnCamera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
  saturnCamera.position.z = 4;

  var saturnAxes = new THREE.AxesHelper(5);
  saturnScene.add(saturnAxes);

  saturnRenderer = new THREE.WebGLRenderer();
  saturnRenderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector('.saturn').appendChild(saturnRenderer.domElement);
};

var saturnLoop = function saturnLoop() {
  createSaturn();

  //create movement of camera around planet

  saturnCamera.position.y += saturnAdd;
  if (saturnCamera.position.y >= 0.5 || saturnCamera.position.y <= -0.5) {
    saturnAdd *= -1;
  }

  saturnRenderer.render(saturnScene, saturnCamera);
  requestAnimationFrame(saturnLoop);
};

//geometry section
var geoScene = void 0,
    geoCamera = void 0,
    geoRenderer = void 0,
    geoShape = void 0;
var geoAdd = 0.01;

var createGeometry = function createGeometry() {
  var geometry = new THREE.Geometry();

  geometry.vertices.push(new THREE.Vector3(3, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, 5, 0));
  geometry.vertices.push(new THREE.Vector3(0, 0, 2));
  geometry.vertices.push(new THREE.Vector3(1, 2, -2));

  geometry.faces.push(new THREE.Face3(0, 1, 2));
  geometry.faces.push(new THREE.Face3(1, 2, 3));
  geometry.faces.push(new THREE.Face3(0, 1, 2));

  var material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, wireframe: true });
  geoShape = new THREE.Mesh(geometry, material);
  geoScene.add(geoShape);
};

var geometryShape = function geometryShape() {
  console.log(document);
  //create the scene
  geoScene = new THREE.Scene();
  geoScene.background = new THREE.Color(0x000000);

  //create and locate the camera
  geoCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  geoCamera.position.z = 20;

  createGeometry();

  // show axis helper
  var geoAxes = new THREE.AxesHelper(5);
  geoScene.add(geoAxes);

  //create the renderer
  geoRenderer = new THREE.WebGLRenderer();
  geoRenderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector('.geometry').appendChild(geoRenderer.domElement);
};

var geoLoop = function geoLoop() {
  geoShape.geometry.vertices[1].y -= 0.02;
  geoShape.geometry.verticesNeedUpdate = true;
  geoRenderer.render(geoScene, geoCamera);
  requestAnimationFrame(geoLoop);
};

//Butterfly geometry flapping

var butterflyScene = void 0,
    butterflyCamera = void 0,
    butterflyRenderer = void 0,
    butterfly = void 0;
var butterflyAdd = 0.8;

var createButterfly = function createButterfly() {
  var geometry = new THREE.Geometry();
  var material = new THREE.MeshBasicMaterial({ color: 0xff4606, side: THREE.DoubleSide, wireframe: true });

  butterfly = new THREE.Mesh(geometry, material);
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(5, 0, 0));
  geometry.vertices.push(new THREE.Vector3(2, 4, 3));
  geometry.vertices.push(new THREE.Vector3(2, 4, -3));

  var wing = new THREE.Face3(0, 1, 2);
  geometry.faces.push(wing);
  wing = new THREE.Face3(0, 1, 3);
  geometry.faces.push(wing);

  butterfly.rotation.z = 0.7;
  butterfly.rotation.x = 0.6;

  butterflyScene.add(butterfly);
};

var butterflyEffect = function butterflyEffect() {
  butterflyScene = new THREE.Scene();
  butterflyScene.background = new THREE.Color(0x000000);

  butterflyCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  butterflyCamera.position.z = 20;

  createButterfly();

  var butterflyAxes = new THREE.AxesHelper(4);
  butterflyScene.add(butterflyAxes);

  butterflyRenderer = new THREE.WebGLRenderer();
  butterflyRenderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector('.butterfly').appendChild(butterflyRenderer.domElement);
};

var butterflyLoop = function butterflyLoop() {
  butterfly.geometry.vertices[2].y += butterflyAdd;
  butterfly.geometry.vertices[3].y += butterflyAdd;
  butterfly.geometry.verticesNeedUpdate = true;

  if (butterfly.geometry.vertices[2].y < -4 || butterfly.geometry.vertices[2].y > 4) {
    butterflyAdd *= -1;
  }

  butterflyRenderer.render(butterflyScene, butterflyCamera);
  requestAnimationFrame(butterflyLoop);
};