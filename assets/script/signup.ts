const {ccclass, property} = cc._decorator;

@ccclass
export default class signup extends cc.Component {
    

    Button_orange_Init() {
        let button_orange = new cc.Component.EventHandler();
        button_orange.target = this.node;
        button_orange.component = "signup";
        button_orange.handler = "checkacc";

        cc.find("Canvas/input/button_orange").getComponent(cc.Button).clickEvents.push(button_orange);
    } 
    Button_back_Init() {
        let button_back = new cc.Component.EventHandler();
        button_back.target = this.node;
        button_back.component = "signup";
        button_back.handler = "back";

        cc.find("Canvas/input/button_back").getComponent(cc.Button).clickEvents.push(button_back);
    }     


    checkacc(){

        var m=cc.find("Canvas/input/inputbox/mail/TEXT_LABEL").getComponent(cc.Label).string
        var p=cc.find("Canvas/input/inputbox/password/TEXT_LABEL").getComponent(cc.Label).string
        var n=cc.find("Canvas/input/inputbox/name/TEXT_LABEL").getComponent(cc.Label).string.toUpperCase();
        const user = firebase.auth().currentUser;

        firebase.auth().createUserWithEmailAndPassword(m, p).then(()=>{

            firebase.auth().currentUser.updateProfile({
            displayName: n

        }).then(() => {
            this.ui();
            this.loadlevel();

        }).catch(e => console.log(e.message));

        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
            } else {
            console.error(error);
            }
            // [END_EXCLUDE]
        });
    }

    back(){
        cc.director.loadScene("menu");
    }
    loadlevel(){
        cc.director.loadScene("chooselevel");
    }
    
    onLoad () {
        this.Button_orange_Init();
        this.Button_back_Init();
    }

    start () {
        cc.director.preloadScene("chooselevel", function () {
            console.log('Next scene preloaded');
        });
    }

    update () {
        // console.log(cc.find("Canvas/input/inputbox/mail/TEXT_LABEL").getComponent(cc.Label).string)
    }
    
    ui(){
        const user = firebase.auth().currentUser;
        var name=user.displayName;
        var db=firebase.database();


        if(user){
            db.ref("root"+"/users"+"/"+user.uid+"/infor").set({
                mail:user.email,
                name:name,
                uid:user.uid,
                coin:0,
                score:0,
                highscore:0,
                life:3                
            });
        }

    }
}
