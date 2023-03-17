const {ccclass, property} = cc._decorator;

@ccclass
export default class lifecount12 extends cc.Component {
    
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



    private username:string= null;
    private highscore: number = null;
    private score: number = null;
    private life: number = null;
    private coin: number = null;
    private time: number = null;


    onLoad () {
        this.ui();
    }

    start () {
        cc.director.preloadScene("testlevel", function () {
            console.log('Next scene preloaded');
        });
        this.scheduleOnce(function() {
            this.loadlv1();
        }, 1);
    }

    update () {
    }  


    loadlv1(){
        cc.director.loadScene("testlevel");
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
