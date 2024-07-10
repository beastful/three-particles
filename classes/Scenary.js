import { ThreeDefaults } from "./ThreeDefaults";
import * as THREE from "three";
import EM from 'es-event-emitter';

export class Scenary extends EM {
    constructor() {
        super();
        this.engine = new ThreeDefaults();

        // Renderer

        this.engine.renderer.setClearColor(0xffffff)

        // Camera

        this.engine.camera.position.z = 8;
        this.engine.camera.position.y = 4;
        this.engine.camera.position.x = 2;
        this.engine.camera.lookAt(0, 2, 0)

        // Fog

        this.engine.scene.fog = new THREE.FogExp2(0xffffff, 0.1);

        // Light

        this.engine.scene.add(new THREE.AmbientLight(0xffffff, 2));
        this.dir = new THREE.DirectionalLight(0x0000ff, 0.5)
        this.dirh = new THREE.DirectionalLightHelper(this.dir)
        // this.engine.scene.add(this.dirh)
        this.engine.scene.add(this.dir)
        this.dir.position.y = 2
        this.dir.position.z = 3
        this.dir.rotation.x = 1

        // Floor

        this.floorG = new THREE.PlaneGeometry(40, 40)
        this.floorM = new THREE.MeshLambertMaterial({
            color: 0x030300
        })
        this.floor = new THREE.Mesh(this.floorG, this.floorM)
        this.floor.rotateX(-Math.PI / 2)
        this.engine.scene.add(this.floor)
    }
}