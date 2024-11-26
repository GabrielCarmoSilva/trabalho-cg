import * as THREE from 'three';
import { initRenderer, initDefaultBasicLight, setDefaultMaterial,
InfoBox, onWindowResize, } from "../libs/util/util.js";
import { Voxel } from "./voxel.js"; // Importando a classe Voxel


export class Tree3 {

    constructor() {

        this.foundation = new Voxel();
        this.topHigh1 = new Voxel();
        this.topHigh2 = new Voxel();
        this.topHigh3 = new Voxel();
        this.topHigh3 = new Voxel();
        this.topHigh4 = new Voxel();
        this.topHigh5 = new Voxel();

    }

    buildTree() {

        // Criar a base/tronco da árvore com Voxel
        this.foundation.buildVoxel4();  // Utiliza o Voxel com a cor do tronco (marrom escuro)
        this.foundation.getFoundation().position.set(0, 2.5, 0); // Posição do tronco
        this.foundation.getFoundation().scale.set(0.6, 6, 0.6); // Ajustar escala para o tronco

        // Criar folhas (topLow)
        this.topHigh1.buildVoxel5();  // Utiliza o Voxel com cor cinza claro para representar folhas
        this.topHigh1.getFoundation().position.set(this.foundation.getFoundation().position.x, this.foundation.getFoundation().position.y - 1.2, this.foundation.getFoundation().position.z); // Posição das folhas inferiores
        this.topHigh1.getFoundation().scale.set(3, 0.3, 3); // Ajustar escala para folhas inferiores

        // Criar folhas (topLow)
        this.topHigh2.buildVoxel5();  // Utiliza o Voxel com cor cinza claro para representar folhas
        this.topHigh2.getFoundation().position.set(this.foundation.getFoundation().position.x+3, this.foundation.getFoundation().position.y - 1.2, this.foundation.getFoundation().position.z); // Posição das folhas inferiores
        this.topHigh2.getFoundation().scale.set(2, 0.2, 2); // Ajustar escala para folhas inferiores

        // Criar folhas (topLow)
        this.topHigh3.buildVoxel5();  // Utiliza o Voxel com cor cinza claro para representar folhas
        this.topHigh3.getFoundation().position.set(this.foundation.getFoundation().position.x-3, this.foundation.getFoundation().position.y - 1.2, this.foundation.getFoundation().position.z); // Posição das folhas inferiores
        this.topHigh3.getFoundation().scale.set(2, 0.2, 2); // Ajustar escala para folhas inferiores

        // Criar folhas (topLow)
        this.topHigh4.buildVoxel5();  // Utiliza o Voxel com cor cinza claro para representar folhas
        this.topHigh4.getFoundation().position.set(this.foundation.getFoundation().position.x, this.foundation.getFoundation().position.y - 1.2, this.foundation.getFoundation().position.z+3); // Posição das folhas inferiores
        this.topHigh4.getFoundation().scale.set(2, 0.2, 2); // Ajustar escala para folhas inferiores

        // Criar folhas (topLow)
        this.topHigh5.buildVoxel5();  // Utiliza o Voxel com cor cinza claro para representar folhas
        this.topHigh5.getFoundation().position.set(this.foundation.getFoundation().position.x, this.foundation.getFoundation().position.y - 1.2, this.foundation.getFoundation().position.z-3); // Posição das folhas inferiores
        this.topHigh5.getFoundation().scale.set(2, 0.2, 2); // Ajustar escala para folhas inferiores


        // Adiciona todos os componentes da árvore (tronco e folhas) à cena
        this.foundation.getFoundation().add(this.topHigh1.getFoundation());
        this.foundation.getFoundation().add(this.topHigh2.getFoundation());
        this.foundation.getFoundation().add(this.topHigh3.getFoundation());
        this.foundation.getFoundation().add(this.topHigh4.getFoundation());
        this.foundation.getFoundation().add(this.topHigh5.getFoundation());

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
const tree = new Tree3();
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