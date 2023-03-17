// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import player from "./player";
@ccclass
export default class boxcoin extends cc.Component {

    @property(cc.Node)
    target: cc.Node = null;

    @property(player)
    player: player = null;





    @property(cc.Node)
    scoreNode: cc.Node = null;
    @property(cc.Node)
    coinNode: cc.Node = null;

    @property(cc.AudioClip)
    audcoin: cc.AudioClip = null;


    private score: number = null;
    private coin: number = null;




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

    update (dt) {
        this.score=Number(this.scoreNode.getComponent(cc.Label).string)
        this.coin=Number(this.coinNode.getComponent(cc.Label).string)
    }

    
    onBeginContact(contact, selfCollider, otherCollider){
        // console.log("ding")  
        if(this.player.getisdie()){
            contact.disabled=true;
            return;
        }
        if(otherCollider.tag==87&&contact.getWorldManifold().normal.y==-1){
            if(this.hited==false){
                this.anim.play("boxhited")
                cc.audioEngine.playEffect(this.audcoin,false);
                this.target.active=true;
                let action =cc.spawn(cc.sequence(cc.moveBy(0.1 ,0, 30),cc.moveBy(0.1, 0, -30) ),cc.fadeTo(0.3, 0.1));
                this.target.runAction(action);
                this.hited=true;

                this.updatecoin(this.coin+1)
                this.updatescore(this.score+100)
            }
        }
    }


     
    updatescore(score: number)
    {
        this.score = score;
        this.scoreNode.getComponent(cc.Label).string = (Array(6).join("0") + this.score.toString()).slice(-6);
    }
    updatecoin(coin: number)
    {
        this.coin = coin;
        this.coinNode.getComponent(cc.Label).string = (Array(2).join("0") + this.coin.toString()).slice(-4);
    }
}
