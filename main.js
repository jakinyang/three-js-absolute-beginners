import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import { ZeroSlopeEnding } from 'three';

/* 
Core ThreeJS Components
Scene
Camera
- Perspective Camera
  - FOV: What can be seen through the camera
  - Aspect Ration: Width / Height of image i.e. canvas w/h
  - Clipping Point (near, far)
- Orthographic Camera
  - 2D scenes - no depth(?)
  - Left, Right, Top, Bottom
  - Clipping Point
Lights
Objects
Actors
*/

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('.webgl')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  45, 
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(-10, 30, 30)

// Axes Helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Box
const box = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({
    color: 0x00ff00
  })
)
scene.add(box);

// Plane
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30),
  new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
  })
)
plane.rotation.set(-0.5 * Math.PI, 0, 0)
scene.add(plane);

// Sphere
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(4, 50, 50),
  new THREE.MeshBasicMaterial({
    color: 0x0000ff,
  })
)
sphere.position.set(-5, 5, 0)
scene.add(sphere);


// Grid Helper
const gridHelper = new THREE.GridHelper(30, 10);
scene.add(gridHelper);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Dat.gui
const gui = new dat.GUI();

const options = {
  sphereColor: '#ffea00',
  wireframe: false,
  speed: 0.01
};

gui.addColor(options, 'sphereColor').onChange(function(e) {
  sphere.material.color.set(e);
});

gui.add(options, 'wireframe').onChange(function(e) {
  sphere.material.wireframe = e;
})

gui.add(options, 'speed', 0, 0.1);

let step = 0;

function animate() {
  requestAnimationFrame(animate);
  box.rotation.x += 0.001;
  box.rotation.y += 0.001;

  step += options.speed;
  sphere.position.y = 10 * Math.abs(Math.sin(step));
  renderer.render(scene, camera);
}

animate();