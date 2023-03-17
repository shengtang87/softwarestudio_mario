const {ccclass, property} = cc._decorator;

@ccclass
export default class login extends cc.Component {
    

    onLoad () {
        this.Button_blue_Init();
        this.Button_back_Init();
    }

    start () {
        // cc.director.preloadScene("chooselevel", function () {
        //     console.log('Next scene preloaded');
        // });
    }

    update () {
        // console.log(cc.find("Canvas/input/inputbox/mail/TEXT_LABEL").getComponent(cc.Label).string)
    }


    Button_blue_Init() {
        let button_blue = new cc.Component.EventHandler();
        button_blue.target = this.node;
        button_blue.component = "login";
        button_blue.handler = "checkacc";

        cc.find("Canvas/input/button_blue").getComponent(cc.Button).clickEvents.push(button_blue);
    }     
    
    Button_back_Init() {
        let button_back = new cc.Component.EventHandler();
        button_back.target = this.node;
        button_back.component = "login";
        button_back.handler = "back";

        cc.find("Canvas/input/button_back").getComponent(cc.Button).clickEvents.push(button_back);
    }     

    checkacc(){
        var m=cc.find("Canvas/input/inputbox/mail/TEXT_LABEL").getComponent(cc.Label).string
        var p=cc.find("Canvas/input/inputbox/password/TEXT_LABEL").getComponent(cc.Label).string


        firebase.auth().signInWithEmailAndPassword(m, p).then(()=>{
            this.loadlevel();
        }).catch(e => console.log(e.message));
    }
    back(){
        cc.director.loadScene("menu");
    }

    loadlevel(){
        cc.director.loadScene("chooselevel");
    }

}
