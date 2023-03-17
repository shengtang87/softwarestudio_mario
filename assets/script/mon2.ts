
const {ccclass, property} = cc._decorator;

import player from "./player";

@ccclass
export default class mon2 extends cc.Component {

    @property(player)
    player: player = null;

    private anim = null;

    private moveDir = -1;

    private speed = 50;
    private speed2 = 500;

    private action;
    
    private hitt :number = 0;

    @property(cc.AudioClip)
    audkick: cc.AudioClip = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        this.anim=this.getComponent(cc.Animation);
    
    }

    start () {
        this.node.scaleX =1
        this.action=cc.repeatForever(cc.moveBy(2, this.moveDir*this.speed, 0));        
        this.node.runAction(this.action);
    }

    update (dt) {
        // this.node.getComponent(cc.RigidBody).linearVelocity=cc.v2(this.moveDir*this.speed,
        //     this.node.getComponent(cc.RigidBody).linearVelocity.y);

        // console.log(this.moveDir)

    }

        //變大變小box
        //狀怪物 分數

    onBeginContact(contact, selfCollider, otherCollider){
        if(otherCollider.tag==87&&contact.getWorldManifold().normal.y==1){     

            if(this.player.getisdie()){
                contact.disabled=true;
                return;
            }
            // else{
            //     contact.disabled=false;
            // }

            if(this.hitt==0){
                this.anim.play("mon2_flat")
                cc.audioEngine.playEffect(this.audkick,false);
                this.node.stopAction(this.action);
                this.hitt=1;
            }
            else if(this.hitt==1){
                cc.audioEngine.playEffect(this.audkick,false);
                this.node.destroy()
            }
            else if(this.hitt==2){
                this.hitt=1;
                this.anim.play("mon2_flat")
                cc.audioEngine.playEffect(this.audkick,false);
                this.node.stopAction(this.action);
            }
        }
        else if(otherCollider.tag==87&&contact.getWorldManifold().normal.y!=1){
            if(this.hitt==1){
                this.hitt=2;
                cc.audioEngine.playEffect(this.audkick,false);
                this.anim.play("mon2_spin")
                this.node.stopAction(this.action);
                this.action=cc.repeatForever(cc.moveBy(2, contact.getWorldManifold().normal.x*this.speed2*-1, 0));        
                this.node.runAction(this.action);
            }            
            else if(!this.player.getinvince()&&this.hitt==2||this.hitt==0){
                this.player.hurt();
                contact.disabled=true
            }
        }
        else if((otherCollider.tag==5||otherCollider.tag==4)&&contact.getWorldManifold().normal.x!=0){
            if(this.hitt==2){
                cc.audioEngine.playEffect(this.audkick,false);
                this.player.updatescore(this.player.getscore()+100)
                otherCollider.node.destroy()
            }
            if(this.hitt==0){
                this.moveDir *= -1;
                this.node.stopAction(this.action);
                this.action=cc.repeatForever(cc.moveBy(2, contact.getWorldManifold().normal.x*this.speed*-1, 0)); 
                this.node.scaleX =contact.getWorldManifold().normal.x
                this.node.runAction(this.action);
            }
        }


        else if(otherCollider.tag == 2){
            this.moveDir *= -1;
            this.node.stopAction(this.action);
            if(this.hitt==0) this.action=cc.repeatForever(cc.moveBy(2, contact.getWorldManifold().normal.x*this.speed*-1, 0));   
            else if(this.hitt==2) this.action=cc.repeatForever(cc.moveBy(2, contact.getWorldManifold().normal.x*this.speed2*-1, 0));        
            this.node.scaleX =contact.getWorldManifold().normal.x
            this.node.runAction(this.action);
        }
        
        
    }
    die(){
        this.node.destroy();
    }
}
