import * as THREE from "three";

import vertexShader from "./background-vertex.glsl";
import fragmentShader from "./background-fragment.glsl";

let container = null;
let camera = null;
let scene = null;
let renderer = null;
let uniforms = null;

export default () => {
  init();
  animate();
};

function init() {
  container = document.getElementById("background");

  camera = new THREE.Camera();
  camera.position.z = 1;

  scene = new THREE.Scene();

  const geometry = new THREE.PlaneBufferGeometry(2, 2);

  uniforms = {
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_mouse: { type: "v2", value: new THREE.Vector2() }
  };

  const material = new THREE.ShaderMaterial({
    precision: "mediump",
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  onWindowResize();
  window.addEventListener("resize", onWindowResize, false);

  document.onmousemove = function(e) {
    uniforms.u_mouse.value.x = e.pageX;
    uniforms.u_mouse.value.y = e.pageY;
  };
}

function onWindowResize(event) {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  uniforms.u_time.value += 0.01;
  renderer.render(scene, camera);
}
