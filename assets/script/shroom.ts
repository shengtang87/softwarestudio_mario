// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class shroom extends cc.Component {


    // LIFE-CYCLE CALLBACKS:
    private go = false;
    
    private moveDir = 1;

    private speed = 0;
    
    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    }

    start () {

    }

    update (dt) {
        // console.log(this.getComponent(cc.RigidBody).gravityScale)
        // console.log(this.speed)
        if(this.go){
            this.node.getComponent(cc.RigidBody).linearVelocity=cc.v2(this.moveDir*this.speed,
                this.node.getComponent(cc.RigidBody).linearVelocity.y);
        }

    }

    
    onBeginContact(contact, selfCollider, otherCollider)
    {
        if(otherCollider.tag == 2)
        {
            this.moveDir *= -1;
        }else if(otherCollider.tag != 87&&otherCollider.tag != 1){
            contact.disabled=true;
            return;
        }
    }

}
