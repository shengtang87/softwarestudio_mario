
const {ccclass, property} = cc._decorator;

@ccclass
export default class shit3 extends cc.Component {


    
    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    }

    start () {

    }

    update (dt) {

    }

    
    onBeginContact(contact, selfCollider, otherCollider)
    {
        if(otherCollider.tag == 2||otherCollider.tag == 1)
        {
            contact.disabled=true;
            return;
        }
    }

}
