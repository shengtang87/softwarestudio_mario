const {ccclass, property} = cc._decorator;

@ccclass
export default class chooselevel extends cc.Component {
    
    
    @property(cc.Node)
    nameNode: cc.Node = null;
    @property(cc.Node)
    highscoreNode: cc.Node = null;
    @property(cc.Node)
    scoreNode: cc.Node = null;
    @property(cc.Node)
    lifeNode: cc.Node = null;
    @property(cc.Node)
    coinNode: cc.Node = null;


    private username:string= null;
    private highscore: number = null;
    private score: number = null;
    private life: number = null;
    private coin: number = null;


    onLoad () {
        this.Button_blue_Init();      
        this.Button_orange_Init();  
        this.Button_leader_Init();
    }

    start () {
        cc.director.preloadScene("lifecount1", function () {
            console.log('Next scene preloaded');
        });
        cc.director.preloadScene("lifecount2", function () {
            console.log('Next scene preloaded');
        });
        this.scheduleOnce(function() {
            // this.updateusername(this.username);
            // this.updatehighscore(this.highscore);
            // this.updatescore(this.score);
            // this.updatelife(this.life);
            // this.updatecoin(this.coin);
        }, 1);
        // cc.director.preloadScene("testlevel", function () {
        //     console.log('Next scene preloaded');
        // });
    }

    update () {
        const user = firebase.auth().currentUser;
        var name=user.displayName;
        var db=firebase.database();

        let username;
        let highscore;
        let score;
        let life;
        let coin;
        db.ref("root"+"/users"+"/"+user.uid+"/infor").on('value', function(snapshot) {
            // cnt=snapshot.child("/cnt").val();
            // console.log(snapshot.child("/life").val())
            // this.updateusername(name);
            // this.updatehighscore(snapshot.child("/highscore").val());
            // this.updatescore(snapshot.child("/score").val());
            // this.updatelife(snapshot.child("/life").val());
            // this.updatecoin(snapshot.child("/coin").val());
            username=snapshot.child("/name").val();
            highscore=snapshot.child("/highscore").val();
            score=snapshot.child("/score").val();
            life=snapshot.child("/life").val();
            coin=snapshot.child("/coin").val();
        });

        this.scheduleOnce(function() {
            this.updateusername(username);
            this.updatehighscore(highscore);
            this.updatescore(score);
            this.updatelife(life);
            this.updatecoin(coin);
        }, 1);



    }  

    Button_leader_Init() {
        let button_leader = new cc.Component.EventHandler();
        button_leader.target = this.node;
        button_leader.component = "chooselevel";
        button_leader.handler = "lead";

        cc.find("Canvas/button/button_leader").getComponent(cc.Button).clickEvents.push(button_leader);
    }

    Button_blue_Init() {
        let button_blue = new cc.Component.EventHandler();
        button_blue.target = this.node;
        button_blue.component = "chooselevel";
        button_blue.handler = "loadlv2";

        cc.find("Canvas/button/button_blue").getComponent(cc.Button).clickEvents.push(button_blue);
    } 

    Button_orange_Init() {
        let button_orange = new cc.Component.EventHandler();
        button_orange.target = this.node;
        button_orange.component = "chooselevel";
        button_orange.handler = "loadlv1";

        cc.find("Canvas/button/button_orange").getComponent(cc.Button).clickEvents.push(button_orange);
    }    

    loadlv1(){
        cc.director.loadScene("lifecount1");
    }

    loadlv2(){
        cc.director.loadScene("lifecount2");
        // cc.director.loadScene('testlevel', () => cc.director.loadScene("testlevel"));
    }
    lead(){        
        cc.director.loadScene("leader");
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

    updateall(username: string,highscore: number,score: number,life: number,coin: number){

    }

}

