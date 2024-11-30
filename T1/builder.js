import * as THREE from 'three';
import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';
import { Camera } from './camera.js';  // Importando a classe Camera
import {
    initRenderer,
    initDefaultBasicLight,
    setDefaultMaterial,
    onWindowResize,
    createGroundPlaneXZ,
    createGroundPlaneWired
} from "../libs/util/util.js";
import { Voxel } from './voxel.js'; // Importando a classe Voxel
import GUI from '../libs/util/dat.gui.module.js';

// Variáveis iniciais
let scene, renderer, camera, material, light;
scene = new THREE.Scene();  // Criação da cena principal
renderer = initRenderer();  // Inicializa o renderizador

// Criar material básico e luz
material = setDefaultMaterial();
light = initDefaultBasicLight(scene);

// Inicializa o gerenciamento de câmeras
const cameraManager = new Camera(renderer, scene);
camera = cameraManager.getCurrentCamera();

// Ouvir mudanças no tamanho da janela
window.addEventListener('resize', function () { onWindowResize(cameraManager.getCurrentCamera(), renderer); }, false);

// Mostrar eixos
let axesHelper = new THREE.AxesHelper(12);
scene.add(axesHelper);

// Criar plano de chão
let plane = createGroundPlaneWired(50, 50);
plane.material.opacity = 0.2;
plane.material.transparent = true;
scene.add(plane);

// Cria o cubo wireframe
let wireframeGeometry = new THREE.BoxGeometry(1, 1, 1);
let wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
let wireframe = new THREE.LineSegments(
    new THREE.EdgesGeometry(wireframeGeometry),
    wireframeMaterial
);
wireframe.position.set(0, 0.5, 0); // Altura padrão inicial
//wireframe.add(axesHelper);
scene.add(wireframe);

let currentVoxelType = 0; // Tipo inicial de voxel
let voxelColors = [0x00ff00, 0xffa500, 0xd3d3d3, 0x8b4513, 0xffffff];

addKeyboardControls();
addVoxel();
addGUI();
getBuilder();

function addHeightIndicator(x, y, z) {
    // Procura um indicador existente na posição
    let indicatorName = `indicator-${x}-${y}-${z}`;
    let existingIndicator = plane.getObjectByName(indicatorName);

    if (!existingIndicator) {
        // Cria uma linha pontilhada para indicar a altura
        let material = new THREE.LineDashedMaterial({
            color: 0x0000ff,
            dashSize: 0.2,
            gapSize: 0.01,
        });
        const points = [
            new THREE.Vector3(x, 0, z),  // Base no plano
            new THREE.Vector3(x, y, z),  // Ponto final no nível 1
        ];
        let geometry = new THREE.BufferGeometry().setFromPoints(points);
        let line = new THREE.Line(geometry, material);
        line.computeLineDistances(); // Necessário para linhas pontilhadas
        line.name = indicatorName;

        scene.add(line);

    }
}

function removeHeightIndicator(x, y, z) {
    let indicatorName = `indicator-${x}-${y}-${z}`;
    let indicator = scene.getObjectByName(indicatorName);
    if (indicator) {
        scene.remove(indicator);
    }
}

function addKeyboardControls() {
    window.addEventListener('keydown', (event) => {
        const step = 1;
        switch (event.key) {
            case 'ArrowUp':
                wireframe.position.z -= step;
                break;
            case 'ArrowDown':
                wireframe.position.z += step;
                break;
            case 'ArrowLeft':
                wireframe.position.x += step;
                break;
            case 'ArrowRight':
                wireframe.position.x -= step;
                break;
            case 'PageUp':
                wireframe.position.y += step;
                break;
            case 'PageDown':
                wireframe.position.y -= step;
                break;
            case '.':
                if (currentVoxelType >= 4) {
                    currentVoxelType = 0;
                    break;
                }
                currentVoxelType++;
                break;
            case ',':
                if (currentVoxelType <= 0) {
                    currentVoxelType = 4;
                    break;
                }
                currentVoxelType--;
                break;
            case 'q':
            case 'Q': // Adicionar voxel
                addHeightIndicator(wireframe.position.x, wireframe.position.y, wireframe.position.z);
                const voxel = new Voxel();
                if (currentVoxelType === 0) {
                    voxel.builVoxel1(
                        wireframe.position.x,
                        wireframe.position.y,
                        wireframe.position.z,
                    );
                    scene.add(voxel.voxel);
                    break;
                }
                if (currentVoxelType === 1) {
                    voxel.buildVoxel2(
                        wireframe.position.x,
                        wireframe.position.y,
                        wireframe.position.z,
                    );
                    scene.add(voxel.voxel);
                    break;
                }
                if (currentVoxelType === 2) {
                    voxel.buildVoxel3(
                        wireframe.position.x,
                        wireframe.position.y,
                        wireframe.position.z,
                    );
                    scene.add(voxel.voxel);
                    break;
                }
                if (currentVoxelType === 3) {
                    voxel.buildVoxel4(
                        wireframe.position.x,
                        wireframe.position.y,
                        wireframe.position.z,
                    );
                    scene.add(voxel.voxel);
                    break;
                }
                if (currentVoxelType === 4) {
                    voxel.buildVoxel5(
                        wireframe.position.x,
                        wireframe.position.y,
                        wireframe.position.z,
                    );
                    scene.add(voxel.voxel);
                    break;
                }
            case 'e':
            case 'E': // Remover voxel
                removeHeightIndicator(wireframe.position.x, wireframe.position.y, wireframe.position.z);
                removeVoxel(
                    wireframe.position.x,
                    wireframe.position.y,
                    wireframe.position.z
                );
                break;
        }
    });
}

function addGUI() {
    var controls = {
        filename: '',
        save: () => {
            saveFile(controls.filename)
        },
        load: () => {
            loadFile()
        }
    };

    let gui = new GUI();
    gui.add(controls, 'filename').name('Insira o nome')
    gui.add(controls, 'save').name('Salvar Arquivo');
    gui.add(controls, 'load').name('Carregar Arquivo')
}

function addVoxel(x, y, z, voxelColor = undefined) {
    if (plane.getObjectByName(`voxel-${x}-${y}-${z}`)) return

    const color = voxelColor ?? voxelColors[currentVoxelType];
    const voxelGeometry = new THREE.BoxGeometry(1, 1, 1);
    const voxelMaterial = setDefaultMaterial(color);
    const voxel = new THREE.Mesh(voxelGeometry, voxelMaterial);

    voxel.position.set(x, y, z);
    voxel.name = `voxel-${x}-${y}-${z}`; // Nome único baseado na posição
    scene.add(voxel);
}

function removeVoxel(x, y, z) {
    const voxelName = `voxel-${x}-${y}-${z}`;
    const voxel = scene.getObjectByName(voxelName);
    if (voxel) {
        scene.remove(voxel);
    }
}

function getBuilder() {
    return plane;
}

function saveFile(filename) {
    const data = scene.children.filter((voxel) => voxel.name && voxel.name.startsWith('voxel-')).map((voxel) => {
        return {
            position: voxel.position,
            color: voxel.material.color.getHex(),
        }
    })

    const file = new Blob([JSON.stringify(data)], { type: 'application/json' })
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = `${filename.split('.')[0]}.json`;
    link.click();
}

function loadFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';  // Aceita apenas arquivos JSON
    input.onchange = (event) => {
        const file = event.target.files[0];  // Pega o arquivo selecionado
        if (file) {
            console.log(file)
            if (file.type !== 'application/json') return
            const reader = new FileReader();
            reader.onload = (e) => {
                JSON.parse(e.target.result).map((voxel) => {
                    voxel && addVoxel(
                        voxel.position.x,
                        voxel.position.y,
                        voxel.position.z,
                        voxel.color
                    );
                    addHeightIndicator(voxel.position.x, voxel.position.y, voxel.position.z);
                });
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

// Função de renderização
function render() {
    requestAnimationFrame(render);

    // Atualizar o movimento da câmera
    cameraManager.update();

    // Atualiza os controles de câmera de inspeção
    if (cameraManager.isInspectionMode) {
        cameraManager.orbitControls.update(); // Atualiza os controles da câmera de inspeção
    }

    // Renderiza a cena com a câmera atual
    camera = cameraManager.getCurrentCamera();  // Atualiza a câmera ativa
    renderer.render(scene, camera);
}

// Ouve eventos de movimentação da câmera FPV
cameraManager.addMovementListeners();

render();
