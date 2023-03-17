// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import shroom from "./shroom";

import player from "./player";
const {ccclass, property} = cc._decorator;

@ccclass
export default class boxcoin extends cc.Component {

    @property(cc.Node)
    target: cc.Node = null;
    
    @property(player)
    player: player = null;

    @property(shroom)
    shroom: shroom = null;
    
    @property(cc.AudioClip)
    audshroom: cc.AudioClip = null;

    private hited :boolean=false;

    private anim = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {        
        cc.director.getPhysicsManager().enabled = true;
        this.target.active=false;
        this.anim=this.getComponent(cc.Animation);
    }

    start () {

    }

    // update (dt) {}

    
    onBeginContact(contact, selfCollider, otherCollider)
    {
        if(this.player.getisdie()){
            contact.disabled=true;
            return;
        }
        if(otherCollider.tag==87&&contact.getWorldManifold().normal.y==-1){
            if(this.hited==false){
                this.anim.play("boxhited")
                this.target.active=true;
                cc.audioEngine.playEffect(this.audshroom,false);
            
                let finished = cc.callFunc(function(target) {
                    this.shroom.go=true;
                    this.shroom.speed=50;
                }, this, 0);
                
                let action = cc.sequence(cc.spawn(cc.moveBy(1, 0, 5), cc.scaleBy(1, 10)), finished); 
                this.target.runAction(action);
                
                
            
                this.hited=true;
            }            

        }
    }
}
