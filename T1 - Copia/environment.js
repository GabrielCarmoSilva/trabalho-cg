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

export class Environment {
    
    constructor(height, width) {
        
       
        this.height = height;
        this.width = width;
        console.log('Construindo ambiente...');

        // Recebe apenas o plane (grid é adicionado automaticamente ao plane)
        this.plane = createGroundPlaneWired(width, height);

        // Como o grid foi adicionado ao plane, acessamos diretamente a propriedade `children` do plane.
        this.grid = this.plane.children[0]; // O grid será o primeiro filho do plane.

        this.plane.material.transparent = true;
        this.plane.material.opacity = 0;

        this.grid.material.transparent = true;
        this.grid.material.opacity = true;

    }

    buildPlan() {
            // Cria um novo voxel
    const voxel = new Voxel();
    voxel.builVoxel1();
    voxel.getFoundation().position.set(0, 0, 0);
    // Adiciona o voxel ao plano
    this.plane.add(voxel.getFoundation());

    }

    // Function to add a custom tree
    addCustomTree(x, z) {
        const tree = new Tree1(); // Instanciando a classe Tree
        tree.buildTree(); // Construindo a árvore

        // Posicione a árvore no local desejado
        tree.getFoundation().position.set(x, 1.6, z); // Define a posição (base em nível N0)
        tree.getFoundation().scale.set(0.1, 0.1, 0.1);

        this.plane.add(tree.getFoundation()); // Adiciona a árvore à cena
    }

    // Function to add a custom tree2
    addCustomTree2(x, z) {
        const tree = new Tree2(); // Instanciando a classe Tree
        tree.buildTree(); // Construindo a árvore

        // Posicione a árvore no local desejado
        tree.getFoundation().position.set(x, 1.6, z); // Define a posição (base em nível N0)
        tree.getFoundation().scale.set(0.1, 0.1, 0.1);

        this.plane.add(tree.getFoundation()); // Adiciona a árvore à cena
    }

    // Function to add a custom tree3
    addCustomTree3(x, z) {
        const tree = new Tree3(); // Instanciando a classe Tree
        tree.buildTree(); // Construindo a árvore

        // Posicione a árvore no local desejado
        tree.getFoundation().position.set(x, 1.6, z); // Define a posição (base em nível N0)
        tree.getFoundation().scale.set(0.1, 0.1, 0.1);

        this.plane.add(tree.getFoundation()); // Adiciona a árvore à cena
    }

    getEnvironment() {
        return this.plane;
    }

}





// Configuração inicial
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Adiciona luz à cena
const light = initDefaultBasicLight(scene);
light.position.set(10, 10, 10);
scene.add(light);

// Cria o ambiente e adiciona o plano à cena
const environment = new Environment(35, 35); // Dimensões do plano
environment.buildPlan();
const groundPlane = environment.getEnvironment(); // Obter o plano criado
scene.add(groundPlane);


// Configuração da câmera
camera.position.z = 20;
camera.position.y = 10;

// Adiciona controles de câmera
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Suaviza o movimento da câmera
controls.dampingFactor = 0.05; // Ajuste da suavidade
controls.screenSpacePanning = true; // Permite transladação
controls.maxPolarAngle = Math.PI / 2; // Limita o ângulo para evitar que a câmera passe por baixo da cena

// Função de animação
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Atualiza os controles
    renderer.render(scene, camera);
}

// Ajustar a tela ao redimensionar
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Iniciar animação
animate();



/*
export class Environment {
    
    constructor(height, width) {
        
        this.height = height;
        this.width = width;
        console.log('Construindo ambiente...');

        // Recebe apenas o plane (grid é adicionado automaticamente ao plane)
        this.plane = createGroundPlaneWired(width, height);

        this.plane.material.transparent = true;
        this.plane.material.opacity = 0;

    }

    buildPlan() {
        this.groundColor = 0x00ff00; // N0: Green
        this.level1Color = 0xffa500; // N1: Orange
        this.level2Color = 0xd3d3d3; // N2: Light Gray

        // Define the environment layout (35x35 grid)
        const layout = [
            [2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],

        ];

        /*
        // Iterate through the grid and place voxels
        for (let z = 0; z < layout.length; z++) {
            for (let x = 0; x < layout[z].length; x++) {
                const level = layout[z][x];
                for (let y = 0; y <= level; y++) { // Preenche todos os níveis até o atual
                    let color;
                    if (y === 0) color = this.groundColor; // Cor do nível 0
                    else if (y === 1) color = this.level1Color; // Cor do nível 1
                    else if (y === 2) color = this.level2Color; // Cor do nível 2
                    this.createVoxel(x - 5, y, z - 5, color);
                }
            }
        }

        // Iterate through the grid and place voxels
        for (let z = 0; z < layout.length; z++) {
            for (let x = 0; x < layout[z].length; x++) {
                const level = layout[z][x];
                if (level === 0) this.createVoxel(x - 5, 0, z - 5, this.groundColor); // N0
                else if (level === 1) this.createVoxel(x - 5, 1, z - 5, this.level1Color); // N1
                else if (level === 2) this.createVoxel(x - 5, 2, z - 5, this.level2Color); // N2
            }
        }

        // Add custom tree to the environment
        this.addCustomTree(20, -1);
        this.addCustomTree(7, +2);
        this.addCustomTree2(6, +14);
        this.addCustomTree2(23, +10);
        this.addCustomTree3(2, +24);
        this.addCustomTree3(19, +21);
    }

    // Function to add a custom tree
    addCustomTree(x, z) {
        const tree = new Tree1(); // Instanciando a classe Tree
        tree.buildTree1(); // Construindo a árvore

        // Posicione a árvore no local desejado
        tree.getFoundation1().position.set(x, 1.6, z); // Define a posição (base em nível N0)
        tree.getFoundation1().scale.set(0.1, 0.1, 0.1);

        this.plane.add(tree.getFoundation1()); // Adiciona a árvore à cena
    }

    // Function to add a custom tree2
    addCustomTree2(x, z) {
        const tree = new Tree2(); // Instanciando a classe Tree
        tree.buildTree2(); // Construindo a árvore

        // Posicione a árvore no local desejado
        tree.getFoundation2().position.set(x, 1.6, z); // Define a posição (base em nível N0)
        tree.getFoundation2().scale.set(0.1, 0.1, 0.1);

        this.plane.add(tree.getFoundation2()); // Adiciona a árvore à cena
    }

    // Function to add a custom tree3
    addCustomTree3(x, z) {
        const tree = new Tree3(); // Instanciando a classe Tree
        tree.buildTree3(); // Construindo a árvore

        // Posicione a árvore no local desejado
        tree.getFoundation3().position.set(x, 1.6, z); // Define a posição (base em nível N0)
        tree.getFoundation3().scale.set(0.1, 0.1, 0.1);

        this.plane.add(tree.getFoundation3()); // Adiciona a árvore à cena
    }

    // Function to create a voxel
    createVoxel(x, y, z, color) {
        let voxelGeometry = new THREE.BoxGeometry(1, 1, 1);
        let voxelMaterial = setDefaultMaterial(color);
        let voxel = new THREE.Mesh(voxelGeometry, voxelMaterial);
        voxel.position.set(x, y, z);
        this.plane.add(voxel);
        return voxel;
    }

    getEnvironment() {
        return this.plane;
    }

}
*/