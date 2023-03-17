// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import player from "./player";

@ccclass
export default class mon1 extends cc.Component {

    @property(player)
    player: player = null;
    private anim = null;

    private moveDir = -1;

    private speed = 50;

    private action=cc.repeatForever(cc.moveBy(2, this.moveDir*this.speed, 0));    

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        this.anim=this.getComponent(cc.Animation);
    
    }

    start () {
        this.node.runAction(this.action);

    }

    update (dt) {
        // this.node.getComponent(cc.RigidBody).linearVelocity=cc.v2(this.moveDir*this.speed,
        //     this.node.getComponent(cc.RigidBody).linearVelocity.y);


    }
    
    onBeginContact(contact, selfCollider, otherCollider){
        if(otherCollider.tag==87&&contact.getWorldManifold().normal.y==1){

            if(this.player.getisdie()){
                contact.disabled=true;
                return;
            }
            
            this.anim.play("mon1_flat");
            contact.disabled=true;
            
        }

        else if(otherCollider.tag == 2){
            this.moveDir *= -1;
            this.node.stopAction(this.action);
            
            this.action=cc.repeatForever(cc.moveBy(2, this.moveDir*this.speed, 0));        
            this.node.runAction(this.action);
        }
        else if((otherCollider.tag==5||otherCollider.tag==4)&&contact.getWorldManifold().normal.x!=0){
            this.moveDir *= -1;
            this.node.stopAction(this.action);
            this.action=cc.repeatForever(cc.moveBy(2, contact.getWorldManifold().normal.x*this.speed*-1, 0)); 
            this.node.scaleX =contact.getWorldManifold().normal.x
            this.node.runAction(this.action);
        }
        
    }
    walk(){
        this.node.scaleX *=-1
    }
    die(){
        this.node.destroy();
    }
}
