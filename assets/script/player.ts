// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class player extends cc.Component {

    private leftDown: boolean = false;

    private rightDown: boolean = false;

    private upDown: boolean = false;

    private downDown: boolean = false;

    private onfloor: boolean = false;

    private small: boolean = true;

    private dir: number = 1;

    private movedir: number = 0;

    private speed: number = 100;

    private anim = null;

    private animstate = null;

    private actlist=null;

    private action=null

    private invince=false;

    private isdie=false;

    private iswin=false;

    @property(cc.Node)
    nameNode: cc.Node = null;
    @property(cc.Node)
    scoreNode: cc.Node = null;
    @property(cc.Node)
    highscoreNode: cc.Node = null;
    @property(cc.Node)
    lifeNode: cc.Node = null;
    @property(cc.Node)
    coinNode: cc.Node = null;
    @property(cc.Node)
    timeNode: cc.Node = null;


    @property(cc.AudioClip)
    audjump: cc.AudioClip = null;
    
    @property(cc.AudioClip)
    audpup: cc.AudioClip = null;
    
    @property(cc.AudioClip)
    audstomp: cc.AudioClip = null;

    @property(cc.AudioClip)
    audpdown: cc.AudioClip = null;
    
    @property(cc.AudioClip)
    auddie: cc.AudioClip = null;
    
    
    @property(cc.AudioClip)
    audreverse: cc.AudioClip = null;
        
    @property(cc.AudioClip)
    audwin: cc.AudioClip = null;

    @property(cc.AudioClip)
    audover: cc.AudioClip = null;

    // @property(cc.AudioClip)
    // : cc.AudioClip = null;

    @property(cc.Integer)
    level: Number = 0;

    private username:string= null;
    private highscore: number = null;
    private score: number = null;
    private life: number = null;
    private coin: number = null;
    private time: number = null;

    private respawnpos=null;
    private newtime=256;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {        
        cc.director.getPhysicsManager().enabled = true;
        // cc.director.getPhysicsManager().gravity = cc.v2(0, -200);

        
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this.anim=this.getComponent(cc.Animation);

        
        // this.ui();

    }



    start () {
        // cc.director.preloadScene("lifecount1", function () {
        //     console.log('Next scene preloaded');
        // });
        this.updatetime(this.newtime);
        this.schedule(function() {
            if(!this.iswin) this.updatetime(this.time-1);
            // console.log(this.level)
        }, 1);
        this.respawnpos=this.node.getPosition();

    }

    update (dt) {
        this.playermove();
        // console.log(this.onfloor)
        // console.log(this.node.getComponent(cc.PhysicsBoxCollider).size)
        this.time=Number(this.timeNode.getComponent(cc.Label).string)
        this.highscore=Number(this.highscoreNode.getComponent(cc.Label).string)
        this.score=Number(this.scoreNode.getComponent(cc.Label).string)
        this.life=Number(this.lifeNode.getComponent(cc.Label).string)
        this.coin=Number(this.coinNode.getComponent(cc.Label).string)

        
        if(this.time==0&&!this.isdie&&!this.iswin) this.die();

        let uhs=0;
        if(this.score>this.highscore){

            uhs=this.score;
            this.updatehighscore(uhs)
            
            const user = firebase.auth().currentUser;
            var name=user.displayName;
            var db=firebase.database();
            
            db.ref("root"+"/high"+"/"+user.uid).set({
                name:name,
                highscore:uhs
            });
        }
    }

    
    onKeyDown(event){{
    {
        switch(event.keyCode)
        {
            case cc.macro.KEY.left:
                this.leftDown = true;
                this.rightDown = false;
                break;                
            case cc.macro.KEY.right:
                this.rightDown = true;
                this.leftDown = false;
                break;                
            case cc.macro.KEY.up:
                this.upDown = true;
                break;                                
            case cc.macro.KEY.down:
                this.downDown = true;
                break;
        }}}
    }

    onKeyUp(event)
    {
        switch(event.keyCode)
        {
            case cc.macro.KEY.left:
                this.leftDown = false;
                break;
            case cc.macro.KEY.right:
                this.rightDown = false;
                break;
            case cc.macro.KEY.up:
                this.upDown = false;
                break;                       
        }
    }

    playermove(){        
        if(this.leftDown&&!this.anim.getAnimationState("mario_growup").isPlaying&&!this.anim.getAnimationState("mario_growdown").isPlaying&&
        !this.anim.getAnimationState("mario_die").isPlaying&&!this.iswin){//left
            this.movedir=-1;
            this.dir=-1;

            if(this.small&&!this.anim.getAnimationState("mario_small_move").isPlaying&&!this.anim.getAnimationState("mario_small_jump").isPlaying){
                this.animstate=this.anim.play("mario_small_move");
            }
            else if(!this.small&&!this.anim.getAnimationState("mario_big_move").isPlaying&&!this.anim.getAnimationState("mario_big_jump").isPlaying){
                this.animstate=this.anim.play("mario_big_move");
            }
        }
        else if(this.rightDown&&!this.anim.getAnimationState("mario_growup").isPlaying&&!this.anim.getAnimationState("mario_growdown").isPlaying&&
        !this.anim.getAnimationState("mario_die").isPlaying&&!this.iswin){//right
            this.movedir=1;
            this.dir=1;
            if(this.small&&!this.anim.getAnimationState("mario_small_move").isPlaying&&!this.anim.getAnimationState("mario_small_jump").isPlaying){
                this.animstate=this.anim.play("mario_small_move");
            }            
            
            else if(!this.small&&!this.anim.getAnimationState("mario_big_move").isPlaying&&!this.anim.getAnimationState("mario_big_jump").isPlaying){
                this.animstate=this.anim.play("mario_big_move");
            }
        }        
        else{//idle
            this.movedir=0;
            if(this.small&&!this.anim.getAnimationState("mario_small_jump").isPlaying&&!this.anim.getAnimationState("mario_small_idle").isPlaying
            &&!this.anim.getAnimationState("mario_growup").isPlaying&&!this.anim.getAnimationState("mario_growdown").isPlaying&&
            !this.anim.getAnimationState("mario_die").isPlaying){                
                this.anim.play("mario_small_idle")
                this.animstate=null;
            }

            
            else if(!this.small&&!this.anim.getAnimationState("mario_big_jump").isPlaying&&!this.anim.getAnimationState("mario_big_idle").isPlaying
            &&!this.anim.getAnimationState("mario_growup").isPlaying&&!this.anim.getAnimationState("mario_growdown").isPlaying&&
            !this.anim.getAnimationState("mario_die").isPlaying){                
                this.anim.play("mario_big_idle")
                this.animstate=null;
            }
        }
        this.node.scaleX = (this.dir >= 0) ? 1 : -1;
        

        //jump
        if(this.upDown&&this.onfloor&&!this.anim.getAnimationState("mario_growup").isPlaying&&!this.anim.getAnimationState("mario_growdown").isPlaying&&
        !this.anim.getAnimationState("mario_die").isPlaying&&!this.iswin){      
            this.node.getComponent(cc.RigidBody).linearVelocity=cc.v2(this.node.getComponent(cc.RigidBody).linearVelocity.x,250);

                this.onfloor=false;
                cc.audioEngine.playEffect(this.audjump,false);
        }
        else if(!this.onfloor&&!this.anim.getAnimationState("mario_growup").isPlaying&&!this.anim.getAnimationState("mario_growdown").isPlaying&&
        !this.anim.getAnimationState("mario_die").isPlaying){            
            if(this.small) this.animstate=this.anim.play("mario_small_jump");
            else if(!this.small) this.animstate=this.anim.play("mario_big_jump");
        }

        

        this.node.getComponent(cc.RigidBody).linearVelocity=cc.v2(this.movedir*this.speed,
            this.node.getComponent(cc.RigidBody).linearVelocity.y);
    }



    onBeginContact(contact, selfCollider, otherCollider){
        if(this.isdie){//dead
            contact.disabled=true;
            return;
        }
        else{
            contact.disabled=false;
        }
        
        if(otherCollider.tag==1&&(
            (contact.getWorldManifold().normal.x==0&&contact.getWorldManifold().normal.y==1)||
            (contact.getWorldManifold().normal.x!=0&&contact.getWorldManifold().normal.y==0))
            ){            
            contact.disabled=true;
        }

        // console.log(this.onfloor)
        if(!this.onfloor&&(otherCollider.tag==1||otherCollider.tag==2)&&
        contact.getWorldManifold().normal.x==0&&contact.getWorldManifold().normal.y==-1){//standonthings
            this.onfloor=true;
            if(!this.anim.getAnimationState("mario_growup").isPlaying&&!this.anim.getAnimationState("mario_growdown").isPlaying&&
            !this.anim.getAnimationState("mario_die").isPlaying){
                if(this.small) this.animstate=this.anim.play("mario_small_idle");
                if(!this.small) this.animstate=this.anim.play("mario_big_idle");
            }
        }

        else if(otherCollider.tag==3){//eatshroom
            if(this.small){
                cc.audioEngine.playEffect(this.audpup,false);
                this.node.getComponent(cc.PhysicsBoxCollider).size=new cc.Size(14,27)
                this.animstate=this.anim.play("mario_growup");
                // this.node.getComponent(cc.PhysicsBoxCollider).offset.y=0
                // this.getComponent(cc.Sprite).spriteFrame = this.mario_big;
                this.small=false;


                
                this.actlist=cc.director.getActionManager().pauseAllRunningActions()
                // this.animstate=this.anim.play("mario_growup");
                // let action = cc.scaleBy(2, 1, 2);
                // this.node.runAction(action)
            }
            else{                
                cc.audioEngine.playEffect(this.audreverse,false);
            }
            this.updatescore(this.score+200)


            otherCollider.node.destroy();
        }
        else if(otherCollider.tag==4){//touch mon1
            if(contact.getWorldManifold().normal.x==0&&contact.getWorldManifold().normal.y==-1){
                this.node.getComponent(cc.RigidBody).linearVelocity=cc.v2(this.node.getComponent(cc.RigidBody).linearVelocity.x,100);
                this.updatescore(this.score+300)
                cc.audioEngine.playEffect(this.audstomp,false);
            }
            else{
                contact.disabled=true;
                if(!this.invince) this.hurt();
            }
        }
        else if(otherCollider.tag==5){//touch mon2
            if(contact.getWorldManifold().normal.x==0&&contact.getWorldManifold().normal.y==-1){
                this.node.getComponent(cc.RigidBody).linearVelocity=cc.v2(this.node.getComponent(cc.RigidBody).linearVelocity.x,100);
                this.updatescore(this.score+300)
            }
        }
        else if(otherCollider.tag==6){//win
            cc.audioEngine.pauseMusic();
            cc.audioEngine.playEffect(this.audwin,false);
            this.iswin=true;
            this.schedule(function() {
                if(this.time){
                    this.updatetime(this.time-1)
                    this.updatescore(this.score+5)
                }
            }, 0.01);
            
            this.scheduleOnce(function() {
                if(this.level==1) cc.director.loadScene("win1");
                else if(this.level==2) cc.director.loadScene("win2");
            }, 5);
            cc.director.preloadScene("chooselevel", function () {
                console.log('Next scene preloaded');
            });

        }
        else if(otherCollider.tag==7){//diezone
            this.die();
        }
        
    }

    toup(){        
        // console.log("fuck")
        this.node.setPosition(this.node.position.x,this.node.position.y+7);
        for (let num of this.actlist) {            
            cc.director.getActionManager().resumeTarget(num)
        }
        
    }
    todown(){        
        // console.log("fuck")        
        this.scheduleOnce(function() {``
            this.invince=false;
        }, 0.5);
        // this.node.setPosition(this.node.position.x,this.node.position.y-7);
        for (let num of this.actlist) {            
            cc.director.getActionManager().resumeTarget(num)
        }
    }
    hurt(){
        if(!this.small){
            cc.audioEngine.playEffect(this.audpdown,false);
            this.node.getComponent(cc.PhysicsBoxCollider).size=new cc.Size(16,16)
            this.animstate=this.anim.play("mario_growdown");
            this.actlist=cc.director.getActionManager().pauseAllRunningActions()
            this.small=true;

            this.invince=true;
        }
        else {
            this.die();
        }
    }
    die(){
        cc.audioEngine.pauseMusic();
        cc.audioEngine.playEffect(this.auddie,false);
        this.isdie=true;
        this.node.getComponent(cc.RigidBody).linearVelocity=cc.v2(this.node.getComponent(cc.RigidBody).linearVelocity.x,300);

        this.node.getComponent(cc.PhysicsBoxCollider).size=new cc.Size(16,16)
        this.actlist=cc.director.getActionManager().pauseAllRunningActions();

        if(!this.anim.getAnimationState("mario_die").isPlaying){
            this.animstate=this.anim.play("mario_die");
        }

        this.scheduleOnce(function() {
            cc.audioEngine.resumeMusic();
            if(this.life>0) this.respawn();
            else{

                // const user = firebase.auth().currentUser;
                // var name=user.displayName;
                // var db=firebase.database();
                // db.ref("root"+"/users"+"/"+user.uid+"/infor").set({
                //     mail:user.email,
                //     name:name,
                //     uid:user.uid,
                //     coin:this.coin,
                //     score:this.score,
                //     highscore:0,
                //     life:3
                // });
                this.updatelife(3);
                this.updatescore(0);
                this.updatecoin(0);
                cc.audioEngine.pauseMusic();
                cc.audioEngine.playEffect(this.audover,false);
                if(this.level==1) cc.director.loadScene("gameover1");
                else if(this.level==2) cc.director.loadScene("gameover2");
                // this.scheduleOnce(function() {
                // },1.5);
            }
        }, 3);

    }

    respawn(){
        this.updatelife(this.life-1);
        this.updatetime(this.newtime);
        // this.node.setPosition(this.respawnpos);
        let action = cc.moveTo(0.1, this.respawnpos.x, this.respawnpos.y+500);
        this.isdie=false;
        if(!this.small){
            this.small=true;
            this.node.getComponent(cc.PhysicsBoxCollider).size=new cc.Size(16,16)
        }
        this.node.runAction(action)
        this.animstate=this.anim.play("mario_small_idle");

        for (let num of this.actlist) {
            cc.director.getActionManager().resumeTarget(num)
        }
        
    }
    
    updatetime(time: number)
    {
        this.time = time;
        this.timeNode.getComponent(cc.Label).string = (Array(4).join("0") + this.time.toString()).slice(-4);
    }
    updateusername(username: string)
    {
        this.username = username;
        this.nameNode.getComponent(cc.Label).string = username;
    }    
    updatehighscore(highscore: number)
    {
        this.highscore = highscore;
        this.highscoreNode.getComponent(cc.Label).string = (Array(6).join("0") + this.highscore.toString()).slice(-6);
    }
    updatescore(score: number)
    {
        this.score = score;
        this.scoreNode.getComponent(cc.Label).string = (Array(6).join("0") + this.score.toString()).slice(-6);
    }

    updatelife(life: number)
    {
        this.life = life;
        this.lifeNode.getComponent(cc.Label).string =this.life.toString();
    }    
    updatecoin(coin: number)
    {
        this.coin = coin;
        this.coinNode.getComponent(cc.Label).string = (Array(2).join("0") + this.coin.toString()).slice(-4);
    }
    
    // ui(){
    //     const user = firebase.auth().currentUser;
    //     var name=user.displayName;
    //     var db=firebase.database();
        

    //     if(user){
    //         let username;
    //         let score;
    //         let life;
    //         let coin;
    //         db.ref("root"+"/users"+"/"+user.uid+"/infor").on('value', function(snapshot) {
    //             // cnt=snapshot.child("/cnt").val();
    //             // console.log(snapshot.child("/life").val())
    //             // this.updateusername(name);
    //             // this.updatehighscore(snapshot.child("/highscore").val());
    //             // this.updatescore(snapshot.child("/score").val());
    //             // this.updatelife(snapshot.child("/life").val());
    //             // this.updatecoin(snapshot.child("/coin").val());
    //             username=snapshot.child("/name").val();
    //             score=snapshot.child("/score").val();
    //             life=snapshot.child("/life").val();
    //             coin=snapshot.child("/coin").val();
    //         });       
    //         this.updateusername(username);
    //         this.updatescore(score);
    //         this.updatelife(life);
    //         this.updatecoin(coin);
    //     }
    // }
    getisdie(){
        return this.isdie;
    }
    getinvince(){
        return this.invince;
    }
    getscore(){
        return this.score;
    }
}

//0 noting
//87 player
//1 floor
// 2 pipe
// 3 shroom
// 4 mon1
// 5 mon2
//6 win
