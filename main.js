import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


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
  75, 
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 3, 8)

// Axes Helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Object
const box = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({
    color: 0x00ff00
  })
)
scene.add(box);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  box.rotation.x += 0.001;
  box.rotation.y += 0.001;
  renderer.render(scene, camera);
}

animate();