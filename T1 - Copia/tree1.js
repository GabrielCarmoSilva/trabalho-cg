import * as THREE from 'three';
import { initRenderer, initDefaultBasicLight, setDefaultMaterial,
InfoBox, onWindowResize, } from "../libs/util/util.js";
import { Voxel } from "./voxel.js"; // Importando a classe Voxel


export class Tree1 {

    constructor() {

        this.foundation = new Voxel();
        this.topLow = new Voxel();
        this.topMedium = new Voxel();
        this.topHigh1 = new Voxel();
        this.topHigh2 = new Voxel();
        this.topHigh3 = new Voxel();

    }

    buildTree() {

        // Criar a base/tronco da árvore com Voxel
        this.foundation.buildVoxel4();  // Utiliza o Voxel com a cor do tronco (marrom escuro)
        this.foundation.getFoundation().position.set(0, 2.5, 0); // Posição do tronco
        this.foundation.getFoundation().scale.set(0.5, 1, 0.5); // Ajustar escala para o tronco

        // Criar a parte inferior das folhas (topLow)
        this.topLow.buildVoxel5();  // Utiliza o Voxel com cor cinza claro para representar folhas
        this.topLow.getFoundation().position.set(this.foundation.getFoundation().position.x, this.foundation.getFoundation().position.y - 1, this.foundation.getFoundation().position.z); // Posição das folhas inferiores
        this.topLow.getFoundation().scale.set(5, 1, 5); // Ajustar escala para folhas inferiores

        // Criar a parte média das folhas (topMedium)
        this.topMedium.buildVoxel5();  // Cor das folhas médias
        this.topMedium.getFoundation().position.set(this.foundation.getFoundation().position.x, this.foundation.getFoundation().position.y + 0.5, this.foundation.getFoundation().position.z); // Posição das folhas médias
        this.topMedium.getFoundation().scale.set(4, 1, 4); // Ajustar escala para folhas médias

        // Criar a parte superior das folhas (topHigh1, topHigh2, topHigh3)
        this.topHigh1.buildVoxel5();  // Cor das folhas altas
        this.topHigh1.getFoundation().position.set(this.foundation.getFoundation().position.x, this.foundation.getFoundation().position.y + 2, this.foundation.getFoundation().position.z); // Posição das folhas altas
        this.topHigh1.getFoundation().scale.set(3, 1, 3); // Ajuste da escala

        this.topHigh2.buildVoxel5();
        this.topHigh2.getFoundation().position.set(this.foundation.getFoundation().position.x, this.foundation.getFoundation().position.y + 3.5, this.foundation.getFoundation().position.z); // Posição do segundo conjunto de folhas altas
        this.topHigh2.getFoundation().scale.set(2, 1, 2); // Ajustar a escala para dar forma

        this.topHigh3.buildVoxel5();
        this.topHigh3.getFoundation().position.set(this.foundation.getFoundation().position.x, this.foundation.getFoundation().position.y + 4.6, this.foundation.getFoundation().position.z); // Posição do terceiro conjunto de folhas
        this.topHigh3.getFoundation().scale.set(1, 1, 1); // Ajuste da escala para topo da árvore


        // Adiciona todos os componentes da árvore (tronco e folhas) à cena
        this.foundation.getFoundation().add(this.topLow.getFoundation());
        this.foundation.getFoundation().add(this.topMedium.getFoundation());
        this.foundation.getFoundation().add(this.topHigh1.getFoundation());
        this.foundation.getFoundation().add(this.topHigh2.getFoundation());
        this.foundation.getFoundation().add(this.topHigh3.getFoundation());
    }

    getFoundation() {

        return this.foundation.getFoundation();

    }
}



/*

import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';

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

// Criação da árvore
const tree = new Tree1();
tree.buildTree();
scene.add(tree.getFoundation());

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
*/