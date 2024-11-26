import * as THREE from 'three';
import {
    initRenderer,
    initDefaultBasicLight,
    setDefaultMaterial,
    InfoBox,
    onWindowResize,
} from "../libs/util/util.js";

export class Voxel {

    constructor() {

        this.voxel;
        this.voxelGeometry = new THREE.BoxGeometry(2, 2, 2);

    }

    builVoxel1(x, y, z) {

        const voxel1Material = setDefaultMaterial(0x00ff00);

        this.voxel = new THREE.Mesh(this.voxelGeometry, voxel1Material);
        this.voxel.position.x = x;
        this.voxel.position.y = y;
        this.voxel.position.z = z;
        this.voxel.name = `voxel-${x}-${y}-${z}`;
    }

    buildVoxel2(x, y, z) {

        const voxel2Material = setDefaultMaterial(0xffa500);

        this.voxel = new THREE.Mesh(this.voxelGeometry, voxel2Material);
        this.voxel.position.x = x;
        this.voxel.position.y = y;
        this.voxel.position.z = z;
        this.voxel.name = `voxel-${x}-${y}-${z}`;

    }

    buildVoxel3(x, y, z) {

        const voxel3Material = setDefaultMaterial(0xd3d3d3);

        this.voxel = new THREE.Mesh(this.voxelGeometry, voxel3Material);
        this.voxel.position.x = x;
        this.voxel.position.y = y;
        this.voxel.position.z = z;
        this.voxel.name = `voxel-${x}-${y}-${z}`;
    }

    buildVoxel4(x, y, z) {

        const voxel4Material = setDefaultMaterial(0x654321);

        this.voxel = new THREE.Mesh(this.voxelGeometry, voxel4Material);
        this.voxel.position.x = x;
        this.voxel.position.y = y;
        this.voxel.position.z = z;
        this.voxel.name = `voxel-${x}-${y}-${z}`;

    }

    buildVoxel5(x, y, z) {

        const voxel5Material = setDefaultMaterial(0x056105);

        this.voxel = new THREE.Mesh(this.voxelGeometry, voxel5Material);
        this.voxel.position.x = x;
        this.voxel.position.y = y;
        this.voxel.position.z = z;
        this.voxel.name = `voxel-${x}-${y}-${z}`;
    }

    getFoundation() {
        return this.voxel;
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

// Criação dos voxels
const voxel1 = new Voxel();
voxel1.builVoxel1();
voxel1.getFoundation().position.set(-6, 2.5, 0);
scene.add(voxel1.getFoundation());

const voxel2 = new Voxel();
voxel2.buildVoxel2();
voxel2.getFoundation().position.set(-3, 2.5, 0);
scene.add(voxel2.getFoundation());

const voxel3 = new Voxel();
voxel3.buildVoxel3();
voxel3.getFoundation().position.set(0, 2.5, 0);
scene.add(voxel3.getFoundation());

const voxel4 = new Voxel();
voxel4.buildVoxel4();
voxel4.getFoundation().position.set(3, 2.5, 0);
scene.add(voxel4.getFoundation());

const voxel5 = new Voxel();
voxel5.buildVoxel5();
voxel5.getFoundation().position.set(6, 2.5, 0);
scene.add(voxel5.getFoundation());

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