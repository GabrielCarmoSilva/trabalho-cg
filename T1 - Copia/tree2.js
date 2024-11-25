import * as THREE from 'three';
import { initRenderer, initDefaultBasicLight, setDefaultMaterial,
InfoBox, onWindowResize, } from "../libs/util/util.js";
import { Voxel } from "./voxel.js"; // Importando a classe Voxel


export class Tree2 {

    constructor() {

        //caule
        this.foundation = new Voxel();
        this.foundation2 = new Voxel();
        this.foundation3 = new Voxel();
        this.foundation4 = new Voxel();
        this.foundation5 = new Voxel();
        this.foundation6 = new Voxel();
        this.foundation7 = new Voxel();
        this.foundation8 = new Voxel();
        this.foundation9 = new Voxel();
        this.foundation10 = new Voxel();
        this.foundation11 = new Voxel();
        this.foundation12 = new Voxel();
        this.foundation13 = new Voxel();
        this.foundation14 = new Voxel();
        this.foundation15 = new Voxel();
        //folhas
        this.topHigh1 = new Voxel();
        this.topHigh2 = new Voxel();
        this.topHigh3 = new Voxel();
        this.topHigh4 = new Voxel();
        this.topHigh5 = new Voxel();
        this.topHigh6 = new Voxel();

    }

    buildTree() {

        // Criar a base/tronco da árvore com Voxel
        this.foundation.buildVoxel4();  // Utiliza o Voxel com a cor do tronco (marrom escuro)
        this.foundation.getFoundation().position.set(0, 2.5, 0); // Posição do tronco
        this.foundation.getFoundation().scale.set(1, 4, 1); // Ajustar escala para o tronco


        // Criar o pé do tronco da árvore com Voxel
        this.foundation2.buildVoxel4();  // Utiliza o Voxel com a cor do tronco (marrom escuro)
        this.foundation2.getFoundation().position.set(this.foundation.getFoundation().position.x, this.foundation.getFoundation().position.y - 3.4, this.foundation.getFoundation().position.z); // Posição do tronco
        this.foundation2.getFoundation().scale.set(1.4, 0.2, 1); // Ajustar escala para o tronco


        // Criar o pé do tronco da árvore com Voxel
        this.foundation3.buildVoxel4();  // Utiliza o Voxel com a cor do tronco (marrom escuro)
        this.foundation3.getFoundation().position.set(this.foundation.getFoundation().position.x, this.foundation.getFoundation().position.y - 3.4, this.foundation.getFoundation().position.z); // Posição do tronco
        this.foundation3.getFoundation().scale.set(1, 0.2, 1.5); // Ajustar escala para o tronco


        // Criar o galho em x da árvore com Voxel
        this.foundation4.buildVoxel4();  // Utiliza o Voxel com a cor do tronco (marrom escuro)
        this.foundation4.getFoundation().position.set(this.foundation.getFoundation().position.x, this.foundation.getFoundation().position.y - 1.6, this.foundation.getFoundation().position.z); // Posição do tronco
        this.foundation4.getFoundation().scale.set(3, 0.1, 0.3); // Ajustar escala para o tronco


        // Criar o galho em z da árvore com Voxel
        this.foundation5.buildVoxel4();  // Utiliza o Voxel com a cor do tronco (marrom escuro)
        this.foundation5.getFoundation().position.set(this.foundation.getFoundation().position.x, this.foundation.getFoundation().position.y - 1.6, this.foundation.getFoundation().position.z); // Posição do tronco
        this.foundation5.getFoundation().scale.set(0.3, 0.1, 3); // Ajustar escala para o tronco


        // Criar galho da árvore com Voxel
        this.foundation6.buildVoxel4();  // Utiliza o Voxel com a cor do tronco (marrom escuro)
        this.foundation6.getFoundation().position.set(this.foundation.getFoundation().position.x + 3, this.foundation.getFoundation().position.y - 1.4, this.foundation.getFoundation().position.z); // Posição do tronco
        this.foundation6.getFoundation().scale.set(0.3, 0.3, 0.3); // Ajustar escala para o tronco


        // Criar galho da árvore com Voxel
        this.foundation7.buildVoxel4();  // Utiliza o Voxel com a cor do tronco (marrom escuro)
        this.foundation7.getFoundation().position.set(this.foundation.getFoundation().position.x - 3, this.foundation.getFoundation().position.y - 1.35, this.foundation.getFoundation().position.z); // Posição do tronco
        this.foundation7.getFoundation().scale.set(0.3, 0.35, 0.3); // Ajustar escala para o tronco


        // Criar galho da árvore com Voxel
        this.foundation8.buildVoxel4();  // Utiliza o Voxel com a cor do tronco (marrom escuro)
        this.foundation8.getFoundation().position.set(this.foundation.getFoundation().position.x - 4, this.foundation.getFoundation().position.y - 1.13, this.foundation.getFoundation().position.z); // Posição do tronco
        this.foundation8.getFoundation().scale.set(1, 0.06, 0.3); // Ajustar escala para o tronco

        // Criar a galho da árvore com Voxel
        this.foundation9.buildVoxel4();  // Utiliza o Voxel com a cor do tronco (marrom escuro)
        this.foundation9.getFoundation().position.set(this.foundation.getFoundation().position.x + 4, this.foundation.getFoundation().position.y - 1.2, this.foundation.getFoundation().position.z); // Posição do tronco
        this.foundation9.getFoundation().scale.set(1, 0.06, 0.3); // Ajustar escala para o tronco

        // Criar a galho da árvore com Voxel
        this.foundation10.buildVoxel4();  // Utiliza o Voxel com a cor do tronco (marrom escuro)
        this.foundation10.getFoundation().position.set(this.foundation.getFoundation().position.x - 4.78, this.foundation.getFoundation().position.y - 0.9, this.foundation.getFoundation().position.z); // Posição do tronco
        this.foundation10.getFoundation().scale.set(0.2, 0.2, 0.3); // Ajustar escala para o tronco

        // Criar a galho da árvore com Voxel
        this.foundation11.buildVoxel4();  // Utiliza o Voxel com a cor do tronco (marrom escuro)
        this.foundation11.getFoundation().position.set(this.foundation.getFoundation().position.x + 4.78, this.foundation.getFoundation().position.y - 1, this.foundation.getFoundation().position.z); // Posição do tronco
        this.foundation11.getFoundation().scale.set(0.2, 0.2, 0.3); // Ajustar escala para o tronco

        // Criar galho da árvore com Voxel
        this.foundation12.buildVoxel4();  // Utiliza o Voxel com a cor do tronco (marrom escuro)
        this.foundation12.getFoundation().position.set(this.foundation.getFoundation().position.x, this.foundation.getFoundation().position.y - 1.1, this.foundation.getFoundation().position.z + 3); // Posição do tronco
        this.foundation12.getFoundation().scale.set(0.3, 0.6, 0.3); // Ajustar escala para o tronco

        // Criar galho da árvore com Voxel
        this.foundation13.buildVoxel4();  // Utiliza o Voxel com a cor do tronco (marrom escuro)
        this.foundation13.getFoundation().position.set(this.foundation.getFoundation().position.x, this.foundation.getFoundation().position.y - 1.1, this.foundation.getFoundation().position.z - 3); // Posição do tronco
        this.foundation13.getFoundation().scale.set(0.3, 0.6, 0.3); // Ajustar escala para o tronco

        // Criar galho da árvore com Voxel
        this.foundation14.buildVoxel4();  // Utiliza o Voxel com a cor do tronco (marrom escuro)
        this.foundation14.getFoundation().position.set(this.foundation.getFoundation().position.x, this.foundation.getFoundation().position.y - 0.7, this.foundation.getFoundation().position.z - 2); // Posição do tronco
        this.foundation14.getFoundation().scale.set(0.3, 0.1, 1); // Ajustar escala para o tronco

        // Criar galho da árvore com Voxel
        this.foundation15.buildVoxel4();  // Utiliza o Voxel com a cor do tronco (marrom escuro)
        this.foundation15.getFoundation().position.set(this.foundation.getFoundation().position.x, this.foundation.getFoundation().position.y - 0.6, this.foundation.getFoundation().position.z - 1); // Posição do tronco
        this.foundation15.getFoundation().scale.set(0.3, 0.2, 0.3); // Ajustar escala para o tronco

        // Criar folhas da árvore com Voxel
        this.topHigh1.buildVoxel5();  // Utiliza o Voxel com a cor da folha (verde)
        this.topHigh1.getFoundation().position.set(this.foundation.getFoundation().position.x, this.foundation.getFoundation().position.y - 0.1, this.foundation.getFoundation().position.z - 1); // Posição da folha
        this.topHigh1.getFoundation().scale.set(2, 0.3, 2); // Ajustar escala para a folha

        // Criar folhas da árvore com Voxel
        this.topHigh2.buildVoxel5();  // Utiliza o Voxel com a cor da folha (verde)
        this.topHigh2.getFoundation().position.set(this.foundation.getFoundation().position.x, this.foundation.getFoundation().position.y - 0.2, this.foundation.getFoundation().position.z + 3.5); // Posição da folha
        this.topHigh2.getFoundation().scale.set(2, 0.3, 2); // Ajustar escala para a folha

        // Criar folhas da árvore com Voxel
        this.topHigh3.buildVoxel5();  // Utiliza o Voxel com a cor da folha (verde)
        this.topHigh3.getFoundation().position.set(this.foundation.getFoundation().position.x, this.foundation.getFoundation().position.y - 0.3, this.foundation.getFoundation().position.z - 3); // Posição da folha
        this.topHigh3.getFoundation().scale.set(1, 0.2, 1); // Ajustar escala para a folha

        // Criar folhas da árvore com Voxel
        this.topHigh4.buildVoxel5();  // Utiliza o Voxel com a cor da folha (verde)
        this.topHigh4.getFoundation().position.set(this.foundation.getFoundation().position.x + 3, this.foundation.getFoundation().position.y - 0.9, this.foundation.getFoundation().position.z); // Posição da folha
        this.topHigh4.getFoundation().scale.set(1, 0.2, 1); // Ajustar escala para a folha

        // Criar folhas da árvore com Voxel
        this.topHigh5.buildVoxel5();  // Utiliza o Voxel com a cor da folha (verde)
        this.topHigh5.getFoundation().position.set(this.foundation.getFoundation().position.x - 4, this.foundation.getFoundation().position.y - 0.5, this.foundation.getFoundation().position.z); // Posição da folha
        this.topHigh5.getFoundation().scale.set(2, 0.5, 2); // Ajustar escala para a folha

        // Criar folhas da árvore com Voxel
        this.topHigh6.buildVoxel5();  // Utiliza o Voxel com a cor da folha (verde)
        this.topHigh6.getFoundation().position.set(this.foundation.getFoundation().position.x + 5, this.foundation.getFoundation().position.y - 0.5, this.foundation.getFoundation().position.z); // Posição da folha
        this.topHigh6.getFoundation().scale.set(1.5, 0.4, 1.5); // Ajustar escala para a folha

        // Adiciona todos os componentes da árvore (tronco e folhas) à cena
        this.foundation.getFoundation().add(this.foundation2.getFoundation());
        this.foundation.getFoundation().add(this.foundation3.getFoundation());
        this.foundation.getFoundation().add(this.foundation4.getFoundation());
        this.foundation.getFoundation().add(this.foundation5.getFoundation());
        this.foundation.getFoundation().add(this.foundation6.getFoundation());
        this.foundation.getFoundation().add(this.foundation7.getFoundation());
        this.foundation.getFoundation().add(this.foundation8.getFoundation());
        this.foundation.getFoundation().add(this.foundation9.getFoundation());
        this.foundation.getFoundation().add(this.foundation10.getFoundation());
        this.foundation.getFoundation().add(this.foundation11.getFoundation());
        this.foundation.getFoundation().add(this.foundation12.getFoundation());
        this.foundation.getFoundation().add(this.foundation13.getFoundation());
        this.foundation.getFoundation().add(this.foundation14.getFoundation());
        this.foundation.getFoundation().add(this.foundation15.getFoundation());
        this.foundation.getFoundation().add(this.topHigh1.getFoundation());
        this.foundation.getFoundation().add(this.topHigh2.getFoundation());
        this.foundation.getFoundation().add(this.topHigh3.getFoundation());
        this.foundation.getFoundation().add(this.topHigh4.getFoundation());
        this.foundation.getFoundation().add(this.topHigh5.getFoundation());
        this.foundation.getFoundation().add(this.topHigh6.getFoundation());
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
const tree = new Tree2();
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