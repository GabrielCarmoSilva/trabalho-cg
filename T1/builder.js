import * as THREE from 'three';
import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';
import {
    initRenderer,
    initCamera,
    initDefaultBasicLight,
    setDefaultMaterial,
    InfoBox,
    onWindowResize,
    createGroundPlaneXZ, createGroundPlaneWired, SecondaryBox
} from "../libs/util/util.js";
import { Tree1 } from "./tree1.js"; // Importando a classe Tree1
import { Tree2 } from "./tree2.js"; // Importando a classe Tree2
import { Tree3 } from "./tree3.js"; // Importando a classe Tree3
import { Voxel } from './voxel.js'; // Importando a classe Voxel
import GUI from '../libs/util/dat.gui.module.js';

export class Builder {
    
    constructor(height, width) {
        
        this.height = height;
        this.width = width;
        console.log('Construindo ambiente...');
    
        this.plane = createGroundPlaneWired(width, height);
        this.grid = this.plane.children[0];
        this.plane.material.transparent = true;
        this.plane.material.opacity = 0.3;
    
        // Cria o cubo wireframe
        const wireframeGeometry = new THREE.BoxGeometry(1, 1, 1);
        const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
        this.wireframe = new THREE.LineSegments(
            new THREE.EdgesGeometry(wireframeGeometry),
            wireframeMaterial
        );
        this.wireframe.position.set(0, 0.5, 0); // Altura padrão inicial
        this.plane.add(this.wireframe);
        this.addKeyboardControls()
        this.addGUI()
    
        this.currentVoxelType = 0; // Tipo inicial de voxel
        this.voxelColors = [0x00ff00, 0xffa500, 0xd3d3d3, 0x8b4513, 0xffffff]; // Cores dos tipos
    }

    buildPlan() {
            // Cria um novo voxel
    const voxel = new Voxel();
    voxel.builVoxel1();
    voxel.getFoundation().position.set(0, 0, 0);
    // Adiciona o voxel ao plano
    this.plane.add(voxel.getFoundation());

    }

    addKeyboardControls() {
        window.addEventListener('keydown', (event) => {
            const step = 1;
            switch (event.key) {
                case 'ArrowUp':
                    this.wireframe.position.z += step;
                    break;
                case 'ArrowDown':
                    this.wireframe.position.z -= step;
                    break;
                case 'ArrowLeft':
                    this.wireframe.position.x += step;
                    break;
                case 'ArrowRight':
                    this.wireframe.position.x -= step;
                    break;
                case 'PageUp':
                    this.wireframe.position.y += step;
                    break;
                case 'PageDown':
                    this.wireframe.position.y -= step;
                    break;
                case '.':
                    if (this.currentVoxelType >= 4) {
                        this.currentVoxelType = 0;
                        break;
                    }
                    this.currentVoxelType++;
                    break;
                case ',':
                    if (this.currentVoxelType <= 0) {
                        this.currentVoxelType = 4;
                        break;
                    }
                    this.currentVoxelType--;
                    break;
                case 'q':
                case 'Q': // Adicionar voxel
                    const voxel = new Voxel();
                    if (this.currentVoxelType === 0) {
                        voxel.builVoxel1(
                            this.wireframe.position.x,
                            this.wireframe.position.y,
                            this.wireframe.position.z,
                        );
                        this.plane.add(voxel.voxel);
                        break;
                    }
                    if (this.currentVoxelType === 1) {
                        voxel.buildVoxel2(
                            this.wireframe.position.x,
                            this.wireframe.position.y,
                            this.wireframe.position.z,
                        );
                        this.plane.add(voxel.voxel);
                        break;
                    }
                    if (this.currentVoxelType === 2) {
                        voxel.buildVoxel3(
                            this.wireframe.position.x,
                            this.wireframe.position.y,
                            this.wireframe.position.z,
                        );
                        this.plane.add(voxel.voxel);
                        break;
                    }
                    if (this.currentVoxelType === 3) {
                        voxel.buildVoxel4(
                            this.wireframe.position.x,
                            this.wireframe.position.y,
                            this.wireframe.position.z,
                        );
                        this.plane.add(voxel.voxel);
                        break;
                    }
                    if (this.currentVoxelType === 4) {
                        voxel.buildVoxel5(
                            this.wireframe.position.x,
                            this.wireframe.position.y,
                            this.wireframe.position.z,
                        );
                        this.plane.add(voxel.voxel);
                        break;
                    }
                case 'e':
                case 'E': // Remover voxel
                    this.removeVoxel(
                        this.wireframe.position.x,
                        this.wireframe.position.y,
                        this.wireframe.position.z
                    );
                    break;
            }
        });
    }

    addGUI() {
        var controls = {
            filename: '',
            save: () => {
                this.saveFile(controls.filename)
            },
            load: () => {
                this.loadFile()
            }
        };
        
        let gui = new GUI();
        gui.add(controls, 'filename').name('Insira o nome')
        gui.add(controls, 'save').name('Salvar Arquivo');
        gui.add(controls, 'load').name('Carregar Arquivo')
    }

    addVoxel(x, y, z, voxelColor = undefined) {
        if (this.plane.getObjectByName(`voxel-${x}-${y}-${z}`)) return

        const color = voxelColor ?? this.voxelColors[this.currentVoxelType];
        const voxelGeometry = new THREE.BoxGeometry(1, 1, 1);
        const voxelMaterial = setDefaultMaterial(color);
        const voxel = new THREE.Mesh(voxelGeometry, voxelMaterial);
    
        voxel.position.set(x, y, z);
        voxel.name = `voxel-${x}-${y}-${z}`; // Nome único baseado na posição
        this.plane.add(voxel);
    }
    
    removeVoxel(x, y, z) {
        const voxelName = `voxel-${x}-${y}-${z}`;
        const voxel = this.plane.getObjectByName(voxelName);
        if (voxel) {
            this.plane.remove(voxel);
        }
    }

    // Function to add a custom tree
    addCustomTree(x, y, z) {
        const tree = new Tree1(); // Instanciando a classe Tree
        tree.buildTree(); // Construindo a árvore

        // Posicione a árvore no local desejado
        tree.getFoundation().position.set(x, y, z); // Define a posição (base em nível N0)
        tree.getFoundation().scale.set(0.1, 0.1, 0.1);
        tree.getFoundation().name = `voxel-${x}-${y}-${z}`;

        this.plane.add(tree.getFoundation()); // Adiciona a árvore à cena
    }

    // Function to add a custom tree2
    addCustomTree2(x, y, z) {
        const tree = new Tree2(); // Instanciando a classe Tree
        tree.buildTree(); // Construindo a árvore

        // Posicione a árvore no local desejado
        tree.getFoundation().position.set(x, y, z); // Define a posição (base em nível N0)
        tree.getFoundation().scale.set(0.1, 0.1, 0.1);
        tree.getFoundation().name = `voxel-${x}-${y}-${z}`;

        this.plane.add(tree.getFoundation()); // Adiciona a árvore à cena
    }

    // Function to add a custom tree3
    addCustomTree3(x, y, z) {
        const tree = new Tree3(); // Instanciando a classe Tree
        tree.buildTree(); // Construindo a árvore

        // Posicione a árvore no local desejado
        tree.getFoundation().position.set(x, y, z); // Define a posição (base em nível N0)
        tree.getFoundation().scale.set(0.1, 0.1, 0.1);
        tree.getFoundation().name = `voxel-${x}-${y}-${z}`;

        this.plane.add(tree.getFoundation()); // Adiciona a árvore à cena
    }

    getBuilder() {
        return this.plane;
    }

    saveFile(filename) {
        const data = this.plane.children.filter((voxel) => voxel.name && voxel.name.startsWith('voxel-')).map((voxel) => {
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

    loadFile() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';  // Aceita apenas arquivos JSON
        input.onchange = (event) => {
            const file = event.target.files[0];  // Pega o arquivo selecionado
            if (file) {
                if (file.type !== 'application/json') return
                const reader = new FileReader();
                reader.onload = (e) => {
                    JSON.parse(e.target.result).map((voxel) => {
                        voxel && this.addVoxel(
                            voxel.position.x,
                            voxel.position.y,
                            voxel.position.z,
                            voxel.color
                        );
                    });
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }

}









import { Camera } from './camera.js';
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luz padrão
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);
const cameraManager = new Camera(renderer, scene);
const camera = cameraManager.getCurrentCamera();
const environment = new Builder(50, 50); // Define as dimensões do plano

scene.add(environment.getBuilder());
window.addEventListener('resize', () => {
    onWindowResize(camera, renderer);
});


function animate() {
    requestAnimationFrame(animate);
    cameraManager.update(); // Atualiza a câmera ativa
    cameraManager.addMovementListeners();
    //cameraManager.keyboardUpdate();
    renderer.render(scene, cameraManager.getCurrentCamera());
}

animate();
