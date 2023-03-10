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
- Ambient Light
  - e.g. Light in your room
- Directional Light
  - e.g. ray of sun
- Spot Light
  - e.g. cone like street lamp beam
Objects
Actors
*/

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('.webgl')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

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

// Light
// const ambientLight = new THREE.AmbientLight(0x333333);
// const directionalLight = new THREE.DirectionalLight(0xffffff);

// directionalLight.position.set(10, 10, 0);
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.bottom = -12
// scene.add(ambientLight, directionalLight);

// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dLightHelper, dLightShadowHelper);

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-20, 20, 0);
spotLight.target.position.set(0, 0, 0)
const sLightShadowHelper = new THREE.CameraHelper(spotLight.shadow.camera);
spotLight.castShadow = true;
spotLight.angle = 0.5
scene.add(spotLight, sLightShadowHelper);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper)

// Axes Helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Box
const box = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({
    color: 0x00ff00
  })
)
scene.add(box);

// Plane
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30),
  new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
  })
)
plane.rotation.set(-0.5 * Math.PI, 0, 0)
plane.receiveShadow = true;
scene.add(plane);

// Sphere
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(4, 50, 50),
  new THREE.MeshStandardMaterial({
    color: 0x0000ff,
  })
);
sphere.position.set(-5, 5, 0);
sphere.castShadow = true;
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