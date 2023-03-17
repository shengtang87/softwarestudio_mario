// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;



// @ccclass('Item')
// export class Item {
//     @property(cc.Integer)
//     id:Number = 0;
//     @property(cc.String)
//     itemName:string = '';
//     @property(cc.Integer)
//     itemPrice :Number = 0;
// }

@ccclass
export default class leader extends cc.Component {

    @property(cc.Node)
    one: cc.Node = null;
    @property(cc.Node)
    two: cc.Node = null;
    @property(cc.Node)
    three: cc.Node = null;
    @property(cc.Node)
    four: cc.Node = null;
    @property(cc.Node)
    five: cc.Node = null;

    Button_back_Init() {
        let button_back = new cc.Component.EventHandler();
        button_back.target = this.node;
        button_back.component = "leader";
        button_back.handler = "back";

        cc.find("Canvas/button_back").getComponent(cc.Button).clickEvents.push(button_back);
    }     

    back(){
        cc.director.loadScene("chooselevel");
    }

    onLoad () {
        this.Button_back_Init();
    }

    start () {

        const user = firebase.auth().currentUser;
        var name=user.displayName;
        var db=firebase.database();

        var on ;
        var tw ;
        var thre ;
        var fou ;
        var fiv ;
        var cnt=0;

        let lis:string[]=[];
        db.ref("root"+"/high").orderByChild('highscore').limitToLast(5).once("value").then(function(snapshot){
            snapshot.forEach((childSnapshot) => {
                var name=childSnapshot.child("/name").val()
                var sc=childSnapshot.child("/highscore").val()
                var str=name+": "+sc
                // console.log(name+": "+sc);
                lis.push(str);
                // this.one.getComponent(cc.Label).string =str;

                if(cnt==0) on=str;
                else if(cnt==1) tw=str;
                else if(cnt==2) thre=str;
                else if(cnt==3) fou=str;
                else if(cnt==4) fiv=str;

                cnt++;
            });
        });

        this.scheduleOnce(function() {
            // console.log(on)
            // console.log(tw)
            // console.log(thre)
            // console.log(fou)
            // console.log(fiv)
           if(on) this.one.getComponent(cc.Label).string = on;
            else this.one.getComponent(cc.Label).string=""
           if(tw) this.two.getComponent(cc.Label).string = tw;
            else this.two.getComponent(cc.Label).string=""
           if(thre) this.three.getComponent(cc.Label).string =thre;
            else this.three.getComponent(cc.Label).string=""
           if(fou) this.four.getComponent(cc.Label).string = fou;
            else this.four.getComponent(cc.Label).string=""
           if(fiv) this.five.getComponent(cc.Label).string = fiv;
            else this.five.getComponent(cc.Label).string=""
        }, 2);

        

        


    }
}

