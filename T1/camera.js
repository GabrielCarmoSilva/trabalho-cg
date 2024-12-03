import * as THREE from 'three';
import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';
import { PointerLockControls } from '../build/jsm/controls/PointerLockControls.js';


export class Camera {

    constructor(renderer, scene) {
        console.log("Inicializando câmeras...");
        this.renderer = renderer;
        this.scene = scene;

        // Configurações comuns para ambas as câmeras
        this.fov = 75;
        this.aspect = window.innerWidth / window.innerHeight;
        this.near = 0.1;
        this.far = 500;

        // Câmera de inspeção (OrbitControls)
        this.inspectionCamera = new THREE.PerspectiveCamera(this.fov, this.aspect, this.near, this.far);
        this.inspectionCamera.position.set(0, 8, 15);
        this.orbitControls = new OrbitControls(this.inspectionCamera, this.renderer.domElement);
        // Efeito de amortecimento nos controles das câmeras
        //this.orbitControls.enableDamping = true;

        // Câmera de primeira pessoa (PointerLockControls)
        this.firstPersonCamera = new THREE.PerspectiveCamera(this.fov, this.aspect, this.near, this.far);
        this.firstPersonCamera.position.set(0, 3, 9);

        this.pointerLockControls = new PointerLockControls(this.firstPersonCamera, this.renderer.domElement);

        // Clona a posição anterior de cada câmera
        this.previousPosition = {
            inspection: this.inspectionCamera.position.clone(),
            firstPerson: this.firstPersonCamera.position.clone(),
        };

        // Estado inicial da câmera
        this.currentCamera = this.inspectionCamera;
        this.isInspectionMode = true;

        // Alternar câmeras com a tecla 'C'
        window.addEventListener('keydown', (event) => {
            if (event.key.toLowerCase() === 'c') {
                this.toggleCamera();
            }
        });

        // Listener para ativar o PointerLockControls
        window.addEventListener('click', () => {
            if (!this.isInspectionMode) {
                this.pointerLockControls.lock();
            }
        });

        // Chama a função para adicionar listeners de movimento
        this.addMovementListeners();
    }

    toggleCamera() {
        if (this.isInspectionMode) {
            // Alterna para câmera de primeira pessoa
            this.previousPosition.inspection.copy(this.inspectionCamera.position);
            this.firstPersonCamera.position.copy(this.previousPosition.firstPerson);
            this.currentCamera = this.firstPersonCamera;
            this.isInspectionMode = false;
            console.log('Modo: Primeira Pessoa');
        } else {
            // Alterna para câmera de inspeção
            this.previousPosition.firstPerson.copy(this.firstPersonCamera.position);
            this.inspectionCamera.position.copy(this.previousPosition.inspection);
            this.currentCamera = this.inspectionCamera;
            this.isInspectionMode = true;
            console.log('Modo: Inspeção');
        }
    }

    update() {
        if (this.isInspectionMode) {
            // Atualiza os controles de inspeção
            this.orbitControls.update();
        } else {
            // Atualiza a posição da câmera em primeira pessoa
            const moveSpeed = 0.1; // Velocidade de movimento
            const direction = new THREE.Vector3();
            const right = new THREE.Vector3();

            // Calcula a direção para frente e para a direita
            this.firstPersonCamera.getWorldDirection(direction); // Direção para frente
            //direction.y = 0; // Ignora o componente Y para evitar movimentação vertical
            direction.normalize();

            this.firstPersonCamera.getWorldDirection(right);
            right.crossVectors(this.firstPersonCamera.up, direction); // Direção para a direita
            right.normalize();

            if (this.moveForward) {
                this.firstPersonCamera.position.add(direction.multiplyScalar(moveSpeed));
            }
            if (this.moveBackward) {
                this.firstPersonCamera.position.add(direction.multiplyScalar(-moveSpeed));
            }
            if (this.moveLeft) {
                this.firstPersonCamera.position.add(right.multiplyScalar(moveSpeed));
            }
            if (this.moveRight) {
                this.firstPersonCamera.position.add(right.multiplyScalar(-moveSpeed));
            }
        }
    }

    getCurrentCamera() {
        return this.currentCamera;
    }

    // Listeners de movimento para câmera FPV
    addMovementListeners() {
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;

        window.addEventListener('keydown', (event) => {
            if (event.key === 'w') this.moveForward = true;
            if (event.key === 's') this.moveBackward = true;
            if (event.key === 'a') this.moveLeft = true;
            if (event.key === 'd') this.moveRight = true;
        });

        window.addEventListener('keyup', (event) => {
            if (event.key === 'w') this.moveForward = false;
            if (event.key === 's') this.moveBackward = false;
            if (event.key === 'a') this.moveLeft = false;
            if (event.key === 'd') this.moveRight = false;
        });
    }
}