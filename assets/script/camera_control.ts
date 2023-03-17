// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class camera_control extends cc.Component {
    @property(cc.Node)
    followTarget: cc.Node = null;
    @property(cc.Boolean)
    followX: boolean = true;
    @property(cc.Boolean)
    followY: boolean = true;



    @property(cc.Node)
    scoreNode: cc.Node = null;
    @property(cc.Node)
    lifeNode: cc.Node = null;
    @property(cc.Node)
    timeNode: cc.Node = null;
    @property(cc.Node)
    coinNode: cc.Node = null;


    private score: number = 0;
    private time: number = 256;
    private life: number = 3;
    private coin: number = 0;

    // @property(cc.Float)
    minX: number = 0;
    // @property(cc.Float)
    minY: number = -120;
    // @property(cc.Float)
    maxX: number = 400;
    // @property(cc.Float)
    maxY: number = 120;
    // @property(cc.Float)
    offsetX: number = 0;
    // @property(cc.Float)
    offsetY: number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        
    }

    start () {
        this.updatescore(0);
        this.updatelife(3);
        this.updatetime(256);
    }

    update(dt) {
        let targetPosition = this.followTarget.getPosition();
        let currentPosition = this.node.getPosition();

        currentPosition.lerp(targetPosition,0.1,currentPosition);

        currentPosition.y=clamp(targetPosition.y,-240,-240);
        currentPosition.x-=40;
        currentPosition.y+=20;
        
        this.node.setPosition(currentPosition);



    }


    updatescore(score: number)
    {
        this.score = score;
        this.scoreNode.getComponent(cc.Label).string = (Array(4).join("0") + this.score.toString()).slice(-4);
    }

    updatelife(life: number)
    {
        console.log("878")
        this.life = life;
        this.lifeNode.getComponent(cc.Label).string =this.life.toString();
    }    
    updatetime(time: number)
    {
        this.time = time;
        this.timeNode.getComponent(cc.Label).string = (Array(4).join("0") + this.time.toString()).slice(-4);
    }
    
}

function clamp(x: number, a: number, b: number) {
    if (x < a) return a;
    if (x > b) return b;
    return x;
}