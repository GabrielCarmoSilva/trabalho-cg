import * as THREE from 'three';
import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';
import { PointerLockControls } from '../build/jsm/controls/PointerLockControls.js';
import KeyboardState from '../libs/util/KeyboardState.js'

/*
Utilizaremos neste trabalho dois tipos de câmera: uma câmera de inspeção (orbitControls) e uma câmera em primeira
pessoa (first person camera). Em nosso repositório, utilize o projeto exampleFirstPerson como base para a
implementação desta segunda câmera. As câmeras serão alternadas pressionando a tecla ‘C’ do teclado. Deve-se
armazenar a posição anterior de cada câmera ao alternar entre os modos para que, ao voltar para a câmera anterior, a
posição seja a mesma.
*/

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
        this.inspectionCamera.position.set(0, 30, -70);
        this.inspectionCamera.up.set(0, 1, 0)
        this.inspectionCamera.lookAt(new THREE.Vector3(0, 0, 1))
        this.orbitControls = new OrbitControls(this.inspectionCamera, this.renderer.domElement);
        // Efeito de amortecimento nos controles das câmeras
        //this.orbitControls.enableDamping = true;

        // Câmera de primeira pessoa (PointerLockControls)
        this.firstPersonCamera = new THREE.PerspectiveCamera(this.fov, this.aspect, this.near, this.far);
        this.firstPersonCamera.position.set(0, 13, 30);
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
            const moveSpeed = 0.5; // Velocidade de movimento
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
            // Movimentos verticais
            if (this.moveUp) { // Subir (espaço)
                this.firstPersonCamera.position.y += moveSpeed;
            }
            if (this.moveDown) { // Descer (Shift)
                this.firstPersonCamera.position.y -= moveSpeed;
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
        this.moveUp = false;
        this.moveDown = false;

        window.addEventListener('keydown', (event) => {
            if (event.key === 'w') this.moveForward = true;
            if (event.key === 's') this.moveBackward = true;
            if (event.key === 'a') this.moveLeft = true;
            if (event.key === 'd') this.moveRight = true;
            if (event.key === ' ') this.moveUp = true;
            if (event.key === 'z') this.moveDown = true;
        });

        window.addEventListener('keyup', (event) => {
            if (event.key === 'w') this.moveForward = false;
            if (event.key === 's') this.moveBackward = false;
            if (event.key === 'a') this.moveLeft = false;
            if (event.key === 's') this.moveRight = false;
            if (event.key === ' ') this.moveUp = true;
            if (event.key === 'z') this.moveDown = false;
        });
    }
}

/*
// Adaptação da câmera de primeira pessoa com cameraHolder
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
        this.inspectionCamera.position.set(0, 30, -70);
        this.orbitControls = new OrbitControls(this.inspectionCamera, this.renderer.domElement);
        this.orbitControls.enableDamping = true;

        // Câmera de primeira pessoa com cameraHolder
        this.firstPersonCamera = new THREE.PerspectiveCamera(this.fov, this.aspect, this.near, this.far);
        this.firstPersonCamera.position.set(0, 10, 10);
        this.firstPersonCamera.up.set(0, 1, 0);

        this.cameraHolder = new THREE.Object3D();
        this.cameraHolder.add(this.firstPersonCamera);
        this.scene.add(this.cameraHolder);

        // Clona a posição anterior de cada câmera
        this.previousPosition = {
            inspection: this.inspectionCamera.position.clone(),
            firstPerson: this.cameraHolder.position.clone(),
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

        // Configurar listener de teclado
        this.keyboard = new KeyboardState();
    }

    toggleCamera() {
        if (this.isInspectionMode) {
            // Alterna para câmera de primeira pessoa
            this.previousPosition.inspection.copy(this.inspectionCamera.position);
            this.cameraHolder.position.copy(this.previousPosition.firstPerson);
            this.currentCamera = this.firstPersonCamera;
            this.isInspectionMode = false;
            console.log('Modo: Primeira Pessoa');
        } else {
            // Alterna para câmera de inspeção
            this.previousPosition.firstPerson.copy(this.cameraHolder.position);
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
            // Atualiza a câmera de primeira pessoa
            this.keyboardUpdate();
        }
    }

    keyboardUpdate() {
        this.keyboard.update();
        // Translações do cameraHolder
        if (this.keyboard.pressed("W")) this.cameraHolder.translateZ(-0.1); // Frente
        if (this.keyboard.pressed("S")) this.cameraHolder.translateZ(0.1);  // Trás
        if (this.keyboard.pressed("A")) this.cameraHolder.translateX(-0.1); // Esquerda
        if (this.keyboard.pressed("D")) this.cameraHolder.translateX(0.1);  // Direita
        if (this.keyboard.pressed(" "))  this.cameraHolder.position.y += 0.1; // Subir
        if (this.keyboard.pressed("Shift"))  this.cameraHolder.position.y -= 0.1; // Descer
        

        // Rotações do cameraHolder
        let rotationAngle = THREE.MathUtils.degToRad(1); // 1 grau em radianos
        if (this.keyboard.pressed("ArrowUp")) this.cameraHolder.rotateX(rotationAngle);    // Rotação em X (para cima)
        if (this.keyboard.pressed("ArrowDown")) this.cameraHolder.rotateX(-rotationAngle); // Rotação em X (para baixo)
        if (this.keyboard.pressed("ArrowLeft")) this.cameraHolder.rotateY(rotationAngle);  // Rotação em Y (esquerda)
        if (this.keyboard.pressed("ArrowRight")) this.cameraHolder.rotateY(-rotationAngle);// Rotação em Y (direita)

    }

    getCurrentCamera() {
        return this.currentCamera;
    }
}
*/