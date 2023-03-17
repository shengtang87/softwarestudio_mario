const {ccclass, property} = cc._decorator;

@ccclass
export default class menu extends cc.Component {
    

    @property(cc.AudioClip)
    bgm: cc.AudioClip = null;

    Button_blue_Init() {
        let button_blue = new cc.Component.EventHandler();
        button_blue.target = this.node;
        button_blue.component = "menu";
        button_blue.handler = "loadlogin";

        cc.find("Canvas/button/button_blue").getComponent(cc.Button).clickEvents.push(button_blue);
    } 

    Button_orange_Init() {
        let button_orange = new cc.Component.EventHandler();
        button_orange.target = this.node;
        button_orange.component = "menu";
        button_orange.handler = "loadsignup";

        cc.find("Canvas/button/button_orange").getComponent(cc.Button).clickEvents.push(button_orange);
    }




    loadlogin(){
        cc.director.loadScene("login");
    }

    loadsignup(){
        cc.director.loadScene("signup");
    }

    
    onLoad () {
        this.Button_blue_Init();      
        this.Button_orange_Init();  
        cc.audioEngine.playMusic(this.bgm, true)

    }

    start () {
    }

    update () {
        
    }
}
