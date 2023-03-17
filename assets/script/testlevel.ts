

const {ccclass, property} = cc._decorator;

@ccclass
export default class testlevel extends cc.Component {

    @property(cc.Node)
    followTarget: cc.Node = null;
    // @property(cc.Node)
    // followTarget2: cc.Node = null;
    @property(cc.Boolean)
    followX: boolean = true;
    @property(cc.Boolean)
    followY: boolean = true;



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
    bgm: cc.AudioClip = null;


    private username:string= null;
    private highscore: number = null;
    private score: number = null;
    private life: number = null;
    private coin: number = null;
    private time: number = null;


    
    private newtime=256;

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
        this.ui();
    }

    start () {
        cc.audioEngine.playMusic(this.bgm, true)

    }

    update(dt) {
        let targetPosition = this.followTarget.getPosition();
        let currentPosition = this.node.getChildByName("Main Camera").getPosition();

        currentPosition.lerp(targetPosition,0.1,currentPosition);

        currentPosition.y=clamp(targetPosition.y,-1000,-150);
        currentPosition.x-=40;
        currentPosition.y-=5;
        
        this.node.getChildByName("Main Camera").setPosition(currentPosition);

        this.time=Number(this.timeNode.getComponent(cc.Label).string)
        this.highscore=Number(this.highscoreNode.getComponent(cc.Label).string)
        this.score=Number(this.scoreNode.getComponent(cc.Label).string)
        this.life=Number(this.lifeNode.getComponent(cc.Label).string)
        this.coin=Number(this.coinNode.getComponent(cc.Label).string)

        
        const user = firebase.auth().currentUser;
        var name=user.displayName;
        var db=firebase.database();


        db.ref("root"+"/users"+"/"+user.uid+"/infor").set({
            mail:user.email,
            name:name,
            uid:user.uid,
            coin:this.coin,
            score:this.score,
            highscore:this.highscore,
            life:this.life
        });     


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

    
    ui(){
        const user = firebase.auth().currentUser;
        var name=user.displayName;
        var db=firebase.database();
        

        if(user){
            let username;
            let highscore;
            let score;
            let life;
            let coin;
            db.ref("root"+"/users"+"/"+user.uid+"/infor").on('value', function(snapshot) {
                username=snapshot.child("/name").val();
                highscore=snapshot.child("/highscore").val();
                score=snapshot.child("/score").val();
                life=snapshot.child("/life").val();
                coin=snapshot.child("/coin").val();
            });       
            this.updateusername(username);
            this.updatehighscore(highscore);
            this.updatescore(score);
            this.updatelife(life);
            this.updatecoin(coin);
        }
    }
}

function clamp(x: number, a: number, b: number) {
    if (x < a) return a;
    if (x > b) return b;
    return x;
}