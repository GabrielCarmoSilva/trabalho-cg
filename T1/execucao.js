import * as THREE from "three";
import { Camera } from "./camera.js"; // Importando a classe Camera
import {
  initRenderer,
  initDefaultBasicLight,
  setDefaultMaterial,
  onWindowResize,
  createGroundPlaneXZ,
  createGroundPlaneWired
} from "/libs/util/util.js";
import RenderChunkSystem from "/exercises/T1/RenderChunkSystem.js";

// Variáveis iniciais
let scene, renderer, camera, material, light;
scene = new THREE.Scene(); // Criação da cena principal
renderer = initRenderer(); // Inicializa o renderizador

// Criar material básico e luz
material = setDefaultMaterial();
light = initDefaultBasicLight(scene);

// Inicializa o gerenciamento de câmeras
const cameraManager = new Camera(renderer, scene);
camera = cameraManager.getCurrentCamera();

// Ouvir mudanças no tamanho da janela
window.addEventListener(
  "resize",
  function () {
    onWindowResize(cameraManager.getCurrentCamera(), renderer);
  },
  false
);

let axesHelper = new THREE.AxesHelper(12);
scene.add(axesHelper);

// create the ground plane
let plane = createGroundPlaneXZ(35, 35);
plane.position.set(17.5, 0, 17.5);
scene.add(plane);
var chunk = new RenderChunkSystem(scene, plane);

// Função de renderização
function render() {
  //scene.clear();

  cameraManager.update();
  if (cameraManager.isInspectionMode) {
    cameraManager.orbitControls.update();
  }

  chunk.update();
  camera = cameraManager.getCurrentCamera();
  renderer.render(scene, camera);

  requestAnimationFrame(render);
}

cameraManager.addMovementListeners();

render();
