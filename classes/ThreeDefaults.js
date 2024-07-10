import * as THREE from 'three';
import EM from 'es-event-emitter';

export class ThreeDefaults extends EM {
    static instance = null;
    constructor() {
        super();
        if (ThreeDefaults.instance != null) return ThreeDefaults.instance
        ThreeDefaults.instance = this

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
        this.clock = new THREE.Clock();
        document.body.appendChild(this.renderer.domElement);
        this.renderer.setAnimationLoop(() => {
            this.update()
        });
        window.onresize = () => {
            this.resize()
        };
        this.resize();
        this.delta = this.clock.getDelta()
    }
    update() {
        this.delta = this.clock.getDelta()
        this.emit("update")
        this.renderer.render(this.scene, this.camera);
    }
    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.updateProjectionMatrix();
        this.emit("resize")
    }
}