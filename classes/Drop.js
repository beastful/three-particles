import * as THREE from "three";
import { ThreeDefaults } from "./ThreeDefaults";

export class Drop {
    constructor(pos, time, g, m) {
        this.pos = pos
        this.engine = new ThreeDefaults()
        
        this.mesh = new THREE.InstancedMesh(g, m, 30)
        this.engine.scene.add(this.mesh)
    
        let rand = this.getRand(1, 1, 1)
        let newpos = new THREE.Vector3(
            rand.x + this.pos.x,
            rand.y + this.pos.y - 0.5,
            rand.z + this.pos.z
        )
        
        this.mesh.position.copy(newpos)
        this.engine.on("update", () => {
            this.update()
        })
       
        setTimeout(() => {
            this.engine.scene.remove(this.mesh)
            this.engine.renderer.renderLists.dispose();
        }, time)
    }
    getRand(x, y, z) {
        let min = -0.5
        let max = 0.5
        return new THREE.Vector3(
            Math.random() * (max - min) + min * x, 
            Math.random() * (max - min) + min * y, 
            Math.random() * (max - min) + min * z
        )
    }
    update() {
        this.mesh.position.y -= 4 * this.engine.delta
    }
}