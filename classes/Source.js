import { ThreeDefaults } from "./ThreeDefaults";
import * as THREE from "three";
import EM from 'es-event-emitter';
import { Drop } from "./Drop";

export class Source extends EM {
    constructor() {
        super();
        this.spawnPos = new THREE.Vector3(0, 3, 0)
        this.raycaster = new THREE.Raycaster()
        this.pointer = new THREE.Vector2()
        window.addEventListener('pointermove', (event) => {
            this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
        });

        this.engine = new ThreeDefaults();
        this.mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 0.3, 1), new THREE.MeshLambertMaterial({ color: 0x0f00f0 }));
        this.engine.scene.add(this.mesh);

        this.dropGeometry = new THREE.BoxGeometry(0.017, 0.1, 0.017)
        this.dropMaterial = new THREE.MeshBasicMaterial({
            color: 0x1976D2
        })

        setInterval(() => {
            this.spawnNewDrop();
        }, 8)

        this.engine.on("update", () => {
            this.update()
        })

        this.intersectionPlane = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.MeshStandardMaterial({
            opacity: 0,
            transparent: true
        }))
        this.engine.scene.add(this.intersectionPlane)
    }
    spawnNewDrop() {
        new Drop(this.spawnPos, 500, this.dropGeometry, this.dropMaterial)
    }
    update() {
        this.raycaster.setFromCamera(this.pointer, this.engine.camera);
        const intersects = this.raycaster.intersectObject(this.intersectionPlane);
        if (intersects[0]) {
            this.mesh.position.copy(intersects[0].point)
            this.spawnPos.copy(intersects[0].point)
        }
    }
}